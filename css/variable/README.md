# 使用 `css自定义属性（css变量）`，配合 js 更新 css，实现星星打分~

![preview](https://tva1.sinaimg.cn/large/0081Kckwgy1glsawoxq9aj30c208oq30.jpg)

### [Demo 预览](https://bran-nie.github.io/Note/css/variable/)

## 1. 所需知识点

> 由于 GitHub 不支持新开标签页打开链接，可以鼠标在链接上右键选择在新开标签页打开链接

-   [css 自定义属性，即变量](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties)
-   [var()函数](<https://developer.mozilla.org/zh-CN/docs/Web/CSS/var()>)
-   [calc()函数](<https://developer.mozilla.org/zh-CN/docs/Web/CSS/calc()>)
-   background 使用

## 2. 需求解析&编码思路

-   鼠标在其上移动，评分随之变更
-   点击评分后，固定评分
-   鼠标离开后，回显上次评分
-   采用背景图方案，repeat 素材
-   使用 calc 计算宽度，展示评分的变化
-   根据鼠标在评分 DOM 元素上的 x 轴偏移量，计算评分
-   绑定事件，mousemove，mouseleave，及 click

## 3. 代码实现

-   HTML

```html
<div id="starBox" class="star-box"></div>
```

-   CSS

```css
/* 将背景属性公用的部分提出 */
.star-box,
.star-box::before {
    background-repeat: repeat-x;
    background-size: 26px 100%;
}
.star-box {
    /* 盒子总宽度，与星星个数有关，单个星星素材宽高26px */
    width: calc(var(--starNum) * 26px);
    height: 26px;
    position: relative;
    overflow: hidden;

    background-image: url('/* 未评分的星星svg素材 */');
}

.star-box::before {
    content: '';
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    /* 点亮的星星个数，计算宽度 */
    width: calc(var(--activeStar) * 26px);
    height: 100%;

    background-image: url('/* 评分的星星svg素材 */');
}
```

-   JavaScript

```javascript
let AllScore = 5; // 评分总个数
let score = 0; // 评分
const starBox = document.getElementById('starBox');
if (starBox instanceof HTMLDivElement) {
    // 待实现功能：
    // 1. 鼠标在其上移动，评分变更
    // 2. 点击评分后，固定评分
    // 3. 鼠标离开后，回显上次评分

    // 处理鼠标移动事件，改变评分。
    const handleMove = (el) => {
        // 通过x轴距离起点待偏移量和x轴总长确定评分
        const { offsetX } = el;
        // console.log({ offsetX });
        const hoverStar = getScore(offsetX);
        starBox.style.setProperty('--activeStar', hoverStar);
    };
    // 鼠标离开后，恢复至上次评分
    const handleLeave = () => {
        starBox.style.setProperty('--activeStar', score);
    };
    // 点击评分后，记录评分
    const handleClick = (el) => {
        const { offsetX } = el;
        score = getScore(offsetX);
        console.log({ score });
        starBox.style.setProperty('--activeStar', score);
    };

    // 获取评分。
    const getScore = (offsetX) => {
        offsetX = offsetX / 26;
        let r = Math.trunc(offsetX);
        if (offsetX < 0) {
            r = 0;
        } else if (offsetX - r < 0.5) {
            r += 0.5;
        } else {
            r += 1;
        }
        return r;
    };

    starBox.addEventListener('mousemove', handleMove);
    starBox.addEventListener('mouseleave', handleLeave);
    starBox.addEventListener('click', handleClick);
}
```

## 4. 扩展和探索发现

-   Q：PC 端用 mousemove 和 mouseleave 事件，那移动端呢？
-   A：使用 touchmove 和 touchend。[触摸事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Touch_events)
    -   详细代码见[index.html](./index.html)文件

---

-   Q：移动端和 PC 会有什么不同？
-   A：
    -   首先是交互不同，PC 端是鼠标移动，移动端是手指触摸滑动；对于确认评分，PC 端是常见是点击事件，移动端则是手指抬起，即 touchend 事件结束。
    -   left 取值不同，PC 端是取相对偏移量，移动端是获取触摸点端位置减去 DOM 元素的偏移量。

---

-   Q：还有别的巧妙的方式吗？
-   A：利用 input[type="range"]也可以实现。

## 5. 感谢[sunseekers](https://github.com/sunseekers)的知识分享。
