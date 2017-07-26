import {URL} from 'url';
import fs from 'fs';
import path from 'path';
import request from 'sync-request';

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

}
