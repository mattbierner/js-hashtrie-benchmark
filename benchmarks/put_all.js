"use strict";
const ht = require('hashtrie');
const hamt = require('hamt');
const hamt_plus = require('hamt_plus');
const mori = require('mori');
const immutable = require('immutable');

module.exports = {
    name: 'Put N',
    description: "Cost to put `n` entries into a map.",
    sizes: [10, 100, 1000, 10000],
    benchmarks: {}
};

module.exports.benchmarks['Native Object'] = keys => {
    return function() {
        let h = {};
        for (let i = 0, len = keys.length; i < len; ++i) {
            h = Object.assign({}, h);
            h[keys[i]] = i;
        }
    };
};

module.exports.benchmarks['Native Map'] = keys => {
    return function() {
        let h = new Map();
        for (let i = 0, len = keys.length; i < len; ++i) {
            h = new Map(h);
            h.set(keys[i], i);
        }
    };
};

module.exports.benchmarks['Hashtrie'] = keys => {
    return function() {
        let h = ht.empty;
        for (let i = 0, len = keys.length; i < len; ++i)
            h = ht.set(i, keys[i], h);
    };
};

module.exports.benchmarks['Hamt'] = keys => {
    return function() {
        let h = hamt.empty;
        for (let i = 0, len = keys.length; i < len; ++i)
            h = hamt.set(keys[i], i, h);
    };
};

module.exports.benchmarks['Hamt+'] = keys => {
    return function() {
        let h = hamt_plus.make();
        for (let i = 0, len = keys.length; i < len; ++i)
            h = hamt_plus.set(keys[i], i, h);
    };
};

module.exports.benchmarks['Mori'] = keys => {
    return function() {
        let h = mori.hashMap();
        for (let i = 0, len = keys.length; i < len; ++i)
            h = mori.assoc(h, keys[i], i);
    };
};

module.exports.benchmarks['Immutable'] = keys => {
    return function() {
        let h = immutable.Map();
        for (let i = 0, len = keys.length; i < len; ++i)
            h = h.set(keys[i], i);
    };
};
