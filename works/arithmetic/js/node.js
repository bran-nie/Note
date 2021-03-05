import { NODE_DATA } from './type.js';
let id = 0;

const createId = () => {
    return `node-${id++}`;
};

export function GenerateNode(type) {
    return function (...children) {
        console.log(type, NODE_DATA[type]);
        return {
            id: createId(),
            type: NODE_DATA[type].type,
            name: NODE_DATA[type].name,
            children: children,
            maxChildren: NODE_DATA[type].maxChildren,
        };
    };
}

// const RootNode = GenerateNode('ROOT'); // 定义根节点
// const NegNode = GenerateNode('NEGATE', 1); // 定义负数节点
// const NumberNode = GenerateNode('NUMBER', 1); // 定义数字节点
// const AddNode = GenerateNode('+', 2); // 定义加号节点
// const SubNode = GenerateNode('-', 2); // 定义减号节点
// const MulNode = GenerateNode('*', 2); // 定义乘号节点
// const DivNode = GenerateNode('/', 2); // 定义除号节点
// const LeftParNode = GenerateNode('('); // 定义左括号节点
// const CloseParNode = GenerateNode(')'); // 定义右括号节点

// 判断node的children已经满了没
export function isFullNode(node) {
    if (isNoChildrenNode(node)) return false;
    return node && node.children && node.children.length >= node.maxChildren;
}

export function isNotFullNode(node) {
    if (isNoChildrenNode(node)) return false;
    return node && node.children && node.children.length < node.maxChildren;
}

export function isNoChildrenNode(node) {
    return node.maxChildren === 0;
}

// 操作符优先级-值
export const operatorValue = (() => {
    const operator = {};
    for (let key in NODE_DATA) {
        operator[NODE_DATA[key].type] = NODE_DATA[key].priority;
    }
    return operator;
})();
export const opposite = {
    '(': ')',
    ROOT: 'ROOT_END',
};

export function typeValue(node) {
    if (node === undefined) throw new Error('node is undefined');
    return operatorValue[node.type];
}
