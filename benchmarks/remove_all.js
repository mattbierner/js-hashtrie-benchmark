"use strict";
const ht = require('hashtrie');
const hamt = require('hamt');
const hamt_plus = require('hamt_plus');
const mori = require('mori');
const immutable = require('immutable');

const api = require('../shared');

module.exports = {
    name: 'Remove N',
    description: "Cost to removed all entries from a map of size `n`.",
    sizes: [10, 100, 1000, 10000],
    benchmarks: {}
};

module.exports.benchmarks['Native Object'] = function(keys, order) {
    const h = api.nativeObjectFrom(keys);
    return function() {
        const c = h;
        for (const i = 0, len = order.length; i < len; ++i) {
            c = Object.assign({}, c);
            delete c[order[i]];
        }
    };
};

module.exports.benchmarks['Native Map'] = function(keys, order) {
    const h = api.nativeMapFrom(keys);
    return function() {
        const c = h;
        for (const i = 0, len = order.length; i < len; ++i) {
            c = new Map(c);
            c.delete(order[i]);
        }
    };
};

module.exports.benchmarks['Hashtrie'] = function(keys, order) {
    const h = api.hashtrieFrom(keys);
    return function() {
        const c = h;
        for (const i = 0, len = order.length; i < len; ++i)
            c = ht.remove(keys[order[i]], c);
    };
};

module.exports.benchmarks['Hamt'] = function(keys, order) {
    const h = api.hamtFrom(keys);
    return function() {
        const c = h;
        for (const i = 0, len = order.length; i < len; ++i)
            c = hamt.remove(keys[order[i]], c);
    };
};

module.exports.benchmarks['Hamt+'] = function(keys, order) {
    const h = api.hamtPlusFrom(keys);
    return function() {
        const c = h;
        for (const i = 0, len = order.length; i < len; ++i)
            c = hamt_plus.remove(keys[order[i]], c);
    };
};

module.exports.benchmarks['Mori'] = function(keys, order) {
    const h = api.moriFrom(keys);
    return function() {
        const c = h;
        for (const i = 0, len = order.length; i < len; ++i)
            c = mori.dissoc(c, keys[order[i]]);
    };
};

module.exports.benchmarks['Immutable'] = function(keys, order) {
    const h = api.immutableFrom(keys);
    return function() {
        const c = h;
        for (const i = 0, len = order.length; i < len; ++i)
            c = c.delete(keys[order[i]]);
    };
};
