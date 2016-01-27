"use strict";
var ht = require('hashtrie');
var hamt = require('hamt');
var hamt_plus = require('hamt_plus');
var mori = require('mori');
var immutable = require('immutable');

var api = require('../shared');

module.exports = {
    name: 'Remove Nth',
    description: "Cost to remove entry from map of size `n`.",
    sizes: [10, 100, 1000, 10000, 100000],
    benchmarks: {}
};

module.exports.benchmarks['Native Object'] = function(keys) {
    var h = api.nativeObjectFrom(keys);
    return function() {
        var key = keys[Math.floor(Math.random() * keys.length)];
        var c = Object.assign({}, h);
        delete c[key];
    };
};

module.exports.benchmarks['Native Map'] = function(keys) {
    var h = api.nativeMapFrom(keys);
    return function() {
        var key = keys[Math.floor(Math.random() * keys.length)];
        var c = new Map(h);
        c.delete(key);
    };
};

module.exports.benchmarks['Hashtrie'] = function(keys) {
    var h = api.hashtrieFrom(keys);
    return function() {
        var key = keys[Math.floor(Math.random() * keys.length)];
        ht.remove(key, h);
    };
};

module.exports.benchmarks['Hamt'] = function(keys) {
    var h = api.hamtFrom(keys);
    return function() {
        var key = keys[Math.floor(Math.random() * keys.length)];
        hamt.remove(key, h);
    };
};

module.exports.benchmarks['Hamt+'] = function(keys) {
    var h = api.hamtPlusFrom(keys);
    return function() {
        var key = keys[Math.floor(Math.random() * keys.length)];
        hamt_plus.remove(key, h);
    };
};

module.exports.benchmarks['Mori'] = function(keys) {
    var h = api.moriFrom(keys);
    return function() {
        var key = keys[Math.floor(Math.random() * keys.length)];
        mori.dissoc(h, key);
    };
};

module.exports.benchmarks['Immutable'] = function(keys) {
    var h = api.immutableFrom(keys);
    return function() {
        var key = keys[Math.floor(Math.random() * keys.length)];
        h.delete(key);
    };
};
