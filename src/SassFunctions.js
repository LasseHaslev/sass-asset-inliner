export default {
        'inline-image($string)': function( filePath, regex ) {

            return types.String( 'url(' + encodeBase64( filePath.getValue() ) + ')' );

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
