## 自定义组件

-   在自定义组件中，wxml 传 props，是短横线`-`连接，组件内取值是驼峰。eg： wxml 传值：`nav-list`， 组件内 properties 取值：`navList`
-   在自定义组件中，生命周期建议写在`lifetimes`第一属性里面，并且该属性里面的生命周期优先级高于外面定义的。
-   在自定义组件中，生命周期 `created` 里面获取不到由父组件传进来的 props，获取到的是组件声明 props 的属性的 type 类型。同样，也无法使用`setData`

## 事件

-   事件传参数，不像 vue、react 那样，写在函数的括号里，而是通过 dataset 属性来传值。

## npm 模块

-   使用 npm 的步骤
    1. 命令行进入到 root 目录下，执行`npm init`
    2. 安装包 `npm install <package>`
    3. 如果需要配置 npm 包生成路径，则在 package 中，用 miniprogram 字段配置
    4. 在微信开发者工具中，菜单栏>工具>构建 npm
    5. 代码中可以 import 或 require，开始使用吧
-   需要在`project.config.js`或`json`的 `miniprogramRoot`指定的目录下，使用 npm。如果没有指定，则在`project.config.js`所在的目录
-   `package.json`中有 `"miniprogram"`字段，可以定义构建 npm 包的生成路径。如没有配置，目前默认路径是 package.json 同级，文件夹名是`miniprogram_npm`
-   构建生成的 npm，是需要 git 跟踪上传的，不然代码中的 import 就无法找到 package 了。
