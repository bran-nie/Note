import { curry } from '../../../until/index.js';
// 柯里化函数。
// const curry = (fn) => {
//     return function curried(...args) {
//         if (args.length >= fn.length) {
//             return fn.apply(this, args);
//         }
//         return function (...args2) {
//             return curried.apply(this, args.concat(args2));
//         };
//     };
// };

function downAdjust(arr, parentIndex, length) {
    // 用临时变量保存的父节点值，用于最后的赋值
    const temp = arr[parentIndex];

    const getChild = (parentIndex, childType) => {
        const _t = 2 * parentIndex;
        if (childType === 'right') {
            return _t + 2;
        }
        return _t + 1;
    };

    const curryGetChild = curry(getChild);

    const getCurParentChildIndex = (child) => {
        // 由于 parentIndex 是函数内的全局变量。因此这里可以使用，并且都是最新的数值。
        return curryGetChild(parentIndex)(child);
    };

    let childIndex = getCurParentChildIndex();

    // debugger;
    while (childIndex < length) {
        // 如果存在右孩子节点，并且，右孩子节点值大于左孩子，则下沉的定位定到右孩子。
        if (childIndex + 1 < length && arr[childIndex + 1] > arr[childIndex]) {
            childIndex = getCurParentChildIndex('right');
        }

        if (temp >= arr[childIndex]) {
            break;
        }

        arr[parentIndex] = arr[childIndex];
        parentIndex = childIndex;
        childIndex = getCurParentChildIndex();
    }

    arr[parentIndex] = temp;
}

function heapSort(arr = [1, 3, 2, 6, 5, 7, 8, 9, 10, 0]) {
    const stepData = [];
    // 1. 把无序数组构建成最大堆
    for (let i = arr.length >> 1; i >= 0; i--) {
        downAdjust(arr, i, arr.length - 1);
    }

    stepData.push({
        data: [].concat(arr),
        msg: `构建的最大堆：${arr}`,
    });

    // 2. 循环删除堆顶元素，移到集合尾部，调整堆产生新的堆顶，最终得到最小堆
    for (let i = arr.length - 1; i > 0; i--) {
        // 最后一个元素和第一个元素交换
        let temp = arr[i];
        arr[i] = arr[0];
        arr[0] = temp;
        // 下沉调整最大堆
        // 注意，这里的 downAjust 函数的第三个参数，length 是 i，
        // 也就是说，这里将上面生成的最大堆，堆顶的元素放到数据最后一个，然后在 0 到 n-1 个元素中，再调整堆，让其中的最大值到堆顶。
        downAdjust(arr, 0, i);

        stepData.push({
            data: [].concat(arr),
            msg: `将堆顶最大值${arr[i]}放到最后一个，待调整的堆变成从 0 到 ${i - 1}。`,
        });
    }

    console.log({ arr: arr.toString() });
    return stepData;
}

// heapSort();

export default heapSort;
