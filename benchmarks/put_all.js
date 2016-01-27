"use strict";
var ht = require('hashtrie');
var hamt = require('hamt');
var hamt_plus = require('hamt_plus');
var mori = require('mori');
var immutable = require('immutable');

module.benchmarks = {
    name: 'Put N',
    description: "Cost to put `n` entries into a map.",
    sizes: [10, 100, 1000, 10000],
    benchmarks: {}
};

module.exports.benchmarks['Native Object'] = function(keys) {
    return function() {
        var h = {};
        for (var i = 0, len = keys.length; i < len; ++i) {
            h = Object.assign({}, h);
            h[keys[i]] = i;
        }
    };
};

module.exports.benchmarks['Native Map'] = function(keys) {
    return function() {
        var h = new Map();
        for (var i = 0, len = keys.length; i < len; ++i) {
            h = new Map(h);
            h.set(keys[i], i);
        }
    };
};

module.exports.benchmarks['Hashtrie'] = function(keys) {
    return function() {
        var h = ht.empty;
        for (var i = 0, len = keys.length; i < len; ++i)
            h = ht.set(i, keys[i], h);
    };
};

module.exports.benchmarks['Hamt'] = function(keys) {
    return function() {
        var h = hamt.empty;
        for (var i = 0, len = keys.length; i < len; ++i)
            h = hamt.set(keys[i], i, h);
    };
};

module.exports.benchmarks['Hamt+'] = function(keys) {
    return function() {
        var h = hamt_plus.make();
        for (var i = 0, len = keys.length; i < len; ++i)
            h = hamt_plus.set(keys[i], i, h);
    };
};

module.exports.benchmarks['Mori'] = function(keys) {
    return function() {
        var h = mori.hashMap();
        for (var i = 0, len = keys.length; i < len; ++i)
            h = mori.assoc(h, keys[i], i);
    };
};

module.exports.benchmarks['Immutable'] = function(keys) {
    return function() {
        var h = immutable.Map();
        for (var i = 0, len = keys.length; i < len; ++i)
            h = h.set(keys[i], i);
    };
};
