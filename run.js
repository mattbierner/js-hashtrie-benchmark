"use strict";
const Benchmark = require('benchmark');
const pad = require('pad');
var words = require('./words').words;

const log = function() {
    console.log(this.name);
    this.map(results => {
        console.log(pad(results.name, 30) + ': ' +
            pad(15, results.hz.toFixed(2)) + ' +/- ' + results.stats.rme.toFixed(2) + '% op/s');
    });
    console.log('\n');
};

const run = (path) => {
    const tests = require(path);
    const benchmark = tests.sizes.reduce((b, size) => {
        const keys = words(size, 10);
        return Object.keys(tests.benchmarks).reduce(
            (b, name) =>
                b.add(name + '(' + size + ')', tests.benchmarks[name](keys)),
            b);
    }, new Benchmark.Suite(tests.name));

    return benchmark
        .on('complete', log)
        .run(true);
};

run('./benchmarks/get');
run('./benchmarks/put');
run('./benchmarks/put_all');
run('./benchmarks/put_all_transient');
run('./benchmarks/remove');
run('./benchmarks/remove_all');
run('./benchmarks/remove_all_transient');
run('./benchmarks/count');
run('./benchmarks/sum');
run('./benchmarks/keys');
