> Set和Map是es6新增的两种数据结构, 用来补充或者说是扩展JS中数组和对象这两种结构. 因此, 像Set 是类似 Array, Map是类似 Object

## Set与Array
### Set(集合)
- ES6新增的一种类似数组的数据结构, 称之为集合
- 与数组不同的是, Set实例的成员是唯一且无序的, 没有重复的值
- Set本身是一个构造函数, 用来生成Set类型的数据结构
- Set内部判断两个值是否不同, 使用的算法是 "same-value-zero equality", 类型 强等于 (===), 主要的区别是, set中,NaN等于自身, 而强等于运算符认为NaN不等于自身

- #### Set实例的属性
    1. size 元素数量
    2. constructor  指向构造函数也就是Set
- #### 常用的操作方法
    1. add  --- 添加  类似Array.push   返回set实例本身, PS: 所以可以链式调用add,  s.add(1).add(2).add(3)
    2. delete --- 删除   返回 Boolean 值, 表示是否删除成功
    3. has --- 判断是否存在   返回 Boolean 值
    4. clear --- 清空集合   没有返回值
    
```javascript
const s = new Set([1, 2, function() {console.log('hello')}, 3])

s.values()
// SetIterator {1, 2, ƒ, 3}

s.entries()
// SetIterator {1 => 1, 2 => 2, ƒ => ƒ, 3 => 3}
[... s.entries()]
// [[1,1], [2, 2], [ƒ, ƒ], [3, 3]]

```
- #### 常用的实例方法
    1. keys()       --- 返回一个遍历器, 包含集合中的所有键 
    2. values()     --- 返回一个遍历器, 包含集合中的所有值
    3. entries()    --- 返回一个遍历器, 包含及种种所有的键值对
    4. forEach()    --- 使用回调函数, 遍历每个实例成员, 没有返回值

tip: 因为set结构, 没有键名,只有键值, 所以keys和values方法的行为完全一致.
## Set与WeakSet

## Map与Object

## Map与WeakMap

