import {URL} from 'url';
import fs from 'fs';
import path from 'path';
import request from 'sync-request';

import mime from 'mime-types';

export default class {

    constructor( filePath ) {
        this.filePath = filePath;
    }

    mimeType() {

    }

    path() {
        if (this.filePath[0] === '/' || this.isExternalResource()) {
            return this.filePath;
        }

        return process.cwd() + '/' + this.filePath;
    }

    isExternalResource() {
        return /^http/.test( this.filePath );
    }

    exists() {
        if (this.isExternalResource()) {
            var res = request( 'HEAD', this.path() );
            return res.statusCode.toString()[0] == 2;
        }
        return fs.existsSync( this.path() );
    }

    mimeType() {
        let mimeType = mime.lookup( this.path() )
        if (!mimeType) {
            return null;
        }
        return mimeType;
    }

    /*
     * Read content of file
     */
    read() {

        if (!this.exists()) {
            throw new TypeError( this.path() + ' does not contain a readable file' );
        }

        if (this.isExternalResource()) {
            var res = request('GET', this.path());
            return res.getBody();
        }
        return fs.readFileSync( this.path() );
    }

    /*
     * Return file buffer
     */
    buffer() {
        return new Buffer( this.read() );
    }

    /*
     * Save file
     */
    save( path ) {
        path = path[0] === '/' ? path : process.cwd() + '/' + path 
        let hasError = false;

        // console.log(path);

        fs.writeFileSync( path, this.read(), function( error ) {
            if (error) {
                hasError = true;
            }
        } );

        return hasError;
    }
}
