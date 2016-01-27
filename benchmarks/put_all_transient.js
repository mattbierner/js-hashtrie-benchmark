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

var nativeObjectPutAll = function(keys) {
    return function() {
        var h = {};
        for (var i = 0, len = keys.length; i < len; ++i)
            h[keys[i]] = i;
        return h;
    };
};

var nativeMapPutAll = function(keys) {
    return function() {
        var h = new Map();
        for (var i = 0, len = keys.length; i < len; ++i)
            h.set(keys[i], i);
        return h;
    };
}

var hamtPutAll = function(keys) {
    return function() {
        var h = hamt.empty;
        for (var i = 0, len = keys.length; i < len; ++i)
            h = hamt.set(i, keys[i], h);
        return h;
    };
};

var hamtPlusPutAll = function(keys) {
    return function() {
        var h = hamt_plus.make().beginMutation();
        for (var i = 0, len = keys.length; i < len; ++i)
            hamt_plus.set(keys[i], i, h);
        return h.endMutation();
    };
};

var moriPutAll = function(keys) {
    return function() {
        var h = mori.mutable.thaw(mori.hashMap());
        for (var i = 0, len = keys.length; i < len; ++i)
            mori.mutable.assoc(h, keys[i], i);
        return mori.mutable.freeze(h);
    };
};

var immutablePutAll = function(keys) {
    return function() {
        var h = immutable.Map().asMutable();
        for (var i = 0, len = keys.length; i < len; ++i)
            h.set(keys[i], i);
        return h.asImmutable();
    };
};


module.exports = function(sizes) {
    return sizes.reduce(function(b, size) {
        var keys = words(size, 10);
        return b
            .add('nativeObject(' + size + ')',
                nativeObjectPutAll(keys))

        .add('nativeMap(' + size + ')',
            nativeMapPutAll(keys))

        .add('hamt(' + size + ')',
            hamtPutAll(keys))

        .add('hamt+(' + size + ')',
            hamtPlusPutAll(keys))

        .add('mori hash_map(' + size + ')',
            moriPutAll(keys))

        .add('immutable(' + size + ')',
            immutablePutAll(keys));

    }, new Benchmark.Suite('Put All (transient)'));
};
