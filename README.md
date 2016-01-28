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
hamt - 2.1.1
hamt_plus - 1.0.1
mori - 0.3.2
persistent-hash-trie - 0.4.2
immutable – 3.7.6


Get Nth
Native Object(10)             :      4020673.75 +/- 1.76% op/s
Native Map(10)                :     12466001.80 +/- 0.85% op/s
Hashtrie(10)                  :      5825306.14 +/- 0.72% op/s
Hamt(10)                      :      5698553.85 +/- 0.66% op/s
Hamt+(10)                     :      4843741.24 +/- 0.76% op/s
Mori(10)                      :      1383722.21 +/- 0.87% op/s
Immutable(10)                 :      6052651.38 +/- 0.70% op/s
Native Object(100)            :      7294350.08 +/- 0.61% op/s
Native Map(100)               :     11749277.87 +/- 0.62% op/s
Hashtrie(100)                 :      5234939.79 +/- 2.37% op/s
Hamt(100)                     :      5495559.93 +/- 0.62% op/s
Hamt+(100)                    :      5407587.35 +/- 0.73% op/s
Mori(100)                     :      1299461.50 +/- 4.45% op/s
Immutable(100)                :      5898323.49 +/- 0.68% op/s
Native Object(1000)           :      6764152.20 +/- 0.64% op/s
Native Map(1000)              :      9500702.38 +/- 0.69% op/s
Hashtrie(1000)                :      4340124.71 +/- 3.95% op/s
Hamt(1000)                    :      4953589.35 +/- 0.67% op/s
Hamt+(1000)                   :      4745590.35 +/- 0.71% op/s
Mori(1000)                    :       392511.71 +/- 4.00% op/s
Immutable(1000)               :      4798788.42 +/- 0.67% op/s
Native Object(10000)          :      5987519.63 +/- 0.69% op/s
Native Map(10000)             :      9214994.91 +/- 0.94% op/s
Hashtrie(10000)               :      3648152.94 +/- 0.70% op/s
Hamt(10000)                   :      4372542.97 +/- 0.61% op/s
Hamt+(10000)                  :      4371453.62 +/- 0.64% op/s
Mori(10000)                   :       355913.32 +/- 4.81% op/s
Immutable(10000)              :      4128058.27 +/- 0.87% op/s
Native Object(100000)         :      3203845.19 +/- 0.59% op/s
Native Map(100000)            :      4258938.49 +/- 0.65% op/s
Hashtrie(100000)              :      1215284.74 +/- 4.63% op/s
Hamt(100000)                  :      1422796.15 +/- 0.76% op/s
Hamt+(100000)                 :      1426720.04 +/- 0.47% op/s
Mori(100000)                  :       265103.20 +/- 4.71% op/s
Immutable(100000)             :      1110870.32 +/- 0.46% op/s


Put Nth
Native Object(10)             :       182138.83 +/- 0.84% op/s
Native Map(10)                :       317355.74 +/- 2.61% op/s
Hashtrie(10)                  :      1576878.81 +/- 0.72% op/s
Hamt(10)                      :      1866102.77 +/- 1.00% op/s
Hamt+(10)                     :      1638101.63 +/- 11.88% op/s
Mori(10)                      :       945565.21 +/- 2.25% op/s
Immutable(10)                 :      1058792.41 +/- 5.78% op/s
Native Object(100)            :        14533.46 +/- 0.64% op/s
Native Map(100)               :        38128.40 +/- 0.53% op/s
Hashtrie(100)                 :      1098769.31 +/- 0.62% op/s
Hamt(100)                     :      1216294.81 +/- 0.52% op/s
Hamt+(100)                    :      1091256.04 +/- 7.10% op/s
Mori(100)                     :       307176.53 +/- 0.61% op/s
Immutable(100)                :       942991.15 +/- 0.66% op/s
Native Object(1000)           :         1325.18 +/- 0.62% op/s
Native Map(1000)              :         4005.59 +/- 0.61% op/s
Hashtrie(1000)                :       846112.54 +/- 0.55% op/s
Hamt(1000)                    :       674835.10 +/- 7.93% op/s
Hamt+(1000)                   :       713576.65 +/- 0.71% op/s
Mori(1000)                    :       609056.52 +/- 0.80% op/s
Immutable(1000)               :       570014.29 +/- 7.68% op/s
Native Object(10000)          :          145.74 +/- 0.68% op/s
Native Map(10000)             :          345.24 +/- 0.65% op/s
Hashtrie(10000)               :       664178.01 +/- 0.70% op/s
Hamt(10000)                   :       738174.06 +/- 0.61% op/s
Hamt+(10000)                  :       647778.39 +/- 8.26% op/s
Mori(10000)                   :       478179.27 +/- 0.88% op/s
Immutable(10000)              :       617854.42 +/- 0.63% op/s
Native Object(100000)         :           10.18 +/- 6.14% op/s
Native Map(100000)            :           20.82 +/- 16.09% op/s
Hashtrie(100000)              :       540323.82 +/- 0.58% op/s
Hamt(100000)                  :       473062.14 +/- 1.42% op/s
Hamt+(100000)                 :       429958.83 +/- 9.08% op/s
Mori(100000)                  :       400694.42 +/- 0.68% op/s
Immutable(100000)             :       459799.50 +/- 0.86% op/s


Put N
Native Object(10)             :        24397.48 +/- 0.67% op/s
Native Map(10)                :        57272.87 +/- 0.67% op/s
Hashtrie(10)                  :       209944.38 +/- 0.82% op/s
Hamt(10)                      :       283990.41 +/- 0.96% op/s
Hamt+(10)                     :       277095.68 +/- 5.93% op/s
Mori(10)                      :        58272.84 +/- 1.30% op/s
Immutable(10)                 :       104272.51 +/- 0.75% op/s
Native Object(100)            :          301.64 +/- 0.72% op/s
Native Map(100)               :          743.53 +/- 0.63% op/s
Hashtrie(100)                 :        11528.71 +/- 3.40% op/s
Hamt(100)                     :        12636.73 +/- 2.92% op/s
Hamt+(100)                    :        13519.81 +/- 1.32% op/s
Mori(100)                     :         6483.94 +/- 1.64% op/s
Immutable(100)                :         9662.20 +/- 1.68% op/s
Native Object(1000)           :            2.69 +/- 1.57% op/s
Native Map(1000)              :            7.87 +/- 1.83% op/s
Hashtrie(1000)                :          926.31 +/- 1.31% op/s
Hamt(1000)                    :          920.05 +/- 1.60% op/s
Hamt+(1000)                   :          925.46 +/- 1.83% op/s
Mori(1000)                    :          168.03 +/- 2.26% op/s
Immutable(1000)               :          745.05 +/- 1.85% op/s
Native Object(10000)          :            0.03 +/- 0.09% op/s
Native Map(10000)             :            0.07 +/- 0.71% op/s
Hashtrie(10000)               :           67.98 +/- 1.78% op/s
Hamt(10000)                   :           67.92 +/- 1.37% op/s
Hamt+(10000)                  :           63.63 +/- 0.80% op/s
Mori(10000)                   :           17.60 +/- 4.05% op/s
Immutable(10000)              :           57.10 +/- 2.39% op/s


Put N (transient)
Native Object(10)             :       168486.35 +/- 0.96% op/s
Native Map(10)                :       592875.70 +/- 1.87% op/s
Hamt(10)                      :       397716.12 +/- 1.63% op/s
Hamt+(10)                     :       222298.48 +/- 1.29% op/s
Mori(10)                      :        46518.61 +/- 1.89% op/s
Immutable(10)                 :       144297.44 +/- 1.55% op/s
Native Object(100)            :        22518.85 +/- 1.29% op/s
Native Map(100)               :        78662.74 +/- 1.06% op/s
Hamt(100)                     :        15140.78 +/- 1.34% op/s
Hamt+(100)                    :        25308.04 +/- 1.34% op/s
Mori(100)                     :         1236.81 +/- 1.40% op/s
Immutable(100)                :        27996.52 +/- 1.20% op/s
Native Object(1000)           :         1744.92 +/- 1.56% op/s
Native Map(1000)              :         8332.66 +/- 1.34% op/s
Hamt(1000)                    :          981.49 +/- 1.22% op/s
Hamt+(1000)                   :         2298.86 +/- 1.21% op/s
Mori(1000)                    :           82.89 +/- 1.14% op/s
Immutable(1000)               :         2706.40 +/- 1.44% op/s
Native Object(10000)          :          189.85 +/- 1.00% op/s
Native Map(10000)             :          632.83 +/- 1.09% op/s
Hamt(10000)                   :           75.98 +/- 0.70% op/s
Hamt+(10000)                  :          197.70 +/- 1.81% op/s
Mori(10000)                   :            7.13 +/- 1.67% op/s
Immutable(10000)              :          259.99 +/- 1.85% op/s


Remove Nth
Native Object(10)             :       151048.41 +/- 0.87% op/s
Native Map(10)                :       306379.39 +/- 0.70% op/s
Hashtrie(10)                  :      1343299.31 +/- 0.72% op/s
Hamt(10)                      :      2581779.72 +/- 1.38% op/s
Hamt+(10)                     :      2385512.50 +/- 0.60% op/s
Mori(10)                      :       705217.58 +/- 0.58% op/s
Immutable(10)                 :      1380850.79 +/- 0.73% op/s
Native Object(100)            :        14926.38 +/- 0.61% op/s
Native Map(100)               :        37924.06 +/- 0.57% op/s
Hashtrie(100)                 :      1086316.86 +/- 0.69% op/s
Hamt(100)                     :      1200484.35 +/- 0.59% op/s
Hamt+(100)                    :      1063525.71 +/- 1.23% op/s
Mori(100)                     :       568213.91 +/- 0.59% op/s
Immutable(100)                :       796152.28 +/- 6.01% op/s
Native Object(1000)           :         1201.37 +/- 0.57% op/s
Native Map(1000)              :         4015.02 +/- 0.56% op/s
Hashtrie(1000)                :       823001.32 +/- 0.62% op/s
Hamt(1000)                    :       762689.38 +/- 0.56% op/s
Hamt+(1000)                   :       690642.76 +/- 0.88% op/s
Mori(1000)                    :       256197.72 +/- 0.73% op/s
Immutable(1000)               :       593474.53 +/- 0.72% op/s
Native Object(10000)          :          143.66 +/- 0.65% op/s
Native Map(10000)             :          313.82 +/- 6.81% op/s
Hashtrie(10000)               :       625020.87 +/- 0.74% op/s
Hamt(10000)                   :       644872.56 +/- 0.57% op/s
Hamt+(10000)                  :       610104.07 +/- 0.80% op/s
Mori(10000)                   :       217780.25 +/- 0.60% op/s
Immutable(10000)              :       485419.46 +/- 0.80% op/s
Native Object(100000)         :           10.73 +/- 4.98% op/s
Native Map(100000)            :           25.92 +/- 10.16% op/s
Hashtrie(100000)              :       405012.47 +/- 0.50% op/s
Hamt(100000)                  :       388239.65 +/- 0.52% op/s
Hamt+(100000)                 :       373875.05 +/- 0.71% op/s
Mori(100000)                  :       162253.99 +/- 1.05% op/s
Immutable(100000)             :       257601.91 +/- 0.72% op/s


Remove N
Native Object(10)             :         6082.55 +/- 42.39% op/s
Native Map(10)                :        30661.06 +/- 0.69% op/s
Hashtrie(10)                  :       164023.22 +/- 1.26% op/s
Hamt(10)                      :       364260.45 +/- 0.70% op/s
Hamt+(10)                     :       346002.63 +/- 0.80% op/s
Mori(10)                      :       100029.08 +/- 0.65% op/s
Immutable(10)                 :       184263.12 +/- 0.60% op/s
Native Object(100)            :          149.01 +/- 3.60% op/s
Native Map(100)               :          376.32 +/- 2.65% op/s
Hashtrie(100)                 :        11432.15 +/- 2.09% op/s
Hamt(100)                     :        14026.54 +/- 2.77% op/s
Hamt+(100)                    :        13706.22 +/- 2.23% op/s
Mori(100)                     :         6735.79 +/- 3.12% op/s
Immutable(100)                :         8972.01 +/- 2.44% op/s
Native Object(1000)           :            1.32 +/- 2.33% op/s
Native Map(1000)              :            4.05 +/- 0.43% op/s
Hashtrie(1000)                :          828.01 +/- 2.71% op/s
Hamt(1000)                    :          923.26 +/- 1.99% op/s
Hamt+(1000)                   :          901.27 +/- 2.71% op/s
Mori(1000)                    :          248.28 +/- 2.38% op/s
Immutable(1000)               :          674.07 +/- 2.27% op/s
Native Object(10000)          :            0.01 +/- 4.60% op/s
Native Map(10000)             :            0.03 +/- 0.83% op/s
Hashtrie(10000)               :           60.58 +/- 2.97% op/s
Hamt(10000)                   :           68.80 +/- 1.65% op/s
Hamt+(10000)                  :           65.95 +/- 1.52% op/s
Mori(10000)                   :           22.85 +/- 1.46% op/s
Immutable(10000)              :           49.65 +/- 3.09% op/s


Remove N (transient)
Native Assign(10)             :       194950.37 +/- 1.23% op/s
Native Map(10)                :       256858.91 +/- 2.35% op/s
Hamt(10)                      :       363747.26 +/- 2.53% op/s
Hamt+(10)                     :       487154.96 +/- 1.20% op/s
Mori(10)                      :        65748.85 +/- 2.20% op/s
Immutable(10)                 :       353052.17 +/- 1.91% op/s
Native Assign(100)            :        13409.94 +/- 1.26% op/s
Native Map(100)               :        30506.03 +/- 2.09% op/s
Hamt(100)                     :        14157.80 +/- 2.10% op/s
Hamt+(100)                    :        34166.03 +/- 1.85% op/s
Mori(100)                     :         6516.53 +/- 1.31% op/s
Immutable(100)                :        34415.58 +/- 1.87% op/s
Native Assign(1000)           :         1156.59 +/- 1.80% op/s
Native Map(1000)              :         3095.72 +/- 1.43% op/s
Hamt(1000)                    :          939.87 +/- 1.94% op/s
Hamt+(1000)                   :         2877.72 +/- 1.62% op/s
Mori(1000)                    :          292.74 +/- 1.29% op/s
Immutable(1000)               :         3090.76 +/- 1.39% op/s
Native Assign(10000)          :          126.27 +/- 1.42% op/s
Native Map(10000)             :          272.73 +/- 2.00% op/s
Hamt(10000)                   :           68.89 +/- 1.92% op/s
Hamt+(10000)                  :          293.75 +/- 1.39% op/s
Mori(10000)                   :           26.52 +/- 1.66% op/s
Immutable(10000)              :          242.00 +/- 2.08% op/s


Count
Native Object(10)             :      2535504.06 +/- 3.00% op/s
Native Map(10)                :     36965172.45 +/- 0.78% op/s
Hashtrie(10)                  :      1039068.97 +/- 1.55% op/s
Hamt(10)                      :     53059345.32 +/- 0.97% op/s
Hamt+(10)                     :     53524744.18 +/- 0.92% op/s
Mori(10)                      :     44850508.17 +/- 0.82% op/s
Immutable(10)                 :     49200240.74 +/- 1.48% op/s
Native Object(100)            :        88022.10 +/- 1.87% op/s
Native Map(100)               :     36363373.88 +/- 3.09% op/s
Hashtrie(100)                 :            0.00 +/- 0.00% op/s
Hamt(100)                     :     52572340.77 +/- 0.85% op/s
Hamt+(100)                    :     51801130.27 +/- 0.93% op/s
Mori(100)                     :     43677080.49 +/- 0.79% op/s
Immutable(100)                :     53903856.92 +/- 1.58% op/s
Native Object(1000)           :         5811.28 +/- 1.62% op/s
Native Map(1000)              :     37403980.28 +/- 0.85% op/s
Hashtrie(1000)                :            0.00 +/- 0.00% op/s
Hamt(1000)                    :     52799101.30 +/- 0.92% op/s
Hamt+(1000)                   :     52095380.98 +/- 0.97% op/s
Mori(1000)                    :     43916738.55 +/- 0.92% op/s
Immutable(1000)               :     53793537.52 +/- 1.13% op/s
Native Object(10000)          :          578.53 +/- 1.43% op/s
Native Map(10000)             :     37951983.90 +/- 0.81% op/s
Hashtrie(10000)               :            0.00 +/- 0.00% op/s
Hamt(10000)                   :     53531452.01 +/- 1.51% op/s
Hamt+(10000)                  :     54022796.41 +/- 0.87% op/s
Mori(10000)                   :     42984118.44 +/- 0.79% op/s
Immutable(10000)              :     53071752.74 +/- 1.29% op/s


Sum
Native Object(10)             :       636592.63 +/- 0.89% op/s
Native Map(10)                :      1004215.97 +/- 2.18% op/s
Hashtrie(10)                  :      1368770.01 +/- 1.15% op/s
Hamt(10)                      :      7692437.03 +/- 1.95% op/s
Hamt+(10)                     :      7627926.68 +/- 2.50% op/s
Mori(10)                      :      2572115.24 +/- 0.64% op/s
Immutable(10)                 :      1004451.76 +/- 1.35% op/s
Native Object(100)            :        28684.89 +/- 0.96% op/s
Native Map(100)               :       137681.23 +/- 2.21% op/s
Hashtrie(100)                 :            0.00 +/- 0.00% op/s
Hamt(100)                     :       253680.15 +/- 1.64% op/s
Hamt+(100)                    :       249217.32 +/- 1.66% op/s
Mori(100)                     :       258870.16 +/- 0.66% op/s
Immutable(100)                :       111035.50 +/- 1.04% op/s
Native Object(1000)           :         2370.81 +/- 1.10% op/s
Native Map(1000)              :        13794.79 +/- 1.53% op/s
Hashtrie(1000)                :            0.00 +/- 0.00% op/s
Hamt(1000)                    :        20493.34 +/- 1.04% op/s
Hamt+(1000)                   :        19928.19 +/- 0.90% op/s
Mori(1000)                    :        15984.20 +/- 0.65% op/s
Immutable(1000)               :        10707.85 +/- 0.63% op/s
Native Object(10000)          :          225.03 +/- 1.00% op/s
Native Map(10000)             :         1330.05 +/- 1.24% op/s
Hashtrie(10000)               :            0.00 +/- 0.00% op/s
Hamt(10000)                   :         2504.13 +/- 0.92% op/s
Hamt+(10000)                  :         2486.81 +/- 0.70% op/s
Mori(10000)                   :         2552.16 +/- 0.61% op/s
Immutable(10000)              :         1170.68 +/- 0.75% op/s


Keys
Native Object(10)             :      2586729.94 +/- 1.97% op/s
Native Map(10)                :       261413.35 +/- 2.39% op/s
Hashtrie(10)                  :       930544.70 +/- 1.52% op/s
Hamt(10)                      :       266373.20 +/- 2.31% op/s
Hamt fold(10)                 :      2531679.83 +/- 2.45% op/s
Hamt+(10)                     :       264685.01 +/- 2.72% op/s
Hamt+ fold(10)                :       620004.60 +/- 1.80% op/s
Mori(10)                      :       311404.84 +/- 3.86% op/s
Immutable(10)                 :       204048.41 +/- 4.15% op/s
Native Object(100)            :        92592.43 +/- 1.51% op/s
Native Map(100)               :        32319.39 +/- 0.75% op/s
Hashtrie(100)                 :            0.00 +/- 0.00% op/s
Hamt(100)                     :        29142.47 +/- 0.69% op/s
Hamt fold(100)                :        61025.36 +/- 0.58% op/s
Hamt+(100)                    :        29518.76 +/- 2.22% op/s
Hamt+ fold(100)               :        59829.24 +/- 1.61% op/s
Mori(100)                     :        19239.96 +/- 2.40% op/s
Immutable(100)                :        53435.05 +/- 2.45% op/s
Native Object(1000)           :         5940.33 +/- 1.49% op/s
Native Map(1000)              :         3256.56 +/- 2.27% op/s
Hashtrie(1000)                :            0.00 +/- 0.00% op/s
Hamt(1000)                    :         2792.40 +/- 2.59% op/s
Hamt fold(1000)               :         5775.97 +/- 1.15% op/s
Hamt+(1000)                   :         2793.89 +/- 2.50% op/s
Hamt+ fold(1000)              :         5642.25 +/- 1.56% op/s
Mori(1000)                    :         1631.25 +/- 2.21% op/s
Immutable(1000)               :         6624.68 +/- 2.44% op/s
Native Object(10000)          :          584.25 +/- 1.74% op/s
Native Map(10000)             :          319.38 +/- 1.72% op/s
Hashtrie(10000)               :            0.00 +/- 0.00% op/s
Hamt(10000)                   :          279.65 +/- 2.66% op/s
Hamt fold(10000)              :          620.48 +/- 1.21% op/s
Hamt+(10000)                  :          277.18 +/- 1.92% op/s
Hamt+ fold(10000)             :          613.96 +/- 1.61% op/s
Mori(10000)                   :          151.02 +/- 1.77% op/s
Immutable(10000)              :          727.41 +/- 2.40% op/s
```




[hashtrie]: https://github.com/mattbierner/hashtrie
[hamt]: https://github.com/mattbierner/hamt
[hamt_plus]: https://github.com/mattbierner/hamt_plus
[mori]: https://github.com/swannodette/mori
[persistent]: https://github.com/hughfdjackson/persistent-hash-trie
[immutable]: https://github.com/facebook/immutable-js


[clojurescript]: https://github.com/clojure/clojurescript
[khepri]: http://khepri-lang.com
