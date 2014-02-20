/**
 * @fileOverview Cost to get the `nth` entry in a hash of size `n`.
 */
var Benchmark = require('benchmark');

var ht = require('hashtrie');
var hamt = require('hamt');
var p = require('persistent-hash-trie');
var mori = require('mori');

var words = require('./words').words;



var hashtrieGet = function(keys) {
    var h = ht.empty;
    for (var i = keys.length - 1; i >= 0; --i)
        h = ht.set(keys[i], i, h);
    
    return function() {
        var key = keys[Math.floor(Math.random() * keys.length)];
        ht.get(key, h);
    };
};

var hamtGet = function(keys) {
    var h = hamt.empty;
    for (var i = keys.length - 1; i >= 0; --i)
        h = hamt.set(keys[i], i, h);
    
    return function() {
        var key = keys[Math.floor(Math.random() * keys.length)];
        hamt.get(key, h);
    };
};


var pHashtrieGet = function(keys) {
    var h = p.Trie();
    for (var i = keys.length - 1; i >= 0; --i)
        h = p.assoc(h, keys[i], i);
    
    return function() {
        var key = keys[Math.floor(Math.random() * keys.length)];
        p.get(h, key);
    };
};

var moriGet = function(keys) {
    var h = mori.hash_map();
    for (var i = keys.length - 1; i >= 0; --i)
        h = mori.assoc(h, keys[i], i);
    
    return function() {
        var key = keys[Math.floor(Math.random() * keys.length)];
        mori.get(h, key);
    };
};



module.exports = function(sizes) {
    return sizes.reduce(function(b,size) {
        var keys = words(size, 10);
        return b
            .add('hashtrie(' + size+ ')',
                hashtrieGet(keys))
            
            .add('hamt(' + size+ ')',
                hamtGet(keys))
            
            .add('persistent-hash-trie(' + size+ ')',
                pHashtrieGet(keys))
        
            .add('mori hash_map(' + size+ ')',
                moriGet(keys));
            
    }, new Benchmark.Suite('Get nth'));
};