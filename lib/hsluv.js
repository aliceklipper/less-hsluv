const hsluv = require('hsluv');
const debug = require('debug')('hsluv');

module.exports = {
    install : function (less /*, pluginManager*/) {
        debug('Installing...');

        const rgb = less.functions.functionRegistry.get('rgb').bind(less);

        less.functions.functionRegistry.addMultiple({
            hsluv : (h, s, l) => {
                h = _normalizeAngle(h);
                s = _sanitize(s, 0, 100);
                l = _sanitize(l, 0, 100);

                const val = hsluv.hsluvToRgb([h, s, l]).map(_byte);
                const res = rgb.apply(null, val);

                debug('hsluv', h, s, l, ' -> rgb ', val);

                return res;
            },
            hpluv : (h, s, l) => {
                h = _normalizeAngle(h);
                s = _sanitize(s, 0, 100);
                l = _sanitize(l, 0, 100);

                const val = hsluv.hpluvToRgb([h, s, l]).map(_byte);
                const res = rgb.apply(null, val);

                debug('hpluv', h, s, l, ' -> rgb ', val);

                return res;
            },
        });

        debug('Installed.');
    }
};

function _byte (v) {
    return Math.floor(v * 255 + 0.5);
}

function _normalizeAngle (v) {
    return ((v.value - 360) % 360) + 360;
}

function _sanitize (v, min, max) {
    return Math.max(min, Math.min(v.value, max));
}
