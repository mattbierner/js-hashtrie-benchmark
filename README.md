Javascript Hash Trie Benchmarking

Benchmarks 3 Persistent Javascript hashtrie implementations:
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

Mori's `hash_map` is slow for gets, especially as the size of the map increases,
but really fast for updates even on large maps.

hashtrie is fastest for gets, but ~2x slower than mori for updates. HAMT is the fastest
overall for gets, but slightly slower than hashmap for puts and removes.

persistent-hash-trie has some interesting features, like custom key compares and
breaking walks, but is slower for puts, gets and single removes, being 5-10x
slower on larger tries of 10000 or 100000. Tests show persistent-hash-trie is
10x faster for removing all entries from a trie of size 10000. Since this is
the opposite of puts and single removes, I believe this is related to
a [bug in the library](https://github.com/hughfdjackson/persistent-hash-trie/issues/24).






```
Get nth
hashtrie(10)                  :      6439420.55 +/- 3.14% op/s
hamt(10)                      :      5588886.25 +/- 0.73% op/s
persistent-hash-trie(10)      :      3232060.25 +/- 0.57% op/s
mori hash_map(10)             :      1560029.38 +/- 1.99% op/s
hashtrie(100)                 :      6385384.22 +/- 0.48% op/s
hamt(100)                     :      6362563.19 +/- 0.49% op/s
persistent-hash-trie(100)     :      2138850.71 +/- 3.63% op/s
mori hash_map(100)            :      1361395.62 +/- 4.57% op/s
hashtrie(1000)                :      5300384.42 +/- 1.05% op/s
hamt(1000)                    :      5610255.22 +/- 1.34% op/s
persistent-hash-trie(1000)    :      1370219.95 +/- 0.61% op/s
mori hash_map(1000)           :       601029.52 +/- 2.35% op/s
hashtrie(100000)              :      1337721.58 +/- 4.08% op/s
hamt(100000)                  :      1606466.38 +/- 2.27% op/s
persistent-hash-trie(100000)  :       806638.90 +/- 2.36% op/s
mori hash_map(100000)         :       397032.80 +/- 2.68% op/s


put nth
hashtrie(10)                  :       486127.20 +/- 2.86% op/s
hamt(10)                      :       777822.40 +/- 0.39% op/s
persistent-hash-trie(10)      :       277379.36 +/- 0.24% op/s
mori hash_map(10)             :      1006305.00 +/- 2.66% op/s
hashtrie(100)                 :       368753.96 +/- 1.77% op/s
hamt(100)                     :       323291.95 +/- 1.92% op/s
persistent-hash-trie(100)     :        76687.63 +/- 0.75% op/s
mori hash_map(100)            :       762708.73 +/- 3.81% op/s
hashtrie(1000)                :       462181.94 +/- 3.38% op/s
hamt(1000)                    :       196217.06 +/- 0.93% op/s
persistent-hash-trie(1000)    :        54135.61 +/- 0.66% op/s
mori hash_map(1000)           :       330546.51 +/- 2.99% op/s
hashtrie(10000)               :       391555.05 +/- 1.46% op/s
hamt(10000)                   :       228035.12 +/- 4.65% op/s
persistent-hash-trie(10000)   :        46225.98 +/- 2.04% op/s
mori hash_map(10000)          :       682875.17 +/- 3.32% op/s
hashtrie(100000)              :       169957.77 +/- 10.73% op/s
hamt(100000)                  :       127933.42 +/- 12.58% op/s
persistent-hash-trie(100000)  :        26952.47 +/- 1.17% op/s
mori hash_map(100000)         :       519538.07 +/- 6.39% op/s


Put All
hashtrie(10)                  :        49079.53 +/- 1.34% op/s
hamt(10)                      :        73284.50 +/- 1.05% op/s
persistent-hash-trie(10)      :        37983.14 +/- 0.39% op/s
mori hash_map(10)             :       106290.89 +/- 2.87% op/s
hashtrie(100)                 :         3708.63 +/- 3.29% op/s
hamt(100)                     :         3541.61 +/- 0.51% op/s
persistent-hash-trie(100)     :         1006.16 +/- 0.77% op/s
mori hash_map(100)            :         7896.76 +/- 3.97% op/s
hashtrie(1000)                :          307.75 +/- 3.67% op/s
hamt(1000)                    :          267.34 +/- 1.45% op/s
persistent-hash-trie(1000)    :           62.00 +/- 0.61% op/s
mori hash_map(1000)           :          300.77 +/- 1.44% op/s
hashtrie(10000)               :           26.48 +/- 1.62% op/s
hamt(10000)                   :           20.74 +/- 2.10% op/s
persistent-hash-trie(10000)   :            4.70 +/- 2.46% op/s
mori hash_map(10000)          :           34.03 +/- 0.70% op/s


remove nth
hashtrie(10)                  :       454862.58 +/- 0.29% op/s
hamt(10)                      :       547889.25 +/- 3.80% op/s
persistent-hash-trie(10)      :       144491.22 +/- 0.92% op/s
mori hash_map(10)             :       995064.95 +/- 3.06% op/s
hashtrie(100)                 :       330560.87 +/- 2.68% op/s
hamt(100)                     :       323013.71 +/- 2.27% op/s
persistent-hash-trie(100)     :        44921.34 +/- 2.28% op/s
mori hash_map(100)            :       854901.38 +/- 0.95% op/s
hashtrie(1000)                :       299274.26 +/- 0.86% op/s
hamt(1000)                    :       241552.50 +/- 4.43% op/s
persistent-hash-trie(1000)    :        34023.84 +/- 1.30% op/s
mori hash_map(1000)           :       376187.74 +/- 2.22% op/s
hashtrie(10000)               :       235707.66 +/- 3.11% op/s
hamt(10000)                   :       202298.51 +/- 1.97% op/s
persistent-hash-trie(10000)   :        26385.53 +/- 1.51% op/s
mori hash_map(10000)          :       302797.07 +/- 6.55% op/s
hashtrie(100000)              :       174036.69 +/- 2.10% op/s
hamt(100000)                  :       144717.19 +/- 4.69% op/s
persistent-hash-trie(100000)  :        13804.19 +/- 4.10% op/s
mori hash_map(100000)         :       236526.09 +/- 2.49% op/s


Remove All
hashtrie(10)                  :        46646.05 +/- 3.22% op/s
hamt(10)                      :        54410.10 +/- 1.73% op/s
persistent-hash-trie(10)      :        21506.65 +/- 1.41% op/s
mori hash_map(10)             :       113523.98 +/- 0.53% op/s
hashtrie(100)                 :         3965.52 +/- 0.33% op/s
hamt(100)                     :         3075.12 +/- 2.99% op/s
persistent-hash-trie(100)     :         1902.28 +/- 3.11% op/s
mori hash_map(100)            :         7559.02 +/- 5.53% op/s
hashtrie(1000)                :          307.20 +/- 3.91% op/s
hamt(1000)                    :          222.30 +/- 4.11% op/s
persistent-hash-trie(1000)    :          856.25 +/- 3.15% op/s
mori hash_map(1000)           :          380.60 +/- 1.00% op/s
hashtrie(10000)               :           23.94 +/- 4.68% op/s
hamt(10000)                   :           19.06 +/- 1.61% op/s
persistent-hash-trie(10000)   :          231.08 +/- 1.51% op/s
mori hash_map(10000)          :           34.39 +/- 3.19% op/s
```




[hashtrie]: https://github.com/mattbierner/hashtrie
[hamt]: https://github.com/mattbierner/hamt
[hamt]: https://github.com/swannodette/mori
[persistent]: https://github.com/hughfdjackson/persistent-hash-trie