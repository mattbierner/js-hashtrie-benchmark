/**
 * @fileOverview Cost to put `n` entries into the hash.
 */
var Benchmark = require('benchmark');

var ht = require('hashtrie');
var hamt = require('hamt');
var p = require('persistent-hash-trie');

var words = require('./words').words;


var hashtriePutAll = function(keys) {
    return function() {
        var h = ht.empty;
        for (var i = 0, len = keys.length; i < len; ++i)
            h = ht.set(keys[i], i, h);
    }
};

var hamtPutAll = function(keys) {
    return function() {
        var h = hamt.empty;
        for (var i = 0, len = keys.length; i < len; ++i)
            h = hamt.set(keys[i], i, h);
    }
};

var pHashtriePutAll = function(keys) {
    return function() {
        var h = p.Trie();
        for (var i = 0, len = keys.length; i < len; ++i)
            h = p.assoc(h, keys[i], i);
    }
};


module.exports = function(sizes) {
    return sizes.reduce(function(b,size) {
        var keys = words(size, 10);
        return b
            .add('hashtrie(' + size+ ')',
                hashtriePutAll(keys))
            
            .add('hamt(' + size+ ')',
                hamtPutAll(keys))
            
            .add('persistent-hash-trie(' + size+ ')',
                pHashtriePutAll(keys));
            
    }, new Benchmark.Suite('Put All'));
};