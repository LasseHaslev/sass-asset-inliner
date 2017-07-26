import test from 'ava';
import { Encoder } from '../dist/index';

let url = 'https://fonts.gstatic.com/s/teko/v6/MZYifgR5I0jauz62eF96WhTbgVql8nDJpwnrE27mub0.woff2'

test( 'it decodes fonts', t => {
    t.true( /^data:application\/font-woff2;base64,[A-Za-z0-9+/=]+=$/
        .test( Encoder.encodeFont( url ) ) );
} );

// test( 'It subsets font before encode if parameter is set', t => {
    // let original = Encoder.encodeFont( url );
    // let subsetted = Encoder.encodeFont( url, '[A-z]' );

    // t.true(original.length > subsetted.length);
// } );
