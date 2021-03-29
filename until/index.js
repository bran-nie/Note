// 重导出、聚合 until

// 有关 export from 的语法文档，参见 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/export
// 为了使模块导入变得可用，在一个父模块中“导入/导出”这些不同模块也是可行的。
// 也就是说，你可以创建单个模块，集中多个模块的多个导出。
// 这个可以使用“export from”语法实现：

export { default as curry } from './curry.js';
export { default as foo } from './foo.js';
