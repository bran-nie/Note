/**
 * JSON.stringify 拷贝对象的缺点。
 * 1. undefined、任意的函数以及 Symbol 值，在序列化过程中会被忽略。
 * 2. Date 日期调用了 toJSON() 将其转换为了 string 字符串，Date.toISOString()，因此会被当作字符串处理。
 * 3. NaN 和 Infinity 格式的数值及 null 都会被当作 null。
 * 4. 其他类型的对象，包括 Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性。
 * 5. 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。
 * 6. 对 RegExp、Error 对象，则序列化结果将只得到空对象。
 */

/**
 * JSON.stringify(value, [,replacer [, space]])
 * 1. replacer
 * 如果该参数是一个函数，则在序列化的过程中，被序列化的值，每个属性都会经过该函数的转换和处理。
 *      如 obj = {a: 1, b: 2}; obj1 = JSON.stringify(obj, ((key, val) => { return val * 2} ); 则 obj1 是： '{"a":2,"b":4}'
 * 如果该参数是一个数组，则在序列化的过程中，只有包含在这个数据中的属性名，才会被序列化到最终的JSON字符串里面。
 *      如 obj = {a: 1, b: 2}; obj1 = JSON.stringify(obj, ['a']); obj1 = '{"a": 1}'
 *      obj.b 就不在序列化后的字符串里面了。
 */

function deepCopy(data) {
    function _deepCopy(target) {
        if (typeof target !== 'object' || !target) {
            return target;
        }
        let obj = {};
        if (Array.isArray(target)) {
            obj = [];
        }
        Object.keys(target).forEach((key) => {
            if (obj[key]) {
                return;
            }
            obj[key] = _deepCopy(target[key]);
        });
        return obj;
    }

    return _deepCopy(data);
}
