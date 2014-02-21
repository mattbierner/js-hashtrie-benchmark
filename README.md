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

Hashtrie is fastest overall, with good get, update, and set performance. Hashtrie's
sparse array storage is a [major performance hit](http://jsperf.com/sparse-array-reduce-overhead) for fold however.

HAMT is often 2x slower than hashtrie for gets and updates, but since it uses
dense index nodes, folds are up to 10x faster than hashtrie. The HAMT fold
performance is double that of Mori.

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
Get nth
hashtrie(10)                  :      6656504.53 +/- 0.35% op/s
hamt(10)                      :      1916794.45 +/- 2.47% op/s
persistent-hash-trie(10)      :      3349887.43 +/- 2.29% op/s
mori hash_map(10)             :      1720997.49 +/- 0.41% op/s
hashtrie(100)                 :      5706375.45 +/- 0.28% op/s
hamt(100)                     :      1722417.47 +/- 0.74% op/s
persistent-hash-trie(100)     :      1837596.14 +/- 0.33% op/s
mori hash_map(100)            :      1667227.80 +/- 0.43% op/s
hashtrie(1000)                :      4983980.62 +/- 0.13% op/s
hamt(1000)                    :      1701599.34 +/- 0.38% op/s
persistent-hash-trie(1000)    :      1211376.53 +/- 0.41% op/s
mori hash_map(1000)           :       573989.82 +/- 3.01% op/s
hashtrie(10000)               :      3772045.35 +/- 2.02% op/s
hamt(10000)                   :      1512226.30 +/- 1.75% op/s
persistent-hash-trie(10000)   :       899809.88 +/- 2.75% op/s
mori hash_map(10000)          :       471967.00 +/- 0.85% op/s
hashtrie(100000)              :      1263399.72 +/- 2.57% op/s
hamt(100000)                  :       746667.80 +/- 2.86% op/s
persistent-hash-trie(100000)  :       702864.12 +/- 2.19% op/s
mori hash_map(100000)         :       334035.09 +/- 2.16% op/s


put nth
hashtrie(10)                  :      2498038.80 +/- 0.56% op/s
hamt(10)                      :      1054577.19 +/- 0.60% op/s
persistent-hash-trie(10)      :       287152.44 +/- 0.78% op/s
mori hash_map(10)             :      1006228.81 +/- 0.35% op/s
hashtrie(100)                 :      1521326.10 +/- 5.50% op/s
hamt(100)                     :       793141.94 +/- 0.78% op/s
persistent-hash-trie(100)     :        96927.95 +/- 0.39% op/s
mori hash_map(100)            :       908717.99 +/- 0.83% op/s
hashtrie(1000)                :      1174134.59 +/- 0.83% op/s
hamt(1000)                    :       915674.22 +/- 0.66% op/s
persistent-hash-trie(1000)    :        59675.75 +/- 0.30% op/s
mori hash_map(1000)           :       726055.12 +/- 0.88% op/s
hashtrie(10000)               :       778189.51 +/- 0.53% op/s
hamt(10000)                   :       620598.31 +/- 0.85% op/s
persistent-hash-trie(10000)   :        49643.10 +/- 1.43% op/s
mori hash_map(10000)          :       622432.63 +/- 0.80% op/s
hashtrie(100000)              :       731133.51 +/- 0.56% op/s
hamt(100000)                  :       549899.24 +/- 0.85% op/s
persistent-hash-trie(100000)  :        18836.53 +/- 0.37% op/s
mori hash_map(100000)         :       521579.56 +/- 0.63% op/s


Put All
hashtrie(10)                  :       192412.54 +/- 0.87% op/s
hamt(10)                      :       111287.47 +/- 0.75% op/s
persistent-hash-trie(10)      :        35547.46 +/- 0.33% op/s
mori hash_map(10)             :        78382.83 +/- 4.13% op/s
hashtrie(100)                 :        13578.35 +/- 1.49% op/s
hamt(100)                     :         8625.30 +/- 3.61% op/s
persistent-hash-trie(100)     :         1039.23 +/- 0.55% op/s
mori hash_map(100)            :         7371.90 +/- 0.56% op/s
hashtrie(1000)                :         1076.75 +/- 0.51% op/s
hamt(1000)                    :          687.55 +/- 2.80% op/s
persistent-hash-trie(1000)    :           60.81 +/- 1.20% op/s
mori hash_map(1000)           :          269.52 +/- 0.42% op/s
hashtrie(10000)               :           74.66 +/- 2.02% op/s
hamt(10000)                   :           43.76 +/- 13.88% op/s
persistent-hash-trie(10000)   :            4.68 +/- 1.80% op/s
mori hash_map(10000)          :           28.45 +/- 3.29% op/s


remove nth
hashtrie(10)                  :      1969302.11 +/- 0.28% op/s
hamt(10)                      :      1022247.20 +/- 0.39% op/s
persistent-hash-trie(10)      :       112421.47 +/- 0.67% op/s
mori hash_map(10)             :      1044161.33 +/- 0.63% op/s
hashtrie(100)                 :      1443240.09 +/- 0.30% op/s
hamt(100)                     :       851072.35 +/- 0.68% op/s
persistent-hash-trie(100)     :        49990.04 +/- 0.39% op/s
mori hash_map(100)            :       862510.86 +/- 1.41% op/s
hashtrie(1000)                :      1090193.29 +/- 0.82% op/s
hamt(1000)                    :       743981.12 +/- 1.20% op/s
persistent-hash-trie(1000)    :        33118.60 +/- 0.50% op/s
mori hash_map(1000)           :       348751.04 +/- 5.01% op/s
hashtrie(10000)               :       832995.92 +/- 1.40% op/s
hamt(10000)                   :       594601.72 +/- 1.63% op/s
persistent-hash-trie(10000)   :        26750.61 +/- 0.65% op/s
mori hash_map(10000)          :       293639.44 +/- 1.06% op/s
hashtrie(100000)              :       498946.42 +/- 1.17% op/s
hamt(100000)                  :       414301.53 +/- 1.13% op/s
persistent-hash-trie(100000)  :        12257.46 +/- 4.34% op/s
mori hash_map(100000)         :       199298.13 +/- 7.20% op/s


Remove All
hashtrie(10)                  :       172198.62 +/- 0.84% op/s
hamt(10)                      :       101508.40 +/- 0.52% op/s
persistent-hash-trie(10)      :        21913.30 +/- 0.46% op/s
mori hash_map(10)             :       112478.99 +/- 0.49% op/s
hashtrie(100)                 :        13000.77 +/- 6.13% op/s
hamt(100)                     :         8277.98 +/- 0.99% op/s
persistent-hash-trie(100)     :         1964.66 +/- 2.21% op/s
mori hash_map(100)            :         7978.39 +/- 3.33% op/s
hashtrie(1000)                :         1103.61 +/- 0.99% op/s
hamt(1000)                    :          675.77 +/- 2.34% op/s
persistent-hash-trie(1000)    :          847.25 +/- 0.73% op/s
mori hash_map(1000)           :          346.32 +/- 1.88% op/s
hashtrie(10000)               :           68.82 +/- 7.01% op/s
hamt(10000)                   :           54.61 +/- 2.08% op/s
persistent-hash-trie(10000)   :          224.73 +/- 1.01% op/s
mori hash_map(10000)          :           32.21 +/- 1.98% op/s


Count nth
hashtrie(10)                  :       121489.60 +/- 1.87% op/s
hamt(10)                      :       212534.56 +/- 0.36% op/s
persistent-hash-trie(10)      :        90602.71 +/- 0.51% op/s
mori hash_map(10)             :     32154895.77 +/- 2.34% op/s
hashtrie(100)                 :        15009.38 +/- 1.88% op/s
hamt(100)                     :        20481.28 +/- 6.06% op/s
persistent-hash-trie(100)     :         6379.91 +/- 0.90% op/s
mori hash_map(100)            :     30530600.29 +/- 0.87% op/s
hashtrie(1000)                :         1452.19 +/- 2.08% op/s
hamt(1000)                    :         2149.52 +/- 1.13% op/s
persistent-hash-trie(1000)    :          626.97 +/- 0.67% op/s
mori hash_map(1000)           :     31872944.19 +/- 2.19% op/s
hashtrie(10000)               :          129.26 +/- 2.10% op/s
hamt(10000)                   :          215.74 +/- 1.88% op/s
persistent-hash-trie(10000)   :          131.92 +/- 2.42% op/s
mori hash_map(10000)          :     30552224.29 +/- 1.96% op/s


Sum
hashtrie(10)                  :       386453.40 +/- 2.21% op/s
hamt(10)                      :      3268248.00 +/- 0.25% op/s
persistent-hash-trie(10)      :        93437.64 +/- 2.14% op/s
mori hash_map(10)             :      1400684.66 +/- 2.43% op/s
hashtrie(100)                 :        37985.30 +/- 0.69% op/s
hamt(100)                     :       293158.41 +/- 3.07% op/s
persistent-hash-trie(100)     :         6251.82 +/- 0.57% op/s
mori hash_map(100)            :       146274.61 +/- 0.37% op/s
hashtrie(1000)                :         3506.61 +/- 0.42% op/s
hamt(1000)                    :        16305.50 +/- 0.24% op/s
persistent-hash-trie(1000)    :          644.72 +/- 0.44% op/s
mori hash_map(1000)           :        11235.59 +/- 1.34% op/s
hashtrie(10000)               :          323.98 +/- 1.04% op/s
hamt(10000)                   :         3413.33 +/- 0.47% op/s
persistent-hash-trie(10000)   :          120.17 +/- 3.96% op/s
mori hash_map(10000)          :         1515.63 +/- 0.97% op/s


Keys
hashtrie(10)                  :       391342.94 +/- 2.27% op/s
hamt(10)                      :      2559440.35 +/- 0.39% op/s
persistent-hash-trie(10)      :       242937.21 +/- 0.38% op/s
mori hash_map(10)             :       358930.10 +/- 0.84% op/s
hashtrie(100)                 :        33161.79 +/- 0.25% op/s
hamt(100)                     :       221274.13 +/- 1.08% op/s
persistent-hash-trie(100)     :         6369.33 +/- 0.76% op/s
mori hash_map(100)            :        23328.29 +/- 5.26% op/s
hashtrie(1000)                :         3308.38 +/- 2.41% op/s
hamt(1000)                    :        13439.63 +/- 0.63% op/s
persistent-hash-trie(1000)    :          583.49 +/- 2.70% op/s
mori hash_map(1000)           :         2021.40 +/- 1.75% op/s
hashtrie(10000)               :          302.89 +/- 2.00% op/s
hamt(10000)                   :         2533.78 +/- 1.16% op/s
persistent-hash-trie(10000)   :          115.82 +/- 5.12% op/s
mori hash_map(10000)          :          175.96 +/- 5.36% op/s
```




[hashtrie]: https://github.com/mattbierner/hashtrie
[hamt]: https://github.com/mattbierner/hamt
[mori]: https://github.com/swannodette/mori
[persistent]: https://github.com/hughfdjackson/persistent-hash-trie