var fs = require( 'fs' );
var path = require( 'path' );
var extend = require( 'extend' );
var nodeSass = require('node-sass');

// var request = require( 'request' );
var request = require( 'sync-request' );

var types = nodeSass.types;
var FontSubseter = require( '@lassehaslev/font-subsetter' );

var settings;

var mime = require( 'mime-types' );


// var encodeBase64 = function( $string ) {
    // var buffer = new Buffer($string.getValue());
    // return nodeSass.types.String(buffer.toString('base64'));
// };
var encodeBase64 = function( filePath ) {

    var data = null;

    /*
     * Get data from url if it is a url
     */
    if ( /^http/.test( filePath ) ) {

        var res = request('GET', filePath);
        data = res.getBody();

    }
    /*
     * Get data from file path if it is not a url
     */
    else {

        // Get relative path
        // var relativePath = './' + filePath.getValue();
        var filePath = path.resolve( settings.base, filePath );

        // Read the file
        data = fs.readFileSync( filePath );
    }

    // Get the mime type
    var mimeType = mime.lookup(filePath);
    var buffer = new Buffer( data );

    return '"data:' + mimeType + ';base64,' + buffer.toString('base64') + '"';
};

module.exports = function( options ) {

    settings = extend( true, {
        base: process.cwd(),
    }, options );

    return {
        // 'encodeBase64($string)': encodeBase64,
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
    };
}
