"use strict";
var hamt = require('hamt');
var hamt_plus = require('hamt_plus');
var mori = require('mori');
var immutable = require('immutable');

var api = require('../shared');

module.benchmarks = {
    name: 'Remove N (transient)',
    description:
        "Cost to removed all entries from a hashtrie of size `n`.\n" +
        "Uses transient mutation if supported.",
    sizes: [10, 100, 1000, 10000],
    benchmarks: {}
};

module.exports.benchmarks['Native Assign'] = function(keys, order) {
    var h = api.nativeObjectFrom(keys);
    return function() {
        var c = Object.assign({}, h);
        for (var i = 0, len = order.length; i < len; ++i)
            delete c[order[i]];
        return c;
    };
};

module.exports.benchmarks['Native Map'] = function(keys, order) {
    var h = api.nativeMapFrom(keys);
    return function() {
        var c = new Map(h);
        for (var i = 0, len = order.length; i < len; ++i)
            c.delete(order[i]);
        return c;
    };
};

module.exports.benchmarks['Hamt'] = function(keys, order) {
    var h = api.hamtFrom(keys);
    return function() {
        var c = h;
        for (var i = 0, len = order.length; i < len; ++i)
            c = hamt.remove(keys[order[i]], c);
        return c;
    };
};

module.exports.benchmarks['Hamt+'] = function(keys, order) {
    var h = api.hamtPlusFrom(keys);
    return function() {
        var c = h.beginMutation();
        for (var i = 0, len = order.length; i < len; ++i)
            hamt_plus.remove(keys[order[i]], c);
        return c.endMutation();
    };
};

module.exports.benchmarks['Mori'] = function(keys, order) {
    var h = api.moriFrom(keys);
    return function() {
        var c = mori.mutable.thaw(h);
        for (var i = 0, len = order.length; i < len; ++i)
            c = mori.mutable.dissoc(c, keys[order[i]]);
        return mori.mutable.freeze(c);
    };
};

module.exports.benchmarks['Immutable'] = function(keys, order) {
    var h = api.immutableFrom(keys);
    return function() {
        var c = h.asMutable();
        for (var i = 0, len = order.length; i < len; ++i)
            c = c.delete(keys[order[i]]);
        return c.asImmutable();
    };
};
