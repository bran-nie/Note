// immediate 表示第一次是否立即执行
function debounce(fn, wait = 50, immediate) {
    let timer = null;
    return function (...args) {
        if (timer) clearTimeout(timer);

        // immediate 为 true 表示第一次触发后执行
        // timer 为空表示首次触发
        if (immediate && !timer) {
            fn.apply(this, args);
        }

        timer = setTimeout(() => {
            fn.apply(this, args);
        }, wait);
    };
}

// fn 是需要节流处理的函数
// wait 是时间间隔
function throttle(fn, wait) {
    // previous 是上一次执行 fn 的时间
    // timer 是定时器
    let previous = 0,
        timer = null;

    // 将 throttle 处理结果当作函数返回
    return function (...args) {
        // 获取当前时间，转换成时间戳，单位毫秒
        // + new Date()，+ 会让 new Data() 调用 valueOf() 方法
        let now = +new Date();

        // ------ 新增部分 start ------
        // 判断上次触发的时间和本次触发的时间差是否小于时间间隔
        if (now - previous < wait) {
            // 如果小于，则为本次触发操作设立一个新的定时器
            // 定时器时间结束后执行函数 fn
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                previous = now;
                fn.apply(this, args);
            }, wait);
            // ------ 新增部分 end ------
        } else {
            // 第一次执行
            // 或者时间间隔超出了设定的时间间隔，执行函数 fn
            previous = now;
            fn.apply(this, args);
        }
    };
}
// 此处的三个参数上文都有解释
const debounce = function (func, wait, immediate) {
    // timeout 表示定时器
    // result 表示 func 执行返回值
    var timeout, result;

    // 定时器计时结束后
    // 1、清空计时器，使之不影响下次连续事件的触发
    // 2、触发执行 func
    var later = function (context, args) {
        timeout = null;
        // if (args) 判断是为了过滤立即触发的
        // 关联在于 _.delay 和 restArguments
        if (args) result = func.apply(context, args);
    };

    // 将 debounce 处理结果当作函数返回
    var debounced = restArguments(function (args) {
        if (timeout) clearTimeout(timeout);
        if (immediate) {
            // 第一次触发后会设置 timeout，
            // 根据 timeout 是否为空可以判断是否是首次触发
            var callNow = !timeout;
            timeout = setTimeout(later, wait);
            if (callNow) result = func.apply(this, args);
        } else {
            // 设置定时器
            timeout = _.delay(later, wait, this, args);
        }

        return result;
    });

    // 新增 手动取消
    debounced.cancel = function () {
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
};
function restArguments() {}
// 根据给定的毫秒 wait 延迟执行函数 func
var delay = restArguments(function (func, wait, args) {
    return setTimeout(function () {
        return func.apply(null, args);
    }, wait);
});
