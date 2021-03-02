const square = (v) => v * v;
const double = (v) => v * 2;
const addOne = (v) => v + 1;
const res = pipe(square, double, addOne);

console.log(res(3)); //  19, addOne(double(square(3)));

// ans
/**
 * pipe 参数是函数，返回值是函数
 * 返回值函数可以接收参数，
 * @param  {...Function} fns
 * @return {Function}
 */
function pipe(...fns) {
    // 这个val即是res的参数，
    // 1. pipe的参数都是函数，
    // 2. 后一个函数的参数依赖前一个函数的返回值，因此 reduce 很符合这个规则。
    return function (param) {
        // 第一个参数 函数的传参是res的参数，后续的都是上个的返回值。
        return fns.reduce((v, fn) => {
            return fn(v);
        }, param);
    };
}
