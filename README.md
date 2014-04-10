Javascript Hash Trie Benchmarking

Benchmarks 4 Persistent Javascript hashtrie implementations:
* [hashtrie][hashtrie] - 0.2.x
* [hamt][hamt] -  0.1.x
* [persistent-hash-trie][persistent] - 0.4.x
* [mori][mori] - 0.2.x

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

HAMT is fastest overall, with good get, update, and fold performance.

Hashtrie is slightly slower for updates, but up to 10x slower for folds than hashtrie.
Hashtrie's sparse array storage is a [major performance hit](http://jsperf.com/sparse-array-reduce-overhead)
for folds as neither `reduce` or `splice` show good performance for sparse arrays.

Mori's `hash_map` is slow for gets, especially as the size of the map increases.
It is good for updates, but 2-3x slower than hashtrie on large maps. Mori is really
good at aggregate operations, like count and kv reduces. `count` is a constant time
operation. It uses an even more optimized storage scheme than HAMT and is also fast
to fold large maps. The API is also richer, and the library may be a good choice
if you can sacrifice some performance.

persistent-hash-trie has some interesting features, like custom key types and
breaking walks, but is far too slow. Tests show persistent-hash-trie is
the fastest for removing all entries from a trie of size 10000. Since this is
the opposite of puts and single removes, I believe this is related to
a [bug in the library](https://github.com/hughfdjackson/persistent-hash-trie/issues/24).



```
hashtrie - 0.2.2
hamt - 0.1.4
mori - 0.2.6
persistent-hash-trie - 0.4.2


Get nth
hashtrie(10)                  :      7655318.35 +/- 0.32% op/s
hamt(10)                      :      7385396.99 +/- 0.70% op/s
persistent-hash-trie(10)      :      3924971.93 +/- 1.28% op/s
mori hash_map(10)             :      1740279.46 +/- 0.87% op/s
hashtrie(100)                 :      6296236.55 +/- 1.19% op/s
hamt(100)                     :      6101354.51 +/- 0.72% op/s
persistent-hash-trie(100)     :      1997360.02 +/- 0.27% op/s
mori hash_map(100)            :      1622838.41 +/- 1.44% op/s
hashtrie(1000)                :      5390018.02 +/- 0.35% op/s
hamt(1000)                    :      5102025.67 +/- 0.15% op/s
persistent-hash-trie(1000)    :      1181361.35 +/- 1.92% op/s
mori hash_map(1000)           :       575158.29 +/- 0.69% op/s
hashtrie(10000)               :      4436954.32 +/- 0.30% op/s
hamt(10000)                   :      4509190.23 +/- 0.16% op/s
persistent-hash-trie(10000)   :       922083.26 +/- 3.67% op/s
mori hash_map(10000)          :       489989.77 +/- 0.40% op/s
hashtrie(100000)              :      1297258.01 +/- 1.35% op/s
hamt(100000)                  :      1382320.11 +/- 0.34% op/s
persistent-hash-trie(100000)  :       721107.48 +/- 2.11% op/s
mori hash_map(100000)         :       347053.46 +/- 1.76% op/s


put nth
hashtrie(10)                  :      1366002.90 +/- 3.04% op/s
hamt(10)                      :      1861375.24 +/- 2.05% op/s
persistent-hash-trie(10)      :       301999.19 +/- 0.21% op/s
mori hash_map(10)             :      1107401.03 +/- 0.76% op/s
hashtrie(100)                 :      1174232.09 +/- 0.27% op/s
hamt(100)                     :      2191587.20 +/- 6.46% op/s
persistent-hash-trie(100)     :       103261.45 +/- 0.24% op/s
mori hash_map(100)            :       930481.95 +/- 0.43% op/s
hashtrie(1000)                :       971850.21 +/- 0.63% op/s
hamt(1000)                    :       944549.05 +/- 1.07% op/s
persistent-hash-trie(1000)    :        48116.38 +/- 0.20% op/s
mori hash_map(1000)           :       727868.28 +/- 0.65% op/s
hashtrie(10000)               :       802136.14 +/- 0.36% op/s
hamt(10000)                   :       916281.63 +/- 0.37% op/s
persistent-hash-trie(10000)   :        51391.57 +/- 0.25% op/s
mori hash_map(10000)          :       656907.15 +/- 0.33% op/s
hashtrie(100000)              :       698170.47 +/- 0.30% op/s
hamt(100000)                  :       760224.46 +/- 2.51% op/s
persistent-hash-trie(100000)  :        19966.70 +/- 0.22% op/s
mori hash_map(100000)         :       574875.36 +/- 0.20% op/s


Put All
hashtrie(10)                  :       202639.23 +/- 9.67% op/s
hamt(10)                      :       211147.63 +/- 0.24% op/s
persistent-hash-trie(10)      :        33671.69 +/- 0.58% op/s
mori hash_map(10)             :       111207.69 +/- 0.35% op/s
hashtrie(100)                 :        13410.26 +/- 4.76% op/s
hamt(100)                     :        16632.75 +/- 0.13% op/s
persistent-hash-trie(100)     :         1062.63 +/- 0.24% op/s
mori hash_map(100)            :         7873.14 +/- 0.11% op/s
hashtrie(1000)                :         1166.68 +/- 0.32% op/s
hamt(1000)                    :         1222.65 +/- 0.24% op/s
persistent-hash-trie(1000)    :           62.31 +/- 0.16% op/s
mori hash_map(1000)           :          266.32 +/- 0.51% op/s
hashtrie(10000)               :           84.22 +/- 0.85% op/s
hamt(10000)                   :           93.07 +/- 0.54% op/s
persistent-hash-trie(10000)   :            4.50 +/- 10.42% op/s
mori hash_map(10000)          :           29.98 +/- 0.51% op/s


remove nth
hashtrie(10)                  :      1954123.23 +/- 7.38% op/s
hamt(10)                      :      2348587.68 +/- 0.52% op/s
persistent-hash-trie(10)      :       157599.67 +/- 1.11% op/s
mori hash_map(10)             :      1006104.78 +/- 0.61% op/s
hashtrie(100)                 :      1380806.83 +/- 0.67% op/s
hamt(100)                     :      1500149.53 +/- 1.24% op/s
persistent-hash-trie(100)     :        46781.12 +/- 0.57% op/s
mori hash_map(100)            :       925258.26 +/- 0.67% op/s
hashtrie(1000)                :       982070.44 +/- 1.91% op/s
hamt(1000)                    :      1285937.26 +/- 2.85% op/s
persistent-hash-trie(1000)    :        33575.03 +/- 0.26% op/s
mori hash_map(1000)           :       352109.65 +/- 5.41% op/s
hashtrie(10000)               :       834472.71 +/- 0.31% op/s
hamt(10000)                   :       961339.08 +/- 1.69% op/s
persistent-hash-trie(10000)   :        26911.99 +/- 0.16% op/s
mori hash_map(10000)          :       305807.50 +/- 0.30% op/s
hashtrie(100000)              :       501344.25 +/- 0.17% op/s
hamt(100000)                  :       542741.91 +/- 1.65% op/s
persistent-hash-trie(100000)  :        12024.87 +/- 5.47% op/s
mori hash_map(100000)         :       208097.47 +/- 7.28% op/s


Remove All
hashtrie(10)                  :       229838.60 +/- 0.22% op/s
hamt(10)                      :       273951.49 +/- 0.44% op/s
persistent-hash-trie(10)      :        22613.22 +/- 1.89% op/s
mori hash_map(10)             :       111008.61 +/- 1.28% op/s
hashtrie(100)                 :        15437.93 +/- 0.41% op/s
hamt(100)                     :        19489.42 +/- 0.68% op/s
persistent-hash-trie(100)     :         1794.18 +/- 10.88% op/s
mori hash_map(100)            :         7874.22 +/- 8.52% op/s
hashtrie(1000)                :         1156.22 +/- 0.47% op/s
hamt(1000)                    :         1432.93 +/- 0.34% op/s
persistent-hash-trie(1000)    :          935.52 +/- 0.30% op/s
mori hash_map(1000)           :          361.35 +/- 0.83% op/s
hashtrie(10000)               :           81.39 +/- 4.60% op/s
hamt(10000)                   :          108.50 +/- 0.47% op/s
persistent-hash-trie(10000)   :          247.20 +/- 0.18% op/s
mori hash_map(10000)          :           33.69 +/- 1.14% op/s


Count
hashtrie(10)                  :      1011813.17 +/- 0.26% op/s
hamt(10)                      :      6001484.89 +/- 0.32% op/s
persistent-hash-trie(10)      :       134706.13 +/- 0.83% op/s
mori hash_map(10)             :     28735743.21 +/- 1.92% op/s
hashtrie(100)                 :        47158.79 +/- 0.38% op/s
hamt(100)                     :       424220.28 +/- 0.26% op/s
persistent-hash-trie(100)     :         6126.75 +/- 1.87% op/s
mori hash_map(100)            :     32093232.41 +/- 1.08% op/s
hashtrie(1000)                :         3608.77 +/- 0.14% op/s
hamt(1000)                    :        17202.89 +/- 0.09% op/s
persistent-hash-trie(1000)    :          631.65 +/- 0.32% op/s
mori hash_map(1000)           :     32038589.61 +/- 0.35% op/s
hashtrie(10000)               :          346.32 +/- 0.06% op/s
hamt(10000)                   :         2855.98 +/- 8.87% op/s
persistent-hash-trie(10000)   :          139.79 +/- 1.53% op/s
mori hash_map(10000)          :     30772513.13 +/- 0.52% op/s


Sum
hashtrie(10)                  :       339781.75 +/- 0.63% op/s
hamt(10)                      :      3542809.02 +/- 0.19% op/s
persistent-hash-trie(10)      :       168350.10 +/- 1.83% op/s
mori hash_map(10)             :      1454060.33 +/- 0.18% op/s
hashtrie(100)                 :        42029.97 +/- 0.11% op/s
hamt(100)                     :       319396.67 +/- 1.53% op/s
persistent-hash-trie(100)     :         6081.52 +/- 0.50% op/s
mori hash_map(100)            :       144492.22 +/- 0.56% op/s
hashtrie(1000)                :         3039.13 +/- 4.08% op/s
hamt(1000)                    :        16361.54 +/- 0.84% op/s
persistent-hash-trie(1000)    :          584.27 +/- 1.77% op/s
mori hash_map(1000)           :        10343.96 +/- 5.77% op/s
hashtrie(10000)               :          312.89 +/- 1.11% op/s
hamt(10000)                   :         3143.75 +/- 1.82% op/s
persistent-hash-trie(10000)   :          128.02 +/- 3.28% op/s
mori hash_map(10000)          :         1487.08 +/- 0.92% op/s


Keys
hashtrie(10)                  :       573317.83 +/- 2.15% op/s
hamt(10)                      :      2187201.55 +/- 1.21% op/s
persistent-hash-trie(10)      :       228786.38 +/- 1.07% op/s
mori hash_map(10)             :       306966.17 +/- 2.11% op/s
hashtrie(100)                 :        43277.19 +/- 4.69% op/s
hamt(100)                     :       210677.40 +/- 4.47% op/s
persistent-hash-trie(100)     :         5736.77 +/- 3.52% op/s
mori hash_map(100)            :        25283.10 +/- 4.25% op/s
hashtrie(1000)                :         3268.32 +/- 2.93% op/s
hamt(1000)                    :        12913.43 +/- 4.42% op/s
persistent-hash-trie(1000)    :          596.18 +/- 1.02% op/s
mori hash_map(1000)           :         1934.44 +/- 4.95% op/s
hashtrie(10000)               :          298.42 +/- 5.71% op/s
hamt(10000)                   :         2414.70 +/- 7.48% op/s
persistent-hash-trie(10000)   :          131.67 +/- 1.47% op/s
mori hash_map(10000)          :          197.68 +/- 3.30% op/s
```




[hashtrie]: https://github.com/mattbierner/hashtrie
[hamt]: https://github.com/mattbierner/hamt
[mori]: https://github.com/swannodette/mori
[persistent]: https://github.com/hughfdjackson/persistent-hash-trie