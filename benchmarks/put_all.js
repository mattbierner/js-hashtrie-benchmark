"use strict";
const ht = require('hashtrie');
const hamt = require('hamt');
const hamt_plus = require('hamt_plus');
const mori = require('mori');
const immutable = require('immutable');

module.benchmarks = {
    name: 'Put N',
    description: "Cost to put `n` entries into a map.",
    sizes: [10, 100, 1000, 10000],
    benchmarks: {}
};

module.exports.benchmarks['Native Object'] = keys => {
    return function() {
        const h = {};
        for (const i = 0, len = keys.length; i < len; ++i) {
            h = Object.assign({}, h);
            h[keys[i]] = i;
        }
    };
};

module.exports.benchmarks['Native Map'] = keys => {
    return function() {
        const h = new Map();
        for (const i = 0, len = keys.length; i < len; ++i) {
            h = new Map(h);
            h.set(keys[i], i);
        }
    };
};

module.exports.benchmarks['Hashtrie'] = keys => {
    return function() {
        const h = ht.empty;
        for (const i = 0, len = keys.length; i < len; ++i)
            h = ht.set(i, keys[i], h);
    };
};

module.exports.benchmarks['Hamt'] = keys => {
    return function() {
        const h = hamt.empty;
        for (const i = 0, len = keys.length; i < len; ++i)
            h = hamt.set(keys[i], i, h);
    };
};

module.exports.benchmarks['Hamt+'] = keys => {
    return function() {
        const h = hamt_plus.make();
        for (const i = 0, len = keys.length; i < len; ++i)
            h = hamt_plus.set(keys[i], i, h);
    };
};

module.exports.benchmarks['Mori'] = keys => {
    return function() {
        const h = mori.hashMap();
        for (const i = 0, len = keys.length; i < len; ++i)
            h = mori.assoc(h, keys[i], i);
    };
};

module.exports.benchmarks['Immutable'] = keys => {
    return function() {
        const h = immutable.Map();
        for (const i = 0, len = keys.length; i < len; ++i)
            h = h.set(keys[i], i);
    };
};
