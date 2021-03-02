function strSplice(str, ...indexs) {
    if (!str) return '';
    // indexs的长度不能大于100，这是replace函数的限制。不过这里不做判断了。
    let regStr = '',
        params = '',
        prevIndex = -1,
        lastParam = 1;
    // 先对下标值排序，确保数据能正常处理, sort方法默认调用时是从小到大。
    // every的作用是在遇到下标值超出字符串长度时候，不再进行改变，防下标溢出。
    if (indexs.length === 1) {
        regStr += `(.{${indexs[0]}}).`;
        params += '$1';
        lastParam = 2;
    } else {
        indexs.sort().every((index, i) => {
            if (str[index]) {
                // gap值是两个要移除的下标值中间的字符长度。
                const gap = index - prevIndex - 1;
                regStr += `(.{${gap}}).`;
                params += '$' + (i + 1);
                lastParam = i + 2;
                prevIndex = index;
                return true;
            }
        });
    }
    // 增加最后的字符捕获和最后的param
    regStr += '(.*)';
    params += '$' + lastParam;

    const reg = new RegExp(regStr);
    console.log({ regStr, params, reg });
    return str.replace(reg, params);
}

const data = Array(10)
    .fill(null)
    .map((item, index) => index)
    .join('');
strSplice(data, 1, 3);

// {regStr: "(.{1}).(.{1}).(.*)", params: "$1$2$3", reg: /(.{1}).(.{1}).(.*)/}
// "02456789"
