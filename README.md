Javascript Immutable Map Benchmarks

Benchmarks a number of Javascript immutable map implementations:

* Javascript objects that achieve immutability though copying (using `Object.assign`).
* ES6's `Map` that achieves immutability though copying.
* [hashtrie][hashtrie] - 0.2.x
* [HAMT][hamt] -  0.1.x
* [HAMT+][hamt_plus] - 0.0.x
* [mori][mori] - 0.2.x
* [immutable][immutable] - 2.0.x


### Usage
To run the benchmarks:

``` bash
$ npm install
$ npm run benchmark
```

### Benchmarks
The following are benchmarked:

* Get one entry from a map of size N.
* Put one entry into a map of size N.
* Remove one entry from a map of size N.

* Put N entries into a map, where each put operation is immutable.
* Put N entries into a map, where puts may use transient mutation .
* Remove N entries from a map, where each remove operation is immutable.
* Remove N entries from a map, where removes may use transient mutation.

* Get the number of entries in map of size N.
* Get an array of keys keys for a map of size N.
* Sum all values in map of size N.

### Results
* [results](https://github.com/mattbierner/js-hashtrie-benchmark/wiki/results)
* [Overview of basic Javascript hashtries and optimizations](https://blog.mattbierner.com/persistent-hash-tries-in-javavascript/)
* [Overview of Javascript HAMT implementation and optimization used by the HAMT library](http://blog.mattbierner.com/hash-array-mapped-tries-in-javascript/)

### Interesting Notes
* HAMT, HAMT+, and Immutable are the three fasted implementations.
* These three library also perform well as the map size gets very large. It only costs ~6x as much to put an element into a HAMT map with 100000 entries as it does to put one into a HAMT map with 10 entries.
* The immutability through copying used for Object and Map is too slow to use for larger objects. Their memory usage is likely much higher as well.
* Hashtrie's sparse array storage is a [major performance hit](http://jsperf.com/sparse-array-reduce-overhead)
for folds as neither `reduce` or `splice` show good performance for sparse arrays.
* Both Mori and Immutable are more complete data structure libraries. This should be considered when selecting an immutable map implementation.
* Hamt's use of iterators for some operations results in some overhead in these artificial benchmarks. You can see this in the `keys` test where the `fold` based implementation of `keys` is faster then `Array.from(k.keys())`
* HAMT is the fastest choice for `fold` style, accumulation operations such as sum.
* Native `Map` is fastest for transient operations, but `Immutable` or `Hamt+` perform best of these libraries performance when a mix of transient and non-transient operations are used.
* Hamt+ does have a small amount of overhead compared to regular Hamt, but performs much better when transient mutation can be used.

```
hashtrie - 0.2.2
hamt - 2.2.1
hamt_plus - 1.0.1
mori - 0.3.2
persistent-hash-trie - 0.4.2
immutable – 3.8.1

Get Nth
Native Object(10)             :     29056281.18 +/- 0.19% op/s
Native Map(10)                :     27782668.79 +/- 0.18% op/s
Hashtrie(10)                  :     14696366.60 +/- 0.20% op/s
Hamt(10)                      :     15342409.30 +/- 0.17% op/s
Hamt+(10)                     :     14169755.28 +/- 0.20% op/s
Mori(10)                      :     12711327.39 +/- 0.23% op/s
Immutable(10)                 :     13778314.50 +/- 0.23% op/s
Native Object(100)            :     38306469.10 +/- 1.36% op/s
Native Map(100)               :     21964457.90 +/- 0.36% op/s
Hashtrie(100)                 :     12524218.87 +/- 0.44% op/s
Hamt(100)                     :     13458912.44 +/- 0.26% op/s
Hamt+(100)                    :     12625249.09 +/- 0.25% op/s
Mori(100)                     :     12220107.27 +/- 0.33% op/s
Immutable(100)                :     10793095.07 +/- 0.29% op/s
Native Object(1000)           :     31027245.24 +/- 0.72% op/s
Native Map(1000)              :     17105621.86 +/- 0.41% op/s
Hashtrie(1000)                :      9446511.52 +/- 0.55% op/s
Hamt(1000)                    :     10160645.70 +/- 0.27% op/s
Hamt+(1000)                   :      9858759.62 +/- 0.30% op/s
Mori(1000)                    :      3542218.55 +/- 8.51% op/s
Immutable(1000)               :      8691516.75 +/- 2.64% op/s
Native Object(10000)          :     20391798.66 +/- 0.19% op/s
Native Map(10000)             :     12019841.50 +/- 3.17% op/s
Hashtrie(10000)               :      6543291.43 +/- 0.26% op/s
Hamt(10000)                   :      7505846.06 +/- 2.26% op/s
Hamt+(10000)                  :      7246537.00 +/- 0.37% op/s
Mori(10000)                   :      2942723.39 +/- 6.69% op/s
Immutable(10000)              :      6303359.91 +/- 0.21% op/s
Native Object(100000)         :      6863267.04 +/- 0.69% op/s
Native Map(100000)            :      7221720.31 +/- 0.90% op/s
Hashtrie(100000)              :      2078984.29 +/- 1.02% op/s
Hamt(100000)                  :      2389756.66 +/- 1.05% op/s
Hamt+(100000)                 :      2104792.46 +/- 1.99% op/s
Mori(100000)                  :      1462963.87 +/- 5.18% op/s
Immutable(100000)             :      1670053.68 +/- 1.91% op/s


Put Nth
Native Object(10)             :       816593.76 +/- 0.88% op/s
Native Map(10)                :      1248504.81 +/- 0.51% op/s
Hashtrie(10)                  :      5957330.77 +/- 1.06% op/s
Hamt(10)                      :      7009290.38 +/- 10.49% op/s
Hamt+(10)                     :      4982506.32 +/- 9.80% op/s
Mori(10)                      :      7793728.61 +/- 0.78% op/s
Immutable(10)                 :      6066611.74 +/- 12.38% op/s
Native Object(100)            :        36829.21 +/- 0.80% op/s
Native Map(100)               :       135781.41 +/- 0.30% op/s
Hashtrie(100)                 :      1625321.40 +/- 5.66% op/s
Hamt(100)                     :      4825995.36 +/- 8.63% op/s
Hamt+(100)                    :      3429105.59 +/- 7.77% op/s
Mori(100)                     :      5836843.73 +/- 0.31% op/s
Immutable(100)                :      3324832.74 +/- 6.77% op/s
Native Object(1000)           :         3412.33 +/- 0.17% op/s
Native Map(1000)              :        13787.36 +/- 0.21% op/s
Hashtrie(1000)                :      3114391.74 +/- 3.82% op/s
Hamt(1000)                    :      3456977.74 +/- 7.77% op/s
Hamt+(1000)                   :      2713319.91 +/- 7.34% op/s
Mori(1000)                    :      4238692.69 +/- 0.30% op/s
Immutable(1000)               :      3428156.36 +/- 6.56% op/s
Native Object(10000)          :          303.11 +/- 0.16% op/s
Native Map(10000)             :         1079.78 +/- 0.27% op/s
Hashtrie(10000)               :      2653683.28 +/- 0.26% op/s
Hamt(10000)                   :      3282719.85 +/- 8.26% op/s
Hamt+(10000)                  :      2728334.91 +/- 6.56% op/s
Mori(10000)                   :      3696190.45 +/- 0.27% op/s
Immutable(10000)              :      3244216.70 +/- 7.56% op/s
Native Object(100000)         :           16.69 +/- 8.01% op/s
Native Map(100000)            :           65.77 +/- 10.48% op/s
Hashtrie(100000)              :      2345494.93 +/- 0.21% op/s
Hamt(100000)                  :      2620763.57 +/- 6.67% op/s
Hamt+(100000)                 :      2246120.81 +/- 5.98% op/s
Mori(100000)                  :      3342704.26 +/- 0.21% op/s
Immutable(100000)             :      2702704.28 +/- 5.83% op/s


Put N
Native Object(10)             :       200604.92 +/- 0.19% op/s
Native Map(10)                :       240454.82 +/- 0.21% op/s
Hashtrie(10)                  :       622868.28 +/- 0.37% op/s
Hamt(10)                      :      1474311.43 +/- 1.63% op/s
Hamt+(10)                     :       646243.12 +/- 0.40% op/s
Mori(10)                      :       465162.88 +/- 0.33% op/s
Immutable(10)                 :       595047.26 +/- 0.26% op/s
Native Object(100)            :          713.59 +/- 0.18% op/s
Native Map(100)               :         2587.25 +/- 0.99% op/s
Hashtrie(100)                 :        40344.84 +/- 0.31% op/s
Hamt(100)                     :        70708.41 +/- 1.73% op/s
Hamt+(100)                    :        43283.12 +/- 0.39% op/s
Mori(100)                     :        57029.15 +/- 1.61% op/s
Immutable(100)                :        56087.58 +/- 0.18% op/s
Native Object(1000)           :            6.85 +/- 0.23% op/s
Native Map(1000)              :           27.75 +/- 0.21% op/s
Hashtrie(1000)                :         3279.09 +/- 1.62% op/s
Hamt(1000)                    :         4510.15 +/- 0.19% op/s
Hamt+(1000)                   :         3244.58 +/- 1.51% op/s
Mori(1000)                    :         2250.96 +/- 0.18% op/s
Immutable(1000)               :         4159.94 +/- 1.55% op/s
Native Object(10000)          :            0.06 +/- 0.20% op/s
Native Map(10000)             :            0.24 +/- 1.42% op/s
Hashtrie(10000)               :          245.54 +/- 0.58% op/s
Hamt(10000)                   :          330.13 +/- 1.71% op/s
Hamt+(10000)                  :          244.88 +/- 0.48% op/s
Mori(10000)                   :          211.84 +/- 1.57% op/s
Immutable(10000)              :          286.48 +/- 1.98% op/s


Put N (transient)
Native Object(10)             :      6603153.41 +/- 0.58% op/s
Native Map(10)                :      2193388.21 +/- 0.89% op/s
Hamt(10)                      :      2342581.58 +/- 0.50% op/s
Hamt+(10)                     :       627629.37 +/- 0.92% op/s
Mori(10)                      :       419806.63 +/- 0.39% op/s
Immutable(10)                 :       625349.84 +/- 1.00% op/s
Native Object(100)            :       220453.39 +/- 0.57% op/s
Native Map(100)               :       263368.90 +/- 0.87% op/s
Hamt(100)                     :        97684.80 +/- 0.63% op/s
Hamt+(100)                    :        59748.56 +/- 0.89% op/s
Mori(100)                     :        12270.61 +/- 0.20% op/s
Immutable(100)                :        76740.00 +/- 0.90% op/s
Native Object(1000)           :        19260.47 +/- 0.13% op/s
Native Map(1000)              :        25414.77 +/- 0.77% op/s
Hamt(1000)                    :         6365.09 +/- 0.19% op/s
Hamt+(1000)                   :         4997.90 +/- 1.03% op/s
Mori(1000)                    :          974.92 +/- 0.19% op/s
Immutable(1000)               :         6651.31 +/- 0.85% op/s
Native Object(10000)          :         1801.54 +/- 0.54% op/s
Native Map(10000)             :         1707.90 +/- 0.90% op/s
Hamt(10000)                   :          457.74 +/- 0.42% op/s
Hamt+(10000)                  :          476.50 +/- 1.00% op/s
Mori(10000)                   :           81.50 +/- 0.91% op/s
Immutable(10000)              :          600.33 +/- 0.22% op/s


Remove Nth
Native Object(10)             :       539935.72 +/- 0.73% op/s
Native Map(10)                :      1166199.69 +/- 0.78% op/s
Hashtrie(10)                  :      5216517.90 +/- 4.08% op/s
Hamt(10)                      :      8423234.77 +/- 0.21% op/s
Hamt+(10)                     :      7087862.88 +/- 0.21% op/s
Mori(10)                      :      6787006.82 +/- 3.91% op/s
Immutable(10)                 :      6247054.75 +/- 0.27% op/s
Native Object(100)            :        36683.09 +/- 3.00% op/s
Native Map(100)               :       136726.63 +/- 0.18% op/s
Hashtrie(100)                 :      4243469.06 +/- 4.12% op/s
Hamt(100)                     :      5151958.88 +/- 0.24% op/s
Hamt+(100)                    :      4320250.49 +/- 5.18% op/s
Mori(100)                     :      5922900.83 +/- 0.19% op/s
Immutable(100)                :      4342549.85 +/- 3.81% op/s
Native Object(1000)           :         3378.71 +/- 0.55% op/s
Native Map(1000)              :        14047.00 +/- 3.69% op/s
Hashtrie(1000)                :      3318493.23 +/- 0.12% op/s
Hamt(1000)                    :      3718426.65 +/- 0.27% op/s
Hamt+(1000)                   :      3332420.57 +/- 3.99% op/s
Mori(1000)                    :      2355726.64 +/- 6.48% op/s
Immutable(1000)               :      3360010.37 +/- 0.29% op/s
Native Object(10000)          :          305.61 +/- 0.13% op/s
Native Map(10000)             :         1113.26 +/- 0.20% op/s
Hashtrie(10000)               :      2540233.41 +/- 0.28% op/s
Hamt(10000)                   :      2965670.04 +/- 4.03% op/s
Hamt+(10000)                  :      2723739.79 +/- 0.36% op/s
Mori(10000)                   :      1891121.53 +/- 6.67% op/s
Immutable(10000)              :      2665385.38 +/- 0.43% op/s
Native Object(100000)         :           16.90 +/- 6.15% op/s
Native Map(100000)            :           64.19 +/- 10.05% op/s
Hashtrie(100000)              :      1205691.01 +/- 0.41% op/s
Hamt(100000)                  :      1435359.72 +/- 0.35% op/s
Hamt+(100000)                 :      1307973.93 +/- 0.62% op/s
Mori(100000)                  :      1204569.32 +/- 0.76% op/s
Immutable(100000)             :      1109131.90 +/- 0.59% op/s


Remove N
Native Object(10)             :        80088.70 +/- 11.31% op/s
Native Map(10)                :       119092.22 +/- 0.22% op/s
Hashtrie(10)                  :       792527.10 +/- 0.47% op/s
Hamt(10)                      :      1463595.44 +/- 0.97% op/s
Hamt+(10)                     :      1157616.66 +/- 0.40% op/s
Mori(10)                      :       954278.04 +/- 0.38% op/s
Immutable(10)                 :       982352.88 +/- 0.19% op/s
Native Object(100)            :          376.86 +/- 0.13% op/s
Native Map(100)               :         1367.33 +/- 0.18% op/s
Hashtrie(100)                 :        50458.04 +/- 1.53% op/s
Hamt(100)                     :        74800.44 +/- 0.46% op/s
Hamt+(100)                    :        62321.49 +/- 1.86% op/s
Mori(100)                     :        72772.41 +/- 0.13% op/s
Immutable(100)                :        58597.30 +/- 1.72% op/s
Native Object(1000)           :            3.52 +/- 0.26% op/s
Native Map(1000)              :           14.37 +/- 0.32% op/s
Hashtrie(1000)                :         3852.02 +/- 1.85% op/s
Hamt(1000)                    :         4774.34 +/- 0.12% op/s
Hamt+(1000)                   :         4210.75 +/- 0.15% op/s
Mori(1000)                    :         2973.29 +/- 0.13% op/s
Immutable(1000)               :         4286.14 +/- 0.16% op/s
Native Object(10000)          :            0.03 +/- 0.32% op/s
Native Map(10000)             :            0.11 +/- 0.84% op/s
Hashtrie(10000)               :          251.88 +/- 0.34% op/s
Hamt(10000)                   :          349.37 +/- 0.15% op/s
Hamt+(10000)                  :          302.82 +/- 1.43% op/s
Mori(10000)                   :          220.89 +/- 2.69% op/s
Immutable(10000)              :          312.01 +/- 0.14% op/s


Remove N (transient)
Native Assign(10)             :       727559.59 +/- 0.59% op/s
Native Map(10)                :      1073757.24 +/- 0.10% op/s
Hamt(10)                      :      1499178.82 +/- 0.80% op/s
Hamt+(10)                     :       938283.06 +/- 0.08% op/s
Mori(10)                      :       460362.90 +/- 1.04% op/s
Immutable(10)                 :       982099.91 +/- 0.14% op/s
Native Assign(100)            :        34187.51 +/- 1.08% op/s
Native Map(100)               :       114955.78 +/- 0.11% op/s
Hamt(100)                     :        75651.58 +/- 1.62% op/s
Hamt+(100)                    :        75449.15 +/- 0.08% op/s
Mori(100)                     :        47426.19 +/- 0.73% op/s
Immutable(100)                :        83952.42 +/- 0.54% op/s
Native Assign(1000)           :         3152.78 +/- 0.90% op/s
Native Map(1000)              :        10638.21 +/- 0.13% op/s
Hamt(1000)                    :         4675.51 +/- 1.81% op/s
Hamt+(1000)                   :         6404.17 +/- 0.63% op/s
Mori(1000)                    :         2609.57 +/- 1.56% op/s
Immutable(1000)               :         7234.19 +/- 0.96% op/s
Native Assign(10000)          :          282.04 +/- 0.26% op/s
Native Map(10000)             :          862.51 +/- 0.64% op/s
Hamt(10000)                   :          348.99 +/- 1.47% op/s
Hamt+(10000)                  :          520.38 +/- 0.82% op/s
Mori(10000)                   :          232.31 +/- 1.36% op/s
Immutable(10000)              :          547.72 +/- 0.84% op/s


Count
Native Object(10)             :     63882466.36 +/- 0.79% op/s
Native Map(10)                :    267912346.72 +/- 0.11% op/s
Hashtrie(10)                  :      4379449.11 +/- 0.44% op/s
Hamt(10)                      :    173026834.94 +/- 1.82% op/s
Hamt+(10)                     :    154326375.09 +/- 0.77% op/s
Mori(10)                      :    140537435.18 +/- 1.13% op/s
Immutable(10)                 :    870696556.99 +/- 0.14% op/s
Native Object(100)            :       430526.61 +/- 1.02% op/s
Native Map(100)               :    140184100.97 +/- 5.18% op/s
Hashtrie(100)                 :            0.00 +/- 0.00% op/s
Hamt(100)                     :    145927576.99 +/- 1.13% op/s
Hamt+(100)                    :    866190711.19 +/- 0.13% op/s
Mori(100)                     :    133732956.45 +/- 1.43% op/s
Immutable(100)                :    529494972.07 +/- 21.22% op/s
Native Object(1000)           :        23994.91 +/- 0.18% op/s
Native Map(1000)              :    113164889.90 +/- 0.97% op/s
Hashtrie(1000)                :            0.00 +/- 0.00% op/s
Hamt(1000)                    :    295136882.41 +/- 24.06% op/s
Hamt+(1000)                   :    141998764.95 +/- 1.60% op/s
Mori(1000)                    :    136380210.55 +/- 2.81% op/s
Immutable(1000)               :    159815642.70 +/- 1.36% op/s
Native Object(10000)          :         1347.58 +/- 0.57% op/s
Native Map(10000)             :    112086307.00 +/- 1.07% op/s
Hashtrie(10000)               :            0.00 +/- 0.00% op/s
Hamt(10000)                   :    145800393.15 +/- 1.34% op/s
Hamt+(10000)                  :    170598963.12 +/- 8.76% op/s
Mori(10000)                   :    124254916.96 +/- 1.28% op/s
Immutable(10000)              :    184770673.41 +/- 2.82% op/s


Sum
Native Object(10)             :      5119364.62 +/- 0.64% op/s
Native Map(10)                :      2864978.01 +/- 0.51% op/s
Hashtrie(10)                  :      4111443.64 +/- 0.45% op/s
Hamt(10)                      :     10892305.07 +/- 0.34% op/s
Hamt+(10)                     :     10916047.50 +/- 0.84% op/s
Mori(10)                      :      8702601.01 +/- 0.31% op/s
Immutable(10)                 :      3564687.70 +/- 1.40% op/s
Native Object(100)            :       205356.87 +/- 0.11% op/s
Native Map(100)               :       428353.07 +/- 1.05% op/s
Hashtrie(100)                 :            0.00 +/- 0.00% op/s
Hamt(100)                     :       694092.25 +/- 0.09% op/s
Hamt+(100)                    :       685687.24 +/- 0.85% op/s
Mori(100)                     :      1117043.24 +/- 0.21% op/s
Immutable(100)                :       417685.09 +/- 0.73% op/s
Native Object(1000)           :        13204.14 +/- 0.13% op/s
Native Map(1000)              :        44330.34 +/- 0.79% op/s
Hashtrie(1000)                :            0.00 +/- 0.00% op/s
Hamt(1000)                    :        58474.42 +/- 0.17% op/s
Hamt+(1000)                   :        56132.99 +/- 1.04% op/s
Mori(1000)                    :        70815.35 +/- 0.25% op/s
Immutable(1000)               :        34585.53 +/- 0.35% op/s
Native Object(10000)          :          919.38 +/- 0.73% op/s
Native Map(10000)             :         4471.07 +/- 0.35% op/s
Hashtrie(10000)               :            0.00 +/- 0.00% op/s
Hamt(10000)                   :         6134.12 +/- 0.39% op/s
Hamt+(10000)                  :         6014.68 +/- 0.16% op/s
Mori(10000)                   :         7783.18 +/- 0.25% op/s
Immutable(10000)              :         4272.78 +/- 0.33% op/s


Keys
Native Object(10)             :     63192753.04 +/- 0.56% op/s
Native Map(10)                :       856047.11 +/- 0.34% op/s
Hashtrie(10)                  :      4575273.19 +/- 0.12% op/s
Hamt(10)                      :       923904.18 +/- 0.20% op/s
Hamt fold(10)                 :      8666170.47 +/- 0.47% op/s
Hamt+(10)                     :       891972.52 +/- 0.18% op/s
Hamt+ fold(10)                :      3987940.16 +/- 0.12% op/s
Mori(10)                      :       916842.64 +/- 0.13% op/s
Immutable(10)                 :       691813.28 +/- 3.58% op/s
Native Object(100)            :       452010.16 +/- 0.23% op/s
Native Map(100)               :       109775.55 +/- 0.12% op/s
Hashtrie(100)                 :            0.00 +/- 0.00% op/s
Hamt(100)                     :       100863.21 +/- 0.11% op/s
Hamt fold(100)                :       357653.28 +/- 0.09% op/s
Hamt+(100)                    :        95953.96 +/- 1.24% op/s
Hamt+ fold(100)               :       355079.63 +/- 0.11% op/s
Mori(100)                     :        68364.51 +/- 1.83% op/s
Immutable(100)                :       175258.31 +/- 1.58% op/s
Native Object(1000)           :        23963.29 +/- 1.21% op/s
Native Map(1000)              :        11275.23 +/- 0.13% op/s
Hashtrie(1000)                :            0.00 +/- 0.00% op/s
Hamt(1000)                    :         9698.17 +/- 1.13% op/s
Hamt fold(1000)               :        33285.21 +/- 0.19% op/s
Hamt+(1000)                   :         9309.72 +/- 1.18% op/s
Hamt+ fold(1000)              :        32798.97 +/- 0.15% op/s
Mori(1000)                    :         4774.45 +/- 1.43% op/s
Immutable(1000)               :        18839.85 +/- 1.07% op/s
Native Object(10000)          :         1332.51 +/- 0.10% op/s
Native Map(10000)             :         1145.30 +/- 0.99% op/s
Hashtrie(10000)               :            0.00 +/- 0.00% op/s
Hamt(10000)                   :         1081.48 +/- 0.16% op/s
Hamt fold(10000)              :         3535.20 +/- 1.00% op/s
Hamt+(10000)                  :         1046.94 +/- 0.25% op/s
Hamt+ fold(10000)             :         3492.50 +/- 0.99% op/s
Mori(10000)                   :          422.94 +/- 0.13% op/s
Immutable(10000)              :         2232.92 +/- 0.84% op/s
```



[hashtrie]: https://github.com/mattbierner/hashtrie
[hamt]: https://github.com/mattbierner/hamt
[hamt_plus]: https://github.com/mattbierner/hamt_plus
[mori]: https://github.com/swannodette/mori
[persistent]: https://github.com/hughfdjackson/persistent-hash-trie
[immutable]: https://github.com/facebook/immutable-js


[clojurescript]: https://github.com/clojure/clojurescript
[khepri]: http://khepri-lang.com
