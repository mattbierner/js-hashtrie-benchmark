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
hamt - 0.1.4
hamt_plus - 0.0.0
mori - 0.2.9
persistent-hash-trie - 0.4.2
immutable: 2.0.12
mattbierner-mbp:js-hashtrie-benchmark mattbierner$ npm run benchmark

> hashtrie-benchmarks@0.0.0 benchmark /Users/mattbierner/Projects/js/js-hashtrie-benchmark
> node run.js

Get nth
hashtrie(10)                  :      6950684.47 +/- 0.77% op/s
hamt(10)                      :      6672265.25 +/- 0.37% op/s
hamt_plus(10)                 :      6182035.62 +/- 0.57% op/s
persistent-hash-trie(10)      :      4223312.44 +/- 2.98% op/s
mori hash_map(10)             :      1308023.11 +/- 0.65% op/s
immutable(10)                 :      5743915.40 +/- 0.16% op/s
hashtrie(100)                 :      6451505.85 +/- 0.57% op/s
hamt(100)                     :      5706978.53 +/- 4.65% op/s
hamt_plus(100)                :      4848300.21 +/- 8.32% op/s
persistent-hash-trie(100)     :      1924911.88 +/- 6.31% op/s
mori hash_map(100)            :      1286127.67 +/- 0.70% op/s
immutable(100)                :      5208301.53 +/- 0.22% op/s
hashtrie(1000)                :      5330025.74 +/- 0.11% op/s
hamt(1000)                    :      5455719.59 +/- 0.02% op/s
hamt_plus(1000)               :      4864581.77 +/- 0.04% op/s
persistent-hash-trie(1000)    :      1229129.66 +/- 0.43% op/s
mori hash_map(1000)           :       634721.76 +/- 2.85% op/s
immutable(1000)               :      4445566.22 +/- 0.19% op/s
hashtrie(10000)               :      4354063.41 +/- 0.08% op/s
hamt(10000)                   :      4709467.62 +/- 0.03% op/s
hamt_plus(10000)              :      4240517.43 +/- 0.06% op/s
persistent-hash-trie(10000)   :       958537.84 +/- 1.98% op/s
mori hash_map(10000)          :       536269.72 +/- 3.40% op/s
immutable(10000)              :      3868067.66 +/- 0.53% op/s
hashtrie(100000)              :      1282457.07 +/- 0.40% op/s
hamt(100000)                  :      1429367.61 +/- 0.15% op/s
hamt_plus(100000)             :      1357275.46 +/- 0.19% op/s
persistent-hash-trie(100000)  :       737595.31 +/- 0.27% op/s
mori hash_map(100000)         :       355446.23 +/- 1.28% op/s
immutable(100000)             :       984006.20 +/- 0.36% op/s


put nth
hashtrie(10)                  :      1673114.91 +/- 1.19% op/s
hamt(10)                      :      2051219.01 +/- 0.82% op/s
hamt_plus(10)                 :      1744490.82 +/- 0.65% op/s
persistent-hash-trie(10)      :       428151.46 +/- 0.20% op/s
mori hash_map(10)             :       821018.20 +/- 1.35% op/s
immutable(10)                 :      1574333.09 +/- 0.20% op/s
hashtrie(100)                 :      1190823.50 +/- 0.19% op/s
hamt(100)                     :      1400213.52 +/- 0.14% op/s
hamt_plus(100)                :      1222653.60 +/- 0.36% op/s
persistent-hash-trie(100)     :        74772.38 +/- 0.21% op/s
mori hash_map(100)            :       833705.45 +/- 0.19% op/s
immutable(100)                :       871543.88 +/- 8.46% op/s
hashtrie(1000)                :      1076118.59 +/- 25.53% op/s
hamt(1000)                    :      1275403.32 +/- 11.07% op/s
hamt_plus(1000)               :      1396746.57 +/- 0.38% op/s
persistent-hash-trie(1000)    :        61749.10 +/- 0.12% op/s
mori hash_map(1000)           :       741673.30 +/- 0.16% op/s
immutable(1000)               :       653898.45 +/- 0.11% op/s
hashtrie(10000)               :      1283753.53 +/- 0.22% op/s
hamt(10000)                   :       989551.61 +/- 0.31% op/s
hamt_plus(10000)              :       872113.62 +/- 0.17% op/s
persistent-hash-trie(10000)   :        49035.07 +/- 0.19% op/s
mori hash_map(10000)          :       652331.13 +/- 2.04% op/s
immutable(10000)              :       601089.68 +/- 0.07% op/s
hashtrie(100000)              :       730971.96 +/- 0.47% op/s
hamt(100000)                  :       887139.52 +/- 0.71% op/s
hamt_plus(100000)             :       850934.96 +/- 0.10% op/s
persistent-hash-trie(100000)  :        20514.23 +/- 0.20% op/s
mori hash_map(100000)         :       549623.94 +/- 0.29% op/s
immutable(100000)             :       396917.41 +/- 0.14% op/s


Put All
hashtrie(10)                  :       183084.14 +/- 0.61% op/s
hamt(10)                      :       217846.69 +/- 0.25% op/s
hamt_plus(10)                 :       188100.45 +/- 0.61% op/s
persistent-hash-trie(10)      :        29349.90 +/- 0.50% op/s
mori hash_map(10)             :        74953.98 +/- 0.69% op/s
immutable(10)                 :       156165.25 +/- 0.33% op/s
hashtrie(100)                 :        13841.63 +/- 0.35% op/s
hamt(100)                     :        15119.72 +/- 0.33% op/s
hamt_plus(100)                :        13210.42 +/- 0.36% op/s
persistent-hash-trie(100)     :         1021.40 +/- 0.31% op/s
mori hash_map(100)            :         6445.33 +/- 1.69% op/s
immutable(100)                :         8867.53 +/- 7.35% op/s
hashtrie(1000)                :         1214.94 +/- 0.11% op/s
hamt(1000)                    :         1283.33 +/- 0.11% op/s
hamt_plus(1000)               :         1123.84 +/- 1.15% op/s
persistent-hash-trie(1000)    :           61.77 +/- 0.84% op/s
mori hash_map(1000)           :          313.43 +/- 0.14% op/s
immutable(1000)               :          715.68 +/- 1.00% op/s
hashtrie(10000)               :           86.20 +/- 0.18% op/s
hamt(10000)                   :           95.66 +/- 0.46% op/s
hamt_plus(10000)              :           85.74 +/- 0.30% op/s
persistent-hash-trie(10000)   :            4.76 +/- 0.34% op/s
mori hash_map(10000)          :           34.37 +/- 0.43% op/s
immutable(10000)              :           56.67 +/- 0.10% op/s


Put All (transient)
hamt(10)                      :       217448.72 +/- 0.23% op/s
hamt_plus(10)                 :       256522.30 +/- 6.02% op/s
mori hash_map(10)             :       102589.90 +/- 0.81% op/s
immutable(10)                 :       293915.54 +/- 0.06% op/s
hamt(100)                     :        16817.95 +/- 0.45% op/s
hamt_plus(100)                :        25820.77 +/- 0.11% op/s
mori hash_map(100)            :         8548.79 +/- 0.07% op/s
immutable(100)                :        25756.11 +/- 0.12% op/s
hamt(1000)                    :         1253.89 +/- 0.15% op/s
hamt_plus(1000)               :         2128.73 +/- 0.19% op/s
mori hash_map(1000)           :          375.78 +/- 0.21% op/s
immutable(1000)               :         2224.81 +/- 0.18% op/s
hamt(10000)                   :           90.91 +/- 2.41% op/s
hamt_plus(10000)              :          187.42 +/- 5.66% op/s
mori hash_map(10000)          :           45.36 +/- 1.19% op/s
immutable(10000)              :          208.94 +/- 1.23% op/s


remove nth
hashtrie(10)                  :      2055216.33 +/- 0.51% op/s
hamt(10)                      :      2196496.41 +/- 0.66% op/s
hamt_plus(10)                 :      1898312.57 +/- 0.33% op/s
persistent-hash-trie(10)      :       155270.41 +/- 0.18% op/s
mori hash_map(10)             :       901731.73 +/- 0.26% op/s
immutable(10)                 :      1332001.03 +/- 0.13% op/s
hashtrie(100)                 :      1396976.34 +/- 0.71% op/s
hamt(100)                     :      1580468.54 +/- 0.15% op/s
hamt_plus(100)                :      1403248.06 +/- 0.31% op/s
persistent-hash-trie(100)     :        50007.91 +/- 0.21% op/s
mori hash_map(100)            :       716240.16 +/- 0.23% op/s
immutable(100)                :       814566.83 +/- 0.22% op/s
hashtrie(1000)                :      1103327.19 +/- 0.20% op/s
hamt(1000)                    :      1341712.07 +/- 0.10% op/s
hamt_plus(1000)               :      1178069.62 +/- 8.80% op/s
persistent-hash-trie(1000)    :        34282.18 +/- 0.12% op/s
mori hash_map(1000)           :       413086.72 +/- 0.54% op/s
immutable(1000)               :       587027.40 +/- 0.43% op/s
hashtrie(10000)               :       830158.95 +/- 0.26% op/s
hamt(10000)                   :       979752.71 +/- 0.44% op/s
hamt_plus(10000)              :       822525.89 +/- 1.02% op/s
persistent-hash-trie(10000)   :        27201.67 +/- 0.17% op/s
mori hash_map(10000)          :       323861.55 +/- 0.29% op/s
immutable(10000)              :       511335.66 +/- 0.21% op/s
hashtrie(100000)              :       502942.66 +/- 0.29% op/s
hamt(100000)                  :       559026.92 +/- 0.59% op/s
hamt_plus(100000)             :       522184.48 +/- 0.10% op/s
persistent-hash-trie(100000)  :        12622.81 +/- 2.41% op/s
mori hash_map(100000)         :       207379.85 +/- 9.62% op/s
immutable(100000)             :       322649.72 +/- 0.10% op/s


Remove All
hashtrie(10)                  :       203748.37 +/- 0.27% op/s
hamt(10)                      :       263429.93 +/- 0.09% op/s
hamt_plus(10)                 :       219821.77 +/- 1.19% op/s
persistent-hash-trie(10)      :        18548.18 +/- 0.09% op/s
mori hash_map(10)             :        92818.04 +/- 0.21% op/s
immutable(10)                 :       156414.83 +/- 0.07% op/s
hashtrie(100)                 :        15494.08 +/- 0.13% op/s
hamt(100)                     :        19308.64 +/- 0.17% op/s
hamt_plus(100)                :        16678.17 +/- 0.19% op/s
persistent-hash-trie(100)     :         2142.46 +/- 0.32% op/s
mori hash_map(100)            :         7341.42 +/- 0.25% op/s
immutable(100)                :         8992.29 +/- 0.28% op/s
hashtrie(1000)                :         1173.37 +/- 0.20% op/s
hamt(1000)                    :         1426.72 +/- 0.16% op/s
hamt_plus(1000)               :         1212.84 +/- 0.23% op/s
persistent-hash-trie(1000)    :          914.95 +/- 0.28% op/s
mori hash_map(1000)           :          404.81 +/- 0.71% op/s
immutable(1000)               :          684.64 +/- 0.44% op/s
hashtrie(10000)               :           82.31 +/- 0.45% op/s
hamt(10000)                   :          100.53 +/- 0.16% op/s
hamt_plus(10000)              :           82.75 +/- 12.66% op/s
persistent-hash-trie(10000)   :          255.04 +/- 0.12% op/s
mori hash_map(10000)          :           38.67 +/- 0.91% op/s
immutable(10000)              :           55.95 +/- 0.16% op/s


Remove All (transient)
hamt(10)                      :       237868.74 +/- 0.27% op/s
hamt_plus(10)                 :       313169.36 +/- 0.19% op/s
mori hash_map(10)             :        74898.53 +/- 1.17% op/s
immutable(10)                 :       308781.30 +/- 0.14% op/s
hamt(100)                     :        19290.13 +/- 0.54% op/s
hamt_plus(100)                :        31002.95 +/- 0.39% op/s
mori hash_map(100)            :         6659.32 +/- 0.99% op/s
immutable(100)                :        33029.98 +/- 0.63% op/s
hamt(1000)                    :         1405.91 +/- 0.33% op/s
hamt_plus(1000)               :         2834.74 +/- 0.80% op/s
mori hash_map(1000)           :          420.73 +/- 0.78% op/s
immutable(1000)               :         2739.58 +/- 1.50% op/s
hamt(10000)                   :           98.24 +/- 7.32% op/s
hamt_plus(10000)              :          229.24 +/- 0.81% op/s
mori hash_map(10000)          :           40.09 +/- 1.30% op/s
immutable(10000)              :          219.17 +/- 1.51% op/s


Count
hashtrie(10)                  :       789348.37 +/- 0.11% op/s
hamt(10)                      :      7652232.96 +/- 0.09% op/s
hamt_plus(10)                 :      7091714.92 +/- 0.66% op/s
persistent-hash-trie(10)      :       243989.47 +/- 0.39% op/s
mori hash_map(10)             :     29944897.22 +/- 0.53% op/s
immutable(10)                 :     49388132.06 +/- 1.48% op/s
hashtrie(100)                 :        37058.06 +/- 0.20% op/s
hamt(100)                     :       418263.53 +/- 0.23% op/s
hamt_plus(100)                :       404887.65 +/- 0.14% op/s
persistent-hash-trie(100)     :         5843.15 +/- 1.23% op/s
mori hash_map(100)            :     30239560.15 +/- 1.10% op/s
immutable(100)                :     50314465.82 +/- 2.16% op/s
hashtrie(1000)                :         3613.61 +/- 0.09% op/s
hamt(1000)                    :        16995.57 +/- 1.27% op/s
hamt_plus(1000)               :        16202.80 +/- 0.46% op/s
persistent-hash-trie(1000)    :          662.53 +/- 0.63% op/s
mori hash_map(1000)           :     25342929.71 +/- 12.29% op/s
immutable(1000)               :     47643390.32 +/- 0.58% op/s
hashtrie(10000)               :          338.93 +/- 0.35% op/s
hamt(10000)                   :         3257.66 +/- 0.10% op/s
hamt_plus(10000)              :         2592.02 +/- 4.49% op/s
persistent-hash-trie(10000)   :          126.68 +/- 4.49% op/s
mori hash_map(10000)          :     29542367.20 +/- 3.26% op/s
immutable(10000)              :     46847432.02 +/- 2.08% op/s


Sum
hashtrie(10)                  :       432434.27 +/- 4.54% op/s
hamt(10)                      :      4251741.61 +/- 1.25% op/s
hamt_plus(10)                 :      4052671.86 +/- 2.94% op/s
persistent-hash-trie(10)      :        97046.09 +/- 1.41% op/s
mori hash_map(10)             :      1592675.56 +/- 1.89% op/s
immutable(10)                 :      1204683.46 +/- 1.19% op/s
hashtrie(100)                 :        40439.21 +/- 0.61% op/s
hamt(100)                     :       340901.58 +/- 0.45% op/s
hamt_plus(100)                :       324352.57 +/- 3.69% op/s
persistent-hash-trie(100)     :         6825.03 +/- 0.40% op/s
mori hash_map(100)            :       150016.46 +/- 1.91% op/s
immutable(100)                :       172852.80 +/- 1.46% op/s
hashtrie(1000)                :         3520.01 +/- 0.34% op/s
hamt(1000)                    :        15936.48 +/- 1.15% op/s
hamt_plus(1000)               :        15670.49 +/- 1.95% op/s
persistent-hash-trie(1000)    :          645.91 +/- 0.49% op/s
mori hash_map(1000)           :        11448.78 +/- 0.92% op/s
immutable(1000)               :        14192.87 +/- 0.82% op/s
hashtrie(10000)               :          333.64 +/- 1.05% op/s
hamt(10000)                   :         3397.96 +/- 1.24% op/s
hamt_plus(10000)              :         3438.36 +/- 0.18% op/s
persistent-hash-trie(10000)   :          142.09 +/- 2.21% op/s
mori hash_map(10000)          :         1377.85 +/- 9.60% op/s
immutable(10000)              :         1713.61 +/- 2.04% op/s


Keys
hashtrie(10)                  :       283786.14 +/- 7.92% op/s
hamt(10)                      :      2184088.64 +/- 2.88% op/s
hamt_plus(10)                 :      2261431.76 +/- 0.82% op/s
persistent-hash-trie(10)      :       130783.52 +/- 1.05% op/s
mori hash_map(10)             :       385319.47 +/- 0.67% op/s
immutable(10)                 :       170302.98 +/- 8.96% op/s
hashtrie(100)                 :        36262.69 +/- 2.84% op/s
hamt(100)                     :       229030.96 +/- 6.69% op/s
hamt_plus(100)                :       225801.55 +/- 0.96% op/s
persistent-hash-trie(100)     :         7013.60 +/- 2.51% op/s
mori hash_map(100)            :        25330.54 +/- 1.31% op/s
immutable(100)                :        78425.22 +/- 5.88% op/s
hashtrie(1000)                :         3210.56 +/- 0.94% op/s
hamt(1000)                    :        13619.19 +/- 3.39% op/s
hamt_plus(1000)               :        12706.73 +/- 9.51% op/s
persistent-hash-trie(1000)    :          622.58 +/- 2.10% op/s
mori hash_map(1000)           :         2003.35 +/- 0.53% op/s
immutable(1000)               :        12400.16 +/- 1.73% op/s
hashtrie(10000)               :          309.24 +/- 2.58% op/s
hamt(10000)                   :         2657.75 +/- 0.55% op/s
hamt_plus(10000)              :         2616.44 +/- 0.50% op/s
persistent-hash-trie(10000)   :          129.56 +/- 2.31% op/s
mori hash_map(10000)          :          206.83 +/- 0.60% op/s
immutable(10000)              :         1548.20 +/- 0.57% op/s

```




[hashtrie]: https://github.com/mattbierner/hashtrie
[hamt]: https://github.com/mattbierner/hamt
[hamt_plus]: https://github.com/mattbierner/hamt_plus
[mori]: https://github.com/swannodette/mori
[persistent]: https://github.com/hughfdjackson/persistent-hash-trie
[immutable]: https://github.com/facebook/immutable-js