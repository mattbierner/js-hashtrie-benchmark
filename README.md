Javascript Hash Trie Benchmarking

Benchmarks six persistent Javascript hashtrie implementations:
* [hashtrie][hashtrie] - 0.2.x
* [HAMT][hamt] -  0.1.x
* [HAMT+][hamt_plus] - 0.0.x
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
* Put N entries into a map using transient mutation for libraries that support it.
* Remove N entries from a map.
* Remove N entries from a map using transient mutation for libraries that support it.

* Count number of entries in map of size N.
* Get all keys in map of size N.
* Sum all values in map of size N.


### Results
* [results](https://github.com/mattbierner/js-hashtrie-benchmark/wiki/results)
* [Overview of basic Javascript hashtries and optimizations](https://blog.mattbierner.com/persistent-hash-tries-in-javavascript/)
* [Overview of Javascript HAMT implementation and optimization used by the HAMT library](http://blog.mattbierner.com/hash-array-mapped-tries-in-javascript/)

#### HAMT
My tests show that HAMT is fastest library overall, with good get, update, and fold performance.

HAMT does not support transient mutation, or some of the features of the
other libraries. Getting the number of elements in a map is also an *O(N)* operation.

#### HAMT+
HAMT+ is slightly slower than HAMT for immutable update and get operation, but
adds support for transient mutation and custom key types. This allows HAMT+ to
be significantly faster than HAMT for batched transform operations.

#### Hashtrie
Hashtrie is slightly slower than HAMT for updates, but up to 10x slower for folds.
Hashtrie's sparse array storage is a [major performance hit](http://jsperf.com/sparse-array-reduce-overhead)
for folds as neither `reduce` or `splice` show good performance for sparse arrays.

#### Mori
Mori is more difficult to accurately benchmark since it is written in ClojureScript.
These benchmarks only look at the performance of Mori when called from regular Javascript.
Actual performance may be better when called from compiled ClojureScript

Mori's `hash_map` is rather slow for gets, but generally good for updates. However,
it is often 2-3x slower than Hamt on large maps.

Mori is good at aggregate operations, like count and kv reduces. `count` is a constant time
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
Immutable performs between Mori and HAMT for most basic operations. `count` is
also a constant time operation. Transient mutation is one of the libraries strong points,
with Immutable and HAMT+ having similar transient mutation performance. 

Unlike Mori which uses [ClojureScript][ClojureScript] and the HAMT libraries which are written in [Khepri][khepri],
Immutable is written in regular Javascript. Like Mori, Immutable is also a general
purpose collection library. Its API is richer and will be familiar to  OO programmers. 


```
hashtrie - 0.2.2
hamt - 0.1.7
hamt_plus - 0.0.5
mori - 0.2.9
persistent-hash-trie - 0.4.2
immutable: 2.0.14

^Cbash-3.2$ npm run benchmark

> hashtrie-benchmarks@0.0.0 benchmark /Users/mattbierner/Projects/js/js-hashtrie-benchmark
> node run.js

Get nth
hashtrie(10)                  :      7511632.20 +/- 0.31% op/s
hamt(10)                      :      6979939.13 +/- 0.10% op/s
hamt_plus(10)                 :      6522273.10 +/- 0.17% op/s
persistent-hash-trie(10)      :      4921913.59 +/- 1.57% op/s
mori hash_map(10)             :      1316084.19 +/- 3.16% op/s
immutable(10)                 :      5700177.95 +/- 0.04% op/s
hashtrie(100)                 :      6555214.88 +/- 0.17% op/s
hamt(100)                     :      6203699.29 +/- 0.57% op/s
hamt_plus(100)                :      5841505.87 +/- 0.35% op/s
persistent-hash-trie(100)     :      2041894.48 +/- 0.39% op/s
mori hash_map(100)            :      1404074.55 +/- 0.30% op/s
immutable(100)                :      5247864.27 +/- 0.05% op/s
hashtrie(1000)                :      5343365.37 +/- 0.12% op/s
hamt(1000)                    :      5236062.58 +/- 0.15% op/s
hamt_plus(1000)               :      5341357.67 +/- 0.13% op/s
persistent-hash-trie(1000)    :      1223643.50 +/- 0.37% op/s
mori hash_map(1000)           :       632635.62 +/- 2.50% op/s
immutable(1000)               :      4327571.01 +/- 0.09% op/s
hashtrie(10000)               :      4303093.59 +/- 0.08% op/s
hamt(10000)                   :      4833950.92 +/- 0.05% op/s
hamt_plus(10000)              :      4530083.60 +/- 0.26% op/s
persistent-hash-trie(10000)   :       982138.08 +/- 0.33% op/s
mori hash_map(10000)          :       530052.11 +/- 2.85% op/s
immutable(10000)              :      3821157.09 +/- 0.36% op/s
hashtrie(100000)              :      1284711.84 +/- 0.33% op/s
hamt(100000)                  :      1364168.12 +/- 0.19% op/s
hamt_plus(100000)             :      1357957.75 +/- 0.19% op/s
persistent-hash-trie(100000)  :       745509.90 +/- 0.40% op/s
mori hash_map(100000)         :       385858.21 +/- 1.37% op/s
immutable(100000)             :       997404.10 +/- 0.09% op/s


put nth
hashtrie(10)                  :      2512800.58 +/- 0.49% op/s
hamt(10)                      :      1818039.39 +/- 0.97% op/s
hamt_plus(10)                 :      1627666.23 +/- 0.40% op/s
persistent-hash-trie(10)      :       291202.70 +/- 0.13% op/s
mori hash_map(10)             :       851210.77 +/- 2.17% op/s
immutable(10)                 :      1353151.29 +/- 0.18% op/s
hashtrie(100)                 :       970658.57 +/- 0.10% op/s
hamt(100)                     :      1551450.71 +/- 0.21% op/s
hamt_plus(100)                :      1343554.08 +/- 0.26% op/s
persistent-hash-trie(100)     :        84293.55 +/- 0.60% op/s
mori hash_map(100)            :       846088.92 +/- 0.21% op/s
immutable(100)                :       756339.00 +/- 0.16% op/s
hashtrie(1000)                :       772642.01 +/- 0.21% op/s
hamt(1000)                    :      1458878.87 +/- 0.22% op/s
hamt_plus(1000)               :      1203495.85 +/- 11.25% op/s
persistent-hash-trie(1000)    :        56850.81 +/- 0.13% op/s
mori hash_map(1000)           :       696515.28 +/- 0.25% op/s
immutable(1000)               :       672742.68 +/- 0.08% op/s
hashtrie(10000)               :      1039334.89 +/- 0.18% op/s
hamt(10000)                   :      1023875.36 +/- 0.32% op/s
hamt_plus(10000)              :       898370.64 +/- 0.19% op/s
persistent-hash-trie(10000)   :        49884.62 +/- 0.17% op/s
mori hash_map(10000)          :       344377.56 +/- 0.30% op/s
immutable(10000)              :       606094.36 +/- 0.10% op/s
hashtrie(100000)              :       976285.73 +/- 0.13% op/s
hamt(100000)                  :      1108453.71 +/- 0.44% op/s
hamt_plus(100000)             :      1013860.68 +/- 0.15% op/s
persistent-hash-trie(100000)  :        24314.80 +/- 0.23% op/s
mori hash_map(100000)         :       546179.05 +/- 0.25% op/s
immutable(100000)             :       485820.51 +/- 0.15% op/s


Put All
hashtrie(10)                  :       208932.26 +/- 0.23% op/s
hamt(10)                      :       216746.91 +/- 0.58% op/s
hamt_plus(10)                 :       191440.07 +/- 0.60% op/s
persistent-hash-trie(10)      :        32479.83 +/- 0.12% op/s
mori hash_map(10)             :        81881.58 +/- 0.34% op/s
immutable(10)                 :       150025.40 +/- 0.37% op/s
hashtrie(100)                 :        13570.85 +/- 0.29% op/s
hamt(100)                     :        15580.06 +/- 0.36% op/s
hamt_plus(100)                :        14227.84 +/- 0.37% op/s
persistent-hash-trie(100)     :         1037.51 +/- 0.36% op/s
mori hash_map(100)            :         6849.22 +/- 0.33% op/s
immutable(100)                :         9179.86 +/- 5.74% op/s
hashtrie(1000)                :         1174.68 +/- 0.16% op/s
hamt(1000)                    :         1297.26 +/- 0.12% op/s
hamt_plus(1000)               :         1195.93 +/- 0.11% op/s
persistent-hash-trie(1000)    :           63.70 +/- 0.15% op/s
mori hash_map(1000)           :          331.50 +/- 0.13% op/s
immutable(1000)               :          765.69 +/- 0.13% op/s
hashtrie(10000)               :           84.30 +/- 0.29% op/s
hamt(10000)                   :           97.61 +/- 0.46% op/s
hamt_plus(10000)              :           90.28 +/- 0.40% op/s
persistent-hash-trie(10000)   :            4.87 +/- 0.37% op/s
mori hash_map(10000)          :           35.07 +/- 0.70% op/s
immutable(10000)              :           56.88 +/- 0.28% op/s


Put All (transient)
hamt(10)                      :       234006.71 +/- 0.21% op/s
hamt_plus(10)                 :       279002.60 +/- 5.76% op/s
mori hash_map(10)             :        86702.21 +/- 0.31% op/s
immutable(10)                 :       263701.90 +/- 0.10% op/s
hamt(100)                     :        17021.19 +/- 0.20% op/s
hamt_plus(100)                :        25552.28 +/- 0.13% op/s
mori hash_map(100)            :         9692.65 +/- 0.16% op/s
immutable(100)                :        24925.90 +/- 0.15% op/s
hamt(1000)                    :         1275.99 +/- 0.14% op/s
hamt_plus(1000)               :         2181.78 +/- 0.16% op/s
mori hash_map(1000)           :          389.97 +/- 0.35% op/s
immutable(1000)               :         2198.48 +/- 0.20% op/s
hamt(10000)                   :           95.83 +/- 0.48% op/s
hamt_plus(10000)              :          197.03 +/- 0.32% op/s
mori hash_map(10000)          :           43.79 +/- 1.05% op/s
immutable(10000)              :          194.19 +/- 0.46% op/s


remove nth
hashtrie(10)                  :      1802222.95 +/- 0.21% op/s
hamt(10)                      :      2390302.65 +/- 0.52% op/s
hamt_plus(10)                 :      2025999.65 +/- 0.11% op/s
persistent-hash-trie(10)      :       145082.50 +/- 0.17% op/s
mori hash_map(10)             :       990310.49 +/- 0.46% op/s
immutable(10)                 :      1411993.20 +/- 0.12% op/s
hashtrie(100)                 :      1391384.44 +/- 0.11% op/s
hamt(100)                     :      1585708.74 +/- 0.16% op/s
hamt_plus(100)                :      1368694.60 +/- 0.17% op/s
persistent-hash-trie(100)     :        48727.79 +/- 0.20% op/s
mori hash_map(100)            :       770951.81 +/- 0.16% op/s
immutable(100)                :       872646.97 +/- 0.22% op/s
hashtrie(1000)                :      1039030.14 +/- 0.20% op/s
hamt(1000)                    :      1383482.57 +/- 0.21% op/s
hamt_plus(1000)               :      1134457.11 +/- 9.53% op/s
persistent-hash-trie(1000)    :        34321.78 +/- 0.14% op/s
mori hash_map(1000)           :       418554.41 +/- 0.42% op/s
immutable(1000)               :       705939.66 +/- 0.13% op/s
hashtrie(10000)               :       826884.34 +/- 0.11% op/s
hamt(10000)                   :       978623.11 +/- 0.97% op/s
hamt_plus(10000)              :       847850.95 +/- 0.49% op/s
persistent-hash-trie(10000)   :        27160.81 +/- 0.26% op/s
mori hash_map(10000)          :       322444.08 +/- 0.31% op/s
immutable(10000)              :       547460.16 +/- 0.90% op/s
hashtrie(100000)              :       490788.70 +/- 0.28% op/s
hamt(100000)                  :       568979.55 +/- 0.42% op/s
hamt_plus(100000)             :       515683.97 +/- 0.15% op/s
persistent-hash-trie(100000)  :        12246.10 +/- 4.24% op/s
mori hash_map(100000)         :       215042.76 +/- 9.90% op/s
immutable(100000)             :       349872.96 +/- 0.17% op/s


Remove All
hashtrie(10)                  :       210962.76 +/- 0.17% op/s
hamt(10)                      :       272097.34 +/- 0.13% op/s
hamt_plus(10)                 :       229851.87 +/- 0.52% op/s
persistent-hash-trie(10)      :        20723.43 +/- 0.08% op/s
mori hash_map(10)             :       105237.20 +/- 0.18% op/s
immutable(10)                 :       176039.80 +/- 0.07% op/s
hashtrie(100)                 :        15580.91 +/- 0.13% op/s
hamt(100)                     :        19894.79 +/- 0.17% op/s
hamt_plus(100)                :        17353.67 +/- 0.19% op/s
persistent-hash-trie(100)     :         2372.86 +/- 0.10% op/s
mori hash_map(100)            :         7514.86 +/- 0.19% op/s
immutable(100)                :         9914.93 +/- 0.25% op/s
hashtrie(1000)                :         1132.96 +/- 0.19% op/s
hamt(1000)                    :         1381.92 +/- 0.21% op/s
hamt_plus(1000)               :         1250.46 +/- 0.09% op/s
persistent-hash-trie(1000)    :          899.14 +/- 0.29% op/s
mori hash_map(1000)           :          394.39 +/- 0.77% op/s
immutable(1000)               :          751.61 +/- 0.31% op/s
hashtrie(10000)               :           79.04 +/- 1.17% op/s
hamt(10000)                   :           99.08 +/- 6.28% op/s
hamt_plus(10000)              :           96.16 +/- 0.11% op/s
persistent-hash-trie(10000)   :          267.23 +/- 0.08% op/s
mori hash_map(10000)          :           37.25 +/- 0.87% op/s
immutable(10000)              :           57.41 +/- 0.56% op/s


Remove All (transient)
hamt(10)                      :       282925.00 +/- 0.14% op/s
hamt_plus(10)                 :       329006.66 +/- 0.15% op/s
mori hash_map(10)             :        79376.68 +/- 1.05% op/s
immutable(10)                 :       319614.99 +/- 0.16% op/s
hamt(100)                     :        19348.40 +/- 0.24% op/s
hamt_plus(100)                :        29932.08 +/- 0.21% op/s
mori hash_map(100)            :         7749.40 +/- 0.13% op/s
immutable(100)                :        31425.55 +/- 0.25% op/s
hamt(1000)                    :         1399.96 +/- 0.18% op/s
hamt_plus(1000)               :         2676.05 +/- 0.25% op/s
mori hash_map(1000)           :          443.97 +/- 3.82% op/s
immutable(1000)               :         2645.33 +/- 0.11% op/s
hamt(10000)                   :          106.51 +/- 0.08% op/s
hamt_plus(10000)              :          218.63 +/- 0.17% op/s
mori hash_map(10000)          :           35.79 +/- 1.36% op/s
immutable(10000)              :          217.29 +/- 0.62% op/s


Count
hashtrie(10)                  :       565967.34 +/- 0.14% op/s
hamt(10)                      :      5613490.34 +/- 0.75% op/s
hamt_plus(10)                 :      5411658.31 +/- 0.22% op/s
persistent-hash-trie(10)      :       174030.62 +/- 2.10% op/s
mori hash_map(10)             :     30956223.59 +/- 0.29% op/s
immutable(10)                 :     52288398.45 +/- 1.65% op/s
hashtrie(100)                 :        37025.82 +/- 0.10% op/s
hamt(100)                     :       307384.02 +/- 0.07% op/s
hamt_plus(100)                :       300958.55 +/- 0.05% op/s
persistent-hash-trie(100)     :         6771.60 +/- 0.35% op/s
mori hash_map(100)            :     30922902.20 +/- 1.13% op/s
immutable(100)                :     48741887.53 +/- 0.55% op/s
hashtrie(1000)                :         3664.80 +/- 0.01% op/s
hamt(1000)                    :        17030.77 +/- 0.06% op/s
hamt_plus(1000)               :        16813.14 +/- 0.05% op/s
persistent-hash-trie(1000)    :          680.33 +/- 0.37% op/s
mori hash_map(1000)           :     30007311.22 +/- 0.51% op/s
immutable(1000)               :     49234305.69 +/- 0.58% op/s
hashtrie(10000)               :          346.60 +/- 0.03% op/s
hamt(10000)                   :         3292.49 +/- 0.02% op/s
hamt_plus(10000)              :         3254.86 +/- 0.02% op/s
persistent-hash-trie(10000)   :          156.40 +/- 0.60% op/s
mori hash_map(10000)          :     31069110.07 +/- 1.00% op/s
immutable(10000)              :     50681919.21 +/- 0.25% op/s


Sum
hashtrie(10)                  :       368898.95 +/- 0.08% op/s
hamt(10)                      :      3870930.98 +/- 0.12% op/s
hamt_plus(10)                 :      3738755.47 +/- 0.34% op/s
persistent-hash-trie(10)      :       240181.64 +/- 0.23% op/s
mori hash_map(10)             :      1380976.94 +/- 0.18% op/s
immutable(10)                 :      1234720.95 +/- 0.62% op/s
hashtrie(100)                 :        46494.92 +/- 0.12% op/s
hamt(100)                     :       321133.93 +/- 0.03% op/s
hamt_plus(100)                :       321985.14 +/- 0.05% op/s
persistent-hash-trie(100)     :         6387.44 +/- 0.26% op/s
mori hash_map(100)            :       150873.76 +/- 0.04% op/s
immutable(100)                :       181085.87 +/- 0.79% op/s
hashtrie(1000)                :         3646.53 +/- 0.02% op/s
hamt(1000)                    :        16305.33 +/- 0.07% op/s
hamt_plus(1000)               :        16272.14 +/- 0.10% op/s
persistent-hash-trie(1000)    :          665.98 +/- 0.38% op/s
mori hash_map(1000)           :        11636.45 +/- 0.01% op/s
immutable(1000)               :        15688.96 +/- 0.46% op/s
hashtrie(10000)               :          339.16 +/- 0.04% op/s
hamt(10000)                   :         3466.85 +/- 0.03% op/s
hamt_plus(10000)              :         3402.40 +/- 0.09% op/s
persistent-hash-trie(10000)   :          138.49 +/- 1.90% op/s
mori hash_map(10000)          :         1558.90 +/- 0.02% op/s
immutable(10000)              :         1825.69 +/- 0.04% op/s


Keys
hashtrie(10)                  :       464507.34 +/- 0.23% op/s
hamt(10)                      :      2446808.10 +/- 0.15% op/s
hamt_plus(10)                 :      2409068.62 +/- 0.54% op/s
persistent-hash-trie(10)      :       144883.46 +/- 0.17% op/s
mori hash_map(10)             :       342341.51 +/- 0.28% op/s
immutable(10)                 :       178828.76 +/- 6.61% op/s
hashtrie(100)                 :        39283.61 +/- 0.53% op/s
hamt(100)                     :       251624.65 +/- 0.11% op/s
hamt_plus(100)                :       235286.56 +/- 0.13% op/s
persistent-hash-trie(100)     :         6764.09 +/- 0.15% op/s
mori hash_map(100)            :        27687.76 +/- 0.15% op/s
immutable(100)                :        85132.29 +/- 5.09% op/s
hashtrie(1000)                :         3576.17 +/- 1.11% op/s
hamt(1000)                    :        13657.80 +/- 0.12% op/s
hamt_plus(1000)               :        13592.52 +/- 0.12% op/s
persistent-hash-trie(1000)    :          636.53 +/- 0.14% op/s
mori hash_map(1000)           :         2232.13 +/- 0.15% op/s
immutable(1000)               :        11398.61 +/- 0.52% op/s
hashtrie(10000)               :          330.80 +/- 0.21% op/s
hamt(10000)                   :         2655.84 +/- 0.14% op/s
hamt_plus(10000)              :         2514.25 +/- 4.56% op/s
persistent-hash-trie(10000)   :          153.33 +/- 0.17% op/s
mori hash_map(10000)          :          209.71 +/- 0.12% op/s
immutable(10000)              :         1267.94 +/- 0.22% op/s

```




[hashtrie]: https://github.com/mattbierner/hashtrie
[hamt]: https://github.com/mattbierner/hamt
[hamt_plus]: https://github.com/mattbierner/hamt_plus
[mori]: https://github.com/swannodette/mori
[persistent]: https://github.com/hughfdjackson/persistent-hash-trie
[immutable]: https://github.com/facebook/immutable-js


[clojurescript]: https://github.com/clojure/clojurescript
[khepri]: http://khepri-lang.com
[khepri]: http://khepri-lang.com
[khepri]: http://khepri-lang.com
