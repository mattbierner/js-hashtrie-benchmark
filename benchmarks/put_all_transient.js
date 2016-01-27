"use strict";
const ht = require('hashtrie');
const hamt = require('hamt');
const hamt_plus = require('hamt_plus');
const mori = require('mori');
const immutable = require('immutable');

module.exports = {
    name: 'Put N (transient)',
    description: "Cost to put `n` entries into the map.\n" +
        "Uses transiently mutable object interface if supported.",
    sizes: [10, 100, 1000, 10000],
    benchmarks: {}
};

module.exports.benchmarks['Native Object'] = keys => {
    return function() {
        const h = {};
        for (let i = 0, len = keys.length; i < len; ++i)
            h[keys[i]] = i;
    };
};

module.exports.benchmarks['Native Map'] = keys => {
    return function() {
        const h = new Map();
        for (let i = 0, len = keys.length; i < len; ++i)
            h.set(keys[i], i);
    };
}

module.exports.benchmarks['Hamt'] = keys => {
    return function() {
        let h = hamt.empty;
        for (let i = 0, len = keys.length; i < len; ++i)
            h = hamt.set(i, keys[i], h);
    };
};

module.exports.benchmarks['Hamt+'] = keys => {
    return function() {
        const h = hamt_plus.make().beginMutation();
        for (let i = 0, len = keys.length; i < len; ++i)
            hamt_plus.set(keys[i], i, h);
        h.endMutation();
    };
};

module.exports.benchmarks['Mori'] = keys => {
    return function() {
        const h = mori.mutable.thaw(mori.hashMap());
        for (let i = 0, len = keys.length; i < len; ++i)
            mori.mutable.assoc(h, keys[i], i);
        mori.mutable.freeze(h);
    };
};

module.exports.benchmarks['Immutable'] = keys => {
    return function() {
        const h = immutable.Map().asMutable();
        for (let i = 0, len = keys.length; i < len; ++i)
            h.set(keys[i], i);
        h.asImmutable();
    };
};
