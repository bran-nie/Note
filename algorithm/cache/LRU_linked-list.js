class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

class NodeList {
    constructor(findRule) {
        this.head = new Node(null);
        this.rule = typeof findRule === 'string' ? findRule : null;
    }

    find(element) {
        let curNode = this.head;
        let v1 = this._findRule(element);
        let v2 = this._findRule(curNode.element);
        console.log(v1, v2);
        while (curNode.next !== null && v2 != v1) {
            v2 = this._findRule(curNode.element);
            curNode = curNode.next;
        }
        return curNode;
    }
    insert(newElement, prevElement) {
        const newNode = new Node(newElement);
        const curNode = this.find(prevElement);
        newNode.next = curNode.next;
        curNode.next = newNode;
    }
    findPrev(element) {
        let curNode = this.head;
        while (
            curNode.next !== null &&
            this._findRule(curNode.next.element) != this._findRule(element)
        ) {
            curNode = curNode.next;
        }
        return curNode;
    }
    remove(element) {
        const prevNode = this.findPrev(element);
        if (prevNode.next !== null) {
            prevNode.next = prevNode.next.next;
        }
    }
    removeLast() {
        let curNode = this.head;
        while (curNode.next !== null) {
            curNode = curNode.next;
        }
        this.remove(curNode.element);
    }
    display() {
        let curNode = this.head;
        while (!(curNode.next === null)) {
            console.log(curNode.next.element);
            curNode = curNode.next;
        }
    }
    _findRule(element) {
        if (this.rule === null || element === undefined) return element;

        const rule = this.rule.split('.');
        let r = rule.reduce((cur, next) => {
            return cur[next];
        }, element);
        return r;
    }
}

// start
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

const getItemApi = (id) => {
    console.log('查询');
    return new Promise((resolve) => {
        const timer = setTimeout(() => {
            const r = data[id];
            clearTimeout(timer);
            resolve(r);
        }, 1000 * Math.random());
    });
};

/**
 * 初始化链表
 * @param {number} cacheLen 缓存数量
 */
function init(cacheLen) {
    const list = new NodeList('id');
    for (let i = 0; i < cacheLen; i++) {
        list.insert({ id: null });
    }
    return list;
}

const cacheList = init(5);

async function queryItemById(id) {
    let item = cacheList.find({ id });
    if (item) {
        console.log('找到了');
        const prevNode = cacheList.findPrev({ id });
        prevNode.next = item.next;
        cacheList.insert(item);
        return item;
    } else {
        const item = await getItemApi(id);
        cacheList.insert(item);
        const nullNode = cacheList.find({ id: null });
        if (nullNode) {
            cacheList.remove({ id: null });
        } else {
            cacheList.removeLast();
        }
        return item;
    }
}
