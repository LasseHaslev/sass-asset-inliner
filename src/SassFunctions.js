import Encoder from './Encoder';
import sass from 'node-sass';

export default {
        'inline-image($string)': function( filePath, done ) {

            Encoder.encodeImage( filePath.getValue() ).then( function( base64 ) {
                done( sass.types.String( 'url("' + base64 + '")' ) );
            } );

        },
        "inline-font($string, $regex: null)": function( filePath, regex ) {

            if (regex.constructor.name === 'SassNull') {
                return types.String( 'url(' + encodeBase64( filePath.getValue() ) + ')' );
            }

            regex = regex.getValue();

            // Get relative path
            // var relativePath = './' + filePath.getValue();
            var relativePath = filePath.getValue();
            var filePath = path.resolve( settings.base, relativePath );

            var subseter = new FontSubseter( filePath, {
                regex: new RegExp( regex ),
            } );
            return types.String( 'url( ' + subseter.subset().toBase64() + ' )' );
        },
}
