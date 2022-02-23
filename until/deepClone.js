// https://juejin.cn/post/6844903929705136141

// 使用 JSON api
function deepClone1(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// 一层的对象 copy
function deepClone2(obj) {
    const result = {};
    for (let key in obj) {
        result[key] = obj[key];
    }

    return result;
}

// 多层拷贝，运用递归
function deepClone3(obj) {
    // 如果不是对象，则直接返回
    if (typeof obj !== 'object') {
        return obj;
    }

    const result = {};

    for (const key in obj) {
        result[key] = deepClone3(obj[key]);
    }

    return result;
}
// 多层拷贝，运用递归，处理常见的数组和对象问题
function deepClone4(obj) {
    // 如果不是对象，则直接返回
    if (typeof obj !== 'object') {
        return obj;
    }

    const result = Array.isArray(obj) ? [] : {};

    for (const key in obj) {
        result[key] = deepClone4(obj[key]);
    }

    return result;
}

// 解决递归 copy 时，循环嵌套对象问题
function deepClone5(obj, map = new Map()) {
    if (typeof obj !== 'object') {
        return obj;
    }

    // 如果已经存在过，则直接返回
    if (map.get(obj)) {
        return map.get(obj);
    }

    const result = Array.isArray(obj) ? [] : {};
    // 将本次 clone 存到 map 中。
    map.set(obj, result);

    for (const key in obj) {
        result[key] = deepClone5(obj[key], map);
    }

    return result;
}

function getType(target) {
    return Object.prototype.toString.call(target).slice(8, -1);
}
// 增加更多类型判断，如 数组、日期 等
function deepClone6(obj, map = new Map()) {
    // 判断是否是引用类型
    if ((typeof obj !== 'object' || typeof obj !== 'function') && obj !== null) {
        return obj;
    }

    // 如果已经存在过，则直接返回
    if (map.get(obj)) {
        return map.get(obj);
    }

    const type = getType(obj);
    if (type === 'Date') {
    }

    const result = Array.isArray(obj) ? [] : {};

    // 将本次 clone 存到 map 中。
    map.set(obj, result);

    for (const key in obj) {
        result[key] = deepClone6(obj[key], map);
    }

    return result;
}

function fn1(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// 单层对象 copy
function fn2(obj) {
    const result = {};
    for (const key in obj) {
        result[key] = obj[key];
    }
    return result;
}

// 使用递归，多层对象 copy
function fn3(obj) {
    if (typeof obj !== 'object') {
        return obj;
    }

    const result = {};

    for (const key in obj) {
        result[key] = fn3(obj[key]);
    }

    return result;
}

// 考虑数组
function fn4(obj) {
    if (typeof obj !== 'object') {
        return obj;
    }

    const result = Array.isArray(obj) ? [] : {};

    for (const key in obj) {
        result[key] = fn4(obj[key]);
    }
    return result;
}

// 出现嵌套时，如果不处理，会出现死循环
function fn5(obj, map = new Map()) {
    if (typeof obj !== 'object') {
        return obj;
    }

    if (map.has(obj)) {
        return map.get(obj);
    }

    const result = Array.isArray(obj) ? [] : {};
    map.set(obj, result);
    for (const key in obj) {
        result[key] = fn5(obj[key], map);
    }

    return result;
}
