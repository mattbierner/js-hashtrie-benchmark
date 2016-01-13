/**
 * @fileOverview Cost to put `n` entries into the hash.
 *
 * Uses transiently mutable object interface if possible
 */
var Benchmark = require('benchmark');

var ht = require('hashtrie');
var hamt = require('hamt');
var hamt_plus = require('hamt_plus');
var mori = require('mori');
var immutable = require('immutable');

var words = require('./words').words;

var nativeObjectPutAll = function(keys){
  return function() {
    var h = {};
    for(var i = 0, len = keys.length; i < len; ++i) {
      h[keys[i]] = i;
    }
  };
};

var nativeMapPutAll = function(keys) {
  return function() {
    var h = new Map();
    for(var i = 0, len = keys.length; i < len; ++i) {
      h.set(keys[i], i);
    }
  };
}

var hamtPutAll = function(keys) {
    return function() {
        var h = hamt.empty;
        for (var i = 0, len = keys.length; i < len; ++i)
            h = hamt.set(i, keys[i], h);
    };
};

var hamtPlusPutAll = function(keys) {
    var mutation = function(h) {
        for (var i = 0, len = keys.length; i < len; ++i)
            hamt_plus.set(keys[i], i, h);
    };
    return function() {
        var h = hamt_plus.make();
        hamt_plus.mutate(mutation, h);
        return h;
    };
};

var moriPutAll = function(keys) {
    return function() {
        var h = mori.mutable.thaw(mori.hashMap());
        for (var i = 0, len = keys.length; i < len; ++i)
            h = mori.mutable.assoc(h, keys[i], i);
        h = mori.mutable.freeze(h);
    };
};

var immutablePutAll = function(keys) {
    return function() {
        var h = immutable.Map().asMutable();
        for (var i = 0, len = keys.length; i < len; ++i)
            h = h.set(keys[i], i);
        h = h.asImmutable();
    };
};


module.exports = function(sizes) {
    return sizes.reduce(function(b,size) {
        var keys = words(size, 10);
        return b
            .add('nativeObject(' + size + ')',
                nativeObjectPutAll(keys))

            .add('nativeMap(' + size + ')',
                nativeMapPutAll(keys))

            .add('hamt(' + size + ')',
                hamtPutAll(keys))

            .add('hamt_plus(' + size + ')',
                hamtPlusPutAll(keys))

            .add('mori hash_map(' + size + ')',
                moriPutAll(keys))

            .add('immutable(' + size + ')',
                immutablePutAll(keys));

    }, new Benchmark.Suite('Put All (transient)'));
};
