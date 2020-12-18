## CSS counter 计数器

> 本质上 CSS 计数器是由 CSS 维护的变量，这些变量可能根据 CSS 规则增加以跟踪使用次数。这允许你根据文档位置来调整内容表现。[CSS 计数器](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Counters)

### 计数器

1. **创建一个 counters：** 在父元素或更高层中声明一个变量。`counter-reset: ${counter-name} ${value}`， value 必须是 integer 类型，否则为默认值 0.
2. **控制 counters 的值变化：** 在需要计数的元素中，使用`cunter-increment`或者`counter-set`来控制 counters 的变化。
    - `<counter-name> ?<integer>`，integer 默认值，使用`counter-increment: `时是 1， 使用`counter-set`时是 0。
    - 如果元素上当前没有给定名称的计数器，则该元素会在设置或递增其值之前使用起始值 0 实例化给定名称的新计数器。
3. **使用 counters**，`counter()`和`counters()`函数是返回 counter 的方式。
    - `counter(name, counter-type?)`
    - `counters(name, string, counter-type?)`
    - counter-type 默认是十进制 （decimal）
    - 尽管这两个函数可以在大多数 css 属性里使用，但推荐在`content`里使用

### for example

```html
<style>
    ul {
        list-style: none;
        counter-reset: hello 3;
    }
    ul li::before {
        counter-increment: hello 3;
        content: counter(hello) '. ';
    }
</style>
<ul>
    <li>counter，设置的变量是 hello 初始值是3</li>
    <li>在li的before中，每次递增的是3</li>
    <li>在li的before伪元素content属性中，调用 counter 函数，</li>
    <li>
        因为调用过后，变量hello的值就会改变，所以第一个li的
        编号就是初始值+递增值。即6
    </li>
</ul>
```

### [Demo 预览](https://bran-nie.github.io/Note/css/counters/)

### 应用

1. 目录
2. 计数
3. 循环赋值
