"use strict";
var ht = require('hashtrie');
var hamt = require('hamt');
var hamt_plus = require('hamt_plus');
var p = require('persistent-hash-trie');
var mori = require('mori');
var immutable = require('immutable');

var api = require('../shared');

module.exports = {
    name: 'Sum',
    description: "Cost to sum values in map of size `n`.",
    sizes: [10, 100, 1000, 10000],
    benchmarks: {}
};

module.exports.benchmarks['Native Object'] = function(keys) {
    var h = api.nativeObjectFrom(keys);
    return function() {
        var sum = 0;
        for (var k in h) {
            if (h.hasOwnProperty(k)) {
                sum += h[k];
            }
        }
    };
};

module.exports.benchmarks['Native Map'] = function(keys) {
    var h = api.nativeMapFrom(keys);
    return function() {
        var sum = 0;
        h.forEach(function(val, key) {
            sum += val;
        });
    };
};

module.exports.benchmarks['Hashtrie'] = function(keys) {
    var add = function(p, x) {
        return p + x;
    };

    var h = api.hashtrieFrom(keys);
    return function() {
        ht.fold(add, 0, h);
    };
};

module.exports.benchmarks['Hamt'] = function(keys) {
    var add = function(p, x) {
        return p + x;
    };

    var h = api.hamtFrom(keys);
    return function() {
        hamt.fold(add, 0, h);
    };
};

module.exports.benchmarks['Hamt+'] = function(keys) {
    var add = function(p, x) {
        return p + x;
    };

    var h = api.hamtPlusFrom(keys);
    return function() {
        hamt_plus.fold(add, 0, h);
    };
};

module.exports.benchmarks['Mori'] = function(keys) {
    var add = function(p, _, c) {
        return p + c;
    };

    var h = api.moriFrom(keys);
    return function() {
        mori.reduceKV(add, 0, h);
    };
};

module.exports.benchmarks['Immutable'] = function(keys) {
    var add = function(p, c) {
        return p + c;
    };

    var h = api.immutableFrom(keys);
    return function() {
        h.reduce(add, 0);
    };
};
