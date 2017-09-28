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
hamt - 2.2.2
hamt_plus - 1.0.1
mori - 0.3.2
persistent-hash-trie - 0.4.2
immutable – 3.8.1

Get Nth
Native Object(10)             :     28974807.90 +/- 0.42% op/s
Native Map(10)                :     27120644.03 +/- 0.43% op/s
Hashtrie(10)                  :     14973683.83 +/- 0.18% op/s
Hamt(10)                      :     15757461.35 +/- 0.16% op/s
Hamt+(10)                     :     14753419.94 +/- 0.21% op/s
Mori(10)                      :     12573273.19 +/- 0.42% op/s
Immutable(10)                 :     14585838.78 +/- 0.25% op/s
Native Object(100)            :     39607833.52 +/- 1.64% op/s
Native Map(100)               :     22107935.96 +/- 0.42% op/s
Hashtrie(100)                 :     12059200.40 +/- 0.37% op/s
Hamt(100)                     :     12346282.20 +/- 1.05% op/s
Hamt+(100)                    :     12142017.69 +/- 0.64% op/s
Mori(100)                     :     12043487.55 +/- 0.57% op/s
Immutable(100)                :     11303593.85 +/- 0.46% op/s
Native Object(1000)           :     30413281.22 +/- 0.61% op/s
Native Map(1000)              :     16087248.33 +/- 0.62% op/s
Hashtrie(1000)                :      9270221.45 +/- 0.51% op/s
Hamt(1000)                    :      9972285.43 +/- 0.56% op/s
Hamt+(1000)                   :      9645216.60 +/- 0.48% op/s
Mori(1000)                    :      3333606.10 +/- 9.32% op/s
Immutable(1000)               :      9255366.36 +/- 0.36% op/s
Native Object(10000)          :     19207893.44 +/- 2.96% op/s
Native Map(10000)             :     11906981.46 +/- 0.44% op/s
Hashtrie(10000)               :      6138321.64 +/- 3.22% op/s
Hamt(10000)                   :      7036643.41 +/- 1.45% op/s
Hamt+(10000)                  :      6601570.56 +/- 1.29% op/s
Mori(10000)                   :      2745792.08 +/- 8.33% op/s
Immutable(10000)              :      6127281.19 +/- 0.71% op/s
Native Object(100000)         :      6522971.72 +/- 2.89% op/s
Native Map(100000)            :      6273755.55 +/- 4.34% op/s
Hashtrie(100000)              :      2007566.23 +/- 1.71% op/s
Hamt(100000)                  :      2272403.57 +/- 2.58% op/s
Hamt+(100000)                 :      2219278.75 +/- 1.67% op/s
Mori(100000)                  :      1565610.51 +/- 5.69% op/s
Immutable(100000)             :      1759526.37 +/- 2.76% op/s


Put Nth
Native Object(10)             :       844619.94 +/- 0.25% op/s
Native Map(10)                :      1314589.24 +/- 0.50% op/s
Hashtrie(10)                  :      5005230.97 +/- 0.62% op/s
Hamt(10)                      :      7649050.96 +/- 11.00% op/s
Hamt+(10)                     :      4929251.89 +/- 9.77% op/s
Mori(10)                      :      3321039.16 +/- 0.71% op/s
Immutable(10)                 :      6088070.53 +/- 9.54% op/s
Native Object(100)            :        38178.63 +/- 0.19% op/s
Native Map(100)               :       138551.80 +/- 0.38% op/s
Hashtrie(100)                 :      4131956.44 +/- 0.56% op/s
Hamt(100)                     :      5195206.71 +/- 8.85% op/s
Hamt+(100)                    :      3388194.96 +/- 8.15% op/s
Mori(100)                     :      5815332.54 +/- 0.72% op/s
Immutable(100)                :      4001976.76 +/- 8.11% op/s
Native Object(1000)           :         3419.02 +/- 0.26% op/s
Native Map(1000)              :        13345.61 +/- 0.71% op/s
Hashtrie(1000)                :      3314365.79 +/- 1.00% op/s
Hamt(1000)                    :      3896640.86 +/- 8.37% op/s
Hamt+(1000)                   :      2661402.73 +/- 6.96% op/s
Mori(1000)                    :      3926763.48 +/- 0.98% op/s
Immutable(1000)               :      2962506.32 +/- 6.83% op/s
Native Object(10000)          :          287.07 +/- 2.96% op/s
Native Map(10000)             :         1008.17 +/- 0.77% op/s
Hashtrie(10000)               :      3071999.08 +/- 4.46% op/s
Hamt(10000)                   :      3636902.95 +/- 8.87% op/s
Hamt+(10000)                  :      2694014.20 +/- 6.82% op/s
Mori(10000)                   :      2205291.76 +/- 0.29% op/s
Immutable(10000)              :      3013100.55 +/- 6.69% op/s
Native Object(100000)         :           16.14 +/- 8.04% op/s
Native Map(100000)            :           63.97 +/- 9.33% op/s
Hashtrie(100000)              :      2558558.83 +/- 0.68% op/s
Hamt(100000)                  :      2823760.74 +/- 6.86% op/s
Hamt+(100000)                 :      2208812.07 +/- 5.39% op/s
Mori(100000)                  :      3116268.23 +/- 1.77% op/s
Immutable(100000)             :      2424023.46 +/- 7.03% op/s


Put N
Native Object(10)             :       213470.35 +/- 0.97% op/s
Native Map(10)                :       232189.14 +/- 0.24% op/s
Hashtrie(10)                  :       559635.86 +/- 0.43% op/s
Hamt(10)                      :      1557228.23 +/- 1.61% op/s
Hamt+(10)                     :       624835.87 +/- 0.58% op/s
Mori(10)                      :       452871.51 +/- 0.61% op/s
Immutable(10)                 :       555858.54 +/- 0.65% op/s
Native Object(100)            :          717.79 +/- 0.21% op/s
Native Map(100)               :         2604.31 +/- 0.55% op/s
Hashtrie(100)                 :        41734.29 +/- 1.72% op/s
Hamt(100)                     :        72196.86 +/- 0.48% op/s
Hamt+(100)                    :        42046.94 +/- 1.79% op/s
Mori(100)                     :        55071.42 +/- 0.55% op/s
Immutable(100)                :        50888.59 +/- 1.63% op/s
Native Object(1000)           :            6.81 +/- 0.64% op/s
Native Map(1000)              :           27.84 +/- 0.25% op/s
Hashtrie(1000)                :         3452.02 +/- 1.64% op/s
Hamt(1000)                    :         4708.97 +/- 0.42% op/s
Hamt+(1000)                   :         3238.73 +/- 0.28% op/s
Mori(1000)                    :         2250.95 +/- 1.56% op/s
Immutable(1000)               :         3915.16 +/- 0.44% op/s
Native Object(10000)          :            0.06 +/- 0.78% op/s
Native Map(10000)             :            0.25 +/- 0.33% op/s
Hashtrie(10000)               :          258.82 +/- 1.06% op/s
Hamt(10000)                   :          357.25 +/- 0.83% op/s
Hamt+(10000)                  :          243.51 +/- 1.91% op/s
Mori(10000)                   :          188.37 +/- 1.88% op/s
Immutable(10000)              :          259.72 +/- 2.20% op/s


Put N (transient)
Native Object(10)             :      6355936.28 +/- 0.53% op/s
Native Map(10)                :      2141761.58 +/- 0.94% op/s
Hamt(10)                      :      2391048.45 +/- 0.63% op/s
Hamt+(10)                     :       715025.40 +/- 0.97% op/s
Mori(10)                      :       372014.92 +/- 0.26% op/s
Immutable(10)                 :       592039.71 +/- 0.91% op/s
Native Object(100)            :       225029.85 +/- 0.37% op/s
Native Map(100)               :       253513.35 +/- 1.31% op/s
Hamt(100)                     :       100329.53 +/- 0.78% op/s
Hamt+(100)                    :        59642.00 +/- 1.11% op/s
Mori(100)                     :        10262.92 +/- 0.50% op/s
Immutable(100)                :        74537.29 +/- 1.43% op/s
Native Object(1000)           :        17409.89 +/- 1.06% op/s
Native Map(1000)              :        22852.62 +/- 1.18% op/s
Hamt(1000)                    :         6399.83 +/- 1.07% op/s
Hamt+(1000)                   :         5109.15 +/- 1.08% op/s
Mori(1000)                    :          739.91 +/- 0.29% op/s
Immutable(1000)               :         6750.34 +/- 0.87% op/s
Native Object(10000)          :         1847.74 +/- 0.14% op/s
Native Map(10000)             :         1762.05 +/- 0.91% op/s
Hamt(10000)                   :          454.53 +/- 1.28% op/s
Hamt+(10000)                  :          454.62 +/- 1.43% op/s
Mori(10000)                   :           71.28 +/- 0.33% op/s
Immutable(10000)              :          585.08 +/- 1.32% op/s


Remove Nth
Native Object(10)             :       554062.84 +/- 1.80% op/s
Native Map(10)                :      1185616.11 +/- 0.50% op/s
Hashtrie(10)                  :      5119889.79 +/- 4.34% op/s
Hamt(10)                      :      7720252.40 +/- 0.72% op/s
Hamt+(10)                     :      6817854.59 +/- 3.88% op/s
Mori(10)                      :      6455392.22 +/- 0.65% op/s
Immutable(10)                 :      6229824.51 +/- 3.75% op/s
Native Object(100)            :        37432.28 +/- 0.68% op/s
Native Map(100)               :       137293.87 +/- 1.37% op/s
Hashtrie(100)                 :      4128467.71 +/- 3.95% op/s
Hamt(100)                     :      4973813.05 +/- 2.46% op/s
Hamt+(100)                    :      4364941.74 +/- 3.88% op/s
Mori(100)                     :      5693296.53 +/- 0.49% op/s
Immutable(100)                :      4024498.82 +/- 4.21% op/s
Native Object(1000)           :         3470.43 +/- 0.25% op/s
Native Map(1000)              :        13822.13 +/- 3.69% op/s
Hashtrie(1000)                :      3111371.11 +/- 0.63% op/s
Hamt(1000)                    :      3582435.31 +/- 4.32% op/s
Hamt+(1000)                   :      3250335.01 +/- 0.82% op/s
Mori(1000)                    :      2224709.88 +/- 6.70% op/s
Immutable(1000)               :      2910640.42 +/- 0.48% op/s
Native Object(10000)          :          306.72 +/- 0.23% op/s
Native Map(10000)             :         1106.76 +/- 0.47% op/s
Hashtrie(10000)               :      2404360.56 +/- 1.13% op/s
Hamt(10000)                   :      2976699.28 +/- 0.86% op/s
Hamt+(10000)                  :      2524228.58 +/- 4.10% op/s
Mori(10000)                   :      1784297.01 +/- 6.08% op/s
Immutable(10000)              :      2208910.94 +/- 4.49% op/s
Native Object(100000)         :           15.69 +/- 4.40% op/s
Native Map(100000)            :           54.09 +/- 11.05% op/s
Hashtrie(100000)              :      1133440.33 +/- 0.83% op/s
Hamt(100000)                  :      1320793.33 +/- 1.25% op/s
Hamt+(100000)                 :      1196216.46 +/- 1.87% op/s
Mori(100000)                  :      1093117.58 +/- 2.14% op/s
Immutable(100000)             :       951182.37 +/- 2.08% op/s


Remove N
Native Object(10)             :        75150.43 +/- 14.47% op/s
Native Map(10)                :       120758.65 +/- 0.65% op/s
Hashtrie(10)                  :       893133.18 +/- 0.83% op/s
Hamt(10)                      :      1297110.23 +/- 0.80% op/s
Hamt+(10)                     :      1059784.36 +/- 0.87% op/s
Mori(10)                      :      1000958.83 +/- 1.11% op/s
Immutable(10)                 :       908096.05 +/- 0.41% op/s
Native Object(100)            :          372.02 +/- 0.62% op/s
Native Map(100)               :         1355.08 +/- 0.73% op/s
Hashtrie(100)                 :        57451.56 +/- 0.55% op/s
Hamt(100)                     :        68918.19 +/- 1.91% op/s
Hamt+(100)                    :        63600.45 +/- 0.91% op/s
Mori(100)                     :        72690.65 +/- 2.45% op/s
Immutable(100)                :        59392.95 +/- 0.56% op/s
Native Object(1000)           :            3.44 +/- 2.06% op/s
Native Map(1000)              :           14.29 +/- 0.85% op/s
Hashtrie(1000)                :         3875.06 +/- 0.37% op/s
Hamt(1000)                    :         4838.57 +/- 1.85% op/s
Hamt+(1000)                   :         4117.35 +/- 0.42% op/s
Mori(1000)                    :         2904.35 +/- 2.57% op/s
Immutable(1000)               :         4223.82 +/- 1.55% op/s
Native Object(10000)          :            0.03 +/- 0.82% op/s
Native Map(10000)             :            0.11 +/- 0.32% op/s
Hashtrie(10000)               :          250.06 +/- 1.05% op/s
Hamt(10000)                   :          355.14 +/- 1.93% op/s
Hamt+(10000)                  :          306.05 +/- 1.39% op/s
Mori(10000)                   :          217.79 +/- 3.15% op/s
Immutable(10000)              :          314.68 +/- 0.22% op/s


Remove N (transient)
Native Assign(10)             :       722527.06 +/- 0.77% op/s
Native Map(10)                :      1046807.56 +/- 0.24% op/s
Hamt(10)                      :      1411581.78 +/- 0.31% op/s
Hamt+(10)                     :       856557.53 +/- 1.05% op/s
Mori(10)                      :       457271.38 +/- 0.47% op/s
Immutable(10)                 :      1041072.84 +/- 1.17% op/s
Native Assign(100)            :        34632.17 +/- 0.25% op/s
Native Map(100)               :       113397.13 +/- 1.14% op/s
Hamt(100)                     :        73017.79 +/- 1.68% op/s
Hamt+(100)                    :        77114.35 +/- 0.29% op/s
Mori(100)                     :        43091.93 +/- 0.77% op/s
Immutable(100)                :        85791.46 +/- 0.50% op/s
Native Assign(1000)           :         3042.80 +/- 0.54% op/s
Native Map(1000)              :        10073.65 +/- 1.11% op/s
Hamt(1000)                    :         4835.00 +/- 0.64% op/s
Hamt+(1000)                   :         6545.06 +/- 0.95% op/s
Mori(1000)                    :         2447.39 +/- 1.21% op/s
Immutable(1000)               :         7388.84 +/- 1.06% op/s
Native Assign(10000)          :          281.11 +/- 0.73% op/s
Native Map(10000)             :          865.82 +/- 0.86% op/s
Hamt(10000)                   :          348.95 +/- 1.17% op/s
Hamt+(10000)                  :          491.87 +/- 1.60% op/s
Mori(10000)                   :          216.97 +/- 1.98% op/s
Immutable(10000)              :          531.93 +/- 0.80% op/s


Count
Native Object(10)             :     64864734.85 +/- 0.71% op/s
Native Map(10)                :    261425175.93 +/- 0.81% op/s
Hashtrie(10)                  :      5416247.07 +/- 0.66% op/s
Hamt(10)                      :    609334793.82 +/- 19.69% op/s
Hamt+(10)                     :    151481940.70 +/- 1.05% op/s
Mori(10)                      :    187799315.97 +/- 0.40% op/s
Immutable(10)                 :    644709859.31 +/- 17.78% op/s
Native Object(100)            :       490535.38 +/- 0.18% op/s
Native Map(100)               :    118518525.07 +/- 0.89% op/s
Hashtrie(100)                 :            0.00 +/- 0.00% op/s
Hamt(100)                     :    473634317.93 +/- 23.99% op/s
Hamt+(100)                    :    141823412.92 +/- 1.57% op/s
Mori(100)                     :    141302556.76 +/- 3.12% op/s
Immutable(100)                :    158222206.63 +/- 1.35% op/s
Native Object(1000)           :        21978.45 +/- 1.55% op/s
Native Map(1000)              :    131411979.14 +/- 4.63% op/s
Hashtrie(1000)                :            0.00 +/- 0.00% op/s
Hamt(1000)                    :    140556172.21 +/- 2.28% op/s
Hamt+(1000)                   :    178599942.25 +/- 6.97% op/s
Mori(1000)                    :    123193130.18 +/- 1.09% op/s
Immutable(1000)               :    156770096.53 +/- 1.42% op/s
Native Object(10000)          :         1338.75 +/- 0.19% op/s
Native Map(10000)             :    114825267.23 +/- 0.85% op/s
Hashtrie(10000)               :            0.00 +/- 0.00% op/s
Hamt(10000)                   :    175028408.43 +/- 1.64% op/s
Hamt+(10000)                  :    146323593.74 +/- 0.93% op/s
Mori(10000)                   :    123274851.58 +/- 1.14% op/s
Immutable(10000)              :    181081867.50 +/- 1.98% op/s


Sum
Native Object(10)             :      5037860.41 +/- 0.49% op/s
Native Map(10)                :      2847825.55 +/- 0.38% op/s
Hashtrie(10)                  :            0.00 +/- 0.00% op/s
Hamt(10)                      :     13401619.37 +/- 1.04% op/s
Hamt+(10)                     :      8772658.01 +/- 0.48% op/s
Mori(10)                      :      7090215.40 +/- 0.48% op/s
Immutable(10)                 :      3377835.74 +/- 0.48% op/s
Native Object(100)            :       208603.43 +/- 1.21% op/s
Native Map(100)               :       422837.95 +/- 0.37% op/s
Hashtrie(100)                 :            0.00 +/- 0.00% op/s
Hamt(100)                     :       749374.54 +/- 0.97% op/s
Hamt+(100)                    :       679730.32 +/- 0.52% op/s
Mori(100)                     :      1041577.41 +/- 0.44% op/s
Immutable(100)                :       421781.11 +/- 0.37% op/s
Native Object(1000)           :        13052.63 +/- 1.05% op/s
Native Map(1000)              :        43912.23 +/- 0.41% op/s
Hashtrie(1000)                :            0.00 +/- 0.00% op/s
Hamt(1000)                    :        65621.88 +/- 1.20% op/s
Hamt+(1000)                   :        55285.53 +/- 0.20% op/s
Mori(1000)                    :        71965.04 +/- 0.25% op/s
Immutable(1000)               :        34497.16 +/- 0.25% op/s
Native Object(10000)          :          918.39 +/- 0.89% op/s
Native Map(10000)             :         4490.63 +/- 0.10% op/s
Hashtrie(10000)               :            0.00 +/- 0.00% op/s
Hamt(10000)                   :         6640.59 +/- 0.89% op/s
Hamt+(10000)                  :         6080.95 +/- 0.40% op/s
Mori(10000)                   :         8161.07 +/- 0.30% op/s
Immutable(10000)              :         4072.33 +/- 0.78% op/s


Keys
Native Object(10)             :     57164152.43 +/- 1.68% op/s
Native Map(10)                :       864189.14 +/- 0.38% op/s
Hashtrie(10)                  :      4382646.88 +/- 0.90% op/s
Hamt(10)                      :       932758.09 +/- 0.25% op/s
Hamt fold(10)                 :      8864046.47 +/- 1.41% op/s
Hamt+(10)                     :       882688.30 +/- 0.37% op/s
Hamt+ fold(10)                :      3977816.86 +/- 0.92% op/s
Mori(10)                      :      1162858.60 +/- 0.61% op/s
Immutable(10)                 :       681323.85 +/- 4.17% op/s
Native Object(100)            :       433085.69 +/- 0.45% op/s
Native Map(100)               :       107254.36 +/- 0.26% op/s
Hashtrie(100)                 :            0.00 +/- 0.00% op/s
Hamt(100)                     :       101415.02 +/- 0.48% op/s
Hamt fold(100)                :       373729.87 +/- 0.40% op/s
Hamt+(100)                    :        94519.29 +/- 1.59% op/s
Hamt+ fold(100)               :       349389.22 +/- 0.37% op/s
Mori(100)                     :        69942.43 +/- 0.77% op/s
Immutable(100)                :       174370.09 +/- 2.01% op/s
Native Object(1000)           :        21716.96 +/- 1.33% op/s
Native Map(1000)              :        11022.24 +/- 0.41% op/s
Hashtrie(1000)                :            0.00 +/- 0.00% op/s
Hamt(1000)                    :         9835.78 +/- 0.43% op/s
Hamt fold(1000)               :        34322.81 +/- 0.30% op/s
Hamt+(1000)                   :         9296.36 +/- 0.26% op/s
Hamt+ fold(1000)              :        32671.69 +/- 0.89% op/s
Mori(1000)                    :         4825.12 +/- 0.74% op/s
Immutable(1000)               :        18574.48 +/- 1.45% op/s
Native Object(10000)          :         1329.48 +/- 0.86% op/s
Native Map(10000)             :         1123.76 +/- 0.51% op/s
Hashtrie(10000)               :            0.00 +/- 0.00% op/s
Hamt(10000)                   :         1062.94 +/- 1.55% op/s
Hamt fold(10000)              :         3546.25 +/- 0.47% op/s
Hamt+(10000)                  :          996.29 +/- 1.12% op/s
Hamt+ fold(10000)             :         3466.11 +/- 0.35% op/s
Mori(10000)                   :          454.89 +/- 1.57% op/s
Immutable(10000)              :         2170.35 +/- 0.26% op/s
```



[hashtrie]: https://github.com/mattbierner/hashtrie
[hamt]: https://github.com/mattbierner/hamt
[hamt_plus]: https://github.com/mattbierner/hamt_plus
[mori]: https://github.com/swannodette/mori
[persistent]: https://github.com/hughfdjackson/persistent-hash-trie
[immutable]: https://github.com/facebook/immutable-js


[clojurescript]: https://github.com/clojure/clojurescript
[khepri]: http://khepri-lang.com
