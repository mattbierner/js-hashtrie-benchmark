/**
 * @fileOverview Cost to keys map of size `n`.
 */
var Benchmark = require('benchmark');

var ht = require('hashtrie');
var hamt = require('hamt');
var p = require('persistent-hash-trie');
var mori = require('mori');

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
    
    return function() {
        // I believe this is the closest translation
        mori.into_array(mori.keys(h));
    };
};

var immutable = function(keys) {
    var h = mori.hash_map();
    for (var i = keys.length - 1; i >= 0; --i)
        h = mori.assoc(h, keys[i], i);
    
    return function() {
        // I believe this is the closest translation
        mori.into_array(mori.keys(h));
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
                moriKeys(keys));
            
    }, new Benchmark.Suite('Keys'));
};