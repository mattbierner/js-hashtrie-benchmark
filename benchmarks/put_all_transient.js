 "use strict";
var ht = require('hashtrie');
var hamt = require('hamt');
var hamt_plus = require('hamt_plus');
var mori = require('mori');
var immutable = require('immutable');

module.benchmarks = {
    name: 'Put N (transient)',
    description: "Cost to put `n` entries into the map.\n" +
        "Uses transiently mutable object interface if supported.",
    sizes: [10, 100, 1000, 10000],
    benchmarks: {},
};

module.exports.benchmarks['Native Object'] = function(keys) {
    return function() {
        var h = {};
        for (var i = 0, len = keys.length; i < len; ++i)
            h[keys[i]] = i;
        return h;
    };
};

module.exports.benchmarks['Native Map'] = function(keys) {
    return function() {
        var h = new Map();
        for (var i = 0, len = keys.length; i < len; ++i)
            h.set(keys[i], i);
        return h;
    };
}

module.exports.benchmarks['Hamt'] =  function(keys) {
    return function() {
        var h = hamt.empty;
        for (var i = 0, len = keys.length; i < len; ++i)
            h = hamt.set(i, keys[i], h);
        return h;
    };
};

module.exports.benchmarks['Hamt+'] = function(keys) {
    return function() {
        var h = hamt_plus.make().beginMutation();
        for (var i = 0, len = keys.length; i < len; ++i)
            hamt_plus.set(keys[i], i, h);
        return h.endMutation();
    };
};

module.exports.benchmarks['Mori'] = function(keys) {
    return function() {
        var h = mori.mutable.thaw(mori.hashMap());
        for (var i = 0, len = keys.length; i < len; ++i)
            mori.mutable.assoc(h, keys[i], i);
        return mori.mutable.freeze(h);
    };
};

module.exports.benchmarks['Immutable'] = function(keys) {
    return function() {
        var h = immutable.Map().asMutable();
        for (var i = 0, len = keys.length; i < len; ++i)
            h.set(keys[i], i);
        return h.asImmutable();
    };
};
