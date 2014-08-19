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
The API is richer and will be familiar to  OO programmers. Overall, Mori seems like
the better choice if you need a general purpose collection library.


```
hashtrie - 0.2.2
hamt - 0.1.4
hamt_plus - 0.0.0
mori - 0.2.9
persistent-hash-trie - 0.4.2
immutable: 2.0.11

bash-3.2$ npm run benchmark

> hashtrie-benchmarks@0.0.0 benchmark /Users/mattbierner/Projects/js/js-hashtrie-benchmark
> node run.js

Get nth
hashtrie(10)                  :      7713358.86 +/- 0.50% op/s
hamt(10)                      :      6703898.95 +/- 0.09% op/s
hamt_plus(10)                 :      6202960.35 +/- 0.17% op/s
persistent-hash-trie(10)      :      3957727.24 +/- 2.54% op/s
mori hash_map(10)             :      1431293.46 +/- 0.88% op/s
immutable(10)                 :      2855468.54 +/- 0.45% op/s
hashtrie(100)                 :      6531507.77 +/- 0.07% op/s
hamt(100)                     :      6043711.46 +/- 2.15% op/s
hamt_plus(100)                :      5346262.02 +/- 0.08% op/s
persistent-hash-trie(100)     :      2210603.65 +/- 0.22% op/s
mori hash_map(100)            :      1360271.45 +/- 0.68% op/s
immutable(100)                :      2259680.77 +/- 0.24% op/s
hashtrie(1000)                :      5405629.76 +/- 0.08% op/s
hamt(1000)                    :      5419084.86 +/- 0.08% op/s
hamt_plus(1000)               :      4868667.26 +/- 0.09% op/s
persistent-hash-trie(1000)    :      1195116.53 +/- 3.55% op/s
mori hash_map(1000)           :       675569.41 +/- 0.46% op/s
immutable(1000)               :       804037.05 +/- 2.72% op/s
hashtrie(10000)               :      4509367.45 +/- 0.09% op/s
hamt(10000)                   :      4823390.55 +/- 0.28% op/s
hamt_plus(10000)              :      4280763.68 +/- 0.19% op/s
persistent-hash-trie(10000)   :       983086.93 +/- 0.67% op/s
mori hash_map(10000)          :       517906.78 +/- 2.89% op/s
immutable(10000)              :       661988.81 +/- 0.51% op/s
hashtrie(100000)              :      1346252.62 +/- 0.07% op/s
hamt(100000)                  :      1431712.88 +/- 0.12% op/s
hamt_plus(100000)             :      1355807.28 +/- 0.73% op/s
persistent-hash-trie(100000)  :       746848.98 +/- 0.41% op/s
mori hash_map(100000)         :       369715.08 +/- 4.55% op/s
immutable(100000)             :       355209.46 +/- 0.99% op/s


put nth
hashtrie(10)                  :      2376320.02 +/- 0.43% op/s
hamt(10)                      :      1920719.73 +/- 0.43% op/s
hamt_plus(10)                 :      1727984.56 +/- 0.15% op/s
persistent-hash-trie(10)      :       106005.82 +/- 0.13% op/s
mori hash_map(10)             :       750003.41 +/- 9.06% op/s
immutable(10)                 :       923538.09 +/- 0.13% op/s
hashtrie(100)                 :      1666020.70 +/- 0.29% op/s
hamt(100)                     :      1443700.84 +/- 0.11% op/s
hamt_plus(100)                :      1320160.03 +/- 0.15% op/s
persistent-hash-trie(100)     :        72044.75 +/- 0.15% op/s
mori hash_map(100)            :       810379.69 +/- 0.54% op/s
immutable(100)                :       408671.96 +/- 0.31% op/s
hashtrie(1000)                :       851537.60 +/- 0.10% op/s
hamt(1000)                    :      1446222.92 +/- 0.19% op/s
hamt_plus(1000)               :      1307335.52 +/- 0.21% op/s
persistent-hash-trie(1000)    :        49938.88 +/- 0.20% op/s
mori hash_map(1000)           :       767085.33 +/- 0.34% op/s
immutable(1000)               :       212738.71 +/- 0.19% op/s
hashtrie(10000)               :       987502.26 +/- 0.28% op/s
hamt(10000)                   :      1134860.21 +/- 0.16% op/s
hamt_plus(10000)              :      1031681.08 +/- 0.34% op/s
persistent-hash-trie(10000)   :        53389.64 +/- 0.29% op/s
mori hash_map(10000)          :       568017.48 +/- 0.35% op/s
immutable(10000)              :       189080.79 +/- 0.23% op/s
hashtrie(100000)              :       765287.56 +/- 0.27% op/s
hamt(100000)                  :       767875.80 +/- 0.33% op/s
hamt_plus(100000)             :       697484.37 +/- 0.36% op/s
persistent-hash-trie(100000)  :        20885.28 +/- 0.29% op/s
mori hash_map(100000)         :       519385.69 +/- 0.38% op/s
immutable(100000)             :       339469.67 +/- 0.21% op/s


Put All
hashtrie(10)                  :       200020.99 +/- 0.17% op/s
hamt(10)                      :       219307.07 +/- 0.11% op/s
hamt_plus(10)                 :       193788.48 +/- 6.91% op/s
persistent-hash-trie(10)      :        38416.68 +/- 1.54% op/s
mori hash_map(10)             :        68483.49 +/- 0.22% op/s
immutable(10)                 :        52045.45 +/- 0.11% op/s
hashtrie(100)                 :        15600.56 +/- 0.08% op/s
hamt(100)                     :        16226.33 +/- 0.12% op/s
hamt_plus(100)                :        14318.20 +/- 0.16% op/s
persistent-hash-trie(100)     :         1016.63 +/- 0.20% op/s
mori hash_map(100)            :         6845.45 +/- 0.15% op/s
immutable(100)                :         4442.48 +/- 0.09% op/s
hashtrie(1000)                :         1183.15 +/- 0.20% op/s
hamt(1000)                    :         1225.15 +/- 0.18% op/s
hamt_plus(1000)               :         1084.81 +/- 0.24% op/s
persistent-hash-trie(1000)    :           62.87 +/- 0.25% op/s
mori hash_map(1000)           :          316.21 +/- 0.23% op/s
immutable(1000)               :          252.72 +/- 0.26% op/s
hashtrie(10000)               :           85.29 +/- 0.06% op/s
hamt(10000)                   :           92.54 +/- 7.66% op/s
hamt_plus(10000)              :           89.44 +/- 0.51% op/s
persistent-hash-trie(10000)   :            4.90 +/- 0.27% op/s
mori hash_map(10000)          :           35.36 +/- 1.03% op/s
immutable(10000)              :           23.52 +/- 0.91% op/s


Put All (transient)
hamt(10)                      :       232142.92 +/- 0.11% op/s
hamt_plus(10)                 :       292696.47 +/- 0.18% op/s
mori hash_map(10)             :       121193.90 +/- 0.40% op/s
immutable(10)                 :       168030.32 +/- 0.74% op/s
hamt(100)                     :        16506.81 +/- 0.15% op/s
hamt_plus(100)                :        25279.75 +/- 4.62% op/s
mori hash_map(100)            :         9203.76 +/- 0.13% op/s
immutable(100)                :        12086.63 +/- 0.10% op/s
hamt(1000)                    :         1258.51 +/- 0.11% op/s
hamt_plus(1000)               :         2244.81 +/- 0.08% op/s
mori hash_map(1000)           :          374.99 +/- 0.22% op/s
immutable(1000)               :          529.28 +/- 0.17% op/s
hamt(10000)                   :           95.26 +/- 0.59% op/s
hamt_plus(10000)              :          213.44 +/- 0.25% op/s
mori hash_map(10000)          :           45.80 +/- 0.40% op/s
immutable(10000)              :           50.88 +/- 0.75% op/s


remove nth
hashtrie(10)                  :      1959236.37 +/- 0.23% op/s
hamt(10)                      :      2132876.18 +/- 0.51% op/s
hamt_plus(10)                 :      1889326.85 +/- 0.27% op/s
persistent-hash-trie(10)      :       146147.63 +/- 0.12% op/s
mori hash_map(10)             :      1012533.57 +/- 0.16% op/s
immutable(10)                 :       610131.36 +/- 9.53% op/s
hashtrie(100)                 :      1409914.00 +/- 0.19% op/s
hamt(100)                     :      1584637.44 +/- 0.13% op/s
hamt_plus(100)                :      1476488.65 +/- 0.12% op/s
persistent-hash-trie(100)     :        49941.00 +/- 0.18% op/s
mori hash_map(100)            :       824012.60 +/- 0.12% op/s
immutable(100)                :       427724.71 +/- 0.16% op/s
hashtrie(1000)                :      1093275.04 +/- 0.15% op/s
hamt(1000)                    :      1298339.48 +/- 0.16% op/s
hamt_plus(1000)               :      1262703.25 +/- 0.16% op/s
persistent-hash-trie(1000)    :        33837.96 +/- 0.19% op/s
mori hash_map(1000)           :       417911.16 +/- 0.53% op/s
immutable(1000)               :       255074.67 +/- 0.31% op/s
hashtrie(10000)               :       767336.93 +/- 0.12% op/s
hamt(10000)                   :       907807.80 +/- 0.26% op/s
hamt_plus(10000)              :       835149.55 +/- 0.96% op/s
persistent-hash-trie(10000)   :        27088.50 +/- 0.30% op/s
mori hash_map(10000)          :       299571.33 +/- 10.95% op/s
immutable(10000)              :       210573.69 +/- 0.19% op/s
hashtrie(100000)              :       510552.60 +/- 0.19% op/s
hamt(100000)                  :       565377.38 +/- 0.12% op/s
hamt_plus(100000)             :       558210.39 +/- 0.09% op/s
persistent-hash-trie(100000)  :        12550.82 +/- 2.35% op/s
mori hash_map(100000)         :       216129.32 +/- 0.67% op/s
immutable(100000)             :       139919.26 +/- 0.35% op/s


Remove All
hashtrie(10)                  :       248185.74 +/- 0.23% op/s
hamt(10)                      :       269533.30 +/- 0.18% op/s
hamt_plus(10)                 :       218085.63 +/- 0.57% op/s
persistent-hash-trie(10)      :        15627.13 +/- 0.14% op/s
mori hash_map(10)             :        94359.06 +/- 6.12% op/s
immutable(10)                 :        73463.56 +/- 0.11% op/s
hashtrie(100)                 :        15526.58 +/- 0.36% op/s
hamt(100)                     :        20160.80 +/- 0.15% op/s
hamt_plus(100)                :        17457.14 +/- 0.14% op/s
persistent-hash-trie(100)     :         2387.59 +/- 0.20% op/s
mori hash_map(100)            :         8015.05 +/- 0.08% op/s
immutable(100)                :         5026.30 +/- 0.17% op/s
hashtrie(1000)                :         1183.46 +/- 0.14% op/s
hamt(1000)                    :         1471.75 +/- 0.07% op/s
hamt_plus(1000)               :         1296.91 +/- 0.28% op/s
persistent-hash-trie(1000)    :          901.99 +/- 0.26% op/s
mori hash_map(1000)           :          422.64 +/- 0.37% op/s
immutable(1000)               :          270.09 +/- 0.43% op/s
hashtrie(10000)               :           80.81 +/- 0.39% op/s
hamt(10000)                   :          101.16 +/- 0.10% op/s
hamt_plus(10000)              :           86.51 +/- 1.55% op/s
persistent-hash-trie(10000)   :          246.46 +/- 0.20% op/s
mori hash_map(10000)          :           36.03 +/- 8.90% op/s
immutable(10000)              :           22.49 +/- 1.48% op/s


Remove All (transient)
hamt(10)                      :       274408.63 +/- 0.11% op/s
hamt_plus(10)                 :       331620.29 +/- 0.15% op/s
mori hash_map(10)             :        75995.50 +/- 0.99% op/s
immutable(10)                 :       128441.70 +/- 0.16% op/s
hamt(100)                     :        19891.81 +/- 0.12% op/s
hamt_plus(100)                :        32083.81 +/- 0.17% op/s
mori hash_map(100)            :         7346.81 +/- 0.08% op/s
immutable(100)                :        11147.07 +/- 0.21% op/s
hamt(1000)                    :         1447.24 +/- 0.13% op/s
hamt_plus(1000)               :         2941.02 +/- 0.21% op/s
mori hash_map(1000)           :          454.55 +/- 1.25% op/s
immutable(1000)               :          546.26 +/- 3.02% op/s
hamt(10000)                   :           77.90 +/- 1.37% op/s
hamt_plus(10000)              :          226.66 +/- 2.34% op/s
mori hash_map(10000)          :           40.94 +/- 3.84% op/s
immutable(10000)              :           52.09 +/- 1.73% op/s


Count
hashtrie(10)                  :       590337.93 +/- 0.07% op/s
hamt(10)                      :      7563215.11 +/- 0.05% op/s
hamt_plus(10)                 :      7124316.21 +/- 0.39% op/s
persistent-hash-trie(10)      :       233545.13 +/- 0.36% op/s
mori hash_map(10)             :     28267218.72 +/- 0.13% op/s
immutable(10)                 :     45333250.15 +/- 2.51% op/s
hashtrie(100)                 :        39717.84 +/- 0.09% op/s
hamt(100)                     :       389816.60 +/- 0.16% op/s
hamt_plus(100)                :       383520.86 +/- 0.10% op/s
persistent-hash-trie(100)     :         6134.49 +/- 2.30% op/s
mori hash_map(100)            :     29013229.19 +/- 0.59% op/s
immutable(100)                :     43573540.87 +/- 2.19% op/s
hashtrie(1000)                :         3699.31 +/- 0.03% op/s
hamt(1000)                    :        16965.13 +/- 0.10% op/s
hamt_plus(1000)               :        17002.07 +/- 0.19% op/s
persistent-hash-trie(1000)    :          660.01 +/- 0.30% op/s
mori hash_map(1000)           :     29101083.21 +/- 0.45% op/s
immutable(1000)               :     43154276.24 +/- 0.21% op/s
hashtrie(10000)               :          344.67 +/- 0.17% op/s
hamt(10000)                   :         3254.76 +/- 0.10% op/s
hamt_plus(10000)              :         3205.78 +/- 0.02% op/s
persistent-hash-trie(10000)   :          152.56 +/- 0.32% op/s
mori hash_map(10000)          :     28396723.55 +/- 0.19% op/s
immutable(10000)              :     44342875.50 +/- 2.25% op/s


Sum
hashtrie(10)                  :       548902.15 +/- 5.71% op/s
hamt(10)                      :      5506160.64 +/- 0.19% op/s
hamt_plus(10)                 :      4777638.86 +/- 4.42% op/s
persistent-hash-trie(10)      :       157118.24 +/- 1.40% op/s
mori hash_map(10)             :      1609958.75 +/- 0.25% op/s
immutable(10)                 :       336365.44 +/- 1.32% op/s
hashtrie(100)                 :        39251.79 +/- 0.39% op/s
hamt(100)                     :       332819.37 +/- 0.87% op/s
hamt_plus(100)                :       330184.94 +/- 0.38% op/s
persistent-hash-trie(100)     :         6356.95 +/- 1.14% op/s
mori hash_map(100)            :       143423.42 +/- 0.53% op/s
immutable(100)                :         8581.52 +/- 0.17% op/s
hashtrie(1000)                :         3590.74 +/- 0.10% op/s
hamt(1000)                    :        17385.23 +/- 0.95% op/s
hamt_plus(1000)               :        16476.81 +/- 0.13% op/s
persistent-hash-trie(1000)    :          639.78 +/- 0.22% op/s
mori hash_map(1000)           :        11193.30 +/- 0.93% op/s
immutable(1000)               :          994.94 +/- 0.11% op/s
hashtrie(10000)               :          336.83 +/- 0.90% op/s
hamt(10000)                   :         3375.32 +/- 1.25% op/s
hamt_plus(10000)              :         3382.66 +/- 1.98% op/s
persistent-hash-trie(10000)   :          143.80 +/- 1.51% op/s
mori hash_map(10000)          :         1480.30 +/- 1.60% op/s
immutable(10000)              :          122.50 +/- 0.57% op/s


 Keys
hashtrie(10)                  :       381923.24 +/- 0.24% op/s
hamt(10)                      :      2310032.07 +/- 0.12% op/s
hamt_plus(10)                 :      2690158.53 +/- 0.32% op/s
persistent-hash-trie(10)      :       184997.69 +/- 0.18% op/s
mori hash_map(10)             :       376637.35 +/- 0.21% op/s
immutable(10)                 :        85266.53 +/- 5.08% op/s
hashtrie(100)                 :        37133.17 +/- 0.53% op/s
hamt(100)                     :       257927.82 +/- 0.14% op/s
hamt_plus(100)                :       268325.55 +/- 0.13% op/s
persistent-hash-trie(100)     :         6881.87 +/- 0.16% op/s
mori hash_map(100)            :        26717.75 +/- 0.18% op/s
immutable(100)                :         8863.70 +/- 1.06% op/s
hashtrie(1000)                :         3262.12 +/- 4.48% op/s
hamt(1000)                    :        14665.25 +/- 0.69% op/s
hamt_plus(1000)               :        14651.92 +/- 2.86% op/s
persistent-hash-trie(1000)    :          654.06 +/- 0.23% op/s
mori hash_map(1000)           :         2104.06 +/- 1.58% op/s
immutable(1000)               :          923.88 +/- 0.25% op/s
hashtrie(10000)               :          325.30 +/- 1.30% op/s
hamt(10000)                   :         2610.66 +/- 0.70% op/s
hamt_plus(10000)              :         2619.05 +/- 0.90% op/s
persistent-hash-trie(10000)   :          146.49 +/- 1.00% op/s
mori hash_map(10000)          :          193.92 +/- 0.53% op/s
immutable(10000)              :          120.52 +/- 0.18% op/s


```




[hashtrie]: https://github.com/mattbierner/hashtrie
[hamt]: https://github.com/mattbierner/hamt
[hamt_plus]: https://github.com/mattbierner/hamt_plus
[mori]: https://github.com/swannodette/mori
[persistent]: https://github.com/hughfdjackson/persistent-hash-trie
[immutable]: https://github.com/facebook/immutable-js