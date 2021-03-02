class Person {
    constructor({ name }) {
        this.name = name;
        this.getSex = function () {
            return 'boy';
        };
    }

    getName() {
        return this.name;
    }
    static getLook() {
        return 'sunshine';
    }
}

/**
 * 1. Babel是如何编译Class的？
 * 当我们在使用Babel的这些插件plugin或者使用preset的时候，有一个配置项：loose，它默认是false，在这样的条件下。
 * Class编译后：
 * 1. 总体来说，class会被封装成一个立即执行函数，IIFE，
 * 2. 立即执行函数返回的是一个与类同名的构造函数
 * 3. 实例属性和方法定义在构造函数内，（如 name，getSex()）
 * 4. 类内部声明的属性方法如 getName 和静态属性方法 getLook 是会被 Object.defineProperty 所处理，将其可枚举属性设置为false
 */

// 上面的类，编译后的代码

// 严格模式
('use strict');

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}
function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor) {
            descriptor.writable = true;
        }
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);

    return Constructor;
}

var Person = /*#__PURE__*/ (function () {
    function Person(_ref) {
        var name = _ref.name;
        _classCallCheck(this, Person);

        this.name = name;
        this.getSex = function () {
            return 'boy';
        };
    }
    _createClass(
        Person,
        [
            {
                key: 'getName',
                value: function getName() {
                    return this.name;
                },
            },
        ],
        [
            {
                key: 'getLook',
                value: function getLook() {
                    return 'sunshine';
                },
            },
        ]
    );

    return Person;
})();

/**
 * 为什么Babel对于类的处理会使用Object.defineProperty这种形式呢？它和直接使用原型链有什么不同吗？
 * 1. 通过原型链声明的属性和方法是可枚举的，也就是可以被for...of...搜寻到
 * 2. 而类内部声明的方法和属性是不可枚举的
 *
 * 所以，babel为了符合ES6的Class真正的语义，编译类的时候采取了Object.defineProperty来定义原型方法。
 *
 * 但是可以通过配置babel的loose项，选择不同的模式，loose配置为false时，即 宽松模式，它会不严谨遵循ES6的语义，
 * 而是采取更符合我们平时编写代码时的习惯去编译代码，在 .babelrc 中可以如下设置
 * "presets": [["env", { "loose": true }]]
 * 如此一来，上面的Person类的属性方法将会编译成在原型链上声明的属性方法了。
 */
('use strict');
var Person = (function () {
    function Person(_ref) {
        var name = _ref.name;
        this.name = name;

        this.getSex = function () {
            return 'boy';
        };
    }
    var _proto = Person.prototype;

    _proto.getName = function getName() {
        return this.name;
    };
    _proto.getLook = function getLook() {
        return 'sunshine';
    };

    return Person;
})();

/**
 * 总结
 * 1. 当使用Babel编译时，默认的loose配置是false，即 严谨模式，会遵循ES6的语义去编译代码
 * 2. 无论哪种模式，转换后的 定义在类内部的属性方法，是被定义在构造函数的原型对象上的，静态属性被定义到构造函数上
 * 3. 只不过严谨模式下，这些属性方法会被_createClass函数处理，函数内通过Object.defineProperty，设置属性的可枚举值为false，enumerable=false;
 * 4. 由于在_createClass函数内使用了Object，所以严谨模式下是会产生副作用的，而宽松模式不会。
 * 5. webpack中的UglifyJS依旧还是会将宽松模式认为是有副作用的，而rollup有「程序流分析」的功能，可以更好的判断代码是否真正的产生副作用，所以它认为宽松模式没有副作用。
 *
 *
 * 副作用大致理解为：一个函数会、或者可能会对函数外部的变量产生影响的行为。
 */
