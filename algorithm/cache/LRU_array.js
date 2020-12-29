const mockData = (count) => {
    count = Number(count) || 20;
    return Array(count)
        .fill(null)
        .map((item, i) => {
            return {
                id: i,
                name: String.fromCharCode(i + 65),
            };
        });
};
const data = mockData(100);

class CacheLRU_v1 {
    constructor(len = 5) {
        this.LEN = len;
        this.cacheArr = [];
    }

    getCacheData(id) {
        const i = this.cacheArr.findIndex((item) => item.id === id);
        if (i > -1) {
            // 将元素提升至第一个
            const item = this.cacheArr[i];
            this.cacheArr.splice(i, 1);
            this.cacheArr.unshift(item);
            return item;
        }
        return false;
    }

    setCacheData(item) {
        if (this.cacheArr.length === this.LEN) {
            this.cacheArr.pop();
        }
        this.cacheArr.unshift(item);
    }
}

class CacheLRU_v2 {
    constructor(len = 5) {
        this.LEN = len;
        this.cacheArr = Array(len).fill(null);
    }

    getCacheData(id) {
        const i = this.cacheArr.findIndex((item) => item?.id === id);
        if (i > -1) {
            this.replaceToTop(i);
            return this.cacheArr[0];
        }
        return false;
    }

    setCacheData(item) {
        const nullItemIndex = this.cacheArr.findIndex((i) => i === null);
        const i = nullItemIndex > -1 ? nullItemIndex : this.LEN - 1;
        this.replaceToTop(i);
        this.cacheArr[0] = item;
    }

    /**
     * 置换缓存数组中的元素顺序
     * @param {number} i 将下标值为i的元素，置换到最前面。
     */
    replaceToTop(i) {
        const { cacheArr } = this;
        while (i > 0) {
            [cacheArr[i], cacheArr[i - 1]] = [cacheArr[i - 1], cacheArr[i]];
            i--;
        }
    }
}

function foo() {
    const dataCache = new CacheLRU_v2(5);
    const findData = (id) => {
        console.log('查询');
        return new Promise((resolve) => {
            const timer = setTimeout(() => {
                const r = data[id];
                clearTimeout(timer);
                resolve(r);
            }, 1000 * Math.random());
        });
    };
    const getItemApi = async (id) => {
        const cache = dataCache.getCacheData(id);
        if (cache) {
            return cache;
        }
        console.log('没找到');
        const d = await findData(id);
        dataCache.setCacheData(d);
        console.log(d);
        return d;
    };
    const id = Math.floor(Math.random() * 100);
    getItemApi(id);
}

const getItemApiSync = (cacheObj, id) => {
    const cache = cacheObj.getCacheData(id);
    if (cache) {
        return cache;
    }
    // console.log('没找到，需要查询');
    const d = data[id];
    cacheObj.setCacheData(d);
    // console.log(d);
    return d;
};
const v1 = new CacheLRU_v1(10);
const v2 = new CacheLRU_v2(10);
function test(cacheObj, count) {
    console.time('test');
    for (let i = 0; i < count; i++) {
        const id = Math.floor(Math.random() * 100);
        getItemApiSync(cacheObj, id);
    }
    console.timeEnd('test');
    console.log(cacheObj.cacheArr.map((item) => item?.id));
}
