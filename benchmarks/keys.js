/**
 * @fileOverview Cost to keys as JS array from map of size `n`.
 */
var Benchmark = require('benchmark');

var ht = require('hashtrie');
var hamt = require('hamt');
var hamt_plus = require('hamt_plus');
var p = require('persistent-hash-trie');
var mori = require('mori');
var immutable = require('immutable');

var words = require('./words').words;
var api = require('./shared');


var hashtrieKeys = function(keys) {
    var h = api.hashtrieFrom(keys);
    return function() {
        ht.keys(h);
    };
};

var hamtKeys = function(keys) {
    var h = api.hamtFrom(keys);
    return function() {
        Array.from(hamt.keys(h));
    };
};

var hamtPlusKeys = function(keys) {
    var h = api.hamtPlusFrom(keys);
    return function() {
        hamt_plus.keys(h);
    };
};

var pHashtrieKeys = function(keys) {
    var h = api.pHashtrieFrom(keys);
    return function() {
        p.keys(h);
    };
};

var moriKeys = function(keys) {
    var h = api.moriFrom(keys);
    // I believe this is the closest translation
    return function() {
        mori.intoArray(mori.keys(h));
    };
};

var immutableKeys = function(keys) {
    var h = api.immutableFrom(keys);
    return function() {
        h.keySeq().toArray();
    };
};


module.exports = function(sizes) {
    return sizes.reduce(function(b, size) {
        var keys = words(size, 10);
        return b
            .add('hashtrie(' + size + ')',
                hashtrieKeys(keys))
            
            .add('hamt(' + size + ')',
                hamtKeys(keys))
            
            .add('hamt_plus(' + size + ')',
                hamtPlusKeys(keys))
            
            .add('persistent-hash-trie(' + size + ')',
                pHashtrieKeys(keys))
        
            .add('mori hash_map(' + size + ')',
                moriKeys(keys))
            
            .add('immutable(' + size + ')',
                immutableKeys(keys));
            
            
    }, new Benchmark.Suite('Keys'));
};
