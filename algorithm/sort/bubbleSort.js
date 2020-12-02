// const data = [1, 5, 7, 5, 2, 4, 6, 3, 9, 8, 44, 0];
const data = [1, 5, 7, 44, 100];

const bubbleSort_1 = (data) => {
    if (!Array.isArray(data)) throw Error('input not array');
    let count = 0;
    for (let i = 0; i < data.length - 1; i++) {
        for (let j = i + 1; j < data.length; j++) {
            count++;
            if (data[i] > data[j]) {
                [data[i], data[j]] = [data[j], data[i]];
                isSorted = false;
            }
        }
    }

    console.log(count);
    return data;
};

const bubbleSort_2 = (data) => {
    if (!Array.isArray(data)) throw Error('input not array');
    let count = 0;
    for (let i = 0; i < data.length - 1; i++) {
        let isSorted = true;
        for (let j = i + 1; j < data.length; j++) {
            count++;
            if (data[i] > data[j]) {
                [data[i], data[j]] = [data[j], data[i]];
                isSorted = false;
            }
        }
        if (isSorted) {
            break;
        }
    }

    console.log(count);
    return data;
};

bubbleSort_1(data);
