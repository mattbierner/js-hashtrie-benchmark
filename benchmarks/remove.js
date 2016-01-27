/**
 * @fileOverview Cost to remove entry from hash of size `n`.
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

var nativeObjectRemove = function(keys) {
    var h = api.nativeObjectFrom(keys);
    return function() {
        var key = keys[Math.floor(Math.random() * keys.length)];
        var c = Object.assign({}, h);
        delete c[key];
    };
};

var nativeMapRemove = function(keys) {
    var h = api.nativeMapFrom(keys);
    return function() {
        var key = keys[Math.floor(Math.random() * keys.length)];
        var c = new Map(h);
        c.delete(key);
    };
};

var hashtrieRemove = function(keys) {
    var h = api.hashtrieFrom(keys);
    return function() {
        var key = keys[Math.floor(Math.random() * keys.length)];
        ht.remove(key, h);
    };
};

var hamtRemove = function(keys) {
    var h = api.hamtFrom(keys);
    return function() {
        var key = keys[Math.floor(Math.random() * keys.length)];
        hamt.remove(key, h);
    };
};

var hamtPlusRemove = function(keys) {
    var h = api.hamtPlusFrom(keys);
    return function() {
        var key = keys[Math.floor(Math.random() * keys.length)];
        hamt_plus.remove(key, h);
    };
};

var pHashtrieRemove = function(keys) {
    var h = api.pHashtrieFrom(keys);
    return function() {
        var key = keys[Math.floor(Math.random() * keys.length)];
        p.dissoc(h, key);
    };
};

var moriRemove = function(keys) {
    var h = api.moriFrom(keys);
    return function() {
        var key = keys[Math.floor(Math.random() * keys.length)];
        mori.dissoc(h, key);
    };
};

var immutableRemove = function(keys) {
    var h = api.immutableFrom(keys);
    return function() {
        var key = keys[Math.floor(Math.random() * keys.length)];
        h.delete(key);
    };
};


module.exports = function(sizes) {
    return sizes.reduce(function(b, size) {
        var keys = words(size, 10);
        return b
            .add('nativeObject(' + size + ')',
                nativeObjectRemove(keys))

        .add('nativeMap(' + size + ')',
            nativeMapRemove(keys))

        .add('hashtrie(' + size + ')',
            hashtrieRemove(keys))

        .add('hamt(' + size + ')',
            hamtRemove(keys))

        .add('hamt+(' + size + ')',
            hamtPlusRemove(keys))

        .add('persistent-hash-trie(' + size + ')',
            pHashtrieRemove(keys))

        .add('mori hash_map(' + size + ')',
            moriRemove(keys))

        .add('immutable(' + size + ')',
            immutableRemove(keys));;

    }, new Benchmark.Suite('remove nth'));
};
