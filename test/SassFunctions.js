import test from 'ava';
import sass from 'node-sass';
import {Encoder} from '../dist/index';

import SassFunctions from '../dist/index';

let compileSass = async ( content ) => {
    return await new Promise( function( resolve, reject ) {
        sass.render( {
            // file: 'test/mocks/style.scss',
            data: content,
            functions: SassFunctions,
            outputStyle: 'compact'
        }, function( error, result ) {
            if (error) {
                console.log(error);
            }
            resolve(result.css.toString());
        } )
    });

}


test( 'it implements inline-image', t => {
    t.truthy( SassFunctions['inline-image($string)'] );
} );

test( 'it implements font-subsetter', t => {
    t.truthy( SassFunctions['inline-font($string, $regex: null)'] );
} );

test( 'it can inline images', async t => {

    let css = await compileSass( '.image { background-image: inline-image( "test/mocks/image.jpg" ); }' );

    let base64 = await Encoder.encodeImage( 'test/mocks/image.jpg' );

    t.is( css, '.image { background-image: url("' + base64 + '"); }\n' );

} );
