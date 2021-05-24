/**
 * 监听一个变量的变化，需要怎么做？
 *
 * 1. ES5 的 Object.defineProperty
 * 2. ES6 的 Proxy
 *
 * 监听一个变量的变化，当变量变化时执行某些操作，这类似现在流行的前端框架（例如 React、Vue 等）中的数据绑定功能。在数据更新时自动更新 DOM 渲染，那么可以通过上面两种方式来实现。
 */

/**
 * ES5 的 Object.defineProperty
 *
 * Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。 --- MDN
 *
 * Object.defineProperty(obj, prop, descriptor)
 *
 * obj：目标对象
 * prop：要定义或修改的对象属性
 * descriptor：属性描述符对象
 */

const user = {
    name: 'bran',
};

Object.defineProperty(user, 'name', {
    enumerable: true,
    configurable: true,
    set: function (newVal) {
        console.log();
        this._name = newVal;
        console.log(`set: ${this._name}`);
    },
    get: function () {
        console.log(this);
        console.log(`get: ${this._name}`);
        return this._name;
    },
});
