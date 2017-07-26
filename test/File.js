import test from 'ava';

import { File } from '../dist/index';

let relativeFile = null;
let absoluteFile;
let requestFile = null;

// Can set options
// Can get full path
test.before( t => {
    relativeFile = new File( 'test/mocks/image.jpg' );
    absoluteFile = new File( '/test.jpg' );
    requestFile = new File( 'http://via.placeholder.com/350x150' );
});

test( 'it can get full path of file', t => {

    t.is( relativeFile.path(), process.cwd() + '/test/mocks/image.jpg' );
    t.is( absoluteFile.path(), '/test.jpg' );
    t.is( requestFile.path(), 'http://via.placeholder.com/350x150' );

});

test( 'it can check if file exists', t => {
    t.true( relativeFile.exists() );
    t.false( absoluteFile.exists() );
    t.true( requestFile.exists() );
} );

// test( 'it can guess the mime type', t => {
    // let file = new File( 'mocks/image.png' );

    // t.is( file.mimeType(), 'image/png' )
// } );
// It can set base folder
// it can retrieve the file buffer
// it can guess how to get the file
    // relative, absolute or http
