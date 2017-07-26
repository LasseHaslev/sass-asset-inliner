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


test( 'it can inline images', async t => {

    let css = await compileSass( '.image { background-image: inline-image( "test/mocks/image.jpg" ); }' );

    let base64 = await Encoder.encodeImage( 'test/mocks/image.jpg' );

    t.is( css, '.image { background-image: url("' + base64 + '"); }\n' );

} );

test( 'it can resize images before inlining them', async t => {
    let css = await compileSass( '.image { background-image: inline-image( "test/mocks/image.jpg", 10 ); }' );

    let base64 = await Encoder.encodeImage( 'test/mocks/image.jpg', "10" );

    t.is( css, '.image { background-image: url("' + base64 + '"); }\n' );
} );
