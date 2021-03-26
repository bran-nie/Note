const selectSort = (data = [45, 38, 66, 90, 88, 10, 25, 45]) => {
    if (!Array.isArray(data)) throw Error('input not array');
    console.log(data);
    console.log('..');

    // 两层遍历，第一层 for 终止条件是倒数第二个下标
    for (let i = 0; i < data.length - 1; i++) {
        // min 是本次循环的最小值的下标。
        let min = i;
        // 第二次 for 起始条件是 i 的下一个，终止条件是数组的最后一个元素。
        for (let j = i + 1; j < data.length; j++) {
            // 两两对比，找到从 i 到 n 之间最小的元素的下标之。
            min = data[min] > data[j] ? j : min;
        }

        // 进行置换
        if (min !== i) {
            [data[i], data[min]] = [data[min], data[i]];
        }
        console.log(`第${i + 1}次：`, data, { min: data[i] });
    }
    return data;
};

selectSort();
