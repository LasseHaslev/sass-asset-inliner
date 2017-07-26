import Encoder from './Encoder';
import sass from 'node-sass';

export default {
        'inline-image($string, $size: null)': function( filePath, size, done ) {

            filePath = filePath.getValue();
            size = size.constructor.name === 'SassNull' ? null : size.getValue();

            Encoder.encodeImage( filePath, size ).then( function( base64 ) {
                done( sass.types.String( 'url("' + base64 + '")' ) );
            } );

        },
        "inline-font($string, $regex: null)": function( filePath, regex ) {
            filePath = filePath.getValue();
            regex = regex.constructor.name === 'SassNull' ? null : regex.getValue();


            let base64 = Encoder.encodeFont( filePath, regex );
            var returnString = 'url("' + base64 + '")';
            return sass.types.String( returnString )
        },
}
