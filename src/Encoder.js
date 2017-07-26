import {File} from './index';
export default class {

    static encode( path ) {
        let file = new File( path );

        return '"data:' + file.mimeType() + ';base64,' + file.buffer().toString('base64') + '"';
    }

    static encodeFont( path ) {
        return this.encode( path );
    }

    static encodeImage( path ) {
        return this.encode( path );
    }

}
