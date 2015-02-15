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

Even as the size of the map increases, HAMT and HAMT+ often perform 2X or faster than the next fastest library.

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
also a constant time operation. Transient mutation is one of the libraries strong points. 

Unlike Mori which uses [ClojureScript][ClojureScript] and the HAMT libraries which are written in [Khepri][khepri],
Immutable is written in regular Javascript. Like Mori, Immutable is also a general
purpose collection library. Its API is richer and will be familiar to  OO programmers. 


```
hashtrie - 0.2.2
hamt - 0.1.7
hamt_plus - 0.0.5
mori - 0.3.2
persistent-hash-trie - 0.4.2
immutable: 3.6.2

mattbierner-mbp:js-hashtrie-benchmark mattbierner 

> hashtrie-benchmarks@0.0.0 benchmark /Users/mattbierner/Projects/js/js-hashtrie-benchmark
> node run.js

Get nth
hashtrie(10)                  :      7511197.27 +/- 0.59% op/s
hamt(10)                      :      6741623.51 +/- 1.38% op/s
hamt_plus(10)                 :      6260988.01 +/- 1.17% op/s
persistent-hash-trie(10)      :      3287025.27 +/- 1.85% op/s
mori hash_map(10)             :      1125746.64 +/- 2.42% op/s
immutable(10)                 :      2813928.95 +/- 0.26% op/s
hashtrie(100)                 :      6421418.49 +/- 0.57% op/s
hamt(100)                     :      6085976.22 +/- 0.58% op/s
hamt_plus(100)                :      5220959.60 +/- 1.67% op/s
persistent-hash-trie(100)     :      2107834.09 +/- 0.45% op/s
mori hash_map(100)            :      1139256.44 +/- 0.40% op/s
immutable(100)                :      2647598.10 +/- 0.58% op/s
hashtrie(1000)                :      5471727.74 +/- 0.58% op/s
hamt(1000)                    :      5328556.32 +/- 1.58% op/s
hamt_plus(1000)               :      4678952.33 +/- 0.50% op/s
persistent-hash-trie(1000)    :      1185474.47 +/- 0.90% op/s
mori hash_map(1000)           :       510443.31 +/- 2.53% op/s
immutable(1000)               :      2351287.29 +/- 0.67% op/s
hashtrie(10000)               :      4204960.93 +/- 1.55% op/s
hamt(10000)                   :      4736150.74 +/- 0.64% op/s
hamt_plus(10000)              :      4146184.87 +/- 0.56% op/s
persistent-hash-trie(10000)   :       942529.95 +/- 1.36% op/s
mori hash_map(10000)          :       460697.43 +/- 0.72% op/s
immutable(10000)              :      2101945.54 +/- 0.96% op/s
hashtrie(100000)              :      1283184.10 +/- 1.71% op/s
hamt(100000)                  :      1356771.56 +/- 1.47% op/s
hamt_plus(100000)             :      1314218.66 +/- 1.37% op/s
persistent-hash-trie(100000)  :       674803.77 +/- 3.82% op/s
mori hash_map(100000)         :       328878.36 +/- 1.00% op/s
immutable(100000)             :       774108.67 +/- 1.47% op/s


put nth
hashtrie(10)                  :      1373093.60 +/- 0.59% op/s
hamt(10)                      :      1934726.46 +/- 0.70% op/s
hamt_plus(10)                 :      1712341.92 +/- 0.63% op/s
persistent-hash-trie(10)      :       277379.54 +/- 0.68% op/s
mori hash_map(10)             :       829432.86 +/- 0.68% op/s
immutable(10)                 :       846153.80 +/- 0.65% op/s
hashtrie(100)                 :      1761059.31 +/- 0.53% op/s
hamt(100)                     :      1420225.56 +/- 0.84% op/s
hamt_plus(100)                :      1212670.35 +/- 0.80% op/s
persistent-hash-trie(100)     :        58854.02 +/- 0.59% op/s
mori hash_map(100)            :       271577.11 +/- 1.15% op/s
immutable(100)                :       420104.79 +/- 0.42% op/s
hashtrie(1000)                :       962142.67 +/- 0.86% op/s
hamt(1000)                    :      1278208.72 +/- 1.08% op/s
hamt_plus(1000)               :      1215017.47 +/- 0.87% op/s
persistent-hash-trie(1000)    :        53660.94 +/- 0.42% op/s
mori hash_map(1000)           :       506685.71 +/- 0.51% op/s
immutable(1000)               :       288553.82 +/- 0.56% op/s
hashtrie(10000)               :       791558.62 +/- 0.69% op/s
hamt(10000)                   :      1058935.58 +/- 0.90% op/s
hamt_plus(10000)              :       888440.65 +/- 0.90% op/s
persistent-hash-trie(10000)   :        45079.54 +/- 7.22% op/s
mori hash_map(10000)          :       522384.18 +/- 0.51% op/s
immutable(10000)              :       245321.38 +/- 0.51% op/s
hashtrie(100000)              :       786917.63 +/- 0.61% op/s
hamt(100000)                  :       831506.66 +/- 0.84% op/s
hamt_plus(100000)             :       737095.93 +/- 1.32% op/s
persistent-hash-trie(100000)  :        19766.66 +/- 0.46% op/s
mori hash_map(100000)         :       408296.34 +/- 0.61% op/s
immutable(100000)             :       280316.08 +/- 0.37% op/s


Put All
hashtrie(10)                  :       185011.63 +/- 0.58% op/s
hamt(10)                      :       231115.60 +/- 0.62% op/s
hamt_plus(10)                 :       196942.33 +/- 0.63% op/s
persistent-hash-trie(10)      :        32531.94 +/- 0.52% op/s
mori hash_map(10)             :        43909.42 +/- 0.58% op/s
immutable(10)                 :        25257.96 +/- 0.70% op/s
hashtrie(100)                 :        14106.48 +/- 0.59% op/s
hamt(100)                     :        15528.71 +/- 0.71% op/s
hamt_plus(100)                :        13040.63 +/- 1.46% op/s
persistent-hash-trie(100)     :         1044.97 +/- 0.63% op/s
mori hash_map(100)            :         5062.35 +/- 0.56% op/s
immutable(100)                :         3826.22 +/- 0.50% op/s
hashtrie(1000)                :         1103.01 +/- 0.60% op/s
hamt(1000)                    :         1165.76 +/- 0.89% op/s
hamt_plus(1000)               :         1011.08 +/- 0.88% op/s
persistent-hash-trie(1000)    :           60.53 +/- 0.64% op/s
mori hash_map(1000)           :          232.56 +/- 0.62% op/s
immutable(1000)               :          335.53 +/- 1.02% op/s
hashtrie(10000)               :           78.36 +/- 0.92% op/s
hamt(10000)                   :           90.10 +/- 8.24% op/s
hamt_plus(10000)              :           86.65 +/- 0.87% op/s
persistent-hash-trie(10000)   :            4.69 +/- 2.02% op/s
mori hash_map(10000)          :           27.02 +/- 1.26% op/s
immutable(10000)              :           30.06 +/- 0.81% op/s


Put All (transient)
hamt(10)                      :       234116.01 +/- 0.84% op/s
hamt_plus(10)                 :       267358.47 +/- 0.46% op/s
mori hash_map(10)             :        56988.06 +/- 0.75% op/s
immutable(10)                 :        34464.57 +/- 0.42% op/s
hamt(100)                     :        16535.98 +/- 0.79% op/s
hamt_plus(100)                :        23426.27 +/- 0.57% op/s
mori hash_map(100)            :         7294.92 +/- 0.52% op/s
immutable(100)                :         9349.80 +/- 0.59% op/s
hamt(1000)                    :         1213.76 +/- 0.80% op/s
hamt_plus(1000)               :         1874.89 +/- 4.87% op/s
mori hash_map(1000)           :          298.17 +/- 0.52% op/s
immutable(1000)               :         1105.17 +/- 0.48% op/s
hamt(10000)                   :           95.65 +/- 1.26% op/s
hamt_plus(10000)              :          185.63 +/- 0.65% op/s
mori hash_map(10000)          :           35.90 +/- 0.95% op/s
immutable(10000)              :          110.67 +/- 0.82% op/s


remove nth
hashtrie(10)                  :      2194468.18 +/- 0.74% op/s
hamt(10)                      :      2206257.21 +/- 1.03% op/s
hamt_plus(10)                 :      1818564.57 +/- 0.49% op/s
persistent-hash-trie(10)      :       120297.07 +/- 0.47% op/s
mori hash_map(10)             :       800657.08 +/- 0.58% op/s
immutable(10)                 :       724120.88 +/- 0.47% op/s
hashtrie(100)                 :      1450350.06 +/- 0.50% op/s
hamt(100)                     :      1498812.17 +/- 0.63% op/s
hamt_plus(100)                :      1280633.80 +/- 0.61% op/s
persistent-hash-trie(100)     :        45156.03 +/- 0.57% op/s
mori hash_map(100)            :       660726.62 +/- 0.52% op/s
immutable(100)                :       404912.65 +/- 0.58% op/s
hashtrie(1000)                :      1108429.85 +/- 0.52% op/s
hamt(1000)                    :      1244057.68 +/- 0.64% op/s
hamt_plus(1000)               :      1172672.85 +/- 0.59% op/s
persistent-hash-trie(1000)    :        32918.67 +/- 0.57% op/s
mori hash_map(1000)           :       341890.39 +/- 0.76% op/s
immutable(1000)               :       334332.65 +/- 0.65% op/s
hashtrie(10000)               :       771109.31 +/- 0.89% op/s
hamt(10000)                   :       821750.82 +/- 2.01% op/s
hamt_plus(10000)              :       768942.29 +/- 9.95% op/s
persistent-hash-trie(10000)   :        26359.60 +/- 1.33% op/s
mori hash_map(10000)          :       273103.44 +/- 1.56% op/s
immutable(10000)              :       281322.31 +/- 1.90% op/s
hashtrie(100000)              :       500737.33 +/- 1.82% op/s
hamt(100000)                  :       514321.49 +/- 1.85% op/s
hamt_plus(100000)             :       465496.60 +/- 3.68% op/s
persistent-hash-trie(100000)  :        12228.25 +/- 2.11% op/s
mori hash_map(100000)         :       185253.90 +/- 1.83% op/s
immutable(100000)             :       205609.86 +/- 1.28% op/s


Remove All
hashtrie(10)                  :       229974.54 +/- 2.61% op/s
hamt(10)                      :       242630.69 +/- 0.69% op/s
hamt_plus(10)                 :       221772.86 +/- 0.98% op/s
persistent-hash-trie(10)      :        21334.78 +/- 0.74% op/s
mori hash_map(10)             :        92981.83 +/- 1.17% op/s
immutable(10)                 :        99957.42 +/- 2.15% op/s
hashtrie(100)                 :        15046.28 +/- 2.22% op/s
hamt(100)                     :        18383.95 +/- 1.61% op/s
hamt_plus(100)                :        15988.61 +/- 2.64% op/s
persistent-hash-trie(100)     :         1981.74 +/- 1.28% op/s
mori hash_map(100)            :         6381.66 +/- 2.35% op/s
immutable(100)                :         4239.81 +/- 2.41% op/s
hashtrie(1000)                :         1137.03 +/- 1.62% op/s
hamt(1000)                    :         1323.44 +/- 1.15% op/s
hamt_plus(1000)               :         1206.77 +/- 1.42% op/s
persistent-hash-trie(1000)    :          909.95 +/- 0.93% op/s
mori hash_map(1000)           :          304.56 +/- 5.26% op/s
immutable(1000)               :          362.05 +/- 1.04% op/s
hashtrie(10000)               :           81.48 +/- 2.99% op/s
hamt(10000)                   :           95.51 +/- 2.13% op/s
hamt_plus(10000)              :           91.43 +/- 2.03% op/s
persistent-hash-trie(10000)   :          244.46 +/- 1.69% op/s
mori hash_map(10000)          :           30.28 +/- 1.49% op/s
immutable(10000)              :           29.20 +/- 1.31% op/s


Remove All (transient)
hamt(10)                      :       232205.78 +/- 0.33% op/s
hamt_plus(10)                 :       326652.72 +/- 0.33% op/s
mori hash_map(10)             :        63846.81 +/- 0.74% op/s
immutable(10)                 :       186801.10 +/- 0.37% op/s
hamt(100)                     :        17601.65 +/- 1.35% op/s
hamt_plus(100)                :        29494.95 +/- 0.46% op/s
mori hash_map(100)            :         6191.17 +/- 0.90% op/s
immutable(100)                :        16739.63 +/- 1.15% op/s
hamt(1000)                    :         1226.42 +/- 2.67% op/s
hamt_plus(1000)               :         2514.42 +/- 0.84% op/s
mori hash_map(1000)           :          334.46 +/- 3.96% op/s
immutable(1000)               :         1561.61 +/- 0.82% op/s
hamt(10000)                   :           86.79 +/- 1.48% op/s
hamt_plus(10000)              :          193.21 +/- 1.61% op/s
mori hash_map(10000)          :           33.68 +/- 1.53% op/s
immutable(10000)              :          119.50 +/- 2.38% op/s


Count
hashtrie(10)                  :       385590.17 +/- 0.69% op/s
hamt(10)                      :      4391662.91 +/- 0.79% op/s
hamt_plus(10)                 :      4437437.06 +/- 0.97% op/s
persistent-hash-trie(10)      :       177787.52 +/- 1.00% op/s
mori hash_map(10)             :     28939637.58 +/- 2.06% op/s
immutable(10)                 :      2296426.79 +/- 0.70% op/s
hashtrie(100)                 :        42711.26 +/- 0.63% op/s
hamt(100)                     :       405072.67 +/- 0.63% op/s
hamt_plus(100)                :       396134.52 +/- 0.56% op/s
persistent-hash-trie(100)     :         6580.15 +/- 2.30% op/s
mori hash_map(100)            :     30224818.49 +/- 0.92% op/s
immutable(100)                :      2300197.45 +/- 0.74% op/s
hashtrie(1000)                :         3505.59 +/- 0.73% op/s
hamt(1000)                    :        15702.95 +/- 0.81% op/s
hamt_plus(1000)               :        15836.29 +/- 0.79% op/s
persistent-hash-trie(1000)    :          619.39 +/- 1.97% op/s
mori hash_map(1000)           :     30541162.32 +/- 1.23% op/s
immutable(1000)               :      2331859.86 +/- 0.65% op/s
hashtrie(10000)               :          318.40 +/- 1.03% op/s
hamt(10000)                   :         2858.48 +/- 0.73% op/s
hamt_plus(10000)              :         2867.51 +/- 0.72% op/s
persistent-hash-trie(10000)   :          129.86 +/- 2.14% op/s
mori hash_map(10000)          :     30134632.11 +/- 0.88% op/s
immutable(10000)              :      2299397.24 +/- 0.69% op/s


Sum
hashtrie(10)                  :       209443.06 +/- 0.76% op/s
hamt(10)                      :      3212403.60 +/- 0.63% op/s
hamt_plus(10)                 :      3096542.09 +/- 1.23% op/s
persistent-hash-trie(10)      :       211524.05 +/- 2.08% op/s
mori hash_map(10)             :       901841.26 +/- 0.69% op/s
immutable(10)                 :       721317.78 +/- 1.15% op/s
hashtrie(100)                 :        39735.96 +/- 0.76% op/s
hamt(100)                     :       354022.08 +/- 0.80% op/s
hamt_plus(100)                :       355865.20 +/- 0.56% op/s
persistent-hash-trie(100)     :         6767.27 +/- 0.87% op/s
mori hash_map(100)            :       138260.07 +/- 0.58% op/s
immutable(100)                :       139911.46 +/- 1.22% op/s
hashtrie(1000)                :         3531.19 +/- 0.78% op/s
hamt(1000)                    :        15918.68 +/- 0.67% op/s
hamt_plus(1000)               :        16213.59 +/- 0.70% op/s
persistent-hash-trie(1000)    :          626.58 +/- 0.98% op/s
mori hash_map(1000)           :        10121.81 +/- 5.61% op/s
immutable(1000)               :        13924.60 +/- 0.59% op/s
hashtrie(10000)               :          333.58 +/- 0.23% op/s
hamt(10000)                   :         3461.55 +/- 0.08% op/s
hamt_plus(10000)              :         3463.84 +/- 0.03% op/s
persistent-hash-trie(10000)   :          149.91 +/- 0.43% op/s
mori hash_map(10000)          :         1509.89 +/- 0.12% op/s
immutable(10000)              :         1589.00 +/- 0.07% op/s

## Note that someone needs to update this benchmark for immutable 3.6
Keys
hashtrie(10)                  :       528495.20 +/- 0.23% op/s
hamt(10)                      :      2495411.09 +/- 0.32% op/s
hamt_plus(10)                 :      2452570.21 +/- 0.28% op/s
persistent-hash-trie(10)      :       125571.89 +/- 0.17% op/s
mori hash_map(10)             :       340960.25 +/- 0.26% op/s
immutable(10)                 :            0.00 +/- 0.00% op/s
hashtrie(100)                 :        37813.58 +/- 0.18% op/s
hamt(100)                     :       241817.39 +/- 0.17% op/s
hamt_plus(100)                :       220965.80 +/- 0.19% op/s
persistent-hash-trie(100)     :         6623.69 +/- 0.18% op/s
mori hash_map(100)            :        24245.73 +/- 0.17% op/s
immutable(100)                :            0.00 +/- 0.00% op/s
hashtrie(1000)                :         3423.50 +/- 0.18% op/s
hamt(1000)                    :        14023.44 +/- 0.25% op/s
hamt_plus(1000)               :        14124.10 +/- 0.23% op/s
persistent-hash-trie(1000)    :          661.63 +/- 0.22% op/s
mori hash_map(1000)           :         1794.49 +/- 0.20% op/s
immutable(1000)               :            0.00 +/- 0.00% op/s
hashtrie(10000)               :          329.35 +/- 0.24% op/s
hamt(10000)                   :         2478.69 +/- 5.26% op/s
hamt_plus(10000)              :         2656.54 +/- 0.09% op/s
persistent-hash-trie(10000)   :          143.97 +/- 0.21% op/s
mori hash_map(10000)          :          181.52 +/- 0.09% op/s
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

