## 4. Array

### 数组方法分类

1. 增删
    - push, 参数：n， 向数组尾部新增 n 个元素，length + n. 返回值是新的 length。
    - pop, 参数：0， 从数组尾部删除一个元素，length - 1. 返回值是删除的元素。空数组的话，是 undefined。
    - unshift, 参数：n，向数组头部新增 n 元素，length + n. 返回值是新的 length。
    - shift, 参数：0，从数组头部删除一个元素，length - 1. 返回值是删除的元素，空数组调用，返回值是 undefeated。
2. 转字符串
    - join, 参数：1，可选，string， 数组转换为字符串，数组元素 会 toString(），没参数传入时，元素之间用 ',' 拼接， 如：[1, 2, 3] -> "1,2,3". 其中，空数组返回空字符串，只有一个元素，则没有拼接符。 undefined 和 null 会被转换为空字符串。
3. 遍历
    - forEach, 参数：2，函数，thisArg(可选)「注 1」，其函数的参数有（item，index，arr），item 是数组的每一个元素，index 是元素对应的下标，arr 是原数组。
    - every, 同 forEach，区别点在于，every 方法的回调函数有返回值，可以终止遍历。回调函数 return false 时，终止遍历。 every 返回值是布尔值，
    - some, 同 forEach，区别点在于，some 方法的回调函数有返回值，可以终止遍历。回调函数 return true 时，终止遍历。 因此，some 和 every 也称为是测试函数。有返回 true 的时候，方法返回值就是 true，否则是 false，空数组返回 false。
    - sort,参数：1，函数，可选。没参数时，数组将元素转成字符串，然后比较它们的 Unicode 位点进行排序 ，有参数时，函数参数是数组的两个元素，按函数返回值排序，copmareFN(a,b)，返回值小于 0，a 在 b 前面，=0，不变，大于 0，b 在 a 前面，故数字从小到大排序是 arr.sort((a, b) => a - b)
    - map, 参数：1，函数。其参数同 forEach。map 的方法会返回一个新的数组，其数组元素是每次回调函数的返回值。
    - filter, 参数：1，函数。其参数同 forEach。filter 的回调函数会返回一个新的数组，其数组元素是每次回调函数 return 值是 true 的元素。
    - reduce, 参数：2，函数， 初始值(可选)。函数参数：4 个，分别是：无可选参数时，第一个元素或者上一次的返回结果，第二个元素或当前元素，当前元素的 index(从 1 开始)，数组本身。有可选参数时，初始值或上一次的返回结果，第一个元素或当前元素，当前元素的 index(从 0 开始)，数组本身。
    - reduceRight， reduce 的反向遍历
4. 查找
    - find, 参数：2，函数，thisArg(可选)。函数参数：n，当前元素，当函数 return true 时，find 方法执行结束，方法返回回调函数 return true 的那个元素，即查找到的值。
    - findIndex, 同 find。findIndex 返回值区别于 find，是查找到元素的下标
5. 切割拼接

    - contact, 参数，n，数组或者元素。参数是数组，则将数组内的元素添加到调用数组的尾部，参数是元素，则添加到调用数组的尾部。
    - splice, 参数：2+n，startIndex，deleteCount，...items，分别是数组要删除的元素起始下标，要删除的个数，删除后补充的元素。如果下标不合格，则不作处理；没传 deleteCount，则从 startIndex 开始，后面的都删除，deleteCount 有值，则删除这个值的数量，不会超过数组原有的；n 个参数，是在删除元素下标后面，添加到数组里面。startIndex 合法范围：0 <= start < length
    - slice, 参数：2，start, end 可选。不会修改原数组，返回值是个新数组，其元素是 start 和 end 之间的元素。start 和 end 可以为负，start 为正，end 为负时，是从 start 倒着数 end 个元素。start 为负时，是从数组末尾开始计算 start 个元素。

6. 其他

    - fill，参数：3，固定值 v，可选参数：start，end。函数是用一个固定值填充一个数组中从起始索引到终止索引的所有元素。start 默认是 0，end 默认是 length-1；
    - reverse，改变数组
    - from，

7. 新增
    - flat，参数：1，depth 可选，按照一个指定的深度，递归遍历数组，然后将所有元素合并为一个新的数组。depth 默认是 1.
    - flatmap，
    - entries，返回一个新的迭代对象，可以用 for of
    - values，

「注 1」：

```javascript
// 勉强的示例，表明forEach等函数的thisArg参数的使用
// 不过，如果forEach等函数，其回调函数使用箭头函数时，thisArg参数会被忽略，因为箭头函数在词法上已经绑定了this值。
function Counter() {
    this.sum = 0;
    this.count = 0;
}
Counter.prototype.add = function (array) {
    array.forEach(function (entry) {
        this.sum += entry;
        ++this.count;
    }, this);
    // ^---- Note
};

const obj = new Counter();
obj.add([2, 5, 9]);
obj.count;
// 3 === (1 + 1 + 1)
obj.sum;
// 16 === (2 + 5 + 9)
```
