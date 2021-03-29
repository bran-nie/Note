function buildHeap(data) {
    //
}

function upAdjust(arr) {
    let child;
}

function showHeap(data) {
    const len = data.length;
    /**
     * 获取给定节点数量的堆的高度。
     * - 二叉堆是一个完全二叉树，可以用顺序存储，也就是数组存储。
     * - 而完全二叉树用数组存储的时候，有这个特征。二叉树的高度为 n，则这棵树最多有 2^h - 1 个节点。
     * - 每一层的第一个下标值是：2 ^h-1 - 1;
     * - 每层的个数最多为，2 ^ h-1
     * @param {number} nodeCount 节点数量
     * @returns 堆的高度
     */
    const getHeapHeight = (nodeCount) => {
        let n = 0;
        while (Math.pow(2, n) - 1 < nodeCount) {
            n++;
        }
        console.log(`堆的高度是：${n}`);
        return n;
    };
    // len 是数组的长度，即是节点的数量。
    const heapHeight = getHeapHeight(len);

    const colLen = Math.pow(2, heapHeight - 1) * 2 - 1;

    let arr = Array(heapHeight)
        .fill(null)
        .map((item) => Array(colLen).fill(' '));

    arr[0][colLen >> 1] = data[0];
    let k = Math.pow(2, 3 - 1) - 1;
    arr[2].forEach((_, i, ar) => {
        if (i % 2 === 0) {
            ar[i] = data[k];
            k++;
        }
    });
    arr = arr.map((item) => (item = item.join(' ')));
    const s = arr.join('\n');
    console.log(s);
}
showHeap([1, 2, 3, 4, 5, 6, 7]);
