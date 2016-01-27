"use strict";
const ht = require('hashtrie');
const hamt = require('hamt');
const hamt_plus = require('hamt_plus');
const mori = require('mori');
const immutable = require('immutable');

const api = require('../shared');

module.exports = {
    name: 'Remove Nth',
    description: "Cost to remove entry from map of size `n`.",
    sizes: [10, 100, 1000, 10000, 100000],
    benchmarks: {}
};

const randomKey = keys =>
    keys[Math.floor(Math.random() * keys.length)];

module.exports.benchmarks['Native Object'] = keys => {
    const h = api.nativeObjectFrom(keys);
    return function() {
        const key = randomKey(keys);
        const c = Object.assign({}, h);
        delete c[key];
    };
};

module.exports.benchmarks['Native Map'] = keys => {
    const h = api.nativeMapFrom(keys);
    return function() {
        const key = randomKey(keys);
        const c = new Map(h);
        c.delete(key);
    };
};

module.exports.benchmarks['Hashtrie'] = keys => {
    const h = api.hashtrieFrom(keys);
    return function() {
        const key = randomKey(keys);
        ht.remove(key, h);
    };
};

module.exports.benchmarks['Hamt'] = keys => {
    const h = api.hamtFrom(keys);
    return function() {
        const key = randomKey(keys);
        hamt.remove(key, h);
    };
};

module.exports.benchmarks['Hamt+'] = keys => {
    const h = api.hamtPlusFrom(keys);
    return function() {
        const key = randomKey(keys);
        hamt_plus.remove(key, h);
    };
};

module.exports.benchmarks['Mori'] = keys => {
    const h = api.moriFrom(keys);
    return function() {
        const key = randomKey(keys);
        mori.dissoc(h, key);
    };
};

module.exports.benchmarks['Immutable'] = keys => {
    const h = api.immutableFrom(keys);
    return function() {
        const key = randomKey(keys);
        h.delete(key);
    };
};
