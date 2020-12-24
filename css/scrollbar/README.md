# CSS 滚动条样式

> 该特性还是草案，是非标准的。请明确知道它**只支持 Webkit 内核的浏览器。**

### [Demo 预览](https://bran-nie.github.io/Note/css/scrollbar/) 或 [在 Codepen 中打开](https://codepen.io/bran-nie/pen/jOMaOqp)

## CSS 属性：自定义滚动条样式

-   `::-webkit-scrollbar` 整个滚动条
-   `::-webkit-scrollbar-button` 滚动条上的按钮（上下或左右箭头）
-   `::-webkit-scrollbar-track` 滚动条轨道
-   `::-webkit-scrollbar-track-piece` 滚动条没有滑块的轨道部分
-   `::-webkit-scrollbar-thumb` 滚动条上的滚动滑块
-   `::-webkit-scrollbar-corner` 垂直和水平滚动条交汇的部分
-   `::-webkit-resizer` 上面交汇部分中的部分样式。（可拖动的按钮）

![](https://tva1.sinaimg.cn/large/0081Kckwgy1glxvnr0kugj30jg0cbta7.jpg)

## CSS 属性：控制浏览器过渡滚动

-   [overscroll-behavior](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overscroll-behavior)
    -   `auto` 默认效果。
    -   `contain` 默认的滚动边界行为不变（“触底”效果或者刷新），但是临近的滚动区域不会被滚动链影响到，比如对话框后方的页面不会滚动。
    -   `none` 临近滚动区域不受到滚动链影响，而且默认的滚动到边界的表现也被阻止。

## CSS 属性：控制滚动条的绘制位置

-   `overflow: overlay` 滚动条将绘制在内容之上。
    -   PS：这个属性 仅在基于 WebKit（例如，Safari）和基于 Blink 的（例如，Chrome 或 Opera）浏览器中受支持。

## 应用：

-   还原 UI 设计的滚动条样式
-   修改滚动条跳动导致页面错位的 bug
