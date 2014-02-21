/**
 * @fileOverview Cost to removed all entries from a hashtrie of size `n`.
 */
var Benchmark = require('benchmark');

var ht = require('hashtrie');
var hamt = require('hamt');
var p = require('persistent-hash-trie');
var mori = require('mori');

var words = require('./words').words;

var range = function(start, end) {
    var indicies = [], out = [];
    for (var i = start; i < end; ++i)
        indicies.push(i);
    while (indicies.length) {
        var index = Math.floor(Math.random() * indicies.length);
        out.push(indicies[index]);
        indicies.splice(index, 1);
    }
    return out;
};

var hashtrieRemoveAll = function(keys, order) {
    var h = ht.empty;
    for (var i = 0, len = keys.length; i < len; ++i)
        h = ht.set(keys[i], i, h);
    
    return function() {
        var c = h;
        for (var i = 0, len = order.length; i < len; ++i)
            c = ht.remove(keys[order[i]], c);
    };
};

var hamtRemoveAll = function(keys, order) {
    var h = hamt.empty;
    for (var i = 0, len = keys.length; i < len; ++i)
        h = hamt.set(keys[i], i, h);
    
    return function() {
        var c = h;
        for (var i = 0, len = order.length; i < len; ++i)
            c = hamt.remove(keys[order[i]], c);
    };
};

var pHashtrieRemoveAll = function(keys, order) {
    var h = p.Trie();
    for (var i = 0, len = keys.length; i < len; ++i)
        h = p.assoc(h, keys[i], i);
    
    return function() {
        var c = h;
        for (var i = 0, len = order.length; i < len; ++i)
           c = p.dissoc(c, keys[order[i]]);
    };
};

var moriRemoveAll = function(keys, order) {
    var h = mori.hash_map();
    for (var i = 0, len = keys.length; i < len; ++i)
        h = mori.assoc(h, keys[i], i);
    
    return function() {
        var c = h;
        for (var i = 0, len = order.length; i < len; ++i)
           c = mori.dissoc(c, keys[order[i]]);
    };
};



module.exports = function(sizes) {
    return sizes.reduce(function(b,size) {
        var keys = words(size, 10),
            order = range(0, size);
        return b
            .add('hashtrie(' + size+ ')',
                hashtrieRemoveAll(keys, order))
            
            .add('hamt(' + size+ ')',
                hamtRemoveAll(keys, order))
            
            .add('persistent-hash-trie(' + size+ ')',
                pHashtrieRemoveAll(keys, order))
                
            .add('mori hash_map(' + size+ ')',
                moriRemoveAll(keys, order));
            
    }, new Benchmark.Suite('Remove All'));
};