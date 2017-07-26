import test from 'ava';

import SassFunctions from '../dist/index';


test( 'it implements inline-image', t => {
    t.truthy( SassFunctions['inline-image($string)'] );
} );

test( 'it implements font-subsetter', t => {
    t.truthy( SassFunctions['inline-font($string, $regex: null)'] );
} );
