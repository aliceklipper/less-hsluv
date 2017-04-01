# less-hsluv
LESS plugin that lets you specify colors in HSLuv color space.

See http://hsluv.org for details.

## Installation

With `npm`:
```bash
npm i -D less-hsluv
```

…or clone the repo, then run `npm i`.

## Example

```less
@hue        : 180;
@saturation :  75;
@lightness  :  66;

@my-color   : hsluv(@hue, @saturation, @lightness);
```

## API

### `new LessHusl()`

Creates new plugin instance.

## Functions

### `hsluv(@h, @s, @l)`

Arguments:
 *  `@h : 0..360`,
 *  `@s : 0..100`,
 *  `@l : 0..100`.

Aliases: `husl`.

### `hpluv(@h, @s, @l)`

Arguments: see above.

Aliases: `huslp`, `hpl`.

### `hsluva(@h, @s, @l, @a)`

Arguments:
 *  `@h : 0..360`,
 *  `@s : 0..100`,
 *  `@l : 0..100`,
 *  `@a : 0..1`.

Aliases: `husla`.

### `hpluva(@h, @s, @l, @a)`

Arguments:
 *  `@h : 0..360`,
 *  `@s : 0..100`,
 *  `@l : 0..100`,
 *  `@a : 0..1`.

Aliases: `huslpa`, `hpla`.

## Usage

### With webpack 2

````javascript
const LessHsluv         = require('less-hsluv');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  ...foo,
  module : {
    rules : [
      {
        test : /\.less$/,
        use  : ExtractTextPlugin.extract({
          use      : [
            'css-loader',
            {
              loader  : 'less-loader',
              options : {
                plugins : [new LessHsluv()],
              },
            }
          ],
          fallback : 'style-loader/useable'
        })
      }
    ]
  },
  ...bar
};
````

