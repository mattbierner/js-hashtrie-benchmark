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
* HAMT, HAMT+, and Immutable are the three fasted implementations.
* These three library also perform well as the map size gets very large. It only costs ~6x as much to put an element into a HAMT map with 100000 entries as it does to put one into a HAMT map with 10 entries. 
* The immutability through copying used for Object and Map is too slow to use for larger objects. Their memory usage is likely much higher as well.
* Hashtrie's sparse array storage is a [major performance hit](http://jsperf.com/sparse-array-reduce-overhead)
for folds as neither `reduce` or `splice` show good performance for sparse arrays.
* Both Mori and Immutable are more complete data structure libraries. This should be considered when selecting an immutable map implementation.
* Mori and Immutable both can check the size of a map in constant time.
* HAMT's use of iterators for some operations results in some overhead in these artificial benchmarks. You can see this in the `keys` test where the `fold` based implementation of `keys` is faster then `Array.from(k.keys())`
* HAMT is the fastest choice for `fold` style, accumulation operations such as sum.
* Native `Map` is fastest for transient operations, but `Immutable` is the best of the libraries when transient operations are used only some of the time.

```
hashtrie - 0.2.2
hamt - 1.1.1
hamt_plus - 0.0.5
mori - 0.3.2
persistent-hash-trie - 0.4.2
immutable – 3.7.6 


Get nth
nativeObject(10)              :      4244614.13 +/- 0.67% op/s
nativeMap(10)                 :     11550034.76 +/- 0.65% op/s
hashtrie(10)                  :      6259196.86 +/- 0.75% op/s
hamt(10)                      :      6392951.59 +/- 0.63% op/s
hamt_plus(10)                 :      6595558.99 +/- 0.76% op/s
persistent-hash-trie(10)      :      5740442.97 +/- 0.74% op/s
mori hash_map(10)             :      1339155.28 +/- 0.73% op/s
immutable(10)                 :      6330638.15 +/- 0.57% op/s
nativeObject(100)             :      7235517.57 +/- 0.45% op/s
nativeMap(100)                :     11406841.64 +/- 0.58% op/s
hashtrie(100)                 :      5215029.22 +/- 0.60% op/s
hamt(100)                     :      5966110.64 +/- 0.52% op/s
hamt_plus(100)                :      6180967.80 +/- 0.59% op/s
persistent-hash-trie(100)     :      1794030.36 +/- 0.72% op/s
mori hash_map(100)            :      1295338.69 +/- 0.77% op/s
immutable(100)                :      5793241.67 +/- 0.75% op/s
nativeObject(1000)            :      6615643.73 +/- 0.65% op/s
nativeMap(1000)               :      9420171.95 +/- 0.63% op/s
hashtrie(1000)                :      4378247.20 +/- 0.68% op/s
hamt(1000)                    :      5096009.04 +/- 0.60% op/s
hamt_plus(1000)               :      5241124.24 +/- 0.65% op/s
persistent-hash-trie(1000)    :      1154780.95 +/- 0.72% op/s
mori hash_map(1000)           :       417884.71 +/- 0.74% op/s
immutable(1000)               :      4730301.17 +/- 0.61% op/s
nativeObject(10000)           :      5871419.79 +/- 0.63% op/s
nativeMap(10000)              :      9416423.41 +/- 0.68% op/s
hashtrie(10000)               :      3542214.41 +/- 1.51% op/s
hamt(10000)                   :      4498258.58 +/- 0.76% op/s
hamt_plus(10000)              :      4358687.70 +/- 1.02% op/s
persistent-hash-trie(10000)   :       814323.09 +/- 2.82% op/s
mori hash_map(10000)          :       356802.99 +/- 1.27% op/s
immutable(10000)              :      3980087.43 +/- 1.42% op/s
nativeObject(100000)          :      2421467.50 +/- 1.89% op/s
nativeMap(100000)             :      3592655.91 +/- 6.55% op/s
hashtrie(100000)              :      1138661.12 +/- 3.09% op/s
hamt(100000)                  :      1453867.51 +/- 1.50% op/s
hamt_plus(100000)             :      1403940.36 +/- 1.58% op/s
persistent-hash-trie(100000)  :       648754.85 +/- 1.20% op/s
mori hash_map(100000)         :       270413.18 +/- 1.09% op/s
immutable(100000)             :       897906.68 +/- 2.04% op/s


put nth
nativeObject(10)              :        12188.72 +/- 1.77% op/s
nativeMap(10)                 :       331999.97 +/- 0.61% op/s
hashtrie(10)                  :      1981287.81 +/- 0.57% op/s
hamt(10)                      :      2909370.02 +/- 0.87% op/s
hamt_plus(10)                 :      1142064.43 +/- 0.86% op/s
persistent-hash-trie(10)      :        69990.02 +/- 7.42% op/s
mori hash_map(10)             :       977061.84 +/- 0.91% op/s
immutable(10)                 :      1620375.73 +/- 0.83% op/s
nativeObject(100)             :        14323.60 +/- 0.86% op/s
nativeMap(100)                :        36515.13 +/- 0.64% op/s
hashtrie(100)                 :      1298556.26 +/- 0.75% op/s
hamt(100)                     :      1218027.04 +/- 0.72% op/s
hamt_plus(100)                :       809949.10 +/- 0.75% op/s
persistent-hash-trie(100)     :        35055.73 +/- 1.23% op/s
mori hash_map(100)            :       295460.35 +/- 0.76% op/s
immutable(100)                :       829635.24 +/- 0.69% op/s
nativeObject(1000)            :         1294.66 +/- 0.68% op/s
nativeMap(1000)               :         3721.45 +/- 1.01% op/s
hashtrie(1000)                :      1085484.49 +/- 0.92% op/s
hamt(1000)                    :       756321.17 +/- 0.64% op/s
hamt_plus(1000)               :       727956.51 +/- 0.73% op/s
persistent-hash-trie(1000)    :        24184.32 +/- 0.98% op/s
mori hash_map(1000)           :       546685.98 +/- 0.65% op/s
immutable(1000)               :       673202.83 +/- 0.68% op/s
nativeObject(10000)           :          140.73 +/- 0.79% op/s
nativeMap(10000)              :          317.94 +/- 0.74% op/s
hashtrie(10000)               :       730196.10 +/- 0.81% op/s
hamt(10000)                   :       731283.05 +/- 0.74% op/s
hamt_plus(10000)              :       525556.73 +/- 0.77% op/s
persistent-hash-trie(10000)   :        25006.64 +/- 0.67% op/s
mori hash_map(10000)          :       491967.26 +/- 0.74% op/s
immutable(10000)              :       565153.79 +/- 0.78% op/s
nativeObject(100000)          :            9.78 +/- 15.34% op/s
nativeMap(100000)             :           22.67 +/- 22.72% op/s
hashtrie(100000)              :       723779.21 +/- 1.01% op/s
hamt(100000)                  :       555994.96 +/- 0.74% op/s
hamt_plus(100000)             :       469579.05 +/- 0.78% op/s
persistent-hash-trie(100000)  :        11703.42 +/- 0.87% op/s
mori hash_map(100000)         :       211904.67 +/- 0.73% op/s
immutable(100000)             :       440632.41 +/- 0.63% op/s


Put All
nativeObject(10)              :        24096.22 +/- 0.76% op/s
nativeMap(10)                 :        55504.92 +/- 0.78% op/s
hashtrie(10)                  :       199877.94 +/- 0.77% op/s
hamt(10)                      :       326668.97 +/- 0.76% op/s
hamt_plus(10)                 :       147879.54 +/- 0.68% op/s
persistent-hash-trie(10)      :        17722.57 +/- 0.77% op/s
mori hash_map(10)             :        62614.65 +/- 0.69% op/s
immutable(10)                 :       102376.23 +/- 0.67% op/s
nativeObject(100)             :          293.75 +/- 0.85% op/s
nativeMap(100)                :          722.70 +/- 0.68% op/s
hashtrie(100)                 :        12576.32 +/- 0.73% op/s
hamt(100)                     :        12809.32 +/- 0.69% op/s
hamt_plus(100)                :        10640.77 +/- 0.70% op/s
persistent-hash-trie(100)     :          497.63 +/- 1.14% op/s
mori hash_map(100)            :         6104.23 +/- 0.75% op/s
immutable(100)                :         8612.06 +/- 0.71% op/s
nativeObject(1000)            :            2.62 +/- 0.93% op/s
nativeMap(1000)               :            7.37 +/- 0.91% op/s
hashtrie(1000)                :          887.84 +/- 0.76% op/s
hamt(1000)                    :          890.31 +/- 1.27% op/s
hamt_plus(1000)               :          738.35 +/- 7.55% op/s
persistent-hash-trie(1000)    :           28.75 +/- 1.03% op/s
mori hash_map(1000)           :          162.59 +/- 1.70% op/s
immutable(1000)               :          742.96 +/- 0.75% op/s
nativeObject(10000)           :            0.03 +/- 1.21% op/s
nativeMap(10000)              :            0.07 +/- 0.47% op/s
hashtrie(10000)               :           66.83 +/- 1.33% op/s
hamt(10000)                   :           66.49 +/- 2.04% op/s
hamt_plus(10000)              :           56.05 +/- 1.12% op/s
persistent-hash-trie(10000)   :            1.51 +/- 4.53% op/s
mori hash_map(10000)          :           17.94 +/- 2.02% op/s
immutable(10000)              :           54.67 +/- 1.38% op/s


Put All (transient)
nativeObject(10)              :       170075.79 +/- 0.72% op/s
nativeMap(10)                 :       580557.74 +/- 0.72% op/s
hamt(10)                      :       458300.23 +/- 2.39% op/s
hamt_plus(10)                 :       224704.12 +/- 0.65% op/s
mori hash_map(10)             :        77671.83 +/- 0.76% op/s
immutable(10)                 :       136031.46 +/- 0.65% op/s
nativeObject(100)             :        22401.14 +/- 1.45% op/s
nativeMap(100)                :        76827.18 +/- 0.58% op/s
hamt(100)                     :        15057.84 +/- 0.90% op/s
hamt_plus(100)                :        21805.50 +/- 2.06% op/s
mori hash_map(100)            :        10766.87 +/- 0.95% op/s
immutable(100)                :        26326.59 +/- 0.70% op/s
nativeObject(1000)            :         1723.97 +/- 2.07% op/s
nativeMap(1000)               :         8569.10 +/- 0.72% op/s
hamt(1000)                    :         1007.50 +/- 0.85% op/s
hamt_plus(1000)               :         1997.42 +/- 0.72% op/s
mori hash_map(1000)           :          203.78 +/- 2.46% op/s
immutable(1000)               :         2611.57 +/- 1.33% op/s
nativeObject(10000)           :          188.34 +/- 1.05% op/s
nativeMap(10000)              :          640.56 +/- 0.92% op/s
hamt(10000)                   :           80.68 +/- 1.21% op/s
hamt_plus(10000)              :          167.09 +/- 1.03% op/s
mori hash_map(10000)          :           22.96 +/- 3.59% op/s
immutable(10000)              :          259.54 +/- 0.90% op/s


remove nth
nativeObject(10)              :       152844.80 +/- 0.69% op/s
nativeMap(10)                 :       296357.85 +/- 0.61% op/s
hashtrie(10)                  :      1406614.60 +/- 0.66% op/s
hamt(10)                      :      3250861.77 +/- 0.65% op/s
hamt_plus(10)                 :      1358458.49 +/- 0.66% op/s
persistent-hash-trie(10)      :        73465.37 +/- 0.66% op/s
mori hash_map(10)             :       926927.13 +/- 0.98% op/s
immutable(10)                 :      1444830.65 +/- 0.63% op/s
nativeObject(100)             :         4674.10 +/- 5.11% op/s
nativeMap(100)                :        37343.08 +/- 0.60% op/s
hashtrie(100)                 :      1075502.07 +/- 0.71% op/s
hamt(100)                     :      1261225.61 +/- 0.75% op/s
hamt_plus(100)                :       864867.27 +/- 0.70% op/s
persistent-hash-trie(100)     :        25370.19 +/- 0.69% op/s
mori hash_map(100)            :       697118.62 +/- 0.63% op/s
immutable(100)                :       801686.93 +/- 3.74% op/s
nativeObject(1000)            :         1160.72 +/- 2.21% op/s
nativeMap(1000)               :         3789.61 +/- 0.73% op/s
hashtrie(1000)                :       828952.87 +/- 0.61% op/s
hamt(1000)                    :       788532.21 +/- 0.76% op/s
hamt_plus(1000)               :       762223.23 +/- 0.72% op/s
persistent-hash-trie(1000)    :        18067.70 +/- 0.85% op/s
mori hash_map(1000)           :       256459.19 +/- 0.68% op/s
immutable(1000)               :       593249.90 +/- 0.78% op/s
nativeObject(10000)           :          138.46 +/- 0.86% op/s
nativeMap(10000)              :          319.25 +/- 0.78% op/s
hashtrie(10000)               :       594162.57 +/- 1.44% op/s
hamt(10000)                   :       629565.58 +/- 1.67% op/s
hamt_plus(10000)              :       476888.15 +/- 1.47% op/s
persistent-hash-trie(10000)   :         9364.66 +/- 0.82% op/s
mori hash_map(10000)          :       214650.08 +/- 0.97% op/s
immutable(10000)              :       464763.04 +/- 1.64% op/s
nativeObject(100000)          :            9.93 +/- 5.83% op/s
nativeMap(100000)             :           21.68 +/- 16.94% op/s
hashtrie(100000)              :       397632.16 +/- 1.29% op/s
hamt(100000)                  :       383705.36 +/- 1.15% op/s
hamt_plus(100000)             :       322378.26 +/- 1.31% op/s
persistent-hash-trie(100000)  :         3901.06 +/- 0.72% op/s
mori hash_map(100000)         :       158276.06 +/- 0.90% op/s
immutable(100000)             :       305832.44 +/- 1.00% op/s


Remove All
nativeObject(10)              :         1195.85 +/- 7.98% op/s
nativeMap(10)                 :        27796.94 +/- 0.60% op/s
hashtrie(10)                  :       176966.49 +/- 0.83% op/s
hamt(10)                      :       447706.85 +/- 0.65% op/s
hamt_plus(10)                 :       152762.77 +/- 0.70% op/s
persistent-hash-trie(10)      :        11506.40 +/- 0.57% op/s
mori hash_map(10)             :        91547.29 +/- 0.58% op/s
immutable(10)                 :       178219.04 +/- 0.67% op/s
nativeObject(100)             :          152.77 +/- 0.88% op/s
nativeMap(100)                :          370.46 +/- 0.73% op/s
hashtrie(100)                 :        11154.41 +/- 0.71% op/s
hamt(100)                     :        14750.23 +/- 0.74% op/s
hamt_plus(100)                :        12251.21 +/- 0.69% op/s
persistent-hash-trie(100)     :         1305.89 +/- 0.70% op/s
mori hash_map(100)            :         6676.98 +/- 0.69% op/s
immutable(100)                :         8933.95 +/- 0.77% op/s
nativeObject(1000)            :            1.29 +/- 1.45% op/s
nativeMap(1000)               :            3.84 +/- 0.87% op/s
hashtrie(1000)                :          813.70 +/- 0.73% op/s
hamt(1000)                    :          863.18 +/- 0.84% op/s
hamt_plus(1000)               :          907.38 +/- 0.69% op/s
persistent-hash-trie(1000)    :          604.92 +/- 0.68% op/s
mori hash_map(1000)           :          243.29 +/- 0.84% op/s
immutable(1000)               :          646.07 +/- 0.89% op/s
nativeObject(10000)           :            0.01 +/- 0.41% op/s
nativeMap(10000)              :            0.03 +/- 0.34% op/s
hashtrie(10000)               :           60.64 +/- 1.33% op/s
hamt(10000)                   :           65.91 +/- 1.23% op/s
hamt_plus(10000)              :           66.73 +/- 1.09% op/s
persistent-hash-trie(10000)   :          249.61 +/- 0.75% op/s
mori hash_map(10000)          :           21.87 +/- 3.41% op/s
immutable(10000)              :           48.96 +/- 1.43% op/s


Remove All (transient)
nativeObject(10)              :       195068.70 +/- 2.26% op/s
nativeMap(10)                 :       266108.45 +/- 0.55% op/s
hamt(10)                      :       432945.00 +/- 0.77% op/s
hamt_plus(10)                 :       227209.22 +/- 0.59% op/s
mori hash_map(10)             :        66741.77 +/- 0.81% op/s
immutable(10)                 :       310472.08 +/- 0.65% op/s
nativeObject(100)             :        13179.44 +/- 0.77% op/s
nativeMap(100)                :        30743.02 +/- 0.66% op/s
hamt(100)                     :        14848.09 +/- 0.58% op/s
hamt_plus(100)                :        22891.13 +/- 0.67% op/s
mori hash_map(100)            :         6405.14 +/- 0.82% op/s
immutable(100)                :        29254.60 +/- 0.69% op/s
nativeObject(1000)            :         1146.11 +/- 1.29% op/s
nativeMap(1000)               :         3078.53 +/- 0.81% op/s
hamt(1000)                    :          901.94 +/- 0.64% op/s
hamt_plus(1000)               :         2606.26 +/- 0.64% op/s
mori hash_map(1000)           :          268.88 +/- 2.50% op/s
immutable(1000)               :         2679.88 +/- 0.57% op/s
nativeObject(10000)           :          124.30 +/- 2.00% op/s
nativeMap(10000)              :          271.99 +/- 0.62% op/s
hamt(10000)                   :           66.13 +/- 1.41% op/s
hamt_plus(10000)              :          171.87 +/- 1.01% op/s
mori hash_map(10000)          :           24.59 +/- 1.94% op/s
immutable(10000)              :          195.72 +/- 1.74% op/s


Count
nativeObject(10)              :      2572133.72 +/- 1.21% op/s
nativeMap(10)                 :     33179551.72 +/- 1.06% op/s
hashtrie(10)                  :      2348630.72 +/- 0.54% op/s
hamt(10)                      :      7694811.71 +/- 1.21% op/s
hamt_plus(10)                 :      5261948.67 +/- 0.85% op/s
persistent-hash-trie(10)      :        84592.56 +/- 0.66% op/s
mori hash_map(10)             :     31297544.78 +/- 1.01% op/s
immutable(10)                 :     35010254.40 +/- 0.95% op/s
nativeObject(100)             :        91733.82 +/- 0.60% op/s
nativeMap(100)                :     28858965.00 +/- 0.91% op/s
hashtrie(100)                 :            0.00 +/- 0.00% op/s
hamt(100)                     :       615089.40 +/- 0.64% op/s
hamt_plus(100)                :       374596.43 +/- 0.73% op/s
persistent-hash-trie(100)     :         6213.41 +/- 1.44% op/s
mori hash_map(100)            :     31960853.49 +/- 0.71% op/s
immutable(100)                :     34913612.53 +/- 0.87% op/s
nativeObject(1000)            :         5958.83 +/- 0.56% op/s
nativeMap(1000)               :     28129176.58 +/- 1.25% op/s
hashtrie(1000)                :            0.00 +/- 0.00% op/s
hamt(1000)                    :        35145.13 +/- 0.63% op/s
hamt_plus(1000)               :        23552.18 +/- 5.24% op/s
persistent-hash-trie(1000)    :          608.11 +/- 4.30% op/s
mori hash_map(1000)           :     31707550.00 +/- 0.65% op/s
immutable(1000)               :     35013475.87 +/- 0.97% op/s
nativeObject(10000)           :          578.81 +/- 0.70% op/s
nativeMap(10000)              :     28810775.76 +/- 1.00% op/s
hashtrie(10000)               :            0.00 +/- 0.00% op/s
hamt(10000)                   :         6208.90 +/- 0.68% op/s
hamt_plus(10000)              :         4319.71 +/- 0.57% op/s
persistent-hash-trie(10000)   :           76.88 +/- 1.42% op/s
mori hash_map(10000)          :     32223960.01 +/- 0.83% op/s
immutable(10000)              :     33671601.29 +/- 0.95% op/s


Sum
nativeObject(10)              :       715484.73 +/- 0.98% op/s
nativeMap(10)                 :      1031856.47 +/- 5.47% op/s
hashtrie(10)                  :            0.00 +/- 0.00% op/s
hamt(10)                      :      3088189.06 +/- 0.76% op/s
hamt_plus(10)                 :      2963602.83 +/- 0.79% op/s
persistent-hash-trie(10)      :       103579.96 +/- 0.63% op/s
mori hash_map(10)             :      1586979.34 +/- 0.77% op/s
immutable(10)                 :       852788.15 +/- 1.92% op/s
nativeObject(100)             :        26872.24 +/- 8.13% op/s
nativeMap(100)                :       132776.25 +/- 0.60% op/s
hashtrie(100)                 :            0.00 +/- 0.00% op/s
hamt(100)                     :       306662.96 +/- 0.77% op/s
hamt_plus(100)                :       331425.65 +/- 0.68% op/s
persistent-hash-trie(100)     :         5671.65 +/- 1.13% op/s
mori hash_map(100)            :       207902.99 +/- 0.92% op/s
immutable(100)                :        95914.06 +/- 0.66% op/s
nativeObject(1000)            :         2542.72 +/- 0.66% op/s
nativeMap(1000)               :        13424.49 +/- 0.71% op/s
hashtrie(1000)                :            0.00 +/- 0.00% op/s
hamt(1000)                    :        23758.97 +/- 0.66% op/s
hamt_plus(1000)               :        22280.73 +/- 0.66% op/s
persistent-hash-trie(1000)    :          622.50 +/- 1.14% op/s
mori hash_map(1000)           :        15766.31 +/- 0.59% op/s
immutable(1000)               :         8913.11 +/- 0.75% op/s
nativeObject(10000)           :          237.73 +/- 1.55% op/s
nativeMap(10000)              :         1326.68 +/- 0.60% op/s
hashtrie(10000)               :            0.00 +/- 0.00% op/s
hamt(10000)                   :         3369.52 +/- 0.65% op/s
hamt_plus(10000)              :         3428.84 +/- 0.72% op/s
persistent-hash-trie(10000)   :           72.21 +/- 3.32% op/s
mori hash_map(10000)          :         1859.67 +/- 0.58% op/s
immutable(10000)              :          978.65 +/- 0.58% op/s


Keys
nativeObject(10)              :      2296405.25 +/- 0.83% op/s
nativeMap(10)                 :       265310.45 +/- 0.64% op/s
hashtrie(10)                  :      1162994.54 +/- 0.56% op/s
hamt(10)                      :       295463.86 +/- 0.69% op/s
hamt fold impl(10)            :      3050066.22 +/- 2.30% op/s
hamt_plus(10)                 :      2568942.58 +/- 0.62% op/s
persistent-hash-trie(10)      :       102697.13 +/- 0.69% op/s
mori hash_map(10)             :       428431.16 +/- 0.84% op/s
immutable(10)                 :       184061.92 +/- 4.50% op/s
nativeObject(100)             :        88605.43 +/- 0.68% op/s
nativeMap(100)                :        32159.25 +/- 0.66% op/s
hashtrie(100)                 :            0.00 +/- 0.00% op/s
hamt(100)                     :        31023.78 +/- 0.69% op/s
hamt fold impl(100)           :        61883.38 +/- 0.61% op/s
hamt_plus(100)                :       204788.60 +/- 0.71% op/s
persistent-hash-trie(100)     :         6039.71 +/- 0.52% op/s
mori hash_map(100)            :        31624.50 +/- 0.62% op/s
immutable(100)                :        43001.94 +/- 1.51% op/s
nativeObject(1000)            :         5732.22 +/- 1.85% op/s
nativeMap(1000)               :         3245.09 +/- 0.72% op/s
hashtrie(1000)                :            0.00 +/- 0.00% op/s
hamt(1000)                    :         3099.23 +/- 0.65% op/s
hamt fold impl(1000)          :         6040.15 +/- 0.67% op/s
hamt_plus(1000)               :        16130.99 +/- 0.71% op/s
persistent-hash-trie(1000)    :          623.74 +/- 0.67% op/s
mori hash_map(1000)           :         2466.72 +/- 0.66% op/s
immutable(1000)               :         4986.25 +/- 0.66% op/s
nativeObject(10000)           :          585.79 +/- 0.70% op/s
nativeMap(10000)              :          303.78 +/- 0.68% op/s
hashtrie(10000)               :            0.00 +/- 0.00% op/s
hamt(10000)                   :          312.65 +/- 1.51% op/s
hamt fold impl(10000)         :          655.57 +/- 0.73% op/s
hamt_plus(10000)              :         2034.07 +/- 0.85% op/s
persistent-hash-trie(10000)   :           76.82 +/- 0.99% op/s
mori hash_map(10000)          :          222.55 +/- 1.05% op/s
immutable(10000)              :          516.06 +/- 0.70% op/s
```




[hashtrie]: https://github.com/mattbierner/hashtrie
[hamt]: https://github.com/mattbierner/hamt
[hamt_plus]: https://github.com/mattbierner/hamt_plus
[mori]: https://github.com/swannodette/mori
[persistent]: https://github.com/hughfdjackson/persistent-hash-trie
[immutable]: https://github.com/facebook/immutable-js


[clojurescript]: https://github.com/clojure/clojurescript
[khepri]: http://khepri-lang.com

