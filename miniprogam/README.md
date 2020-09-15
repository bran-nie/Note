## 自定义组件

-   在自定义组件中，wxml 传 props，是短横线`-`连接，组件内取值是驼峰。eg： wxml 传值：`nav-list`， 组件内 properties 取值：`navList`
-   在自定义组件中，生命周期建议写在`lifetimes`第一属性里面，并且该属性里面的生命周期优先级高于外面定义的。
-   在自定义组件中，生命周期 `created` 里面获取不到由父组件传进来的 props，获取到的是组件声明 props 的属性的 type 类型。同样，也无法使用`setData`

## 事件

-   事件传参数，不像 vue、react 那样，写在函数的括号里，而是通过 dataset 属性来传值。
