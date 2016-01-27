"use strict";
const hamt = require('hamt');
const hamt_plus = require('hamt_plus');
const mori = require('mori');
const immutable = require('immutable');

const api = require('../shared');

module.exports = {
    name: 'Remove N (transient)',
    description:
        "Cost to removed all entries from a hashtrie of size `n`.\n" +
        "Uses transient mutation if supported.",
    sizes: [10, 100, 1000, 10000],
    benchmarks: {}
};

module.exports.benchmarks['Native Assign'] = (keys, order) => {
    const h = api.nativeObjectFrom(keys);
    return function() {
        const c = Object.assign({}, h);
        for (let i = 0, len = order.length; i < len; ++i)
            delete c[order[i]];
        return c;
    };
};

module.exports.benchmarks['Native Map'] = (keys, order) => {
    const h = api.nativeMapFrom(keys);
    return function() {
        const c = new Map(h);
        for (let i = 0, len = order.length; i < len; ++i)
            c.delete(order[i]);
        return c;
    };
};

module.exports.benchmarks['Hamt'] = (keys, order) => {
    const h = api.hamtFrom(keys);
    return function() {
        const c = h;
        for (let i = 0, len = order.length; i < len; ++i)
            c = hamt.remove(keys[order[i]], c);
        return c;
    };
};

module.exports.benchmarks['Hamt+'] = (keys, order) => {
    const h = api.hamtPlusFrom(keys);
    return function() {
        const c = h.beginMutation();
        for (let i = 0, len = order.length; i < len; ++i)
            hamt_plus.remove(keys[order[i]], c);
        return c.endMutation();
    };
};

module.exports.benchmarks['Mori'] = (keys, order) => {
    const h = api.moriFrom(keys);
    return function() {
        const c = mori.mutable.thaw(h);
        for (let i = 0, len = order.length; i < len; ++i)
            c = mori.mutable.dissoc(c, keys[order[i]]);
        return mori.mutable.freeze(c);
    };
};

module.exports.benchmarks['Immutable'] = (keys, order) => {
    const h = api.immutableFrom(keys);
    return function() {
        const c = h.asMutable();
        for (let i = 0, len = order.length; i < len; ++i)
            c = c.delete(keys[order[i]]);
        return c.asImmutable();
    };
};
