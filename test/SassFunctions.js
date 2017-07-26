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


test( 'it can inline font', async t => {
    let css = await compileSass( '@font-face { src: inline-font( "https://github.com/google/fonts/raw/master/ofl/teko/Teko-Regular.ttf" ); }' );

    let base64 = await Encoder.encodeFont( 'https://github.com/google/fonts/raw/master/ofl/teko/Teko-Regular.ttf' );

    let expected = '@font-face { src: url("' + base64 + '"); }\n';

    t.true( css.length == expected.length );
} );

test( 'it can subset font before inlinting it', async t => {
    let css = await compileSass( '@font-face { src: inline-font( "test/mocks/Teko-Regular.ttf", "[0-9]" ); }' );

    let base64 = await Encoder.encodeFont( 'test/mocks/Teko-Regular.ttf', '[0-9]' );

    let expected = '@font-face { src: url("' + base64 + '"); }\n';

    t.true( css.length == expected.length );
} );
