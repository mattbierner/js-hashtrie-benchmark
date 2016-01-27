"use strict";
const Benchmark = require('benchmark');
const pad = require('pad');

var log = function() {
    console.log(this.name);
    this.map(function(results){
        console.log(pad(results.name, 30) + ': ' +
            pad(15, results.hz.toFixed(2)) + ' +/- ' + results.stats.rme.toFixed(2) + '% op/s');
    });
    console.log('\n');
};

var run = (path, sizes) =>
    require(path)(sizes)
        .on('complete', log)
        .run(true);

run('./benchmarks/get', [10, 100, 1000, 10000, 100000]);
run('./benchmarks/put', [10, 100, 1000, 10000, 100000]);
run('./benchmarks/put_all', [10, 100, 1000, 10000]);
run('./benchmarks/put_all_transient', [10, 100, 1000, 10000]);
run('./benchmarks/remove', [10, 100, 1000, 10000, 100000]);
run('./benchmarks/remove_all', [10, 100, 1000, 10000]);
run('./benchmarks/remove_all_transient', [10, 100, 1000, 10000]);
run('./benchmarks/count', [10, 100, 1000, 10000]);
run('./benchmarks/sum', [10, 100, 1000, 10000]);
run('./benchmarks/keys', [10, 100, 1000, 10000]);
