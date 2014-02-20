Javascript Hash Trie Benchmarking

Benchmarks 3 Persistent Javascript hashtrie implementations:
* [hashtrie][hashtrie] - 0.1.x
* [hamt][hamt] -  0.0.x
* [persistent-hash-trie][persistent] - 0.4.x

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

hashtrie is fastest for puts and removes, and fast for gets.
HAMT is the fastest overall for gets, but slightly slower for puts and removes.

persistent-hash-trie has some interesting features, like custom key compares and
breaking walks, but is slower for puts, gets and single removes, being 5-10x
slower on larger tries of 10000 or 100000.

It is 10x faster for removing all entries from a trie of size 10000. Since this
is the opposite of puts and single removes, this suggests persistent-hash-trie is
collapsing better as it removes.


```
Get nth
hashtrie(10)                  :      7620791.00 +/- 4.81% op/s
hamt(10)                      :      6942537.33 +/- 6.34% op/s
persistent-hash-trie(10)      :      5248696.73 +/- 1.07% op/s
hashtrie(100)                 :      5708326.39 +/- 2.92% op/s
hamt(100)                     :      6341517.60 +/- 0.49% op/s
persistent-hash-trie(100)     :      2077300.79 +/- 3.58% op/s
hashtrie(1000)                :      4472034.11 +/- 3.64% op/s
hamt(1000)                    :      5522881.44 +/- 0.84% op/s
persistent-hash-trie(1000)    :      1268119.95 +/- 2.21% op/s
hashtrie(100000)              :      1199157.18 +/- 3.76% op/s
hamt(100000)                  :      1235987.78 +/- 8.55% op/s
persistent-hash-trie(100000)  :       578823.95 +/- 10.23% op/s


put nth
hashtrie(10)                  :       503288.38 +/- 2.57% op/s
hamt(10)                      :       729098.67 +/- 3.55% op/s
persistent-hash-trie(10)      :       260763.46 +/- 3.24% op/s
hashtrie(100)                 :       258888.81 +/- 6.02% op/s
hamt(100)                     :       183044.72 +/- 4.82% op/s
persistent-hash-trie(100)     :        70709.25 +/- 1.20% op/s
hashtrie(1000)                :       317712.60 +/- 1.02% op/s
hamt(1000)                    :       298389.83 +/- 0.59% op/s
persistent-hash-trie(1000)    :        48774.15 +/- 0.59% op/s
hashtrie(10000)               :       287176.51 +/- 1.00% op/s
hamt(10000)                   :       231026.13 +/- 0.73% op/s
persistent-hash-trie(10000)   :        45403.11 +/- 2.39% op/s
hashtrie(100000)              :       217169.56 +/- 1.06% op/s
hamt(100000)                  :       161664.98 +/- 1.35% op/s
persistent-hash-trie(100000)  :        26356.57 +/- 2.46% op/s


Put All
hashtrie(10)                  :        48860.36 +/- 1.12% op/s
hamt(10)                      :        74212.55 +/- 2.90% op/s
persistent-hash-trie(10)      :        29836.28 +/- 3.36% op/s
hashtrie(100)                 :         3299.33 +/- 1.40% op/s
hamt(100)                     :         3260.68 +/- 0.94% op/s
persistent-hash-trie(100)     :          933.75 +/- 3.90% op/s
hashtrie(1000)                :          289.08 +/- 3.03% op/s
hamt(1000)                    :          246.71 +/- 1.23% op/s
persistent-hash-trie(1000)    :           60.44 +/- 2.24% op/s
hashtrie(10000)               :           25.04 +/- 0.99% op/s
hamt(10000)                   :           20.32 +/- 1.32% op/s
persistent-hash-trie(10000)   :            4.55 +/- 5.10% op/s


remove nth
hashtrie(10)                  :       407960.37 +/- 4.49% op/s
hamt(10)                      :       569768.24 +/- 1.40% op/s
persistent-hash-trie(10)      :       149204.90 +/- 0.45% op/s
hashtrie(100)                 :       314996.41 +/- 2.33% op/s
hamt(100)                     :       269404.84 +/- 7.97% op/s
persistent-hash-trie(100)     :        33246.48 +/- 11.94% op/s
hashtrie(1000)                :       201051.87 +/- 12.26% op/s
hamt(1000)                    :       226282.92 +/- 4.92% op/s
persistent-hash-trie(1000)    :        31427.73 +/- 2.78% op/s
hashtrie(10000)               :       232894.17 +/- 1.92% op/s
hamt(10000)                   :       189571.50 +/- 1.48% op/s
persistent-hash-trie(10000)   :        24491.45 +/- 2.52% op/s
hashtrie(100000)              :       167311.29 +/- 1.41% op/s
hamt(100000)                  :       120183.85 +/- 8.31% op/s
persistent-hash-trie(100000)  :        13021.85 +/- 5.70% op/s


Remove All
hashtrie(10)                  :        39409.41 +/- 5.42% op/s
hamt(10)                      :        48757.71 +/- 8.63% op/s
persistent-hash-trie(10)      :        21649.02 +/- 2.18% op/s
hashtrie(100)                 :         3443.92 +/- 2.08% op/s
hamt(100)                     :         2977.15 +/- 0.77% op/s
persistent-hash-trie(100)     :         1980.48 +/- 1.11% op/s
hashtrie(1000)                :          284.08 +/- 3.36% op/s
hamt(1000)                    :          216.24 +/- 1.69% op/s
persistent-hash-trie(1000)    :          909.35 +/- 2.12% op/s
hashtrie(10000)               :           23.69 +/- 1.61% op/s
hamt(10000)                   :           15.70 +/- 5.11% op/s
persistent-hash-trie(10000)   :          235.92 +/- 2.19% op/s
```




[hashtrie]: https://github.com/mattbierner/hashtrie
[hamt]: https://github.com/mattbierner/hamt
[persistent]: https://github.com/hughfdjackson/persistent-hash-trie