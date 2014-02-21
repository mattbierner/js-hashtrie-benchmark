var Benchmark = require('benchmark');

var pad = require('pad');


var log = function() {
    console.log(this.name);
    this.map(function(results){
        console.log(pad(results.name, 30) + ': ' +
            pad(15, results.hz.toFixed(2)) + ' +/- ' + results.stats.rme.toFixed(2) + '% op/s');
    });
    console.log('\n');
};


require('./benchmarks/get')([10, 100, 1000, 10000, 100000])
    .on('complete', log)
    .run(true);

require('./benchmarks/put')([10, 100, 1000, 10000, 100000])
    .on('complete', log)
    .run(true);

require('./benchmarks/put_all')([10, 100, 1000, 10000])
    .on('complete', log)
    .run(true);

require('./benchmarks/remove')([10, 100, 1000, 10000, 100000])
    .on('complete', log)
    .run(true);

require('./benchmarks/remove_all')([10, 100, 1000, 10000])
    .on('complete', log)
    .run(true);

require('./benchmarks/count')([10, 100, 1000, 10000])
    .on('complete', log)
    .run(true);

require('./benchmarks/sum')([10, 100, 1000, 10000])
    .on('complete', log)
    .run(true);

require('./benchmarks/keys')([10, 100, 1000, 10000])
    .on('complete', log)
    .run(true);
