import {
    GenerateNode,
    operatorValue,
    opposite,
    isFullNode,
    isNotFullNode,
    isNoChildrenNode,
    typeValue,
} from './node.js';
import { TOKEN_TYPE, NODE_DATA } from './type.js';

// 语法分析，将token流转化成ast语法树。
export class Parser {
    constructor() {
        this.stack = [GenerateNode(NODE_DATA.ROOT.type)()];
        this.tempStack = [];
        this.ParNodeSize = 0;
    }
    async push(token) {
        const { stack, tempStack } = this;
        const top = stack[stack.length - 1];

        const rob = (type, children) => {
            console.log('rob');
            const child = children.pop();
            stack.push(GenerateNode(type)(child));
        };
        const retire = (type) => {
            console.log('retire');
            stack.push(GenerateNode(type)(stack.pop()));
        };
        const link = (type) => {
            console.log('link');
            const value = operatorValue[type];
            while (
                isFullNode(stack[stack.length - 1]) &&
                isNotFullNode(stack[stack.length - 2]) &&
                value <= typeValue(stack[stack.length - 1]) &&
                value <= typeValue(stack[stack.length - 2])
            ) {
                stack[stack.length - 2].children.push(stack.pop());
            }
        };
        const remove = (type) => {
            console.log('remove');
            link(type);
            //  找到最近的( 其余push到tempStack
            while (
                stack.length > 0 &&
                !(
                    stack[stack.length - 1].type === type &&
                    stack[stack.length - 1].maxChildren === 0
                )
            ) {
                tempStack.push(stack.pop());
            }
            // 修改最近的(
            const top = stack[stack.length - 1];
            if (top.type === type) {
                top.type = opposite[type]; // 取反 ( => )
                top.children = [];
                // tempStack的Node压给(
                while (tempStack.length > 0) {
                    top.children.push(tempStack.pop());
                }
                top.maxChildren = top.children.length; // maxChildren 设满
            }
        };

        const stackPush = (node) => {
            this.stack.push(node);
        };

        const topChildPush = (node) => {
            top.children.push(node);
        };

        if (token.value === TOKEN_TYPE.LEFT_PAR.type) {
            // 1(
            // 1 + 1 (
            if (isFullNode(top)) throw new Error('not a function');
            // (
            return stackPush(GenerateNode('(')());
        }
        if (token.value === TOKEN_TYPE.CLOSE_PAR.type) {
            // ()
            if (isNoChildrenNode(top)) throw new Error('Unexpected token )');
            // (1+)
            if (isNotFullNode(top)) throw new Error('Unexpected token )');
            return remove('('); // 收拢 (
        }
        if (token.type === TOKEN_TYPE.SIGN.type) {
            // 后置符号
            if (isFullNode(top)) {
                if (operatorValue[token.value] > operatorValue[top.type]) {
                    // 1 + 2 *
                    // console.log("rob");
                    return rob(token.value, top.children);
                } else {
                    //  1 +
                    //  1 + 2 +
                    link(token.value);
                    return retire(token.value);
                }
            }
            // 前置符号
            if (
                isNoChildrenNode(top) || // (-
                isNotFullNode(top) // 1 + -
            ) {
                if (token.value === '-')
                    return stackPush(GenerateNode(NODE_DATA.NEGATE.type)()); // 取负公用符号 -
                if (token.value === '+') return; // + 号静默
                throw new Error(token.value + '符号不能前置');
            }
        }
        if (token.type === TOKEN_TYPE.EOF.type) {
            // EOF
            return remove(NODE_DATA.ROOT.type);
        }
        if (token.type === TOKEN_TYPE.NUMBER.type) {
            //  1 1
            //  1 + 1 1
            if (isFullNode(top)) throw new Error('数字前一项不能是满项');
            const number = GenerateNode(token.type)(token.value);
            if (isNotFullNode(top)) {
                return topChildPush(number);
            } else {
                return stackPush(number);
            }
        }
    }

    clear() {
        this.stack = [GenerateNode(NODE_DATA.ROOT.type)()];
        this.tempStack = [];
        this.ParNodeSize = 0;
        this.VecNodeSize = 0;
    }
    end() {
        return this.stack[0];
    }
}
