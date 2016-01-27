 "use strict";
const ht = require('hashtrie');
const hamt = require('hamt');
const hamt_plus = require('hamt_plus');
const mori = require('mori');
const immutable = require('immutable');

const api = require('../shared');

module.exports = {
    name: 'Put Nth',
    description: "Cost to put the `nth` entry into a map of size `n - 1`.",
    sizes: [10, 100, 1000, 10000, 100000],
    benchmarks: {}
};

module.exports.benchmarks['Native Object'] = keys => {
    const h = api.nativeObjectFrom(keys.slice(1));
    const key = keys[0];
    return function() {
        const newKey = {};
        newKey[key] = 0;
        Object.assign({}, h, newKey);
    };
};

module.exports.benchmarks['Native Map'] = keys => {
    const h = api.nativeMapFrom(keys.slice(1));
    const key = keys[0];
    return function() {
        c = new Map(h);
        c.set(key, 0);
    };
};

module.exports.benchmarks['Hashtrie'] = keys => {
    const h = api.hashtrieFrom(keys.slice(1));
    const key = keys[0];
    return function() {
        ht.set(0, key, h);
    };
};

module.exports.benchmarks['Hamt'] = keys => {
    const h = api.hamtFrom(keys.slice(1));
    const key = keys[0];
    return function() {
        hamt.set(key, 0, h);
    };
};

module.exports.benchmarks['Hamt+'] =  keys => {
    const h = api.hamtPlusFrom(keys.slice(1));
    const key = keys[0];
    return function() {
        hamt_plus.set(key, 0, h);
    };
};

module.exports.benchmarks['Mori'] = keys => {
    const h = api.moriFrom(keys.slice(1));
    const key = keys[0];
    return function() {
        mori.assoc(h, key, 0);
    };
};

module.exports.benchmarks['Immutable'] = keys => {
    const h = api.immutableFrom(keys.slice(1));
    const key = keys[0];
    return function() {
        h.set(key, 0);
    };
};
