"use strict";
var ht = require('hashtrie');
var hamt = require('hamt');
var hamt_plus = require('hamt_plus');
var mori = require('mori');
var immutable = require('immutable');

var api = require('../shared');

module.benchmarks = {
    name: 'Keys',
    description: "Cost to keys as JS array from map of size `n`.",
    sizes: [10, 100, 1000, 10000],
    benchmarks: {}
};

module.exports.benchmarks['Native Object'] = function(keys) {
    var h = api.nativeObjectFrom(keys);
    return function() {
        Object.keys(h);
    };
};

module.exports.benchmarks['Native Map'] = function(keys) {
    var h = api.nativeMapFrom(keys);
    return function() {
        Array.from(h.keys());
    };
};

module.exports.benchmarks['Hashtrie'] = function(keys) {
    var h = api.hashtrieFrom(keys);
    return function() {
        ht.keys(h);
    };
};

module.exports.benchmarks['Hamt'] = function(keys) {
    var h = api.hamtFrom(keys);
    return function() {
        Array.from(hamt.keys(h));
    };
};

const build = (p, _, k) => {
    p.push(k);
    return p;
};
module.exports.benchmarks['Hamt fold'] = function(keys) {
    var h = api.hamtFrom(keys);
    return function() {
        hamt.fold(build, [], h);
    };
};

module.exports.benchmarks['Hamt+'] = function(keys) {
    var h = api.hamtPlusFrom(keys);
    return function() {
        Array.from(hamt_plus.keys(h));
    };
};

module.exports.benchmarks['Hamt+ fold'] = function(keys) {
    var h = api.hamtPlusFrom(keys);
    return function() {
        hamt.fold(build, [], h);
    };
};

module.exports.benchmarks['Mori'] = function(keys) {
    var h = api.moriFrom(keys);
    return function() {
        mori.intoArray(mori.keys(h));
    };
};

module.exports.benchmarks['Immutable'] = function(keys) {
    var h = api.immutableFrom(keys);
    return function() {
        h.keySeq().toArray();
    };
};
