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

@my_color   : hsluv(@hue, @saturation, @lightness);
```

## Functions

 *  `hsluv(@h, @s, @l)`
     *  `@h : 0..360`
     *  `@s : 0..100`
     *  `@l : 0..100`
 *  `hpluv(@h, @s, @l)`

## Usage

### With webpack 2

````javascript

````

