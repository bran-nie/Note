function search(arr, v) {
    let left = 0,
        right = arr.length - 1;

    let searchCount = 0;
    const showCount = (count, v, index = -1) => {
        const msg =
            `在当前数组中共查询了 ${count} 次，` +
            (index === -1 ? `没有找到元素 ${v}。` : `元素 ${v} 的下标是：${index}`);
        console.log(msg);
    };
    while (left <= right) {
        searchCount++;
        mid = (left + right) >> 1;
        if (v === arr[mid]) {
            showCount(searchCount, v, mid);
            return mid;
        }
        // 如果在前半段
        else if (v < arr[mid]) {
            right = mid - 1;
        }
        // 如果在后半段
        else {
            left = mid + 1;
        }
    }
    showCount(searchCount, v);
    return -1;
}
