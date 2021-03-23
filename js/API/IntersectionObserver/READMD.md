# 抛开 Scroll 事件，这个 API，可以轻松实现吸顶、触底、懒加载

## 前景介绍

`Intersection Observer API` 提供了一种异步检测目标元素与祖先元素或 `viewport` 相交情况变化的方法。

过去，要检测一个元素是否在视图中或者两个元素是否相交并不容易，我们可以通过调用`Element.getBoundingClientRect()`方法获取元素的边界信息，再进一步判断。然而，这个事件的调用和监听都是在主线程上运行，因此频繁触发、调用可能会造成性能问题。并且这种方式也较为怪异和不雅。

现在，`IntersectionObserver API`则给我们提供了一个优雅高效的方式。它会注册一个回调函数，每当目标元素达到我们设定的触发条件时，该回调函数就会被触发执行。这样，我们网站的主线程就不需要再为了监听元素而辛苦劳作，而浏览器会自行优化这个元素相交管理。这也是`Observer`的意义所在。

## 场景应用

日常的需求中，可能会有下面几个场景

-   图片懒加载 --- 当图片滚动到可视区域时才进行加载
-   内容无限滚动 --- 也就是用户滚动页面，将接近底部的时候，加载新的数据，而无需用户操作翻页
-   检测模块的曝光情况 --- 如广告、新增的功能模块，想统计它的出现次数、曝光情况
-   在用户看见某个区域时执行任务或者播放动画

## 简单示例

-   ### 图片懒加载
-   **<a target="_blank" href="https://bran-nie.github.io/Note/js/API/IntersectionObserver/?demo=imglazyload">Demo 展示</a>**

![](https://raw.githubusercontent.com/bran-nie/bran-nie.github.io/images/images/blog/img_lazyload.png)
![](https://raw.githubusercontent.com/bran-nie/bran-nie.github.io/images/images/blog/img_lazyload_2.png)
html 的结构如下，img 标签，自定义 data 放置图片的 src，设置 lazyload 类，用来监听。

```html
<div class="images-container" v-if="showImageLazyDemo">
    <h4>水平滚动，懒加载</h4>
    <div class="images horizontal">
        <div class="item" v-for="i in 8" :key="i">
            <img class="lazyload" src="" :data-src="xxxx" />
        </div>
    </div>
    <h4>向下滚动，懒加载</h4>
    <div class="images vertical">
        <div class="item" v-for="i in 8" :key="i">
            <img class="lazyload" src="" :data-src="xxxx" />
        </div>
    </div>
</div>
```

```javascript
const images = document.querySelectorAll('img.lazyload');

const imgObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            const { target } = entry;
            // 如果图片已经在视图中 root
            if (entry.isIntersecting) {
                target.src = target.dataset.src;
                // 图片已经开始加载，所以可以停止监听这个 target 了
                observer.unobserve(target);
            }
        });
    },
    {
        rootMargin: '0 0 200px 0', // 这里是调整视图的边距，底部是200px，意味着将视图向下扩张了200px。
    }
);

images.forEach((img) => imgObserver.observe(img));
```

**这种方式，不仅很方便，并且还能支持横向的滚动懒加载。**

-   ### 内容滚动加载 && 播放动画

-   **<a target="_blank" href="https://bran-nie.github.io/Note/js/API/IntersectionObserver/?demo=animation">Demo 展示</a>**

```html
<div class="animation" v-if="!showImageLazyDemo">
    <div :class="`item" v-for="i in blockLen" :key="i">
        <div class="block"></div>
    </div>
    <div class="reference"></div>
</div>
```

```javascript
// 内容滚动加载

// 防止重复请求数据。
let loading = false;
const loadObserver = new IntersectionObserver((entries) => {
    let item = entries[0];
    if (item.isIntersecting) {
        if (loading) return; // 已经发出请求再次触发，则直接 return
        loading = true;
        console.log('滚动到了底部，开始请求数据，比如发送异步请求');
        const timer = setTimeout(() => {
            loading = false;
            console.log('请求到数据');
            clearTimeout(timer);
        }, 1000 * 6);
    }
});
loadObserver.observe(document.querySelector('.reference'));

// item 的交叉监听事件绑定
const items = document.querySelectorAll(`.animation div.item`);

const itemObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        const { target } = entry;
        // 如果图片已经在视图中 root
        if (entry.isIntersecting) {
            target.classList.add('show');
            // observer.unobserve(target);
        } else {
            target.classList.remove('show');
        }
    });
});

items.forEach((item) => itemObserver.observe(item));
```

## API 语法简介

> `const Observer = new IntersectionObserver(callback[, options])`

1.  ### callback

    当元素可见比例超过指定阈值后，会调用一个回调函数，此回调函数接受两个参数：

    `entries`: entry[]

    -   是当前`已监听`并且`触发了` 设定的触发条件的 `目标集合`

    `observer`: Observer{}

    -   是构造函数返回的实例。

2.  ### options [可选

    一个用来配置 observer 实例的对象。有以下几个配置项，未指定配置时，分别有默认值。

    `root`: null | Element

    -   监听元素的祖先元素，其边界将被看作是视口，也就是将这个元素的所在的区域当作监听元素的可视区域。监听元素不在视口的部分，会被视为不可见。默认是 null，即根节点视图窗口。

    `rootMargin`: String

    -   一个在计算交叉值时，添加给`root`边界盒的一组偏移量。语法和 css 中的`margin`大致等同。默认值是：`"0px 0px 0px 0px"`。

    `threshold`: Number | Number[]

    -   规定了一个监听元素与`root`边界盒交叉区域的比例值。这个也是决定触发 callback 的条件。
    -   取值可以是一个 Number(0.0 - 1.0)或者一组 0.0 到 1.0 之间的数组。
    -   若数值是 0.0，则意味着监听元素与`root`有 1 像素的交叉，此元素就会被视为可见，就会触发 callback。
    -   若数值是 1.0，则意味着监听元素完全与`root`交叉，即监听元素完全出现在`root`中，此元素才被视为可见，才会触发 callback。
    -   同理，若数值是 0.5，则监听元素有一半与`root`交叉，此元素会被视为可见，触发 callback。
    -   当取值是数组时，当监听元素满足数组内的任一情况时，都会触发 callback。
        -   如：[0.0, 0.2, 0.4, 0.6. 0.8, 1.0]，监听元素在刚与`root`交叉，20%、40%、60%、80%、100%交叉的时候，都会触发 callback。

3.  ### Observer: {}

    一个`IntersectionObserver`实例，有以下方法。

    -   `disconnect()` 实例停止监听工作，即等同销毁这个实例。
    -   `observe()` 实例监听一个目标元素。
    -   `takeRecords()` 返回所有观察目标的对象数组。
    -   `unobserve()` 停止监听特定的目标元素，即等同销毁与这个目标元素的关联。

## 写在最后

我现在还不擅长写这样的文章，另外还比较耗时，当然，在这个过程中，我对这个接口倒是熟悉了不少。

也在纠结语法这个怎么处理，照着 MDN 的搬运吧，感觉不够意思，自己去写，又觉得不如 MDN 上面说得清晰。只好选择先把示例放上面，随后再给 API 语法了。。

在写文章的时候，也去查阅了大佬们的文章，看到了张鑫旭之前写的有关这个接口的文章。在[他的文章的结尾处](https://www.zhangxinxu.com/wordpress/2020/12/js-intersectionobserver-nav/)看到一段话，感触颇深。确实，不间断地折腾，它在当下看，似乎没什么收益，但长远来看，折腾是以一种更加无形的方式反馈给了你！

![](https://raw.githubusercontent.com/bran-nie/bran-nie.github.io/images/images/blog/toos_worth.png)
