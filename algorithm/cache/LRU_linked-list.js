class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

class NodeList {
    constructor(findRule) {
        this.head = new Node('head');
        this.rule = typeof findRule === 'string' ? findRule : '';
    }

    find(element) {
        let curNode = this.head;
        while (
            curNode.next !== null &&
            this._findRule(curNode.element) != this._findRule(element)
        ) {
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
    display() {
        let curNode = this.head;
        while (!(curNode.next === null)) {
            console.log(curNode.next.element);
            curNode = curNode.next;
        }
    }
    _findRule(element) {
        if (this.rule === null) return element;
        const rule = this.rule.split('.');
        let r = rule.reduce((cur, next) => {
            return cur[next];
        }, element);
        return r;
    }
}

let testNodeList = new NodeList();
testNodeList.insert({ id: 1 });
testNodeList.insert({ id: 2 }, { id: 1 });
testNodeList.insert({ id: 3 }, { id: 2 });
testNodeList.display();
