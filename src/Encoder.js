import {File} from './index';
import FontSubsetter from '@lassehaslev/font-subsetter';
export default class {

    static encode( path ) {
        let file = new File( path );

        return '"data:' + file.mimeType() + ';base64,' + file.buffer().toString('base64') + '"';
    }

    static encodeFont( path, regex ) {
        if (!regex) {
            return this.encode( path );
        }

        let file = new File( path );

        if (file.isExternalResource()) {
            throw new TypeError( 'The font subsetter currently only works with local fonts.' );
        }

        var subsetter = new FontSubsetter( file.path(), {
            regex: new RegExp( regex ),
        } );

        return subsetter.subset().toBase64();
    }

    static encodeImage( path ) {
        return this.encode( path );
    }

}
