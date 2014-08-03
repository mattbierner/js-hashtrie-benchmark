/**
 * @fileOverview Cost to sum values in map of size `n`.
 */
var Benchmark = require('benchmark');

var ht = require('hashtrie');
var hamt = require('hamt');
var p = require('persistent-hash-trie');
var mori = require('mori');
var immutable = require('immutable');

var words = require('./words').words;


var hashtrieKeys = function(keys) {
    var add = function(p, c) { return p + c.value; };
    
    var h = ht.empty;
    for (var i = 0; i < keys.length; ++i)
        h = ht.set(keys[i], i, h);
    
    return function() {
        ht.fold(add, 0, h);
    };
};

var hamtKeys = function(keys) {
    var add = function(p, c) { return p + c.value; };
    
    var h = hamt.empty;
    for (var i = 0; i < keys.length; ++i)
        h = hamt.set(keys[i], i, h);
    
    return function() {
        hamt.fold(add, 0, h);
    };
};


var pHashtrieKeys = function(keys) {
    var add = function(p, c) { return p + c; };

    var h = p.Trie();
    for (var i = 0; i < keys.length; ++i)
        h = p.assoc(h, keys[i], i);
    
    return function() {
        p.reduce(h, add, 0);
    };
};

var moriKeys = function(keys) {
    var add = function(p, _, c) { return p + c; };
    
    var h = mori.hash_map();
    for (var i = 0; i < keys.length; ++i)
        h = mori.assoc(h, keys[i], i);
    
    return function() {
        mori.reduce_kv(add, 0, h);
    };
};

var immutableKeys = function(keys) {
    var add = function(p, c) { return p + c; };
    
    var h = immutable.Map();
    for (var i = 0; i < keys.length; ++i)
        h = h.set(keys[i], i);
    
    return function() {
        h.reduce(add, 0);
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
                
            .add('immutable(' + size + ')',
                immutableKeys(keys));
          
    }, new Benchmark.Suite('Sum'));
};