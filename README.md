Javascript Immutable Map Benchmarks

Benchmarks a number of  Javascript immutable map implementations:

* Javascript objects that achieve immutability though copying (using `Object.assign`).
* ES6's `Map` that achieves immutability though copying.
* [hashtrie][hashtrie] - 0.2.x
* [HAMT][hamt] -  0.1.x
* [HAMT+][hamt_plus] - 0.0.x
* [persistent-hash-trie][persistent] - 0.4.x
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
* Immutable, HAMT, and HAMT+ are the three fasted implementations.
* These three library also perform well as the map size gets very large. It only costs ~6x as much to put an element into a HAMT map with 100000 entries as it does to put one into a HAMT map with 10 entries. 
* The immutability through copying used for Object and Map is too slow to use for larger objects. Their memory usage is likely much higher as well.
* Hashtrie's sparse array storage is a [major performance hit](http://jsperf.com/sparse-array-reduce-overhead)
for folds as neither `reduce` or `splice` show good performance for sparse arrays.
* Both Mori and Immutable are more complete data structure libraries. This should be considered when selecting an immutable map implementation.
* HAMT's use of iterators for some operations results in some overhead in these artificial benchmarks. You can see this in the `keys` test where the `fold` based implementation of `keys` is over 5x faster then `Array.from(k.keys())`
* HAMT is the fastest choice for `fold` style, accumulation operations.
* Mori and Immutable both can check the size of a map in constant time.
* Native `Map` is fastest for transient operations, but `Immutable` is the best of the libraries.

```
hashtrie - 0.2.2
hamt - 1.1.1
hamt_plus - 0.0.5
mori - 0.3.2
persistent-hash-trie - 0.4.2
immutable – 3.7.6 


Get nth
nativeObject(10)              :      4253052.60 +/- 0.30% op/s
nativeMap(10)                 :     11978145.21 +/- 0.57% op/s
hashtrie(10)                  :      5573374.28 +/- 0.80% op/s
hamt(10)                      :      6146473.84 +/- 0.69% op/s
hamt_plus(10)                 :      6416692.21 +/- 0.67% op/s
persistent-hash-trie(10)      :      5230526.10 +/- 0.32% op/s
mori hash_map(10)             :      1409484.55 +/- 0.50% op/s
immutable(10)                 :      5939472.38 +/- 0.46% op/s
nativeObject(100)             :      7119929.29 +/- 0.64% op/s
nativeMap(100)                :     11296814.62 +/- 0.61% op/s
hashtrie(100)                 :      5252696.74 +/- 0.63% op/s
hamt(100)                     :      5957209.41 +/- 0.60% op/s
hamt_plus(100)                :      6289480.94 +/- 0.27% op/s
persistent-hash-trie(100)     :      2055257.14 +/- 0.65% op/s
mori hash_map(100)            :      1312600.71 +/- 0.64% op/s
immutable(100)                :      5921420.86 +/- 0.44% op/s
nativeObject(1000)            :      6700651.49 +/- 0.48% op/s
nativeMap(1000)               :      9258403.23 +/- 0.73% op/s
hashtrie(1000)                :      4351803.31 +/- 0.79% op/s
hamt(1000)                    :      5055617.18 +/- 0.79% op/s
hamt_plus(1000)               :      3887458.28 +/- 24.72% op/s
persistent-hash-trie(1000)    :      1153520.28 +/- 1.02% op/s
mori hash_map(1000)           :       422172.06 +/- 3.95% op/s
immutable(1000)               :      4833847.07 +/- 0.43% op/s
nativeObject(10000)           :      5818477.54 +/- 0.75% op/s
nativeMap(10000)              :      9346032.84 +/- 0.60% op/s
hashtrie(10000)               :      3565220.09 +/- 0.93% op/s
hamt(10000)                   :      4554267.89 +/- 0.67% op/s
hamt_plus(10000)              :      4395466.78 +/- 0.61% op/s
persistent-hash-trie(10000)   :       875246.36 +/- 1.15% op/s
mori hash_map(10000)          :       373196.81 +/- 0.90% op/s
immutable(10000)              :      4027963.33 +/- 0.74% op/s
nativeObject(100000)          :      2456387.05 +/- 1.12% op/s
nativeMap(100000)             :      2956341.62 +/- 6.85% op/s
hashtrie(100000)              :      1234243.32 +/- 0.98% op/s
hamt(100000)                  :      1303335.18 +/- 1.91% op/s
hamt_plus(100000)             :      1205553.49 +/- 0.39% op/s
persistent-hash-trie(100000)  :       626135.44 +/- 1.41% op/s
mori hash_map(100000)         :       276676.89 +/- 0.94% op/s
immutable(100000)             :       983045.00 +/- 1.27% op/s


put nth
nativeObject(10)              :        11775.31 +/- 2.19% op/s
nativeMap(10)                 :       286715.82 +/- 17.71% op/s
hashtrie(10)                  :      2080513.35 +/- 0.37% op/s
hamt(10)                      :      2820867.67 +/- 0.23% op/s
hamt_plus(10)                 :      1172749.91 +/- 0.70% op/s
persistent-hash-trie(10)      :       106520.12 +/- 1.04% op/s
mori hash_map(10)             :       978970.61 +/- 0.77% op/s
immutable(10)                 :      1599821.34 +/- 0.68% op/s
nativeObject(100)             :        14605.25 +/- 0.85% op/s
nativeMap(100)                :        38864.38 +/- 0.25% op/s
hashtrie(100)                 :      1048713.10 +/- 0.26% op/s
hamt(100)                     :      1001084.61 +/- 0.56% op/s
hamt_plus(100)                :      1038288.45 +/- 0.72% op/s
persistent-hash-trie(100)     :        51307.29 +/- 0.40% op/s
mori hash_map(100)            :       793172.57 +/- 0.28% op/s
immutable(100)                :       701238.70 +/- 0.66% op/s
nativeObject(1000)            :         1290.64 +/- 0.71% op/s
nativeMap(1000)               :         3794.05 +/- 0.58% op/s
hashtrie(1000)                :       790031.22 +/- 0.73% op/s
hamt(1000)                    :       678350.76 +/- 0.31% op/s
hamt_plus(1000)               :       829441.53 +/- 0.52% op/s
persistent-hash-trie(1000)    :        21210.80 +/- 6.44% op/s
mori hash_map(1000)           :       683285.07 +/- 0.61% op/s
immutable(1000)               :       554815.50 +/- 0.42% op/s
nativeObject(10000)           :          139.94 +/- 0.46% op/s
nativeMap(10000)              :          328.34 +/- 0.75% op/s
hashtrie(10000)               :       755418.89 +/- 0.72% op/s
hamt(10000)                   :       740536.55 +/- 0.64% op/s
hamt_plus(10000)              :       533455.69 +/- 0.44% op/s
persistent-hash-trie(10000)   :        24807.84 +/- 0.56% op/s
mori hash_map(10000)          :       614133.64 +/- 0.48% op/s
immutable(10000)              :       577625.00 +/- 0.63% op/s
nativeObject(100000)          :            9.53 +/- 15.01% op/s
nativeMap(100000)             :           22.76 +/- 22.48% op/s
hashtrie(100000)              :       569263.04 +/- 0.71% op/s
hamt(100000)                  :       509578.30 +/- 0.63% op/s
hamt_plus(100000)             :       481707.84 +/- 0.63% op/s
persistent-hash-trie(100000)  :        12154.27 +/- 0.79% op/s
mori hash_map(100000)         :       478009.86 +/- 0.71% op/s
immutable(100000)             :       415332.45 +/- 0.65% op/s


Put All
nativeObject(10)              :        24121.76 +/- 0.77% op/s
nativeMap(10)                 :        59060.68 +/- 0.61% op/s
hashtrie(10)                  :       202087.01 +/- 0.63% op/s
hamt(10)                      :       312715.58 +/- 0.79% op/s
hamt_plus(10)                 :       138573.74 +/- 0.71% op/s
persistent-hash-trie(10)      :        18118.58 +/- 0.84% op/s
mori hash_map(10)             :        52421.41 +/- 0.80% op/s
immutable(10)                 :        98762.31 +/- 0.70% op/s
nativeObject(100)             :          289.17 +/- 0.85% op/s
nativeMap(100)                :          695.42 +/- 0.69% op/s
hashtrie(100)                 :        12169.33 +/- 0.70% op/s
hamt(100)                     :        12714.17 +/- 0.65% op/s
hamt_plus(100)                :         9275.41 +/- 3.40% op/s
persistent-hash-trie(100)     :          447.93 +/- 1.50% op/s
mori hash_map(100)            :         6801.30 +/- 0.71% op/s
immutable(100)                :         9521.37 +/- 0.65% op/s
nativeObject(1000)            :            2.61 +/- 0.81% op/s
nativeMap(1000)               :            7.73 +/- 0.85% op/s
hashtrie(1000)                :          895.00 +/- 0.81% op/s
hamt(1000)                    :          931.91 +/- 0.69% op/s
hamt_plus(1000)               :          838.37 +/- 0.75% op/s
persistent-hash-trie(1000)    :           27.57 +/- 1.10% op/s
mori hash_map(1000)           :          172.72 +/- 0.79% op/s
immutable(1000)               :          731.74 +/- 0.65% op/s
nativeObject(10000)           :            0.03 +/- 0.36% op/s
nativeMap(10000)              :            0.07 +/- 1.82% op/s
hashtrie(10000)               :           65.74 +/- 0.98% op/s
hamt(10000)                   :           64.92 +/- 0.98% op/s
hamt_plus(10000)              :           60.81 +/- 0.94% op/s
persistent-hash-trie(10000)   :            1.51 +/- 3.07% op/s
mori hash_map(10000)          :           18.16 +/- 2.17% op/s
immutable(10000)              :           53.63 +/- 0.78% op/s


Put All (transient)
nativeObject(10)              :       163523.74 +/- 0.63% op/s
nativeMap(10)                 :       608177.08 +/- 0.63% op/s
hamt(10)                      :       461306.27 +/- 1.05% op/s
hamt_plus(10)                 :       243703.38 +/- 0.58% op/s
mori hash_map(10)             :        63491.33 +/- 1.49% op/s
immutable(10)                 :       127369.46 +/- 0.71% op/s
nativeObject(100)             :        22152.25 +/- 1.30% op/s
nativeMap(100)                :        78460.96 +/- 1.60% op/s
hamt(100)                     :        14608.90 +/- 0.44% op/s
hamt_plus(100)                :        22454.26 +/- 1.12% op/s
mori hash_map(100)            :         9830.21 +/- 1.76% op/s
immutable(100)                :        26108.90 +/- 0.58% op/s
nativeObject(1000)            :         1726.92 +/- 1.64% op/s
nativeMap(1000)               :         8583.67 +/- 1.74% op/s
hamt(1000)                    :          992.00 +/- 0.59% op/s
hamt_plus(1000)               :         2038.60 +/- 0.52% op/s
mori hash_map(1000)           :          196.89 +/- 2.14% op/s
immutable(1000)               :         2509.50 +/- 0.53% op/s
nativeObject(10000)           :          182.81 +/- 1.11% op/s
nativeMap(10000)              :          644.87 +/- 0.78% op/s
hamt(10000)                   :           75.29 +/- 0.79% op/s
hamt_plus(10000)              :          165.30 +/- 1.91% op/s
mori hash_map(10000)          :           22.44 +/- 3.26% op/s
immutable(10000)              :          236.08 +/- 1.67% op/s


remove nth
nativeObject(10)              :       135515.42 +/- 6.13% op/s
nativeMap(10)                 :       303834.10 +/- 0.71% op/s
hashtrie(10)                  :      1281720.52 +/- 0.69% op/s
hamt(10)                      :      2719631.17 +/- 0.63% op/s
hamt_plus(10)                 :      1202088.32 +/- 0.80% op/s
persistent-hash-trie(10)      :        57857.09 +/- 0.74% op/s
mori hash_map(10)             :       991622.07 +/- 1.44% op/s
immutable(10)                 :      1220953.79 +/- 0.61% op/s
nativeObject(100)             :         4784.32 +/- 0.86% op/s
nativeMap(100)                :        36972.76 +/- 0.72% op/s
hashtrie(100)                 :      1011539.86 +/- 6.62% op/s
hamt(100)                     :      1073100.89 +/- 0.62% op/s
hamt_plus(100)                :       895285.83 +/- 0.73% op/s
persistent-hash-trie(100)     :        25164.68 +/- 0.71% op/s
mori hash_map(100)            :       796652.34 +/- 0.61% op/s
immutable(100)                :       766668.37 +/- 0.67% op/s
nativeObject(1000)            :         1165.27 +/- 0.66% op/s
nativeMap(1000)               :         3862.06 +/- 0.69% op/s
hashtrie(1000)                :       817906.48 +/- 0.66% op/s
hamt(1000)                    :       668192.89 +/- 0.60% op/s
hamt_plus(1000)               :       833067.81 +/- 0.63% op/s
persistent-hash-trie(1000)    :        17461.83 +/- 0.75% op/s
mori hash_map(1000)           :       281439.48 +/- 0.71% op/s
immutable(1000)               :       512717.43 +/- 3.78% op/s
nativeObject(10000)           :          138.18 +/- 0.68% op/s
nativeMap(10000)              :          318.56 +/- 0.66% op/s
hashtrie(10000)               :       587930.44 +/- 1.05% op/s
hamt(10000)                   :       558592.83 +/- 0.85% op/s
hamt_plus(10000)              :       561734.19 +/- 0.95% op/s
persistent-hash-trie(10000)   :         9323.36 +/- 0.83% op/s
mori hash_map(10000)          :       234261.74 +/- 0.71% op/s
immutable(10000)              :       431934.95 +/- 1.07% op/s
nativeObject(100000)          :            9.34 +/- 10.57% op/s
nativeMap(100000)             :           21.81 +/- 18.05% op/s
hashtrie(100000)              :       389462.68 +/- 0.83% op/s
hamt(100000)                  :       338076.86 +/- 0.70% op/s
hamt_plus(100000)             :       381846.14 +/- 0.73% op/s
persistent-hash-trie(100000)  :         3866.86 +/- 0.69% op/s
mori hash_map(100000)         :       191825.49 +/- 0.68% op/s
immutable(100000)             :       289282.80 +/- 0.78% op/s


Remove All
nativeObject(10)              :         4077.08 +/- 35.95% op/s
nativeMap(10)                 :        30411.13 +/- 0.68% op/s
hashtrie(10)                  :       185313.34 +/- 0.65% op/s
hamt(10)                      :       416300.99 +/- 0.63% op/s
hamt_plus(10)                 :       149532.61 +/- 0.76% op/s
persistent-hash-trie(10)      :        15114.24 +/- 0.66% op/s
mori hash_map(10)             :       107297.83 +/- 0.72% op/s
immutable(10)                 :       181231.67 +/- 0.66% op/s
nativeObject(100)             :          148.64 +/- 0.89% op/s
nativeMap(100)                :          370.10 +/- 0.69% op/s
hashtrie(100)                 :        11712.46 +/- 0.57% op/s
hamt(100)                     :        13187.75 +/- 0.69% op/s
hamt_plus(100)                :        12164.46 +/- 0.63% op/s
persistent-hash-trie(100)     :         1093.18 +/- 0.59% op/s
mori hash_map(100)            :         7660.88 +/- 0.64% op/s
immutable(100)                :         8825.08 +/- 0.67% op/s
nativeObject(1000)            :            1.30 +/- 1.36% op/s
nativeMap(1000)               :            3.84 +/- 1.14% op/s
hashtrie(1000)                :          825.10 +/- 0.77% op/s
hamt(1000)                    :          743.02 +/- 0.69% op/s
hamt_plus(1000)               :          887.76 +/- 0.63% op/s
persistent-hash-trie(1000)    :          604.18 +/- 0.62% op/s
mori hash_map(1000)           :          262.81 +/- 0.58% op/s
immutable(1000)               :          654.07 +/- 0.75% op/s
nativeObject(10000)           :            0.01 +/- 0.45% op/s
nativeMap(10000)              :            0.03 +/- 0.24% op/s
hashtrie(10000)               :           58.86 +/- 1.45% op/s
hamt(10000)                   :           57.43 +/- 1.09% op/s
hamt_plus(10000)              :           65.73 +/- 1.20% op/s
persistent-hash-trie(10000)   :          254.01 +/- 1.72% op/s
mori hash_map(10000)          :           23.51 +/- 0.99% op/s
immutable(10000)              :           48.56 +/- 1.27% op/s


Remove All (transient)
nativeObject(10)              :       202226.79 +/- 0.69% op/s
nativeMap(10)                 :       279874.63 +/- 0.61% op/s
hamt(10)                      :       415829.37 +/- 0.70% op/s
hamt_plus(10)                 :       223249.95 +/- 0.64% op/s
mori hash_map(10)             :        65191.95 +/- 0.82% op/s
immutable(10)                 :       349090.33 +/- 0.68% op/s
nativeObject(100)             :        12953.89 +/- 0.73% op/s
nativeMap(100)                :        30085.83 +/- 0.72% op/s
hamt(100)                     :        13094.23 +/- 0.61% op/s
hamt_plus(100)                :        22265.22 +/- 0.59% op/s
mori hash_map(100)            :         6606.22 +/- 0.70% op/s
immutable(100)                :        33461.26 +/- 0.92% op/s
nativeObject(1000)            :         1148.58 +/- 0.84% op/s
nativeMap(1000)               :         3011.51 +/- 0.88% op/s
hamt(1000)                    :          772.48 +/- 0.66% op/s
hamt_plus(1000)               :         2338.81 +/- 0.69% op/s
mori hash_map(1000)           :          277.73 +/- 0.69% op/s
immutable(1000)               :         2988.65 +/- 1.43% op/s
nativeObject(10000)           :          122.85 +/- 0.68% op/s
nativeMap(10000)              :          262.51 +/- 2.37% op/s
hamt(10000)                   :           56.58 +/- 1.09% op/s
hamt_plus(10000)              :          155.52 +/- 1.31% op/s
mori hash_map(10000)          :           25.56 +/- 1.34% op/s
immutable(10000)              :          226.46 +/- 1.84% op/s


Count
nativeObject(10)              :      2599556.68 +/- 1.04% op/s
nativeMap(10)                 :     33367889.77 +/- 7.06% op/s
hashtrie(10)                  :      1162619.46 +/- 0.78% op/s
hamt(10)                      :      6951582.15 +/- 0.79% op/s
hamt_plus(10)                 :      4733164.96 +/- 0.66% op/s
persistent-hash-trie(10)      :        89865.96 +/- 0.77% op/s
mori hash_map(10)             :     40354388.13 +/- 0.80% op/s
immutable(10)                 :     45008356.70 +/- 0.71% op/s
nativeObject(100)             :        86870.90 +/- 0.66% op/s
nativeMap(100)                :     35936236.83 +/- 0.78% op/s
hashtrie(100)                 :            0.00 +/- 0.00% op/s
hamt(100)                     :       599885.39 +/- 0.81% op/s
hamt_plus(100)                :       408006.07 +/- 0.72% op/s
persistent-hash-trie(100)     :         5441.06 +/- 0.74% op/s
mori hash_map(100)            :     41595139.52 +/- 0.85% op/s
immutable(100)                :     47578044.52 +/- 0.77% op/s
nativeObject(1000)            :         5869.84 +/- 0.79% op/s
nativeMap(1000)               :     37076686.82 +/- 0.78% op/s
hashtrie(1000)                :            0.00 +/- 0.00% op/s
hamt(1000)                    :        34566.52 +/- 0.66% op/s
hamt_plus(1000)               :        26275.26 +/- 0.65% op/s
persistent-hash-trie(1000)    :          601.33 +/- 0.77% op/s
mori hash_map(1000)           :     40296498.98 +/- 0.79% op/s
immutable(1000)               :     46374119.93 +/- 0.88% op/s
nativeObject(10000)           :          582.07 +/- 0.76% op/s
nativeMap(10000)              :     33573514.46 +/- 0.72% op/s
hashtrie(10000)               :            0.00 +/- 0.00% op/s
hamt(10000)                   :         6334.22 +/- 0.71% op/s
hamt_plus(10000)              :         4496.72 +/- 0.66% op/s
persistent-hash-trie(10000)   :           75.00 +/- 1.24% op/s
mori hash_map(10000)          :     40894855.38 +/- 1.02% op/s
immutable(10000)              :     43638605.69 +/- 1.00% op/s


Sum
nativeObject(10)              :       701258.92 +/- 0.87% op/s
nativeMap(10)                 :      1125594.93 +/- 0.75% op/s
hashtrie(10)                  :       766056.89 +/- 0.70% op/s
hamt(10)                      :      3491912.99 +/- 0.68% op/s
hamt_plus(10)                 :      3458129.00 +/- 0.76% op/s
persistent-hash-trie(10)      :        96123.36 +/- 1.67% op/s
mori hash_map(10)             :      2471781.34 +/- 0.66% op/s
immutable(10)                 :      1380830.45 +/- 1.04% op/s
nativeObject(100)             :        30120.66 +/- 0.80% op/s
nativeMap(100)                :       139025.28 +/- 2.25% op/s
hashtrie(100)                 :            0.00 +/- 0.00% op/s
hamt(100)                     :       296188.67 +/- 0.87% op/s
hamt_plus(100)                :       317830.40 +/- 0.69% op/s
persistent-hash-trie(100)     :         4942.36 +/- 0.83% op/s
mori hash_map(100)            :       240115.32 +/- 0.73% op/s
immutable(100)                :       134908.97 +/- 6.75% op/s
nativeObject(1000)            :         2533.66 +/- 0.79% op/s
nativeMap(1000)               :        13230.34 +/- 0.78% op/s
hashtrie(1000)                :            0.00 +/- 0.00% op/s
hamt(1000)                    :        23994.08 +/- 0.65% op/s
hamt_plus(1000)               :        22522.33 +/- 0.66% op/s
persistent-hash-trie(1000)    :          580.87 +/- 1.09% op/s
mori hash_map(1000)           :        17017.40 +/- 0.70% op/s
immutable(1000)               :         9122.90 +/- 0.70% op/s
nativeObject(10000)           :          228.77 +/- 0.74% op/s
nativeMap(10000)              :         1321.12 +/- 0.60% op/s
hashtrie(10000)               :            0.00 +/- 0.00% op/s
hamt(10000)                   :         3368.35 +/- 0.76% op/s
hamt_plus(10000)              :         3508.38 +/- 0.71% op/s
persistent-hash-trie(10000)   :           69.25 +/- 2.10% op/s
mori hash_map(10000)          :         2400.83 +/- 0.69% op/s
immutable(10000)              :          953.48 +/- 0.65% op/s


Keys
nativeObject(10)              :      2226171.78 +/- 0.84% op/s
nativeMap(10)                 :       276124.34 +/- 0.66% op/s
hashtrie(10)                  :       729935.55 +/- 0.68% op/s
hamt(10)                      :       283275.46 +/- 0.95% op/s
hamt_plus(10)                 :      2661858.04 +/- 0.74% op/s
persistent-hash-trie(10)      :        93829.99 +/- 1.44% op/s
mori hash_map(10)             :       308327.35 +/- 0.84% op/s
immutable(10)                 :       188018.68 +/- 4.11% op/s
nativeObject(100)             :        90201.29 +/- 0.84% op/s
nativeMap(100)                :        31810.74 +/- 0.67% op/s
hashtrie(100)                 :            0.00 +/- 0.00% op/s
hamt(100)                     :        30539.74 +/- 2.54% op/s
hamt_plus(100)                :       217806.98 +/- 0.69% op/s
persistent-hash-trie(100)     :         6189.47 +/- 0.71% op/s
mori hash_map(100)            :        33092.96 +/- 0.65% op/s
immutable(100)                :        43055.84 +/- 1.55% op/s
nativeObject(1000)            :         5781.90 +/- 0.82% op/s
nativeMap(1000)               :         3183.31 +/- 2.72% op/s
hashtrie(1000)                :            0.00 +/- 0.00% op/s
hamt(1000)                    :         2960.72 +/- 0.67% op/s
hamt_plus(1000)               :        15948.58 +/- 0.80% op/s
persistent-hash-trie(1000)    :          589.35 +/- 0.69% op/s
mori hash_map(1000)           :         2582.30 +/- 0.57% op/s
immutable(1000)               :         4809.25 +/- 2.66% op/s
nativeObject(10000)           :          565.76 +/- 2.16% op/s
nativeMap(10000)              :          313.75 +/- 0.70% op/s
hashtrie(10000)               :            0.00 +/- 0.00% op/s
hamt(10000)                   :          301.78 +/- 1.36% op/s
hamt_plus(10000)              :         1987.93 +/- 0.71% op/s
persistent-hash-trie(10000)   :           72.21 +/- 2.19% op/s
mori hash_map(10000)          :          217.11 +/- 1.16% op/s
immutable(10000)              :          499.08 +/- 0.88% op/s
```




[hashtrie]: https://github.com/mattbierner/hashtrie
[hamt]: https://github.com/mattbierner/hamt
[hamt_plus]: https://github.com/mattbierner/hamt_plus
[mori]: https://github.com/swannodette/mori
[persistent]: https://github.com/hughfdjackson/persistent-hash-trie
[immutable]: https://github.com/facebook/immutable-js


[clojurescript]: https://github.com/clojure/clojurescript
[khepri]: http://khepri-lang.com

