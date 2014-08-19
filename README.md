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
with Immutable showing the best transient mutation performance overall. 

It is written in JS. Like Mori, this is a general purpose collection library.
The API is richer and will be familiar to  OO programmers. 


```
hashtrie - 0.2.2
hamt - 0.1.6
hamt_plus - 0.0.3
mori - 0.2.9
persistent-hash-trie - 0.4.2
immutable: 2.0.12

Get nth
hashtrie(10)                  :      6961337.95 +/- 0.03% op/s
hamt(10)                      :      6299311.14 +/- 0.08% op/s
hamt_plus(10)                 :      5895075.05 +/- 0.06% op/s
persistent-hash-trie(10)      :      3787746.93 +/- 1.77% op/s
mori hash_map(10)             :      1011037.51 +/- 2.65% op/s
immutable(10)                 :      5519466.49 +/- 0.10% op/s
hashtrie(100)                 :      6503819.27 +/- 0.07% op/s
hamt(100)                     :      5999321.12 +/- 1.48% op/s
hamt_plus(100)                :      5685920.39 +/- 0.13% op/s
persistent-hash-trie(100)     :      2165000.55 +/- 0.22% op/s
mori hash_map(100)            :      1001595.49 +/- 0.33% op/s
immutable(100)                :      5240050.40 +/- 0.19% op/s
hashtrie(1000)                :      5420944.23 +/- 0.14% op/s
hamt(1000)                    :      5350183.21 +/- 0.03% op/s
hamt_plus(1000)               :      5104452.94 +/- 0.04% op/s
persistent-hash-trie(1000)    :      1221324.36 +/- 0.36% op/s
mori hash_map(1000)           :       512957.31 +/- 2.65% op/s
immutable(1000)               :      4463249.27 +/- 0.12% op/s
hashtrie(10000)               :      4337961.25 +/- 0.62% op/s
hamt(10000)                   :      4553989.20 +/- 0.35% op/s
hamt_plus(10000)              :      4273425.18 +/- 0.25% op/s
persistent-hash-trie(10000)   :       942330.67 +/- 1.03% op/s
mori hash_map(10000)          :       466366.94 +/- 0.42% op/s
immutable(10000)              :      3816175.34 +/- 0.56% op/s
hashtrie(100000)              :      1213675.93 +/- 1.20% op/s
hamt(100000)                  :      1353697.22 +/- 1.22% op/s
hamt_plus(100000)             :      1320423.03 +/- 1.15% op/s
persistent-hash-trie(100000)  :       688826.88 +/- 3.48% op/s
mori hash_map(100000)         :       347613.63 +/- 1.42% op/s
immutable(100000)             :       976295.20 +/- 0.87% op/s


put nth
hashtrie(10)                  :      1758628.90 +/- 0.29% op/s
hamt(10)                      :      1553526.84 +/- 0.39% op/s
hamt_plus(10)                 :      1304168.55 +/- 0.17% op/s
persistent-hash-trie(10)      :       292794.08 +/- 0.12% op/s
mori hash_map(10)             :       658389.41 +/- 0.45% op/s
immutable(10)                 :      1237650.53 +/- 0.26% op/s
hashtrie(100)                 :      1108345.82 +/- 0.19% op/s
hamt(100)                     :      1447340.23 +/- 0.47% op/s
hamt_plus(100)                :      1165281.63 +/- 0.38% op/s
persistent-hash-trie(100)     :       105082.19 +/- 0.22% op/s
mori hash_map(100)            :       656777.45 +/- 0.26% op/s
immutable(100)                :       885733.97 +/- 0.31% op/s
hashtrie(1000)                :       858456.05 +/- 0.22% op/s
hamt(1000)                    :      1064206.37 +/- 0.36% op/s
hamt_plus(1000)               :       882138.77 +/- 0.47% op/s
persistent-hash-trie(1000)    :        58878.93 +/- 0.29% op/s
mori hash_map(1000)           :       549151.39 +/- 9.00% op/s
immutable(1000)               :       639378.67 +/- 0.21% op/s
hashtrie(10000)               :       816561.64 +/- 0.29% op/s
hamt(10000)                   :      1220595.45 +/- 0.55% op/s
hamt_plus(10000)              :      1051438.72 +/- 0.37% op/s
persistent-hash-trie(10000)   :        49422.10 +/- 0.18% op/s
mori hash_map(10000)          :       586218.18 +/- 0.21% op/s
immutable(10000)              :       567298.74 +/- 0.19% op/s
hashtrie(100000)              :       759593.99 +/- 0.25% op/s
hamt(100000)                  :      1063471.62 +/- 0.51% op/s
hamt_plus(100000)             :      1009531.86 +/- 0.56% op/s
persistent-hash-trie(100000)  :        19176.15 +/- 0.19% op/s
mori hash_map(100000)         :       471117.45 +/- 0.33% op/s
immutable(100000)             :       469057.09 +/- 0.18% op/s


Put All
hashtrie(10)                  :       176116.65 +/- 0.31% op/s
hamt(10)                      :       235530.50 +/- 0.23% op/s
hamt_plus(10)                 :       186668.55 +/- 0.73% op/s
persistent-hash-trie(10)      :        31247.26 +/- 0.21% op/s
mori hash_map(10)             :        64712.33 +/- 0.69% op/s
immutable(10)                 :       155021.73 +/- 0.37% op/s
hashtrie(100)                 :        13436.04 +/- 0.30% op/s
hamt(100)                     :        15906.97 +/- 0.46% op/s
hamt_plus(100)                :        13590.40 +/- 0.61% op/s
persistent-hash-trie(100)     :         1047.55 +/- 0.73% op/s
mori hash_map(100)            :         5612.95 +/- 0.41% op/s
immutable(100)                :         9207.63 +/- 0.40% op/s
hashtrie(1000)                :         1028.90 +/- 0.33% op/s
hamt(1000)                    :         1149.43 +/- 1.15% op/s
hamt_plus(1000)               :         1034.22 +/- 7.07% op/s
persistent-hash-trie(1000)    :           62.95 +/- 0.19% op/s
mori hash_map(1000)           :          274.85 +/- 0.11% op/s
immutable(1000)               :          726.00 +/- 0.23% op/s
hashtrie(10000)               :           86.13 +/- 0.64% op/s
hamt(10000)                   :           98.53 +/- 0.75% op/s
hamt_plus(10000)              :           84.58 +/- 0.62% op/s
persistent-hash-trie(10000)   :            4.78 +/- 1.12% op/s
mori hash_map(10000)          :           29.97 +/- 1.17% op/s
immutable(10000)              :           55.72 +/- 0.49% op/s


Put All (transient)
hamt(10)                      :       229061.02 +/- 0.29% op/s
hamt_plus(10)                 :       277753.52 +/- 0.29% op/s
mori hash_map(10)             :        66089.04 +/- 0.72% op/s
immutable(10)                 :       270336.19 +/- 0.14% op/s
hamt(100)                     :        16066.20 +/- 6.28% op/s
hamt_plus(100)                :        24415.64 +/- 0.11% op/s
mori hash_map(100)            :         6672.59 +/- 0.22% op/s
immutable(100)                :        25667.60 +/- 0.13% op/s
hamt(1000)                    :         1279.03 +/- 0.31% op/s
hamt_plus(1000)               :         2011.78 +/- 0.22% op/s
mori hash_map(1000)           :          336.01 +/- 0.26% op/s
immutable(1000)               :         2070.17 +/- 0.18% op/s
hamt(10000)                   :           96.09 +/- 0.72% op/s
hamt_plus(10000)              :          182.53 +/- 0.46% op/s
mori hash_map(10000)          :           39.72 +/- 0.32% op/s
immutable(10000)              :          201.80 +/- 0.34% op/s


remove nth
hashtrie(10)                  :      2034749.96 +/- 0.37% op/s
hamt(10)                      :      2171659.55 +/- 0.49% op/s
hamt_plus(10)                 :      1955524.36 +/- 0.11% op/s
persistent-hash-trie(10)      :       108574.84 +/- 0.19% op/s
mori hash_map(10)             :       724267.25 +/- 0.35% op/s
immutable(10)                 :      1505703.41 +/- 0.22% op/s
hashtrie(100)                 :      1401201.76 +/- 0.18% op/s
hamt(100)                     :      1514472.63 +/- 0.25% op/s
hamt_plus(100)                :      1346611.61 +/- 0.32% op/s
persistent-hash-trie(100)     :        48768.84 +/- 0.26% op/s
mori hash_map(100)            :       617114.30 +/- 0.28% op/s
immutable(100)                :       819386.85 +/- 0.35% op/s
hashtrie(1000)                :      1085480.40 +/- 0.24% op/s
hamt(1000)                    :      1281051.78 +/- 0.34% op/s
hamt_plus(1000)               :      1160702.18 +/- 0.37% op/s
persistent-hash-trie(1000)    :        33143.01 +/- 0.30% op/s
mori hash_map(1000)           :       324071.89 +/- 9.78% op/s
immutable(1000)               :       620015.54 +/- 0.17% op/s
hashtrie(10000)               :       793164.83 +/- 0.58% op/s
hamt(10000)                   :       932027.13 +/- 0.50% op/s
hamt_plus(10000)              :       836262.30 +/- 0.65% op/s
persistent-hash-trie(10000)   :        26809.72 +/- 0.31% op/s
mori hash_map(10000)          :       276344.93 +/- 0.50% op/s
immutable(10000)              :       494504.04 +/- 0.82% op/s
hashtrie(100000)              :       488928.05 +/- 0.42% op/s
hamt(100000)                  :       560601.74 +/- 0.50% op/s
hamt_plus(100000)             :       521495.95 +/- 0.28% op/s
persistent-hash-trie(100000)  :        12175.89 +/- 5.70% op/s
mori hash_map(100000)         :       189084.42 +/- 0.96% op/s
immutable(100000)             :       292806.61 +/- 11.06% op/s


Remove All
hashtrie(10)                  :       220739.86 +/- 0.12% op/s
hamt(10)                      :       246831.35 +/- 0.09% op/s
hamt_plus(10)                 :       202239.37 +/- 0.53% op/s
persistent-hash-trie(10)      :        22501.14 +/- 0.76% op/s
mori hash_map(10)             :        73561.99 +/- 0.20% op/s
immutable(10)                 :       166691.55 +/- 0.24% op/s
hashtrie(100)                 :        14957.93 +/- 0.20% op/s
hamt(100)                     :        18642.23 +/- 0.27% op/s
hamt_plus(100)                :        14869.45 +/- 0.14% op/s
persistent-hash-trie(100)     :         2133.18 +/- 0.12% op/s
mori hash_map(100)            :         6390.40 +/- 0.27% op/s
immutable(100)                :         9470.78 +/- 0.24% op/s
hashtrie(1000)                :         1139.70 +/- 0.24% op/s
hamt(1000)                    :         1360.85 +/- 0.22% op/s
hamt_plus(1000)               :         1109.40 +/- 0.32% op/s
persistent-hash-trie(1000)    :          918.02 +/- 0.29% op/s
mori hash_map(1000)           :          339.76 +/- 0.53% op/s
immutable(1000)               :          699.03 +/- 0.36% op/s
hashtrie(10000)               :           78.88 +/- 0.63% op/s
hamt(10000)                   :           91.07 +/- 1.62% op/s
hamt_plus(10000)              :           77.85 +/- 0.54% op/s
persistent-hash-trie(10000)   :          235.50 +/- 0.37% op/s
mori hash_map(10000)          :           30.26 +/- 1.32% op/s
immutable(10000)              :           49.86 +/- 1.22% op/s


Remove All (transient)
hamt(10)                      :       235272.09 +/- 4.89% op/s
hamt_plus(10)                 :       301004.43 +/- 0.17% op/s
mori hash_map(10)             :        68941.26 +/- 0.40% op/s
immutable(10)                 :       293279.38 +/- 0.13% op/s
hamt(100)                     :        19172.46 +/- 0.31% op/s
hamt_plus(100)                :        27781.26 +/- 0.16% op/s
mori hash_map(100)            :         5984.38 +/- 0.22% op/s
immutable(100)                :        28448.08 +/- 1.70% op/s
hamt(1000)                    :         1380.32 +/- 0.25% op/s
hamt_plus(1000)               :         2419.30 +/- 0.26% op/s
mori hash_map(1000)           :          380.11 +/- 0.60% op/s
immutable(1000)               :         2423.29 +/- 1.66% op/s
hamt(10000)                   :           92.97 +/- 0.97% op/s
hamt_plus(10000)              :          188.90 +/- 0.67% op/s
mori hash_map(10000)          :           26.92 +/- 5.32% op/s
immutable(10000)              :          221.63 +/- 1.12% op/s


Count
hashtrie(10)                  :       280545.57 +/- 0.17% op/s
hamt(10)                      :      4126864.62 +/- 0.22% op/s
hamt_plus(10)                 :      3930316.35 +/- 0.47% op/s
persistent-hash-trie(10)      :       163028.77 +/- 0.31% op/s
mori hash_map(10)             :     31325829.62 +/- 1.14% op/s
immutable(10)                 :     50779341.65 +/- 2.32% op/s
hashtrie(100)                 :        44295.85 +/- 0.11% op/s
hamt(100)                     :       446878.22 +/- 0.77% op/s
hamt_plus(100)                :       456997.55 +/- 0.07% op/s
persistent-hash-trie(100)     :         6590.55 +/- 1.96% op/s
mori hash_map(100)            :     30645818.93 +/- 0.25% op/s
immutable(100)                :     50243769.50 +/- 1.57% op/s
hashtrie(1000)                :         3805.54 +/- 0.13% op/s
hamt(1000)                    :        16238.59 +/- 0.34% op/s
hamt_plus(1000)               :        16120.66 +/- 0.05% op/s
persistent-hash-trie(1000)    :          676.91 +/- 0.33% op/s
mori hash_map(1000)           :     30902521.10 +/- 0.19% op/s
immutable(1000)               :     49809051.14 +/- 0.44% op/s
hashtrie(10000)               :          337.59 +/- 0.21% op/s
hamt(10000)                   :         3311.35 +/- 0.06% op/s
hamt_plus(10000)              :         3299.95 +/- 0.31% op/s
persistent-hash-trie(10000)   :          132.56 +/- 1.39% op/s
mori hash_map(10000)          :     31997447.82 +/- 1.12% op/s
immutable(10000)              :     48877420.66 +/- 0.21% op/s


Sum
hashtrie(10)                  :       335778.37 +/- 0.07% op/s
hamt(10)                      :      3683856.04 +/- 0.07% op/s
hamt_plus(10)                 :      3591690.05 +/- 0.65% op/s
persistent-hash-trie(10)      :       233300.24 +/- 1.68% op/s
mori hash_map(10)             :      1599636.22 +/- 0.36% op/s
immutable(10)                 :      1209243.63 +/- 0.63% op/s
hashtrie(100)                 :        45801.70 +/- 0.09% op/s
hamt(100)                     :       351255.04 +/- 0.07% op/s
hamt_plus(100)                :       350473.28 +/- 0.14% op/s
persistent-hash-trie(100)     :         6849.81 +/- 0.27% op/s
mori hash_map(100)            :       149371.29 +/- 0.12% op/s
immutable(100)                :       176109.84 +/- 0.79% op/s
hashtrie(1000)                :         3632.70 +/- 0.07% op/s
hamt(1000)                    :        16394.73 +/- 0.14% op/s
hamt_plus(1000)               :        16231.50 +/- 0.19% op/s
persistent-hash-trie(1000)    :          653.09 +/- 0.29% op/s
mori hash_map(1000)           :        11414.25 +/- 0.10% op/s
immutable(1000)               :        14885.79 +/- 0.40% op/s
hashtrie(10000)               :          340.37 +/- 0.18% op/s
hamt(10000)                   :         3545.79 +/- 0.36% op/s
hamt_plus(10000)              :         3484.97 +/- 0.08% op/s
persistent-hash-trie(10000)   :          134.70 +/- 1.47% op/s
mori hash_map(10000)          :         1438.93 +/- 0.16% op/s
immutable(10000)              :         1789.75 +/- 0.08% op/s


Keys
hashtrie(10)                  :       324948.18 +/- 0.20% op/s
hamt(10)                      :      2190709.85 +/- 0.19% op/s
hamt_plus(10)                 :      2141156.79 +/- 0.63% op/s
persistent-hash-trie(10)      :       190148.32 +/- 0.16% op/s
mori hash_map(10)             :       284966.86 +/- 0.35% op/s
immutable(10)                 :       175293.79 +/- 6.98% op/s
hashtrie(100)                 :        37144.17 +/- 1.63% op/s
hamt(100)                     :       241258.41 +/- 0.33% op/s
hamt_plus(100)                :       228272.23 +/- 0.13% op/s
persistent-hash-trie(100)     :         6842.31 +/- 0.16% op/s
mori hash_map(100)            :        27437.64 +/- 0.85% op/s
immutable(100)                :        82578.14 +/- 5.25% op/s
hashtrie(1000)                :         3455.91 +/- 1.34% op/s
hamt(1000)                    :        14714.91 +/- 0.84% op/s
hamt_plus(1000)               :        14096.48 +/- 1.85% op/s
persistent-hash-trie(1000)    :          667.44 +/- 0.24% op/s
mori hash_map(1000)           :         2244.73 +/- 0.35% op/s
immutable(1000)               :        12846.35 +/- 0.56% op/s
hashtrie(10000)               :          320.30 +/- 0.33% op/s
hamt(10000)                   :         2639.34 +/- 0.73% op/s
hamt_plus(10000)              :         2476.09 +/- 5.11% op/s
persistent-hash-trie(10000)   :          132.99 +/- 1.32% op/s
mori hash_map(10000)          :          204.39 +/- 0.77% op/s
immutable(10000)              :         1543.13 +/- 0.26% op/s
```




[hashtrie]: https://github.com/mattbierner/hashtrie
[hamt]: https://github.com/mattbierner/hamt
[hamt_plus]: https://github.com/mattbierner/hamt_plus
[mori]: https://github.com/swannodette/mori
[persistent]: https://github.com/hughfdjackson/persistent-hash-trie
[immutable]: https://github.com/facebook/immutable-js