# @lassehaslev/sass-asset-inliner
> Helper functions for node-sass for inlining assets

## Install
```bash
npm install @lassehaslev/sass-asset-inliner --save
```

## Usage
##### Node file
```js
#!/usr/bin/env node

// Get class
var sass = require('node-sass');
var SassAssetInliner = require( '@lassehaslev/sass-asset-inliner' );

sass.render({
  file: scss_filename,
  {
    functions: SassAssetInliner( {
        base: 'path/to/source/of/your/project', // Example: process.cwd()
    } ),
  }
}, function(err, result) { /*...*/ });
```

##### Sass file
```scss
@font-face {
    font-family: 'MyFont';
    src: inline-font( 'path/to/your/font.ttf' ); // Include full font
    // src: inline-font( 'path/to/your/font.ttf', '[0-9]' ); // Add regex to subset font
}
body {
    background-image: inline-image( 'path/to/your/image.png' );
}
```
