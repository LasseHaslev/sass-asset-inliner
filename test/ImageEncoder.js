import test from 'ava';
import Encoder from '../dist/index';

let url = 'https://www.google.no/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'

test( 'it decodes images', t => {
    t.true( /^"data:image\/png;base64,[A-Za-z0-9+/=]+="$/
        .test( Encoder.encodeImage( url ) ) );
} );

// It resizes image before base64 encoding it
// test( 'it resizes image before base64 encoding it if parameter is set', t => {
    // let original = Encoder.encodeImage( url );
    // let subsetted = Encoder.encodeImage( url );

    // t.true(original.length > subsetted.length);
// } );
