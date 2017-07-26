import test from 'ava';
import Encoder from '../dist/index';

let localFilePath = 'test/mocks/image.jpg';
let externalFilePath = 'https://www.google.no/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png';

// it can base64 encode a file from path
test( 'it can base64 encode a file from path', t => {
    let base64 = Encoder.encode( localFilePath );
    t.is( base64, '"data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAG1BMVEXMzMyWlpaqqqq3t7exsbGcnJy+vr6jo6PFxcUFpPI/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAQUlEQVQ4jWNgGAWjgP6ASdncAEaiAhaGiACmFhCJLsMaIiDAEQEi0WXYEiMCOCJAJIY9KuYGTC0gknpuHwXDGwAA5fsIZw0iYWYAAAAASUVORK5CYII="' );
} );

// it takes a absolute or relative path or url to base64 encode file

// test( 'It can base64 encode from buffer', t => {
// } );
