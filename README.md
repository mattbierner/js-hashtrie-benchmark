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

Hashtrie is slighly slower for updates, but up to 10x slower for folds than hashtrie.
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

Get nth
hashtrie(10)                  :      6351800.55 +/- 0.29% op/s
hamt(10)                      :      5267300.20 +/- 0.18% op/s
persistent-hash-trie(10)      :      4321126.46 +/- 0.23% op/s
mori hash_map(10)             :      1551805.93 +/- 2.65% op/s
hashtrie(100)                 :      5901634.65 +/- 0.23% op/s
hamt(100)                     :      4954966.94 +/- 0.08% op/s
persistent-hash-trie(100)     :      2012557.22 +/- 0.92% op/s
mori hash_map(100)            :      1465794.42 +/- 1.44% op/s
hashtrie(1000)                :      4900012.14 +/- 0.12% op/s
hamt(1000)                    :      4407368.85 +/- 0.23% op/s
persistent-hash-trie(1000)    :      1181344.69 +/- 1.84% op/s
mori hash_map(1000)           :       584093.14 +/- 0.44% op/s
hashtrie(10000)               :      3938476.19 +/- 1.22% op/s
hamt(10000)                   :      3695337.18 +/- 0.58% op/s
persistent-hash-trie(10000)   :       871000.52 +/- 4.65% op/s
mori hash_map(10000)          :       467363.74 +/- 0.80% op/s
hashtrie(100000)              :      1190500.02 +/- 1.95% op/s
hamt(100000)                  :      1243284.12 +/- 1.88% op/s
persistent-hash-trie(100000)  :       699352.57 +/- 2.45% op/s
mori hash_map(100000)         :       334628.83 +/- 1.28% op/s


put nth
hashtrie(10)                  :      1379613.32 +/- 0.44% op/s
hamt(10)                      :      2411455.82 +/- 1.09% op/s
persistent-hash-trie(10)      :       274214.12 +/- 0.23% op/s
mori hash_map(10)             :       430696.19 +/- 2.62% op/s
hashtrie(100)                 :      1016721.21 +/- 4.96% op/s
hamt(100)                     :      1207404.50 +/- 3.22% op/s
persistent-hash-trie(100)     :        87208.50 +/- 5.58% op/s
mori hash_map(100)            :       858950.06 +/- 3.92% op/s
hashtrie(1000)                :       753222.88 +/- 7.57% op/s
hamt(1000)                    :      1412272.94 +/- 3.77% op/s
persistent-hash-trie(1000)    :        50960.44 +/- 0.82% op/s
mori hash_map(1000)           :       391467.74 +/- 0.52% op/s
hashtrie(10000)               :       811638.96 +/- 0.89% op/s
hamt(10000)                   :       910400.84 +/- 1.43% op/s
persistent-hash-trie(10000)   :        48959.19 +/- 2.52% op/s
mori hash_map(10000)          :       718146.09 +/- 2.52% op/s
hashtrie(100000)              :       727510.61 +/- 0.69% op/s
hamt(100000)                  :       763270.93 +/- 0.87% op/s
persistent-hash-trie(100000)  :        18550.51 +/- 0.26% op/s
mori hash_map(100000)         :       552115.36 +/- 0.85% op/s


Put All
hashtrie(10)                  :       179967.25 +/- 0.64% op/s
hamt(10)                      :       207869.60 +/- 1.26% op/s
persistent-hash-trie(10)      :        37241.03 +/- 0.43% op/s
mori hash_map(10)             :        95905.87 +/- 0.48% op/s
hashtrie(100)                 :        12037.18 +/- 5.14% op/s
hamt(100)                     :        13720.51 +/- 1.38% op/s
persistent-hash-trie(100)     :         1015.71 +/- 3.86% op/s
mori hash_map(100)            :         7542.94 +/- 1.69% op/s
hashtrie(1000)                :         1058.03 +/- 0.84% op/s
hamt(1000)                    :         1137.66 +/- 1.00% op/s
persistent-hash-trie(1000)    :           55.90 +/- 4.88% op/s
mori hash_map(1000)           :          244.21 +/- 5.89% op/s
hashtrie(10000)               :           74.42 +/- 4.27% op/s
hamt(10000)                   :           83.73 +/- 4.31% op/s
persistent-hash-trie(10000)   :            4.38 +/- 5.09% op/s
mori hash_map(10000)          :           27.47 +/- 5.35% op/s


remove nth
hashtrie(10)                  :      2000457.61 +/- 2.38% op/s
hamt(10)                      :      1852861.00 +/- 0.99% op/s
persistent-hash-trie(10)      :       158521.96 +/- 1.01% op/s
mori hash_map(10)             :      1036970.58 +/- 0.86% op/s
hashtrie(100)                 :      1361872.23 +/- 2.46% op/s
hamt(100)                     :      1351888.10 +/- 2.15% op/s
persistent-hash-trie(100)     :        45186.70 +/- 1.31% op/s
mori hash_map(100)            :       759651.69 +/- 1.13% op/s
hashtrie(1000)                :      1085862.03 +/- 1.38% op/s
hamt(1000)                    :      1112764.10 +/- 0.90% op/s
persistent-hash-trie(1000)    :        32660.80 +/- 0.95% op/s
mori hash_map(1000)           :       317429.44 +/- 7.19% op/s
hashtrie(10000)               :       770538.15 +/- 2.63% op/s
hamt(10000)                   :       837521.94 +/- 1.85% op/s
persistent-hash-trie(10000)   :        26677.44 +/- 0.77% op/s
mori hash_map(10000)          :       275309.11 +/- 2.41% op/s
hashtrie(100000)              :       456157.71 +/- 2.25% op/s
hamt(100000)                  :       515390.29 +/- 1.16% op/s
persistent-hash-trie(100000)  :        10961.99 +/- 8.04% op/s
mori hash_map(100000)         :       182941.49 +/- 7.98% op/s


Remove All
hashtrie(10)                  :       206671.29 +/- 1.61% op/s
hamt(10)                      :       213287.68 +/- 1.09% op/s
persistent-hash-trie(10)      :        18800.20 +/- 1.13% op/s
mori hash_map(10)             :       103178.47 +/- 1.47% op/s
hashtrie(100)                 :        14929.20 +/- 2.38% op/s
hamt(100)                     :        15783.71 +/- 1.19% op/s
persistent-hash-trie(100)     :         1824.47 +/- 4.22% op/s
mori hash_map(100)            :         8145.20 +/- 3.39% op/s
hashtrie(1000)                :         1158.58 +/- 0.74% op/s
hamt(1000)                    :         1171.56 +/- 0.97% op/s
persistent-hash-trie(1000)    :          902.28 +/- 1.38% op/s
mori hash_map(1000)           :          346.12 +/- 1.07% op/s
hashtrie(10000)               :           78.83 +/- 1.96% op/s
hamt(10000)                   :           81.63 +/- 5.49% op/s
persistent-hash-trie(10000)   :          238.57 +/- 1.68% op/s
mori hash_map(10000)          :           32.47 +/- 1.45% op/s


Count
hashtrie(10)                  :       130884.51 +/- 3.39% op/s
hamt(10)                      :      2103590.71 +/- 0.49% op/s
persistent-hash-trie(10)      :       130920.67 +/- 1.02% op/s
mori hash_map(10)             :     30530686.22 +/- 2.91% op/s
hashtrie(100)                 :        16666.39 +/- 0.93% op/s
hamt(100)                     :       342337.40 +/- 0.89% op/s
persistent-hash-trie(100)     :         6274.13 +/- 2.62% op/s
mori hash_map(100)            :     29624181.83 +/- 1.65% op/s
hashtrie(1000)                :         1599.13 +/- 0.31% op/s
hamt(1000)                    :        16019.05 +/- 0.20% op/s
persistent-hash-trie(1000)    :          659.91 +/- 1.51% op/s
mori hash_map(1000)           :     28071952.38 +/- 6.41% op/s
hashtrie(10000)               :          151.00 +/- 0.88% op/s
hamt(10000)                   :         3101.02 +/- 0.41% op/s
persistent-hash-trie(10000)   :          138.80 +/- 2.38% op/s
mori hash_map(10000)          :     29601747.36 +/- 1.15% op/s


Sum
hashtrie(10)                  :       439584.92 +/- 0.32% op/s
hamt(10)                      :      3381904.03 +/- 0.49% op/s
persistent-hash-trie(10)      :       193006.34 +/- 1.81% op/s
mori hash_map(10)             :      1524593.94 +/- 0.18% op/s
hashtrie(100)                 :        39388.17 +/- 0.05% op/s
hamt(100)                     :       329751.18 +/- 0.50% op/s
persistent-hash-trie(100)     :         6431.18 +/- 1.35% op/s
mori hash_map(100)            :       147262.68 +/- 0.30% op/s
hashtrie(1000)                :         3321.13 +/- 3.89% op/s
hamt(1000)                    :        15326.25 +/- 5.44% op/s
persistent-hash-trie(1000)    :          608.53 +/- 2.29% op/s
mori hash_map(1000)           :        11399.52 +/- 0.47% op/s
hashtrie(10000)               :          325.09 +/- 2.54% op/s
hamt(10000)                   :         3322.86 +/- 0.88% op/s
persistent-hash-trie(10000)   :          136.59 +/- 1.66% op/s
mori hash_map(10000)          :         1523.85 +/- 0.79% op/s


Keys
hashtrie(10)                  :       387790.27 +/- 2.37% op/s
hamt(10)                      :      2099750.38 +/- 3.12% op/s
persistent-hash-trie(10)      :       252322.36 +/- 0.47% op/s
mori hash_map(10)             :       314378.75 +/- 1.16% op/s
hashtrie(100)                 :        31071.46 +/- 2.15% op/s
hamt(100)                     :       229922.38 +/- 3.80% op/s
persistent-hash-trie(100)     :         6963.01 +/- 0.65% op/s
mori hash_map(100)            :        24453.12 +/- 1.39% op/s
hashtrie(1000)                :         3510.72 +/- 0.41% op/s
hamt(1000)                    :        14014.31 +/- 1.39% op/s
persistent-hash-trie(1000)    :          628.34 +/- 2.19% op/s
mori hash_map(1000)           :         1964.04 +/- 4.87% op/s
hashtrie(10000)               :          311.04 +/- 2.45% op/s
hamt(10000)                   :         2429.46 +/- 3.07% op/s
persistent-hash-trie(10000)   :          128.16 +/- 2.29% op/s
mori hash_map(10000)          :          196.77 +/- 3.66% op/s
```




[hashtrie]: https://github.com/mattbierner/hashtrie
[hamt]: https://github.com/mattbierner/hamt
[mori]: https://github.com/swannodette/mori
[persistent]: https://github.com/hughfdjackson/persistent-hash-trie