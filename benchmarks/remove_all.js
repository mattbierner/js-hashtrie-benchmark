"use strict";
var ht = require('hashtrie');
var hamt = require('hamt');
var hamt_plus = require('hamt_plus');
var mori = require('mori');
var immutable = require('immutable');

var api = require('../shared');

module.exports = {
    name: 'Remove N',
    description: "Cost to removed all entries from a map of size `n`.",
    sizes: [10, 100, 1000, 10000],
    benchmarks: {}
};

module.exports.benchmarks['Native Object'] = function(keys, order) {
  var h = api.nativeObjectFrom(keys);
  return function() {
    var c = h;
    for(var i = 0, len = order.length; i < len; ++i) {
      c = Object.assign({}, c);
      delete c[order[i]];
    }
  };
};

module.exports.benchmarks['Native Map'] = function(keys, order) {
  var h = api.nativeMapFrom(keys);
  return function() {
    var c = h;
    for(var i = 0, len = order.length; i < len; ++i) {
      c = new Map(c);
      c.delete(order[i]);
    }
  };
};

module.exports.benchmarks['Hashtrie'] = function(keys, order) {
    var h = api.hashtrieFrom(keys);
    return function() {
        var c = h;
        for (var i = 0, len = order.length; i < len; ++i)
            c = ht.remove(keys[order[i]], c);
    };
};

module.exports.benchmarks['Hamt'] = function(keys, order) {
    var h = api.hamtFrom(keys);
    return function() {
        var c = h;
        for (var i = 0, len = order.length; i < len; ++i)
            c = hamt.remove(keys[order[i]], c);
    };
};

module.exports.benchmarks['Hamt+'] = function(keys, order) {
    var h = api.hamtPlusFrom(keys);
    return function() {
        var c = h;
        for (var i = 0, len = order.length; i < len; ++i)
            c = hamt_plus.remove(keys[order[i]], c);
    };
};

module.exports.benchmarks['Mori'] = function(keys, order) {
    var h = api.moriFrom(keys);
    return function() {
        var c = h;
        for (var i = 0, len = order.length; i < len; ++i)
           c = mori.dissoc(c, keys[order[i]]);
    };
};

module.exports.benchmarks['Immutable'] = function(keys, order) {
    var h = api.immutableFrom(keys);
    return function() {
        var c = h;
        for (var i = 0, len = order.length; i < len; ++i)
           c = c.delete(keys[order[i]]);
    };
};
