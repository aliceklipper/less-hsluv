const hsluv = require('hsluv');

function createLimiter (min = 0, max = 100) {
    return (value) => {
        return Math.max(min, Math.min(value, max));
    };
}

const limitPercentage = createLimiter(0, 100);
const limitAlpha      = createLimiter(0, 1);

function createConverter (source, target) {
    return (h, s, l, a) => {
        h = h.value;
        s = limitPercentage(s.value);
        l = limitPercentage(l.value);

        if (typeof a != 'undefined') a = limitAlpha(a.value);

        let val = source([h, s, l]).map(_ => Math.floor(_ * 255 + 0.5)); // Convert color from source color space.
        if (typeof a != 'undefined') val.push(a);                        // Append alpha if defined.

        return target.apply(null, val); // Convert to target format.
    }
}

module.exports = class LessHsluv {
    install (less) {
        const rgb  = less.functions.functionRegistry.get('rgb').bind(less);
        const rgba = less.functions.functionRegistry.get('rgba').bind(less);

        const _hsluv = createConverter(hsluv.hsluvToRgb, rgb);
        const _hpluv = createConverter(hsluv.hpluvToRgb, rgb);

        const _hsluva = createConverter(hsluv.hsluvToRgb, rgba);
        const _hpluva = createConverter(hsluv.hpluvToRgb, rgba);

        less.functions.functionRegistry.addMultiple({
            hsluv : _hsluv,
            husl  : _hsluv,

            hpluv : _hpluv,
            hpl   : _hpluv,
            huslp : _hpluv,

            hsluva : _hsluva,
            husla  : _hsluva,

            hpluva : _hpluva,
            hpla   : _hpluva,
            huslpa : _hpluva,
        });
    }
};
