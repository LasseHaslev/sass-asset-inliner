import test from 'ava';
import Encoder from '../dist/index';

let localFilePath = 'test/mocks/image.jpg';
let externalFilePath = 'https://www.google.no/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png';

// it can base64 encode a file from path
test( 'it can base64 encode a file from path', t => {
    t.true( /^"data:image\/jpeg;base64,[A-Za-z0-9+/=]+="$/.test( Encoder.encode( localFilePath ) ) );
    t.true( /^"data:image\/png;base64,[A-Za-z0-9+/=]+="$/.test( Encoder.encode( externalFilePath ) ) );
} );

// it takes a absolute or relative path or url to base64 encode file

// test( 'It can base64 encode from buffer', t => {
// } );
