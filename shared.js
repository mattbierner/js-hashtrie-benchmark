var ht = require('hashtrie');
var hamt = require('hamt');
var hamt_plus = require('hamt_plus');
var mori = require('mori');
var immutable = require('immutable');

exports.nativeObjectFrom = function(keys) {
    return keys.reduce(function(map, val, index) {
        map[val] = index;
        return map;
    }, {});
}

exports.nativeMapFrom = function(keys) {
    return keys.reduce(function(map, val, index) {
        map.set(val, index);
        return map;
    }, new Map());
}

exports.hamtFrom = function(keys) {
    var h = hamt.empty;
    for (var i = 0; i < keys.length; ++i)
        h = h.set(keys[i], i);
    return h;
};

exports.hamtPlusFrom = function(keys) {
    var h = hamt_plus.empty;
    for (var i = 0; i < keys.length; ++i)
        h = h.set(keys[i], i);
    return h;
};

exports.hashtrieFrom = function(keys) {
    var h = ht.empty;
    for (var i = 0; i < keys.length; ++i)
        h = h.set(keys[i], i);
    return h;
};

exports.moriFrom = function(keys) {
    var h = mori.hashMap();
    for (var i = 0; i < keys.length; ++i)
        h = mori.assoc(h, keys[i], i);
    return h;
};

exports.immutableFrom = function(keys) {
    var h = immutable.Map();
    for (var i = 0; i < keys.length; ++i)
        h = h.set(keys[i], i);
    return h;
};
