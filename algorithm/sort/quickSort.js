const quickSort = (data = [3, 2, 1, 3, 56, 5, 4, 0, 22, 3]) => {
    if (!Array.isArray(data)) throw Error('input not array');
    console.log('初始数据：', data);
    console.log('..');
    // 打印所需变量
    let i = 1;

    /**
     * 以第一个元素为基准元素，在给定的片段(起始下标)中，将片段里小于和大于基准元素的值，交换在基准元素的两侧，并返回最后基准元素所在的下标
     * @param {number[]} arr 数据源
     * @param {number} startIndex 初始值为片段起点下标
     * @param {number} endIndex  初始值为片段结束下标
     * @returns 基准下标值
     */
    const quickPart = (arr, startIndex, endIndex) => {
        // 取第一个元素为基准元素，当然也可以在片段中随机取一个。
        const pivot = arr[startIndex];

        // left 小于基准元素的指针(下标) ，right： 大于基准元素的指针(下标)
        let [left, right] = [startIndex, endIndex];

        while (left < right) {
            // 从右边查找第一个小于基准元素的值
            // debugger;
            while (left < right && arr[right] > pivot) right--;
            // 从左边查找第一个大于基准元素的值，
            while (left < right && arr[left] <= pivot) left++;

            // 交换 left 和 right 指针所指向的元素。
            if (left < right) {
                [arr[left], arr[right]] = [arr[right], arr[left]];
            }
        }
        // 找到基准元素所在的位置后，将基准元素值和原 left 指针值互换。left 指针所指向的元素是小于基准元素的。
        arr[startIndex] = arr[left];
        arr[left] = pivot;

        console.log(`第${i}次：`, arr, { startIndex, endIndex, pivotIndex: left });
        i++;
        return left;
    };

    // 快速排序的循环求解，每次是一个片段。
    const quickDef = (arr, startIndex, endIndex) => {
        if (startIndex < endIndex) {
            let tmp = quickPart(arr, startIndex, endIndex);
            quickDef(arr, startIndex, tmp - 1);
            quickDef(arr, tmp + 1, endIndex);
        }
    };

    quickDef(data, 0, data.length - 1);

    return data;
};

quickSort();

const quickPart_2 = (arr, startIndex, endIndex) => {
    const pivot = arr[startIndex];

    // 定义单边循环的指针，即基准元素最终在片段中的下标值。
    let mark = startIndex;

    for (let i = startIndex + 1; i <= endIndex; i++) {
        // 当本次遍历到的元素，小于基准元素时，1. mark 指针右移一位。2. 将当前元素与 mark 指针指向的元素交换位置。
        if (arr[i] < pivot) {
            mark++;
            [arr[mark], arr[i]] = [arr[i], arr[mark]];
        }
    }

    // for 循环过后，mark 指针即是基准元素的下标。
    arr[startIndex] = arr[mark];
    arr[mark] = pivot;

    return mark;
};
