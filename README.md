# @lassehaslev/sass-asset-inliner
> Helper functions for node-sass for inlining / base64 encoding assets

## Install
```bash
npm install @lassehaslev/sass-asset-inliner --save
```

## Usage

### Setup

You need to add the `sass-asset-inliner` functions to `node-sass` `function option`.

```js
var sass = require('node-sass');
var SassAssetInliner = require( '@lassehaslev/sass-asset-inliner' );

sass.render({
    file: scss_filename,
    {
        functions: SassAssetInliner,
    }
}, function(err, result) { /*...*/ });
```

### Sass file

Inline assets by including `absolute path`, `relative path` or `url` to the assets you want to inline.

#### Inline images
```scss
body {
    background-image: inline-image( 'path/to/your/image.png' );

    // To resize your image you can write
    background-image: inline-image( 'path/to/your/image.png', "200x400" );

    // Add a underscore to the value you dont care about
    background-image: inline-image( 'path/to/your/image.png', "_x400" );
}
```

#### Inline fonts

> Note: at this point, there is not possible to subset a font from a url.

```scss
@font-face {
    src: inline-font( 'path/to/your/font.ttf' ); // Include full font

    // Subset font by adding regex as second parameter
    // of each character you want to include
    src: inline-font( 'path/to/your/font.ttf', '[0-9]' );
}
```

### Api

As the [SassFunctions](https://github.com/LasseHaslev/sass-asset-inliner/blob/development/src/SassFunctions.js) you can use the functions of the [Encoder](https://github.com/LasseHaslev/sass-asset-inliner/blob/development/src/Encoder.js).

```js
import {Encoder} from '@lassehaslev/sass-asset-inliner';

// base64 encode file
Encoder.encode( '{path}' );

// base64 encode image
Encoder.encodeImage( '{path}', '100x100' );

// base64 encode font
Encoder.encodeFont( '{path}', '[0-9]' );
```

### Development

```bash
// Test driven development
npm run tdd

// Build
npm run build
```
