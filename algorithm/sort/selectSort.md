## 基本思想

在第 i 次选择操作中，通过 i 至 n 之间的元素对比，找到其中最小或最大值，随后和第 i 所在的元素进行交换。随后，从 0 到 i 的数据，就是排序好的。

## 代码分析

> 下面示例的排序是从小到大

![](https://raw.githubusercontent.com/bran-nie/bran-nie.github.io/images/images/blog/sort_selectSort.png)

算法比较简单，每次循环，找到当次最小的元素，将其与 i 所在位置进行置换。

需要注意的是，第一层循环，终止条件是 `i < data.length - 1`。

```javascript
const selectSort = (data = [45, 38, 66, 90, 88, 10, 25, 45]) => {
    if (!Array.isArray(data)) throw Error('input not array');
    console.log(data);
    console.log('..');

    // 两层遍历，第一层 for 终止条件是倒数第二个下标
    for (let i = 0; i < data.length - 1; i++) {
        // min 是本次循环的最小值的下标。
        let min = i;
        // 第二次 for 起始条件是 i 的下一个，终止条件是数组的最后一个元素。
        for (let j = i + 1; j < data.length; j++) {
            // 两两对比，找到从 i 到 n 之间最小的元素的下标之。
            min = data[min] > data[j] ? j : min;
        }

        // 进行置换
        if (min !== i) {
            [data[i], data[min]] = [data[min], data[i]];
        }
        console.log(`第${i + 1}次：`, data, { min: data[i] });
    }
    return data;
};

selectSort();
```

## 时间复杂度

两层嵌套的 for 循环，T(n) = O(n^2)

直接排序算法实现简单，容易实现，但不适宜于 `n` 比较大的情况。

## 稳定性

直接选择排序是不稳定的。

数据如：`[45(1), 38, 66, 25, 45(2), 10]`，数据中出现了两次 **45**，用（1）（2）标注。

在第一次排序后，数据变为 `[10, 38, 66, 25, 45(2), 45(1)]`，随后的多次排序，**45(2)** 也都会在 **45(1)** 的前面
