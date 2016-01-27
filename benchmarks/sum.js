"use strict";
const ht = require('hashtrie');
const hamt = require('hamt');
const hamt_plus = require('hamt_plus');
const mori = require('mori');
const immutable = require('immutable');

const api = require('../shared');

module.exports = {
    name: 'Sum',
    description: "Cost to sum values in map of size `n`.",
    sizes: [10, 100, 1000, 10000],
    benchmarks: {}
};

module.exports.benchmarks['Native Object'] = keys => {
    const h = api.nativeObjectFrom(keys);
    return function() {
        const sum = 0;
        for (const k in h) {
            if (h.hasOwnProperty(k)) {
                sum += h[k];
            }
        }
    };
};

module.exports.benchmarks['Native Map'] = keys => {
    const h = api.nativeMapFrom(keys);
    return function() {
        const sum = 0;
        h.forEach(function(val, key) {
            sum += val;
        });
    };
};

module.exports.benchmarks['Hashtrie'] = keys => {
    const add = function(p, x) {
        return p + x;
    };

    const h = api.hashtrieFrom(keys);
    return function() {
        ht.fold(add, 0, h);
    };
};

module.exports.benchmarks['Hamt'] = keys => {
    const add = function(p, x) {
        return p + x;
    };

    const h = api.hamtFrom(keys);
    return function() {
        hamt.fold(add, 0, h);
    };
};

module.exports.benchmarks['Hamt+'] = keys => {
    const add = function(p, x) {
        return p + x;
    };

    const h = api.hamtPlusFrom(keys);
    return function() {
        hamt_plus.fold(add, 0, h);
    };
};

module.exports.benchmarks['Mori'] = keys => {
    const add = function(p, _, c) {
        return p + c;
    };

    const h = api.moriFrom(keys);
    return function() {
        mori.reduceKV(add, 0, h);
    };
};

module.exports.benchmarks['Immutable'] = keys => {
    const add = function(p, c) {
        return p + c;
    };

    const h = api.immutableFrom(keys);
    return function() {
        h.reduce(add, 0);
    };
};
