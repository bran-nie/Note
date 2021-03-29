/**
 * 柯里化是一种函数的转换，可以将函数从可调用的 fn(a, b, c) 转换为 可调用的 fn(a)(b)(c)。
 * 本柯里化工具可以使函数别多参数变体调用。
 * @param {function} fn 待转化函数
 * @returns 转化后的柯里化函数
 */
const curry = (fn) => {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        return function (...args2) {
            return curried.apply(this, args.concat(args2));
        };
    };
};

export default curry;
