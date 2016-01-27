"use strict";
const ht = require('hashtrie');
const hamt = require('hamt');
const hamt_plus = require('hamt_plus');
const mori = require('mori');
const immutable = require('immutable');

const api = require('../shared');

module.exports = {
    name: 'Get Nth',
    description: "Cost to get the `nth` entry in a map of size `n`.",
    sizes: [10, 100, 1000, 10000, 100000],
    benchmarks: {},
};

module.exports.benchmarks['Native Object'] = keys => {
    const h = api.nativeObjectFrom(keys);
    return function() {
        const key = keys[Math.floor(Math.random() * keys.length)];
        h[key];
    };
};

module.exports.benchmarks['Native Map'] = keys => {
    const h = api.nativeMapFrom(keys);
    return function() {
        const key = keys[Math.floor(Math.random() * keys.length)];
        h.get(key);
    };
};

module.exports.benchmarks['Hashtrie'] = keys => {
    const h = api.hashtrieFrom(keys);
    return function() {
        const key = keys[Math.floor(Math.random() * keys.length)];
        ht.get(key, h);
    };
};

module.exports.benchmarks['Hamt'] = keys => {
    const h = api.hamtFrom(keys);
    return function() {
        const key = keys[Math.floor(Math.random() * keys.length)];
        hamt.get(key, h);
    };
};

module.exports.benchmarks['Hamt+'] = keys => {
    const h = api.hamtPlusFrom(keys);
    return function() {
        const key = keys[Math.floor(Math.random() * keys.length)];
        hamt_plus.get(key, h);
    };
};

module.exports.benchmarks['Mori'] = keys => {
    const h = api.moriFrom(keys);
    return function() {
        const key = keys[Math.floor(Math.random() * keys.length)];
        mori.get(h, key);
    };
};

module.exports.benchmarks['Immutable'] = keys => {
    const h = api.immutableFrom(keys);
    return function() {
        const key = keys[Math.floor(Math.random() * keys.length)];
        h.get(key);
    };
};
