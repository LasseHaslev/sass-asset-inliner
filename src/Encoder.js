import {File} from './index';
import FontSubsetter from '@lassehaslev/font-subsetter';
import Jimp from 'jimp';

export default class {

    static encode( path ) {
        let file = new File( path );

        return 'data:' + file.mimeType() + ';base64,' + file.buffer().toString('base64');
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

    static async encodeImage( path, size ) {

        if (!size) {
            return this.encode( path );
        }

        let file = new File( path );

        let width = Jimp.AUTO;
        let height = Jimp.AUTO;

        if (/^\d+$/.test( size )) {
            width = size;
        }
        else if (/^[\d_]+x[\d_]+$/.test( size )) {
            var split = size.split( 'x' );
            width = split[0] != '_' ? split[0] : Jimp.AUTO;
            height = split[1] != '_' ? split[1] : Jimp.AUTO;
        }


        return await Jimp.read( file.buffer() ).then( async image => {
            return await new Promise( ( resolve, reject ) => {
                image.resize(
                    parseInt( width ),
                    parseInt( height )
                ).getBase64( file.mimeType(), function( error, data ) {
                    resolve( data )
                } );
            } );
        } )

    }

}
