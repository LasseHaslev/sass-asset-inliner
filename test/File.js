import fs from 'fs';
import test from 'ava';

import { File } from '../dist/index';

let relativeFile = null;
let absoluteFile;
let requestFile = null;

test.before( t => {
    relativeFile = new File( 'test/mocks/image.jpg' );
    absoluteFile = new File( '/test.jpg' );
    requestFile = new File( 'https://www.google.no/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png' );
});

test( 'it can get full path of file', t => {

    t.is( relativeFile.path(), process.cwd() + '/test/mocks/image.jpg' );
    t.is( absoluteFile.path(), '/test.jpg' );
    t.is( requestFile.path(), 'https://www.google.no/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png' );

});

test( 'it can check if file exists', t => {
    t.true( relativeFile.exists() );
    t.false( absoluteFile.exists() );
    t.true( requestFile.exists() );
} );

test( 'it can guess the mime type', t => {
    t.is( relativeFile.mimeType(), 'image/jpeg' );
    t.is( absoluteFile.mimeType(), 'image/jpeg' );
    t.is( requestFile.mimeType(), 'image/png' );

} );

test( 'it can read file', t => {
    t.truthy( relativeFile.read() );
    t.truthy( requestFile.read() );
} );

test( 'it can retrieve the file buffer', t => {
    t.truthy( relativeFile.buffer() );
    t.truthy( requestFile.buffer() );
} );

test( 'it can save file', t => {
    let filePath = '/tmp/image.png';
    requestFile.save( filePath );

    t.true( fs.existsSync( filePath ) );

    fs.unlinkSync( filePath );
} );

test( 'it throws error if it can not figure out the mime type', t => {
    let error = t.throws( t => {
        let file = new File( 'https://example.com/image.png?hello=200' );
    } );

    t.is( error.message, 'Could not find mime-type of https://example.com/image.png?hello=200' );
} );

test( 'it throws error if the file does not exists', t => {
    let error = t.throws( t => {
        absoluteFile.buffer();
    } );

    console.log(error.message);
    t.is( error.message, '/test.jpg does not exists or contain a readable file.' );
} );

// Can set options
// It can set base folder
