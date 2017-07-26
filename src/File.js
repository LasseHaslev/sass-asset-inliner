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
        if (this.filePath[0] === '/' || this.isExternalRequest()) {
            return this.filePath;
        }

        return process.cwd() + '/' + this.filePath;
    }

    isExternalRequest() {
        return /^http/.test( this.filePath );
    }

    exists() {
        if (this.isExternalRequest()) {
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

}
