## 自定义组件

-   在自定义组件中，wxml 传 props，是短横线`-`连接，组件内取值是驼峰。eg： wxml 传值：`nav-list`， 组件内 properties 取值：`navList`
-   在自定义组件中，生命周期建议写在`lifetimes`第一属性里面，并且该属性里面的生命周期优先级高于外面定义的。
-   在自定义组件中，生命周期 `created` 里面获取不到由父组件传进来的 props，获取到的是组件声明 props 的属性的 type 类型。同样，也无法使用`setData`

## 事件

-   事件传参数，不像 vue、react 那样，写在函数的括号里，而是通过 dataset 属性来传值。

## wxml 模板

-   input、textarea 等可以使用 model:value 进行双向绑定时，如果浏览器控制台出现`Do not have handler in component`警告, 给标签添加一个 `bindinput`事件可以解决。
    -   原因是 ** 待续..（TODOLIST)**

## 页面

-   页面也可以用 Component 构造器，
    -   > 事实上，小程序的页面也可以视为自定义组件。因而，页面也可以使用 Component 构造器构造，拥有与普通组件一样的定义段与实例方法。但此时要求对应 json 文件中包含 usingComponents 定义段。
    -   page 对应的 json 文件中，只要有 usingComponents 字段就可以了。
    -   使用 Component 的好处有
        1. Component 构造器比 Page 构造器，在一级属性上 更清晰，如 lifetimes、methods、observers 等
        2. 使用 Component 构造器来构造页面的一个好处是可以使用 behaviors 来提取所有页面中公用的代码段。

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

## 性能

-   如果一个元素，会来回切换展示隐藏的话，可以使用 `hidden` 属性来控制，会比`wx:if`好。
    -   `<view wx:if="{{Boolean}}></view>`
    -   `<view hidden="{{Boolean}}></view>`

## 环境

-   小程序配置环境变量，它并不像我们平时的 vue、react 应用那样，通过进程配置。微信小程序提供了一个接口`wx.getAccountInfoSync()`，可以获取获取当前帐号信息。

    -   通过这个接口，可以拿到小程序是开发版还是体验版还是线上版，从而选择小程序项目使用哪个环境。
    -   返回数据

    ```javascript
    accountInfo = {
        miniProgram: {
            envVersion: {
                // 小程序版本， envVersion会是下面三个合法字段之一。
                develop, // 开发版
                trial, // 体验版
                release, // 线上版
            },
        },
    };
    ```

    -   示例：

    ```javascript
    const info = wx.getAccountInfoSync();
    const env =
        typeof info !== 'undefined'
            ? info.miniProgram.envVersion || 'release'
            : 'release';
    const isProd = env === 'release'; // 我这项目为了在本机验证测试环境问题，所以只区分测试环境和线上环境。当然，可以把上面判断改一下，增加开发版和体验版的区别。
    domain = isProd ? DOMIAIN_CONFIG.prod : DOMIAIN_CONFIG.test;

    export default domain;
    ```
