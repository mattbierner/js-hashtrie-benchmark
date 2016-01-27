 "use strict";
const ht = require('hashtrie');
const hamt = require('hamt');
const hamt_plus = require('hamt_plus');
const mori = require('mori');
const immutable = require('immutable');

const api = require('../shared');

module.exports = {
    name: 'Count',
    description: "Cost to count map of size `n`.",
    sizes: [10, 100, 1000, 10000],
    benchmarks: {}
};

module.exports.benchmarks['Native Object'] = function(keys) {
    const h = api.nativeObjectFrom(keys);
    return function() {
        Object.keys(h).length;
    }
};

module.exports.benchmarks['Native Map'] = function(keys) {
    const h = api.nativeMapFrom(keys);
    return function() {
        h.size;
    };
};

module.exports.benchmarks['Hashtrie'] = function(keys) {
    const h = api.hashtrieFrom(keys);
    return function() {
        ht.count(h);
    };
};

module.exports.benchmarks['Hamt'] = function(keys) {
    const h = api.hamtFrom(keys);
    return function() {
        hamt.count(h);
    };
};

module.exports.benchmarks['Hamt+'] = function(keys) {
    const h = api.hamtPlusFrom(keys);
    return function() {
        hamt_plus.count(h);
    };
};

module.exports.benchmarks['Mori'] = function(keys) {
    const h = api.moriFrom(keys);
    return function() {
        mori.count(h);
    };
};

module.exports.benchmarks['Immutable'] = function(keys) {
    const h = api.immutableFrom(keys);
    return function() {
        h.count();
    };
};
