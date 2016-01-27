 "use strict";
var ht = require('hashtrie');
var hamt = require('hamt');
var hamt_plus = require('hamt_plus');
var mori = require('mori');
var immutable = require('immutable');

var api = require('../shared');

module.exports = {
    name: 'Put Nth',
    description: "Cost to put the `nth` entry into a map of size `n - 1`.",
    sizes: [10, 100, 1000, 10000, 100000],
    benchmarks: {}
};

module.exports.benchmarks['Native Object'] = function(keys) {
    var h = api.nativeObjectFrom(keys.slice(1));
    var key = keys[0];
    return function() {
        var newKey = {};
        newKey[key] = 0;
        Object.assign({}, h, newKey);
    };
};

module.exports.benchmarks['Native Map'] = function(keys) {
    var h = api.nativeMapFrom(keys.slice(1));
    var key = keys[0];
    return function() {
        c = new Map(h);
        c.set(key, 0);
    };
};

module.exports.benchmarks['Hashtrie'] = function(keys) {
    var h = api.hashtrieFrom(keys.slice(1));
    var key = keys[0];
    return function() {
        ht.set(0, key, h);
    };
};

module.exports.benchmarks['Hamt'] = function(keys) {
    var h = api.hamtFrom(keys.slice(1));
    var key = keys[0];
    return function() {
        hamt.set(key, 0, h);
    };
};

module.exports.benchmarks['Hamt+'] =  function(keys) {
    var h = api.hamtPlusFrom(keys.slice(1));
    var key = keys[0];
    return function() {
        hamt_plus.set(key, 0, h);
    };
};

module.exports.benchmarks['Mori'] = function(keys) {
    var h = api.moriFrom(keys.slice(1));
    var key = keys[0];
    return function() {
        mori.assoc(h, key, 0);
    };
};

module.exports.benchmarks['Immutable'] = function(keys) {
    var h = api.immutableFrom(keys.slice(1));
    var key = keys[0];
    return function() {
        h.set(key, 0);
    };
};
