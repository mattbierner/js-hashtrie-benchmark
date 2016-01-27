"use strict";
var ht = require('hashtrie');
var hamt = require('hamt');
var hamt_plus = require('hamt_plus');
var p = require('persistent-hash-trie');
var mori = require('mori');
var immutable = require('immutable');

var api = require('../shared');

module.exports = {
    name: 'Get Nth',
    description: "Cost to get the `nth` entry in a map of size `n`.",
    sizes: [10, 100, 1000, 10000, 100000],
    benchmarks: {},
};

module.exports.benchmarks['Native Object'] =function(keys) {
    var h = api.nativeObjectFrom(keys);
    return function() {
        var key = keys[Math.floor(Math.random() * keys.length)];
        h[key];
    };
};

module.exports.benchmarks['Native Map'] = function(keys) {
    var h = api.nativeMapFrom(keys);
    return function() {
        var key = keys[Math.floor(Math.random() * keys.length)];
        h.get(key);
    };
};

module.exports.benchmarks['Hashtrie'] =function(keys) {
    var h = api.hashtrieFrom(keys);
    return function() {
        var key = keys[Math.floor(Math.random() * keys.length)];
        ht.get(key, h);
    };
};

module.exports.benchmarks['Hamt'] =function(keys) {
    var h = api.hamtFrom(keys);
    return function() {
        var key = keys[Math.floor(Math.random() * keys.length)];
        hamt.get(key, h);
    };
};

module.exports.benchmarks['Hamt+'] =function(keys) {
    var h = api.hamtPlusFrom(keys);
    return function() {
        var key = keys[Math.floor(Math.random() * keys.length)];
        hamt_plus.get(key, h);
    };
};

module.exports.benchmarks['Mori'] =function(keys) {
    var h = api.moriFrom(keys);
    return function() {
        var key = keys[Math.floor(Math.random() * keys.length)];
        mori.get(h, key);
    };
};

module.exports.benchmarks['Immutable'] = function(keys) {
    var h = api.immutableFrom(keys);
    return function() {
        var key = keys[Math.floor(Math.random() * keys.length)];
        h.get(key);
    };
};
