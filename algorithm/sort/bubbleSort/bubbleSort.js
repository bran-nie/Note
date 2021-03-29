// const data = [1, 5, 7, 5, 2, 4, 6, 3, 9, 8, 44];
// const data = [1, 5, 7, 44, 100];

function bubbleSort(data = [1, 5, 7, 5, 2, 4, 6, 3, 9, 8, 44], better = true) {
    if (!Array.isArray(data)) throw Error('input not array');
    const stepData = [];
    console.log(data);
    console.log('..');
    for (let i = 0; i < data.length - 1; i++) {
        let isSorted = true;
        for (let j = 0; j < data.length - i; j++) {
            // debugger;
            if (data[j] > data[j + 1]) {
                [data[j], data[j + 1]] = [data[j + 1], data[j]];
                isSorted = false;
            }
        }
        stepData.push({
            data: [].concat(data),
            isSorted,
            msg: `${isSorted ? '已经排序好了，可以退出算法' : '最大的元素冒泡到后面'}, isSorted: ${isSorted}`,
        });
        if (isSorted && better) {
            break;
        }
    }

    return stepData;
}

// bubbleSort();

export default bubbleSort;
