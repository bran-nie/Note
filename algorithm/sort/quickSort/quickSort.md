## 基本思想

> 快速排序是交换排序的一种，实质上是对冒泡排序的一种改进。

在 n 个元素中，取某一个元素的为基准元素，通过一趟排序将待排序的数据分为**小于等于**基准元素和**大于**基准元素的两个独立的片段。然后，再分别对这两个片段进行再次排序。通过递归调用，数据最终是有序数据。

## 代码分析

> 下面示例是以第一个元素为基准元素，且排序为从小到大。

![](https://raw.githubusercontent.com/bran-nie/bran-nie.github.io/images/images/blog/sort_quick_sort.png)

如上图所示，第一次排序，起始条件是整个数组，选定 **3** 为基准元素，`left` 指针从左到右，`right` 指针从右到左。

`right` 指针从右到左移动，遇到小于 **3** 的元素，停止移动，
`left` 指针从左到右移动，遇到大于 **3** 的元素，停止移动。
当满足 `left < right` 时，则将两个元素交换。这样指针 `left` 左侧的元素，均是小于等于基准元素，而 `right` 右侧，则是大于基准元素。

最后，将基准元素下标返回。

```javascript
let tmp = quickPart(arr, startIndex, endIndex);
quickDef(arr, startIndex, tmp - 1);
quickDef(arr, tmp + 1, endIndex);
```

通过基准元素下标，可以递归调用，求左右片段的基准元素与排序。最终可以得到从小到大的排序。

```javascript
/**
 * 以第一个元素为基准元素，在给定的片段(起始下标)中，将片段里小于和大于基准元素的值，交换在基准元素的两侧，并返回最后基准元素所在的下标
 * @param {number[]} arr 数据源
 * @param {number} startIndex  初始值为片段起点下标
 * @param {number} endIndex 初始值为片段结束下标
 * @returns 基准下标值
 */
const quickPart = (arr, startIndex, endIndex) => {
    // 取第一个元素为基准元素，当然也可以在片段中随机取一个。
    const pivot = arr[startIndex];

    // left 小于基准元素的指针(下标) ，right： 大于基准元素的指针(下标)
    let [left, right] = [startIndex, endIndex];

    while (left < right) {
        // 从右边查找第一个小于基准元素的值
        // debugger;
        while (left < right && arr[right] > pivot) right--;
        // 从左边查找第一个大于基准元素的值，
        while (left < right && arr[left] <= pivot) left++;

        // 交换 left 和 right 指针所指向的元素。
        if (left < right) {
            [arr[left], arr[right]] = [arr[right], arr[left]];
        }
    }
    // 找到基准元素所在的位置后，将基准元素值和原 left 指针值互换。left 指针所指向的元素是小于基准元素的。
    arr[startIndex] = arr[left];
    arr[left] = pivot;

    console.log(arr);
    return left;
};

// 快速排序的循环求解，每次是一个片段。
const quickDef = (arr, startIndex, endIndex) => {
    if (startIndex < endIndex) {
        let tmp = quickPart(arr, startIndex, endIndex);
        quickDef(arr, startIndex, tmp - 1);
        quickDef(arr, tmp + 1, endIndex);
    }
};
let data = [3, 2, 1, 3, 56, 5, 4, 0, 22, 3];
quickDef(data, 0, data.length - 1);
```

### 容易理解的单边循环

上面的 `quickPart` 这部分代码，一个循环里面又套了两个循环，于是就增加了算法的理解难易度。这部分代码使用了双指针，在算法中称为**双边循环**。那么下面这个 `quickPart_2` 函数，则是使用一个指针，完成基准元素位置的查找。也就是单边循环。

```javascript
const quickPart_2 = (arr, startIndex, endIndex) => {
    const pivot = arr[startIndex];

    // 定义单边循环的指针，即基准元素最终在片段中的下标值。
    let mark = startIndex;

    for (let i = startIndex + 1; i <= endIndex; i++) {
        // 当本次遍历到的元素，小于基准元素时，1. mark 指针右移一位。2. 将当前元素与 mark 指针指向的元素交换位置。
        if (arr[i] < pivot) {
            mark++;
            [arr[mark], arr[i]] = [arr[i], arr[mark]];
        }
    }

    // for 循环过后，mark 指针即是基准元素的下标。
    arr[startIndex] = arr[mark];
    arr[mark] = pivot;

    return mark;
};
```

## 时间复杂度

因为每次都会将一个片段分为两段去排序，即分治法。因此，该算法的时间复杂度最好情况是：O(nlogn)。为什么说是最好情况呢，因为在一定的情况下，算法的复杂度会接近 O(n^2)。如 原数据是从小到大排列的，使用快速排序将数据排序为从大到小。

不过，算法可以通过修改基准元素的选定，来尽量避免这种情况。随机选择一个基准元素。

快速排序对 n 值比较大的情况，效果会比较好。

## 稳定性

快速排序是不稳定的。
