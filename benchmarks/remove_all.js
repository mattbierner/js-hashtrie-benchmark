/**
 * @fileOverview Cost to removed all entries from a hashtrie of size `n`.
 */
var Benchmark = require('benchmark');

var ht = require('hashtrie');
var hamt = require('hamt');
var hamt_plus = require('hamt_plus');
var p = require('persistent-hash-trie');
var mori = require('mori');
var immutable = require('immutable');

var words = require('./words').words;
var range = require('./words').range;
var api = require('./shared');

var nativeObjectRemoveAll = function(keys, order) {
  var h = api.nativeObjectFrom(keys);
  return function() {
    c = {};
    for( var k in h ) {
      if ( h.hasOwnProperty( k ) && order.indexOf( k ) === -1 ) {
        c[k] = h[k];
      }
    }
  };
};

var nativeMapRemoveAll = function(keys, order) {
  var h = api.nativeMapFrom(keys);
  return function() {
    c = new Map();
    h.forEach( function( val, key ) {
      if ( order.indexOf( key ) === -1  ) {
        c.set( key, val );
      }
    } );
  };
};

var hashtrieRemoveAll = function(keys, order) {
    var h = api.hashtrieFrom(keys);
    return function() {
        var c = h;
        for (var i = 0, len = order.length; i < len; ++i)
            c = ht.remove(keys[order[i]], c);
    };
};

var hamtRemoveAll = function(keys, order) {
    var h = api.hamtFrom(keys);
    return function() {
        var c = h;
        for (var i = 0, len = order.length; i < len; ++i)
            c = hamt.remove(keys[order[i]], c);
    };
};

var hamtPlusRemoveAll = function(keys, order) {
    var h = api.hamtPlusFrom(keys);
    return function() {
        var c = h;
        for (var i = 0, len = order.length; i < len; ++i)
            c = hamt_plus.remove(keys[order[i]], c);
    };
};

var pHashtrieRemoveAll = function(keys, order) {
    var h = api.pHashtrieFrom(keys);
    return function() {
        var c = h;
        for (var i = 0, len = order.length; i < len; ++i)
           c = p.dissoc(c, keys[order[i]]);
    };
};

var moriRemoveAll = function(keys, order) {
    var h = api.moriFrom(keys);
    return function() {
        var c = h;
        for (var i = 0, len = order.length; i < len; ++i)
           c = mori.dissoc(c, keys[order[i]]);
    };
};

var immutableRemoveAll = function(keys, order) {
    var h = api.immutableFrom(keys);
    return function() {
        var c = h;
        for (var i = 0, len = order.length; i < len; ++i)
           c = c.delete(keys[order[i]]);
    };
};


module.exports = function(sizes) {
    return sizes.reduce(function(b,size) {
        var keys = words(size, 10),
            order = range(0, size);
        return b
            .add('nativeObject(' + size + ')',
                nativeObjectRemoveAll(keys, order))

            .add('nativeMap(' + size + ')',
                nativeMapRemoveAll(keys, order))

            .add('hashtrie(' + size + ')',
                hashtrieRemoveAll(keys, order))

            .add('hamt(' + size + ')',
                hamtRemoveAll(keys, order))

            .add('hamt_plus(' + size + ')',
                hamtPlusRemoveAll(keys, order))

            .add('persistent-hash-trie(' + size + ')',
                pHashtrieRemoveAll(keys, order))

            .add('mori hash_map(' + size + ')',
                moriRemoveAll(keys, order))

            .add('immutable(' + size + ')',
                immutableRemoveAll(keys, order));

    }, new Benchmark.Suite('Remove All'));
};
