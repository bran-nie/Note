> JS 操作dom, 获取or修改元素的样式

#### 1. [Window.getComputedStyle()](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle)
  - 可以获取元素最终计算出来的样式对象. (PS: 这个对象不是普通对象, 是 CSSStyleDeclaration )
  - 如果元素的样式被修改, 则对象会更新. (可以监听一个元素样式变化, 然后触发事件? 待验证可行性.) 可以的
  - 考虑到网页的安全性, 部分元素的部分值是不准确的, 如 a 标签元素的 color 值. 
#### 2. [style.setProperty(propertyName, value, priority)](https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleDeclaration/setProperty)
