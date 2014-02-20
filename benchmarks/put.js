/**
 * @fileOverview Cost to put the `nth` entry into a hash of size `n - 1`.
 */
var Benchmark = require('benchmark');

var ht = require('hashtrie');
var hamt = require('hamt');
var p = require('persistent-hash-trie');
var mori = require('mori');

var words = require('./words').words;



var hashtriePut = function(keys) {
    var h = ht.empty;
    for (var i = keys.length - 1; i; --i)
        h = ht.set(keys[i], i, h);
    
    var key = keys[0];
    return function() {
        ht.set(key, 0, h);
    };
};

var hamtPut = function(keys) {
    var h = hamt.empty;
    for (var i = keys.length - 1; i; --i)
        h = hamt.set(keys[i], i, h);
    
    var key = keys[0];
    return function() {
        hamt.set(key, 0, h);
    };
};

var pHashtriePut = function(keys) {
    var h = p.Trie();
    for (var i = keys.length - 1; i; --i)
        h = p.assoc(h, keys[i], i);
    
    var key = keys[0];
    return function() {
        p.assoc(h, key, 0);
    };
};

var moriPut = function(keys) {
    var h = mori.hash_map();
    for (var i = keys.length - 1; i; --i)
        h = mori.assoc(h, keys[i], i);
    
    var key = keys[0];
    return function() {
        mori.assoc(h, key, 0);
    };
};


module.exports = function(sizes) {
    return sizes.reduce(function(b,size) {
        var keys = words(size, 10);
        return b
            .add('hashtrie(' + size+ ')',
                hashtriePut(keys))
            
            .add('hamt(' + size+ ')',
                hamtPut(keys))
            
            .add('persistent-hash-trie(' + size+ ')',
                pHashtriePut(keys))
                
            .add('mori hash_map(' + size+ ')',
                moriPut(keys));
            
    }, new Benchmark.Suite('put nth'));
};