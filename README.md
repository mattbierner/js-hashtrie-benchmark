Javascript Hash Trie Benchmarking

Benchmarks 5 Persistent Javascript hashtrie implementations:
* [hashtrie][hashtrie] - 0.2.x
* [hamt][hamt] -  0.1.x
* [persistent-hash-trie][persistent] - 0.4.x
* [mori][mori] - 0.2.x
* [immutable][immutable] - 2.0.x


### Usage

```
$ npm install
$ npm run benchmark
```


### Benchmarks
* Get entry in map of size N.
* Put entry in map of size N.
* Remove entry from map of size N.

* Put N entries into a map.
* Remove N entries from the map.

* Count number of entries in map of size N.
* Get all keys in map of size N.
* Sum all values in map of size N.


### Results
[results](https://github.com/mattbierner/js-hashtrie-benchmark/wiki/results)

#### Hamt
My tests show that HAMT is fastest library overall, with good get, update, and fold performance.

#### Hashtrie
Hashtrie is slightly slower for updates, but up to 10x slower for folds than hashtrie.
Hashtrie's sparse array storage is a [major performance hit](http://jsperf.com/sparse-array-reduce-overhead)
for folds as neither `reduce` or `splice` show good performance for sparse arrays.

#### Mori
Mori is more difficult to accurately benchmark since it is written in ClojureScript.
These benchmarks only look at the performance of Mori when called from regular Javascript.
Actual performance may be better when called from compiled ClojureScript

Mori's `hash_map` is rather slow for gets, but generally good for updates. However,
it is often 2-3x slower than Hamt on large maps.

Mori is really good at aggregate operations, like count and kv reduces. `count` is a constant time
operation. Mori/Clojure uses an even more optimized storage scheme than HAMT and is also fast
to fold large maps. The API is also richer, and the library may be a good choice
if you can sacrifice some performance.


#### persistent-hash-trie
persistent-hash-trie has some interesting features, like custom key types and
breaking walks, but is far too slow.

Tests show persistent-hash-trie is the fastest for removing all entries from a
trie of size 10000. Since this is
the opposite of puts and single removes, I believe this is related to
a [bug in the library](https://github.com/hughfdjackson/persistent-hash-trie/issues/24).

#### Immutable
Immutable generally performs similar to Mori on basic operations, but much worse
on aggregate operations like `sum` or `keys`. `count` is also a constant time
key lookup.

It is written in JS. Like Mori, this is a general purpose collection library.
The API is richer and will be familiar to  OO programmers, but I disagree with
many of the design decisions. Batching may drastically improve performance, but
these benchmarks do not consider batch operations.

Overall, Mori is clearly the better choice if you need a general purpose collection library.


```
hashtrie - 0.2.2
hamt - 0.1.4
mori - 0.2.6
persistent-hash-trie - 0.4.2
immutable: 2.0.3

bash-3.2$ npm run benchmark

> hashtrie-benchmarks@0.0.0 benchmark /Users/mattbierner/Projects/js/js-hashtrie-benchmark
> node run.js

Get nth
hashtrie(10)                  :      7881929.26 +/- 0.18% op/s
hamt(10)                      :      7237366.60 +/- 0.32% op/s
persistent-hash-trie(10)      :      3766431.86 +/- 2.59% op/s
mori hash_map(10)             :      1483920.50 +/- 0.65% op/s
immutable(10)                 :      3005374.02 +/- 0.43% op/s
hashtrie(100)                 :      6222234.83 +/- 2.82% op/s
hamt(100)                     :      5969867.57 +/- 1.64% op/s
persistent-hash-trie(100)     :      1970020.02 +/- 2.17% op/s
mori hash_map(100)            :      1266829.15 +/- 1.64% op/s
immutable(100)                :      2255267.52 +/- 0.52% op/s
hashtrie(1000)                :      5444077.21 +/- 0.46% op/s
hamt(1000)                    :      5313148.53 +/- 1.85% op/s
persistent-hash-trie(1000)    :      1206103.85 +/- 0.64% op/s
mori hash_map(1000)           :       655190.11 +/- 2.56% op/s
immutable(1000)               :       772982.94 +/- 2.40% op/s
hashtrie(10000)               :      4443745.21 +/- 0.51% op/s
hamt(10000)                   :      4693566.35 +/- 0.40% op/s
persistent-hash-trie(10000)   :       920975.08 +/- 1.66% op/s
mori hash_map(10000)          :       560042.71 +/- 0.68% op/s
immutable(10000)              :       583629.11 +/- 2.47% op/s
hashtrie(100000)              :      1383708.01 +/- 0.77% op/s
hamt(100000)                  :      1460863.55 +/- 0.67% op/s
persistent-hash-trie(100000)  :       693671.86 +/- 3.81% op/s
mori hash_map(100000)         :       363093.26 +/- 4.69% op/s
immutable(100000)             :       343486.60 +/- 2.38% op/s


put nth
hashtrie(10)                  :      1109032.27 +/- 10.48% op/s
hamt(10)                      :      1428560.09 +/- 0.87% op/s
persistent-hash-trie(10)      :       289025.44 +/- 1.59% op/s
mori hash_map(10)             :       343552.46 +/- 2.85% op/s
immutable(10)                 :       379771.52 +/- 1.65% op/s
hashtrie(100)                 :      1118338.02 +/- 0.27% op/s
hamt(100)                     :      1414805.43 +/- 0.16% op/s
persistent-hash-trie(100)     :        83093.77 +/- 1.56% op/s
mori hash_map(100)            :       796620.90 +/- 0.40% op/s
immutable(100)                :       567093.21 +/- 0.66% op/s
hashtrie(1000)                :      1230866.62 +/- 0.62% op/s
hamt(1000)                    :      1022396.04 +/- 0.70% op/s
persistent-hash-trie(1000)    :        47477.37 +/- 0.55% op/s
mori hash_map(1000)           :       721541.65 +/- 1.24% op/s
immutable(1000)               :       371195.99 +/- 17.21% op/s
hashtrie(10000)               :      1171517.99 +/- 0.64% op/s
hamt(10000)                   :       968174.21 +/- 0.73% op/s
persistent-hash-trie(10000)   :        44904.49 +/- 1.43% op/s
mori hash_map(10000)          :       574405.21 +/- 1.96% op/s
immutable(10000)              :       440489.22 +/- 1.69% op/s
hashtrie(100000)              :       927679.00 +/- 1.13% op/s
hamt(100000)                  :       786777.01 +/- 0.75% op/s
persistent-hash-trie(100000)  :        18629.34 +/- 0.97% op/s
mori hash_map(100000)         :       496650.93 +/- 2.68% op/s
immutable(100000)             :       248543.28 +/- 1.78% op/s


Put All
hashtrie(10)                  :       189160.66 +/- 2.85% op/s
hamt(10)                      :       198786.40 +/- 6.26% op/s
persistent-hash-trie(10)      :        39479.55 +/- 0.89% op/s
mori hash_map(10)             :        74293.29 +/- 0.20% op/s
immutable(10)                 :        62014.85 +/- 0.35% op/s
hashtrie(100)                 :        14920.49 +/- 0.47% op/s
hamt(100)                     :        17116.96 +/- 0.21% op/s
persistent-hash-trie(100)     :         1089.53 +/- 0.16% op/s
mori hash_map(100)            :         6705.38 +/- 0.20% op/s
immutable(100)                :         4402.20 +/- 0.10% op/s
hashtrie(1000)                :         1164.03 +/- 0.59% op/s
hamt(1000)                    :         1228.95 +/- 2.38% op/s
persistent-hash-trie(1000)    :           62.14 +/- 0.61% op/s
mori hash_map(1000)           :          311.84 +/- 0.38% op/s
immutable(1000)               :          253.14 +/- 0.26% op/s
hashtrie(10000)               :           84.67 +/- 5.63% op/s
hamt(10000)                   :          100.36 +/- 0.60% op/s
persistent-hash-trie(10000)   :            4.81 +/- 0.30% op/s
mori hash_map(10000)          :           34.46 +/- 1.10% op/s
immutable(10000)              :           23.19 +/- 0.90% op/s


remove nth
hashtrie(10)                  :      1787413.03 +/- 0.52% op/s
hamt(10)                      :      2316934.63 +/- 6.82% op/s
persistent-hash-trie(10)      :       137502.48 +/- 0.13% op/s
mori hash_map(10)             :       996949.50 +/- 0.13% op/s
immutable(10)                 :       520005.57 +/- 0.39% op/s
hashtrie(100)                 :      1465695.42 +/- 0.28% op/s
hamt(100)                     :      1594335.68 +/- 0.18% op/s
persistent-hash-trie(100)     :        48902.08 +/- 0.18% op/s
mori hash_map(100)            :       823931.99 +/- 1.10% op/s
immutable(100)                :       425576.96 +/- 0.30% op/s
hashtrie(1000)                :      1099042.62 +/- 0.42% op/s
hamt(1000)                    :      1080153.26 +/- 28.00% op/s
persistent-hash-trie(1000)    :        33816.95 +/- 0.90% op/s
mori hash_map(1000)           :       436831.50 +/- 0.52% op/s
immutable(1000)               :       229412.94 +/- 8.10% op/s
hashtrie(10000)               :       873379.59 +/- 0.49% op/s
hamt(10000)                   :       981949.41 +/- 0.34% op/s
persistent-hash-trie(10000)   :        27320.94 +/- 0.19% op/s
mori hash_map(10000)          :       346443.41 +/- 0.26% op/s
immutable(10000)              :       204317.22 +/- 0.30% op/s
hashtrie(100000)              :       507528.91 +/- 0.17% op/s
hamt(100000)                  :       569443.51 +/- 0.96% op/s
persistent-hash-trie(100000)  :        11435.52 +/- 8.45% op/s
mori hash_map(100000)         :       214654.95 +/- 0.67% op/s
immutable(100000)             :       128347.93 +/- 7.25% op/s


Remove All
hashtrie(10)                  :       232129.11 +/- 0.19% op/s
hamt(10)                      :       273471.52 +/- 0.15% op/s
persistent-hash-trie(10)      :        21538.27 +/- 0.70% op/s
mori hash_map(10)             :        98171.23 +/- 1.88% op/s
immutable(10)                 :        71094.45 +/- 0.27% op/s
hashtrie(100)                 :        15700.58 +/- 0.71% op/s
hamt(100)                     :        20367.75 +/- 0.16% op/s
persistent-hash-trie(100)     :         1843.25 +/- 0.21% op/s
mori hash_map(100)            :         7603.87 +/- 11.25% op/s
immutable(100)                :         4995.15 +/- 0.43% op/s
hashtrie(1000)                :         1175.80 +/- 0.15% op/s
hamt(1000)                    :         1451.93 +/- 0.17% op/s
persistent-hash-trie(1000)    :          907.75 +/- 2.89% op/s
mori hash_map(1000)           :          416.92 +/- 0.89% op/s
immutable(1000)               :          276.86 +/- 0.67% op/s
hashtrie(10000)               :           81.47 +/- 0.41% op/s
hamt(10000)                   :           99.81 +/- 0.27% op/s
persistent-hash-trie(10000)   :          247.75 +/- 0.18% op/s
mori hash_map(10000)          :           38.13 +/- 1.82% op/s
immutable(10000)              :           19.93 +/- 6.65% op/s


Count
hashtrie(10)                  :       542367.27 +/- 0.52% op/s
hamt(10)                      :      5579645.63 +/- 0.39% op/s
persistent-hash-trie(10)      :       176920.73 +/- 0.66% op/s
mori hash_map(10)             :     31147291.73 +/- 1.08% op/s
immutable(10)                 :     50845683.48 +/- 2.08% op/s
hashtrie(100)                 :        40711.83 +/- 0.10% op/s
hamt(100)                     :       390022.77 +/- 0.08% op/s
persistent-hash-trie(100)     :         6671.64 +/- 0.35% op/s
mori hash_map(100)            :     28938836.03 +/- 0.43% op/s
immutable(100)                :     52081006.39 +/- 1.84% op/s
hashtrie(1000)                :         3487.78 +/- 1.62% op/s
hamt(1000)                    :        18276.24 +/- 1.54% op/s
persistent-hash-trie(1000)    :          656.40 +/- 2.02% op/s
mori hash_map(1000)           :     31059561.12 +/- 0.18% op/s
immutable(1000)               :     50996206.28 +/- 0.19% op/s
hashtrie(10000)               :          352.05 +/- 0.03% op/s
hamt(10000)                   :         4406.05 +/- 0.17% op/s
persistent-hash-trie(10000)   :          149.28 +/- 0.46% op/s
mori hash_map(10000)          :     30281646.10 +/- 0.30% op/s
immutable(10000)              :     50678419.14 +/- 1.68% op/s


Sum
hashtrie(10)                  :       629570.73 +/- 0.71% op/s
hamt(10)                      :      3856615.89 +/- 0.10% op/s
persistent-hash-trie(10)      :        96272.11 +/- 1.88% op/s
mori hash_map(10)             :      1477283.22 +/- 0.04% op/s
immutable(10)                 :       101628.59 +/- 0.74% op/s
hashtrie(100)                 :        40887.89 +/- 0.48% op/s
hamt(100)                     :       334516.36 +/- 0.07% op/s
persistent-hash-trie(100)     :         7080.56 +/- 0.18% op/s
mori hash_map(100)            :       147678.71 +/- 0.13% op/s
immutable(100)                :         8563.35 +/- 0.15% op/s
hashtrie(1000)                :         3765.28 +/- 0.11% op/s
hamt(1000)                    :        17273.23 +/- 0.11% op/s
persistent-hash-trie(1000)    :          544.07 +/- 31.12% op/s
mori hash_map(1000)           :        10941.14 +/- 2.25% op/s
immutable(1000)               :          965.96 +/- 0.32% op/s
hashtrie(10000)               :          342.23 +/- 0.28% op/s
hamt(10000)                   :         3416.94 +/- 0.13% op/s
persistent-hash-trie(10000)   :          147.17 +/- 0.48% op/s
mori hash_map(10000)          :         1510.73 +/- 0.19% op/s
immutable(10000)              :          125.49 +/- 0.04% op/s


Keys
hashtrie(10)                  :       495884.59 +/- 1.51% op/s
hamt(10)                      :      2450253.46 +/- 0.12% op/s
persistent-hash-trie(10)      :       137743.52 +/- 0.94% op/s
mori hash_map(10)             :       351650.99 +/- 0.27% op/s
immutable(10)                 :       109650.20 +/- 4.87% op/s
hashtrie(100)                 :        33074.59 +/- 1.53% op/s
hamt(100)                     :       252790.62 +/- 0.10% op/s
persistent-hash-trie(100)     :         7192.03 +/- 0.41% op/s
mori hash_map(100)            :        27473.65 +/- 0.51% op/s
immutable(100)                :         8992.06 +/- 1.14% op/s
hashtrie(1000)                :         3447.68 +/- 0.29% op/s
hamt(1000)                    :        14500.51 +/- 0.19% op/s
persistent-hash-trie(1000)    :          670.08 +/- 0.17% op/s
mori hash_map(1000)           :         2132.59 +/- 0.31% op/s
immutable(1000)               :          932.88 +/- 0.37% op/s
hashtrie(10000)               :          307.57 +/- 2.38% op/s
hamt(10000)                   :         2652.47 +/- 0.09% op/s
persistent-hash-trie(10000)   :          151.34 +/- 0.21% op/s
mori hash_map(10000)          :          211.49 +/- 0.13% op/s
immutable(10000)              :          104.50 +/- 6.91% op/s

```




[hashtrie]: https://github.com/mattbierner/hashtrie
[hamt]: https://github.com/mattbierner/hamt
[mori]: https://github.com/swannodette/mori
[persistent]: https://github.com/hughfdjackson/persistent-hash-trie
[immutable]: https://github.com/facebook/immutable-js