/**
 * @fileOverview Cost to keys as JS array from map of size `n`.
 */
var Benchmark = require('benchmark');

var ht = require('hashtrie');
var hamt = require('hamt');
var p = require('persistent-hash-trie');
var mori = require('mori');
var immutable = require('immutable');

var words = require('./words').words;


var hashtrieKeys = function(keys) {
    var h = ht.empty;
    for (var i = keys.length - 1; i >= 0; --i)
        h = ht.set(keys[i], i, h);
    
    return function() {
        ht.keys(h);
    };
};

var hamtKeys = function(keys) {
    var h = hamt.empty;
    for (var i = keys.length - 1; i >= 0; --i)
        h = hamt.set(keys[i], i, h);
    
    return function() {
        hamt.keys(h);
    };
};


var pHashtrieKeys = function(keys) {
    var h = p.Trie();
    for (var i = keys.length - 1; i >= 0; --i)
        h = p.assoc(h, keys[i], i);
    
    return function() {
        p.keys(h);
    };
};

var moriKeys = function(keys) {
    var h = mori.hash_map();
    for (var i = keys.length - 1; i >= 0; --i)
        h = mori.assoc(h, keys[i], i);
    
    // I believe this is the closest translation
    return function() {
        mori.into_array(mori.keys(h));
    };
};

var immutableKeys = function(keys) {
    var h = immutable.Map();
    for (var i = keys.length - 1; i >= 0; --i)
        h = h.set(keys[i], i);
    
    // I believe this is the closest translation, but documentation unclear
    // on what passed and returned by fn.
    var keys = function key(k, v) { return k; };
    return function() {
        h.map(keys).toArray();
    };
};


module.exports = function(sizes) {
    return sizes.reduce(function(b,size) {
        var keys = words(size, 10);
        return b
            .add('hashtrie(' + size+ ')',
                hashtrieKeys(keys))
            
            .add('hamt(' + size+ ')',
                hamtKeys(keys))
            
            .add('persistent-hash-trie(' + size+ ')',
                pHashtrieKeys(keys))
        
            .add('mori hash_map(' + size+ ')',
                moriKeys(keys))
            
            .add('immutable(' + size+ ')',
                immutableKeys(keys));
            
            
    }, new Benchmark.Suite('Keys'));
};