/**
 * @fileOverview Cost to put `n` entries into the hash.
 */
var Benchmark = require('benchmark');

var ht = require('hashtrie');
var hamt = require('hamt');
var hamt_plus = require('hamt_plus');
var p = require('persistent-hash-trie');
var mori = require('mori');
var immutable = require('immutable');

var words = require('./words').words;


var hashtriePutAll = function(keys) {
    return function() {
        var h = ht.empty;
        for (var i = 0, len = keys.length; i < len; ++i)
            h = ht.set(i, keys[i], h);
    };
};

var hamtPutAll = function(keys) {
    return function() {
        var h = hamt.empty;
        for (var i = 0, len = keys.length; i < len; ++i)
            h = hamt.set(keys[i], i, h);
    };
};

var hamtPlusPutAll = function(keys) {
    return function() {
        var h = hamt_plus.make();
        for (var i = 0, len = keys.length; i < len; ++i)
            h = hamt_plus.set(keys[i], i, h);
    };
};

var pHashtriePutAll = function(keys) {
    return function() {
        var h = p.Trie();
        for (var i = 0, len = keys.length; i < len; ++i)
            h = p.assoc(h, keys[i], i);
    };
};

var moriPutAll = function(keys) {
    return function() {
        var h = mori.hashMap();
        for (var i = 0, len = keys.length; i < len; ++i)
            h = mori.assoc(h, keys[i], i);
    };
};

var immutablePutAll = function(keys) {
    return function() {
        var h = immutable.Map();
        for (var i = 0, len = keys.length; i < len; ++i)
            h = h.set(keys[i], i);
    };
};


module.exports = function(sizes) {
    return sizes.reduce(function(b,size) {
        var keys = words(size, 10);
        return b
            .add('hashtrie(' + size + ')',
                hashtriePutAll(keys))
            
            .add('hamt(' + size + ')',
                hamtPutAll(keys))
            
             .add('hamt_plus(' + size + ')',
                hamtPlusPutAll(keys))
            
            .add('persistent-hash-trie(' + size + ')',
                pHashtriePutAll(keys))
            
            .add('mori hash_map(' + size + ')',
                moriPutAll(keys))
            
            .add('immutable(' + size + ')',
                immutablePutAll(keys));

    }, new Benchmark.Suite('Put All'));
};