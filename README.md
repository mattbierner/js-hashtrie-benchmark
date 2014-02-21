Javascript Hash Trie Benchmarking

Benchmarks 4 Persistent Javascript hashtrie implementations:
* [hashtrie][hashtrie] - 0.1.x
* [hamt][hamt] -  0.0.x
* [persistent-hash-trie][persistent] - 0.4.x
* [mori][mori] - 0.2.x

### Usage

```
$ npm install
$ npm run benchmark
```


### Benchmarks
* Get entry in trie of size N.
* Put entry in trie of size N.
* Remove entry from trie of size N.

* Put N entries into a trie.
* Remove N entries from the trie.

### Results
[results](https://github.com/mattbierner/js-hashtrie-benchmark/wiki)

hashtrie is fastest overall, with good get, update, and set performance. HAMT is
the fastest for gets, but slower than hashmap for puts and removes (HAMT has not
been optimized as much).

Mori's `hash_map` is slow for gets, especially as the size of the map increases.
It is good for updates, but 2-3x slower than hashtrie on large
maps.

persistent-hash-trie has some interesting features, like custom key compares and
breaking walks, but is slower for puts, gets and single removes, being 5-10x
slower on larger tries of 10000 or 100000. Tests show persistent-hash-trie is
10x faster for removing all entries from a trie of size 10000. Since this is
the opposite of puts and single removes, I believe this is related to
a [bug in the library](https://github.com/hughfdjackson/persistent-hash-trie/issues/24).



```
Get nth
hashtrie(10)                  :      7245025.47 +/- 0.23% op/s
hamt(10)                      :      7146572.05 +/- 0.20% op/s
persistent-hash-trie(10)      :      3783341.28 +/- 0.36% op/s
mori hash_map(10)             :      1688971.82 +/- 0.37% op/s
hashtrie(100)                 :      6494596.32 +/- 0.21% op/s
hamt(100)                     :      6570866.37 +/- 0.24% op/s
persistent-hash-trie(100)     :      2175430.64 +/- 1.54% op/s
mori hash_map(100)            :      1638325.36 +/- 0.30% op/s
hashtrie(1000)                :      5367591.52 +/- 0.22% op/s
hamt(1000)                    :      5475113.57 +/- 4.99% op/s
persistent-hash-trie(1000)    :      1436628.18 +/- 0.30% op/s
mori hash_map(1000)           :       651602.15 +/- 1.81% op/s
hashtrie(100000)              :      1571590.28 +/- 1.69% op/s
hamt(100000)                  :      1727849.77 +/- 1.40% op/s
persistent-hash-trie(100000)  :       823154.68 +/- 2.04% op/s
mori hash_map(100000)         :       421979.04 +/- 2.42% op/s


put nth
hashtrie(10)                  :      2372149.55 +/- 0.53% op/s
hamt(10)                      :       812155.80 +/- 0.30% op/s
persistent-hash-trie(10)      :       352361.24 +/- 0.25% op/s
mori hash_map(10)             :      1109685.71 +/- 0.60% op/s
hashtrie(100)                 :       998030.73 +/- 0.59% op/s
hamt(100)                     :       293184.03 +/- 0.46% op/s
persistent-hash-trie(100)     :        86005.45 +/- 0.24% op/s
mori hash_map(100)            :       835292.92 +/- 0.44% op/s
hashtrie(1000)                :      1270080.98 +/- 0.49% op/s
hamt(1000)                    :       198994.92 +/- 0.41% op/s
persistent-hash-trie(1000)    :        68086.63 +/- 1.85% op/s
mori hash_map(1000)           :       745013.34 +/- 4.92% op/s
hashtrie(10000)               :      1080157.80 +/- 0.53% op/s
hamt(10000)                   :       245281.73 +/- 0.90% op/s
persistent-hash-trie(10000)   :        53135.76 +/- 0.38% op/s
mori hash_map(10000)          :       698265.84 +/- 0.58% op/s
hashtrie(100000)              :      1019982.58 +/- 0.55% op/s
hamt(100000)                  :       212063.53 +/- 0.43% op/s
persistent-hash-trie(100000)  :        20018.65 +/- 0.19% op/s
mori hash_map(100000)         :       641979.12 +/- 0.58% op/s


Put All
hashtrie(10)                  :       227751.63 +/- 0.56% op/s
hamt(10)                      :        64558.61 +/- 0.38% op/s
persistent-hash-trie(10)      :        34891.13 +/- 0.37% op/s
mori hash_map(10)             :        98452.21 +/- 0.51% op/s
hashtrie(100)                 :        14547.98 +/- 3.03% op/s
hamt(100)                     :         3614.43 +/- 0.37% op/s
persistent-hash-trie(100)     :         1017.57 +/- 1.35% op/s
mori hash_map(100)            :         7955.31 +/- 0.43% op/s
hashtrie(1000)                :         1188.62 +/- 0.58% op/s
hamt(1000)                    :          278.01 +/- 0.49% op/s
persistent-hash-trie(1000)    :           63.36 +/- 0.37% op/s
mori hash_map(1000)           :          292.92 +/- 3.16% op/s
hashtrie(10000)               :           91.88 +/- 1.04% op/s
hamt(10000)                   :           21.91 +/- 0.93% op/s
persistent-hash-trie(10000)   :            4.76 +/- 2.92% op/s
mori hash_map(10000)          :           33.54 +/- 2.00% op/s


remove nth
hashtrie(10)                  :      1855032.83 +/- 0.37% op/s
hamt(10)                      :       557674.10 +/- 0.81% op/s
persistent-hash-trie(10)      :       108917.55 +/- 0.35% op/s
mori hash_map(10)             :       982896.10 +/- 0.40% op/s
hashtrie(100)                 :      1414582.14 +/- 0.86% op/s
hamt(100)                     :       335541.21 +/- 0.36% op/s
persistent-hash-trie(100)     :        47998.97 +/- 0.34% op/s
mori hash_map(100)            :       821995.47 +/- 0.32% op/s
hashtrie(1000)                :      1083275.27 +/- 0.81% op/s
hamt(1000)                    :       246516.30 +/- 0.69% op/s
persistent-hash-trie(1000)    :        32836.86 +/- 2.95% op/s
mori hash_map(1000)           :       391699.97 +/- 0.48% op/s
hashtrie(10000)               :       835379.56 +/- 1.23% op/s
hamt(10000)                   :       206837.36 +/- 0.68% op/s
persistent-hash-trie(10000)   :        27359.10 +/- 0.53% op/s
mori hash_map(10000)          :       306755.97 +/- 5.04% op/s
hashtrie(100000)              :       514552.57 +/- 1.63% op/s
hamt(100000)                  :       157321.85 +/- 0.77% op/s
persistent-hash-trie(100000)  :        15415.49 +/- 0.61% op/s
mori hash_map(100000)         :       238114.54 +/- 1.04% op/s


Remove All
hashtrie(10)                  :       248797.17 +/- 0.91% op/s
hamt(10)                      :        73600.26 +/- 0.42% op/s
persistent-hash-trie(10)      :        15483.06 +/- 0.38% op/s
mori hash_map(10)             :       122495.99 +/- 0.45% op/s
hashtrie(100)                 :        15773.39 +/- 0.24% op/s
hamt(100)                     :         3171.96 +/- 3.42% op/s
persistent-hash-trie(100)     :         1939.04 +/- 0.29% op/s
mori hash_map(100)            :         8771.80 +/- 0.40% op/s
hashtrie(1000)                :         1241.07 +/- 0.53% op/s
hamt(1000)                    :          240.57 +/- 0.53% op/s
persistent-hash-trie(1000)    :          931.13 +/- 0.48% op/s
mori hash_map(1000)           :          384.36 +/- 0.44% op/s
hashtrie(10000)               :           88.72 +/- 1.47% op/s
hamt(10000)                   :           19.56 +/- 6.69% op/s
persistent-hash-trie(10000)   :          254.50 +/- 1.54% op/s
mori hash_map(10000)          :           36.79 +/- 1.02% op/s
```




[hashtrie]: https://github.com/mattbierner/hashtrie
[hamt]: https://github.com/mattbierner/hamt
[mori]: https://github.com/swannodette/mori
[persistent]: https://github.com/hughfdjackson/persistent-hash-trie