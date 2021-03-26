// const data = [1, 5, 7, 5, 2, 4, 6, 3, 9, 8, 44];
// const data = [1, 5, 7, 44, 100];

const bubbleSort = (better = false, data = [1, 5, 7, 5, 2, 4, 6, 3, 9, 8, 44]) => {
    if (!Array.isArray(data)) throw Error('input not array');
    let count = 0;
    console.log(data);
    console.log('..');
    for (let i = 0; i < data.length - 1; i++) {
        let isSorted = true;
        for (let j = 0; j < data.length - i; j++) {
            count++;
            // debugger;
            if (data[j] > data[j + 1]) {
                [data[j], data[j + 1]] = [data[j + 1], data[j]];
                isSorted = false;
            }
        }
        if (isSorted && better) {
            break;
        }
        console.log(`第${i + 1}次：`, data, { isSorted });
    }

    console.log(count);
    return data;
};

bubbleSort();
