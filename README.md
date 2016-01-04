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

Even as the size of the map increases, HAMT and HAMT+ often perform 2X or faster than the next fastest library in my testing.

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
Immutable performs well for most basic operations. `count` is
also a constant time operation. Transient mutation is one of the libraries strong points. 

Like Mori, Immutable is also a general purpose collection library with many other APIs and features not offered by the smaller libraries.


```
hashtrie - 0.2.2
hamt - 1.1.1
hamt_plus - 0.0.5
mori - 0.3.2
persistent-hash-trie - 0.4.2
immutable – 3.7.6 

mattbierner-mbp:js-hashtrie-benchmark mattbierner 

> hashtrie-benchmarks@0.0.0 benchmark /Users/mattbierner/Projects/js/js-hashtrie-benchmark
> node run.js
Get nth
hashtrie(10)                  :      7075578.42 +/- 0.71% op/s
hamt(10)                      :      6173734.03 +/- 0.74% op/s
hamt_plus(10)                 :      6335472.06 +/- 0.72% op/s
persistent-hash-trie(10)      :      5718358.87 +/- 0.72% op/s
mori hash_map(10)             :      1467312.93 +/- 0.85% op/s
immutable(10)                 :      5992700.39 +/- 0.75% op/s
hashtrie(100)                 :      6258613.55 +/- 0.82% op/s
hamt(100)                     :      5891414.06 +/- 0.84% op/s
hamt_plus(100)                :      6192621.20 +/- 0.75% op/s
persistent-hash-trie(100)     :      2100209.18 +/- 0.83% op/s
mori hash_map(100)            :      1428016.25 +/- 0.71% op/s
immutable(100)                :      5880230.89 +/- 0.71% op/s
hashtrie(1000)                :      5145870.39 +/- 0.82% op/s
hamt(1000)                    :      4997196.76 +/- 0.77% op/s
hamt_plus(1000)               :      5165959.47 +/- 0.75% op/s
persistent-hash-trie(1000)    :      1199445.60 +/- 0.78% op/s
mori hash_map(1000)           :       312801.12 +/- 3.08% op/s
immutable(1000)               :      4594636.39 +/- 0.74% op/s
hashtrie(10000)               :      4229938.93 +/- 0.77% op/s
hamt(10000)                   :      4444068.04 +/- 0.76% op/s
hamt_plus(10000)              :      4285235.49 +/- 0.90% op/s
persistent-hash-trie(10000)   :       714583.82 +/- 0.83% op/s
mori hash_map(10000)          :       264594.81 +/- 5.48% op/s
immutable(10000)              :      3996948.71 +/- 0.79% op/s
hashtrie(100000)              :      1386669.91 +/- 0.62% op/s
hamt(100000)                  :      1487907.88 +/- 0.58% op/s
hamt_plus(100000)             :      1447132.39 +/- 0.65% op/s
persistent-hash-trie(100000)  :       788477.30 +/- 0.65% op/s
mori hash_map(100000)         :       255605.46 +/- 1.16% op/s
immutable(100000)             :      1050898.45 +/- 0.68% op/s


put nth
hashtrie(10)                  :      1812577.73 +/- 0.65% op/s
hamt(10)                      :      3384786.26 +/- 0.68% op/s
hamt_plus(10)                 :      1282610.17 +/- 0.67% op/s
persistent-hash-trie(10)      :       116293.22 +/- 1.39% op/s
mori hash_map(10)             :       950241.14 +/- 8.21% op/s
immutable(10)                 :      1720820.37 +/- 0.77% op/s
hashtrie(100)                 :       309031.84 +/- 9.80% op/s
hamt(100)                     :       944856.10 +/- 0.59% op/s
hamt_plus(100)                :       822370.16 +/- 0.67% op/s
persistent-hash-trie(100)     :        49154.15 +/- 0.74% op/s
mori hash_map(100)            :       798166.90 +/- 0.87% op/s
immutable(100)                :       614485.67 +/- 6.36% op/s
hashtrie(1000)                :       687942.24 +/- 1.09% op/s
hamt(1000)                    :       743685.35 +/- 0.59% op/s
hamt_plus(1000)               :       563824.48 +/- 0.75% op/s
persistent-hash-trie(1000)    :        31955.76 +/- 0.71% op/s
mori hash_map(1000)           :       613134.93 +/- 0.72% op/s
immutable(1000)               :       568910.06 +/- 0.70% op/s
hashtrie(10000)               :       613862.52 +/- 0.79% op/s
hamt(10000)                   :       639574.08 +/- 0.60% op/s
hamt_plus(10000)              :       571174.99 +/- 1.03% op/s
persistent-hash-trie(10000)   :        22639.20 +/- 0.73% op/s
mori hash_map(10000)          :       511174.01 +/- 0.65% op/s
immutable(10000)              :       434736.65 +/- 7.26% op/s
hashtrie(100000)              :       535853.85 +/- 0.69% op/s
hamt(100000)                  :       520765.05 +/- 0.64% op/s
hamt_plus(100000)             :       446904.21 +/- 0.73% op/s
persistent-hash-trie(100000)  :        12307.10 +/- 0.71% op/s
mori hash_map(100000)         :       418544.34 +/- 0.62% op/s
immutable(100000)             :       440104.61 +/- 0.61% op/s


Put All
hashtrie(10)                  :       188344.84 +/- 0.64% op/s
hamt(10)                      :       296410.86 +/- 1.47% op/s
hamt_plus(10)                 :       131117.91 +/- 1.34% op/s
persistent-hash-trie(10)      :        13787.96 +/- 0.96% op/s
mori hash_map(10)             :        47997.02 +/- 0.72% op/s
immutable(10)                 :       107207.05 +/- 0.64% op/s
hashtrie(100)                 :        12096.39 +/- 3.72% op/s
hamt(100)                     :        12955.25 +/- 0.67% op/s
hamt_plus(100)                :        10263.83 +/- 0.78% op/s
persistent-hash-trie(100)     :          455.37 +/- 0.98% op/s
mori hash_map(100)            :         6184.47 +/- 0.73% op/s
immutable(100)                :         9086.29 +/- 3.69% op/s
hashtrie(1000)                :          928.13 +/- 1.95% op/s
hamt(1000)                    :          935.97 +/- 0.68% op/s
hamt_plus(1000)               :          761.96 +/- 0.65% op/s
persistent-hash-trie(1000)    :           28.85 +/- 0.95% op/s
mori hash_map(1000)           :          168.51 +/- 2.74% op/s
immutable(1000)               :          728.50 +/- 0.59% op/s
hashtrie(10000)               :           66.39 +/- 1.95% op/s
hamt(10000)                   :           69.41 +/- 0.74% op/s
hamt_plus(10000)              :           55.10 +/- 0.93% op/s
persistent-hash-trie(10000)   :            1.49 +/- 2.95% op/s
mori hash_map(10000)          :           16.98 +/- 1.45% op/s
immutable(10000)              :           53.92 +/- 1.04% op/s


Put All (transient)
hamt(10)                      :       302713.10 +/- 0.67% op/s
hamt_plus(10)                 :       238968.63 +/- 0.73% op/s
mori hash_map(10)             :        63955.09 +/- 1.65% op/s
immutable(10)                 :       146797.41 +/- 0.72% op/s
hamt(100)                     :        13020.72 +/- 0.69% op/s
hamt_plus(100)                :        23218.65 +/- 0.63% op/s
mori hash_map(100)            :        10466.62 +/- 1.18% op/s
immutable(100)                :        25700.07 +/- 0.67% op/s
hamt(1000)                    :          937.25 +/- 0.65% op/s
hamt_plus(1000)               :         2151.77 +/- 0.86% op/s
mori hash_map(1000)           :          206.65 +/- 1.62% op/s
immutable(1000)               :         2552.53 +/- 0.97% op/s
hamt(10000)                   :           68.09 +/- 0.96% op/s
hamt_plus(10000)              :          179.45 +/- 0.77% op/s
mori hash_map(10000)          :           23.71 +/- 2.45% op/s
immutable(10000)              :          239.04 +/- 1.00% op/s


remove nth
hashtrie(10)                  :      1740879.46 +/- 0.75% op/s
hamt(10)                      :      3408592.37 +/- 0.80% op/s
hamt_plus(10)                 :      1204142.31 +/- 0.77% op/s
persistent-hash-trie(10)      :        79775.00 +/- 0.76% op/s
mori hash_map(10)             :      1006579.74 +/- 0.97% op/s
immutable(10)                 :      1323768.56 +/- 0.63% op/s
hashtrie(100)                 :      1009906.50 +/- 0.70% op/s
hamt(100)                     :      1208797.45 +/- 0.67% op/s
hamt_plus(100)                :       936806.71 +/- 0.72% op/s
persistent-hash-trie(100)     :        25026.27 +/- 0.64% op/s
mori hash_map(100)            :       741305.36 +/- 0.93% op/s
immutable(100)                :       728359.70 +/- 5.38% op/s
hashtrie(1000)                :       741140.21 +/- 0.75% op/s
hamt(1000)                    :       775132.32 +/- 0.63% op/s
hamt_plus(1000)               :       733764.43 +/- 0.67% op/s
persistent-hash-trie(1000)    :        17939.74 +/- 0.83% op/s
mori hash_map(1000)           :       231661.59 +/- 0.64% op/s
immutable(1000)               :       578198.74 +/- 0.70% op/s
hashtrie(10000)               :       552050.41 +/- 0.68% op/s
hamt(10000)                   :       649235.15 +/- 0.74% op/s
hamt_plus(10000)              :       465913.24 +/- 1.31% op/s
persistent-hash-trie(10000)   :         9395.28 +/- 0.67% op/s
mori hash_map(10000)          :       194214.73 +/- 0.73% op/s
immutable(10000)              :       495345.85 +/- 0.78% op/s
hashtrie(100000)              :       376368.71 +/- 0.62% op/s
hamt(100000)                  :       388827.71 +/- 0.65% op/s
hamt_plus(100000)             :       334845.08 +/- 0.68% op/s
persistent-hash-trie(100000)  :         3519.55 +/- 4.79% op/s
mori hash_map(100000)         :       158729.04 +/- 0.79% op/s
immutable(100000)             :       300558.46 +/- 0.80% op/s


Remove All
hashtrie(10)                  :       167171.94 +/- 0.75% op/s
hamt(10)                      :       429769.70 +/- 0.64% op/s
hamt_plus(10)                 :       154814.30 +/- 0.76% op/s
persistent-hash-trie(10)      :        13414.07 +/- 0.71% op/s
mori hash_map(10)             :       100008.12 +/- 0.72% op/s
immutable(10)                 :       189229.43 +/- 0.71% op/s
hashtrie(100)                 :        11733.75 +/- 0.74% op/s
hamt(100)                     :        13407.56 +/- 0.83% op/s
hamt_plus(100)                :        11718.62 +/- 0.73% op/s
persistent-hash-trie(100)     :         1112.20 +/- 0.72% op/s
mori hash_map(100)            :         6439.06 +/- 0.73% op/s
immutable(100)                :         8620.65 +/- 0.76% op/s
hashtrie(1000)                :          845.03 +/- 0.74% op/s
hamt(1000)                    :          867.96 +/- 0.73% op/s
hamt_plus(1000)               :          818.32 +/- 0.87% op/s
persistent-hash-trie(1000)    :          531.75 +/- 0.69% op/s
mori hash_map(1000)           :          227.75 +/- 0.79% op/s
immutable(1000)               :          647.25 +/- 0.69% op/s
hashtrie(10000)               :           58.56 +/- 0.85% op/s
hamt(10000)                   :           63.32 +/- 1.01% op/s
hamt_plus(10000)              :           53.04 +/- 0.95% op/s
persistent-hash-trie(10000)   :          176.27 +/- 0.69% op/s
mori hash_map(10000)          :           19.11 +/- 0.85% op/s
immutable(10000)              :           49.00 +/- 0.88% op/s


Remove All (transient)
hamt(10)                      :       390797.61 +/- 0.80% op/s
hamt_plus(10)                 :       216777.71 +/- 0.84% op/s
mori hash_map(10)             :        59367.81 +/- 4.83% op/s
immutable(10)                 :       353842.00 +/- 0.66% op/s
hamt(100)                     :        14018.95 +/- 0.71% op/s
hamt_plus(100)                :        22432.08 +/- 0.79% op/s
mori hash_map(100)            :         8083.72 +/- 1.17% op/s
immutable(100)                :        33806.98 +/- 0.77% op/s
hamt(1000)                    :          875.90 +/- 0.64% op/s
hamt_plus(1000)               :         2282.91 +/- 0.75% op/s
mori hash_map(1000)           :          238.22 +/- 0.66% op/s
immutable(1000)               :         3011.69 +/- 1.19% op/s
hamt(10000)                   :           65.23 +/- 0.96% op/s
hamt_plus(10000)              :          165.02 +/- 0.87% op/s
mori hash_map(10000)          :           22.63 +/- 0.94% op/s
immutable(10000)              :          255.35 +/- 0.97% op/s


Count
hashtrie(10)                  :      1111732.45 +/- 0.63% op/s
hamt(10)                      :      5288333.13 +/- 0.80% op/s
hamt_plus(10)                 :      5869745.57 +/- 0.92% op/s
persistent-hash-trie(10)      :       143556.07 +/- 0.70% op/s
mori hash_map(10)             :     35720455.73 +/- 0.81% op/s
immutable(10)                 :     38117423.06 +/- 0.91% op/s
hashtrie(100)                 :       100023.51 +/- 0.77% op/s
hamt(100)                     :       395332.57 +/- 0.73% op/s
hamt_plus(100)                :       415471.65 +/- 0.64% op/s
persistent-hash-trie(100)     :         5841.77 +/- 2.79% op/s
mori hash_map(100)            :     32731810.33 +/- 0.94% op/s
immutable(100)                :     35995327.68 +/- 0.72% op/s
hashtrie(1000)                :         9608.97 +/- 0.82% op/s
hamt(1000)                    :        27255.06 +/- 0.76% op/s
hamt_plus(1000)               :        24042.54 +/- 0.64% op/s
persistent-hash-trie(1000)    :          594.24 +/- 2.12% op/s
mori hash_map(1000)           :     30782572.64 +/- 1.08% op/s
immutable(1000)               :     34750697.55 +/- 0.85% op/s
hashtrie(10000)               :          933.49 +/- 0.67% op/s
hamt(10000)                   :         4162.36 +/- 0.77% op/s
hamt_plus(10000)              :         4207.60 +/- 0.78% op/s
persistent-hash-trie(10000)   :           74.02 +/- 2.43% op/s
mori hash_map(10000)          :     31554117.11 +/- 1.10% op/s
immutable(10000)              :     35056294.74 +/- 1.05% op/s


Sum
hashtrie(10)                  :      1693190.44 +/- 0.76% op/s
hamt(10)                      :      2896911.25 +/- 0.71% op/s
hamt_plus(10)                 :      3909968.20 +/- 0.97% op/s
persistent-hash-trie(10)      :       171147.17 +/- 1.76% op/s
mori hash_map(10)             :      2647422.51 +/- 0.79% op/s
immutable(10)                 :      1495212.23 +/- 1.09% op/s
hashtrie(100)                 :       108183.02 +/- 0.73% op/s
hamt(100)                     :       232730.27 +/- 0.79% op/s
hamt_plus(100)                :       297555.39 +/- 1.45% op/s
persistent-hash-trie(100)     :         5542.92 +/- 1.56% op/s
mori hash_map(100)            :       225720.98 +/- 0.75% op/s
immutable(100)                :       172655.68 +/- 0.88% op/s
hashtrie(1000)                :         8596.59 +/- 0.68% op/s
hamt(1000)                    :        19102.21 +/- 0.73% op/s
hamt_plus(1000)               :        21336.12 +/- 0.88% op/s
persistent-hash-trie(1000)    :          581.32 +/- 1.51% op/s
mori hash_map(1000)           :        17600.36 +/- 0.79% op/s
immutable(1000)               :        14357.60 +/- 0.72% op/s
hashtrie(10000)               :          854.60 +/- 0.76% op/s
hamt(10000)                   :         2644.42 +/- 0.76% op/s
hamt_plus(10000)              :         3349.60 +/- 0.84% op/s
persistent-hash-trie(10000)   :           70.70 +/- 2.06% op/s
mori hash_map(10000)          :         2251.94 +/- 0.73% op/s
immutable(10000)              :         1653.45 +/- 0.73% op/s


Keys
hashtrie(10)                  :       864494.70 +/- 3.87% op/s
hamt(10)                      :      2080188.17 +/- 0.94% op/s
hamt_plus(10)                 :      2268197.48 +/- 1.37% op/s
persistent-hash-trie(10)      :        72798.95 +/- 0.76% op/s
mori hash_map(10)             :       332486.93 +/- 2.57% op/s
immutable(10)                 :            0.00 +/- 0.00% op/s
hashtrie(100)                 :        77486.87 +/- 0.96% op/s
hamt(100)                     :       193574.14 +/- 0.68% op/s
hamt_plus(100)                :       201681.40 +/- 0.66% op/s
persistent-hash-trie(100)     :         5700.41 +/- 0.75% op/s
mori hash_map(100)            :        30328.84 +/- 0.55% op/s
immutable(100)                :            0.00 +/- 0.00% op/s
hashtrie(1000)                :         7714.94 +/- 0.67% op/s
hamt(1000)                    :        16021.04 +/- 0.59% op/s
hamt_plus(1000)               :        15446.33 +/- 0.60% op/s
persistent-hash-trie(1000)    :          612.71 +/- 0.77% op/s
mori hash_map(1000)           :         2191.10 +/- 0.66% op/s
immutable(1000)               :            0.00 +/- 0.00% op/s
hashtrie(10000)               :          733.06 +/- 0.60% op/s
hamt(10000)                   :         1901.43 +/- 0.57% op/s
hamt_plus(10000)              :         1942.21 +/- 0.54% op/s
persistent-hash-trie(10000)   :           76.02 +/- 0.87% op/s
mori hash_map(10000)          :          207.14 +/- 0.86% op/s
immutable(10000)              :            0.00 +/- 0.00% op/s

```




[hashtrie]: https://github.com/mattbierner/hashtrie
[hamt]: https://github.com/mattbierner/hamt
[hamt_plus]: https://github.com/mattbierner/hamt_plus
[mori]: https://github.com/swannodette/mori
[persistent]: https://github.com/hughfdjackson/persistent-hash-trie
[immutable]: https://github.com/facebook/immutable-js


[clojurescript]: https://github.com/clojure/clojurescript
[khepri]: http://khepri-lang.com

