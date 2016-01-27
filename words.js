
/**
 * Generate an array of `count` random strings between length (wl / 2, `wl`].
 */
exports.words = function(count, wl) {
    var out = [];
    for (var i = 0; i < count; ++i) {
        var len = Math.ceil(wl / 2 + Math.random() * wl / 2);
        var w = '';
        while (len--)
            w += String.fromCharCode(97 + Math.floor(Math.random() * 26))
        out.push(w);
    }
    return out;
};

exports.range = function(start, end) {
    var indicies = [], out = [];
    for (var i = start; i < end; ++i)
        indicies.push(i);
    while (indicies.length) {
        var index = Math.floor(Math.random() * indicies.length);
        out.push(indicies[index]);
        indicies.splice(index, 1);
    }
    return out;
};
