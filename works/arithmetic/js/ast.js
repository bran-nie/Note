import Vector2d from '../lib/vector2d.js';
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

export const EOF = Symbol('eof');
// 词法分析，将字符串转化成token流
export class Lexer {
    constructor() {
        this.token = []; // 临时 token 字符存储
        this.tokens = []; // 生成的正式 token
        // state 默认是 start 状态，后面通过 push 函数实现状态迁移
        this.state = this.start;
        this.id = 0;
    }
    start(char) {
        // 数字
        if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(char)) {
            this.token.push(char);
            return this.inInt;
        }
        // .
        if (char === '.') {
            this.token.push(char);
            return this.inFloat;
        }
        // 符号
        if (['+', '-', '*', '/', '(', ')'].includes(char)) {
            this.emmitToken(TOKEN_TYPE.SIGN.type, char);
            return this.start;
        }
        // 结束符
        if (char === EOF) {
            this.emmitToken(TOKEN_TYPE.EOF.type, EOF);
            return this.start;
        }
        if (char === ' ') {
            return this.start;
        }
    }
    inInt(char) {
        if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(char)) {
            this.token.push(char);
            return this.inInt;
        } else if (char === '.') {
            this.token.push(char);
            return this.inFloat;
        } else {
            this.emmitToken(TOKEN_TYPE.NUMBER.type, this.token.join(''));
            this.token = [];
            return this.start(char); // put back char
        }
    }
    inFloat(char) {
        if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(char)) {
            this.token.push(char);
            return this.inFloat;
        } else if (char === '.') {
            throw new Error('不能出现`..`');
        } else {
            if (this.token.length === 1 && this.token[0] === '.')
                throw new Error('不能单独出现`.`');
            this.emmitToken(TOKEN_TYPE.NUMBER.type, this.token.join(''));
            this.token = [];
            return this.start(char); // put back char
        }
    }
    emmitToken(type, value) {
        this.tokens.push({
            type,
            value,
            id: this.id++,
        });
    }
    push(char) {
        // 每次执行 state 函数都会返回新的状态函数，实现状态迁移
        this.state = this.state(char);
        return this.check();
    }
    end() {
        this.state(EOF);
        return this.check();
    }
    check() {
        // 检测是否有 token 生成并返回。
        const _token = [...this.tokens];
        this.tokens = [];
        return _token;
    }
    clear() {
        this.token = [];
        this.tokens = [];
        this.state = this.start;
    }
}
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
        if (token.value === TOKEN_TYPE.LEFT_PAR.type) {
            // 1(
            // 1 + 1 (
            if (isFullNode(top)) throw new Error('not a function');
            // (
            return stackPush(GenerateNode(NODE_DATA.LEFT_PAR.type)());
        }
        if (token.value === TOKEN_TYPE.CLOSE_PAR.type) {
            // ()
            if (isNoChildrenNode(top)) throw new Error('Unexpected token )');
            // (1+)
            if (isNotFullNode(top)) throw new Error('Unexpected token )');
            return remove(NODE_DATA.LEFT_PAR.type); // 收拢 (
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
// 根据ast计算除表达式的值。
export function evaluate(node) {
    if (node === null) return null;
    if (node === undefined) return null;
    const { type, children } = node;

    if (type === 'NUMBER') return Number(children[0]);

    if (type === 'ROOT_END') return evaluate(children[0]);

    if (type === ')') return evaluate(children[0]);

    if (type === ']') {
        const notWall = children.filter((item) => item.type !== ',');
        const a = evaluate(notWall[0]);
        const b = evaluate(notWall[1]);
        const isNumA = typeof a === 'number';
        const isNumB = typeof b === 'number';
        if (isNumA && isNumB) {
            return new Vector2d(a, b);
        } else {
            throw new Error('只有两个数量才能生成向量');
        }
    }

    if (type === '+') {
        const a = evaluate(children[0]);
        const b = evaluate(children[1]);
        if (Vector2d.is(a) && Vector2d.is(b)) {
            return Vector2d.add(a, b);
        } else {
            return a + b;
        }
    }
    if (type === '-') {
        const a = evaluate(children[0]);
        const b = evaluate(children[1]);
        if (Vector2d.is(a) && Vector2d.is(b)) {
            return Vector2d.sub(a, b);
        } else {
            return a - b;
        }
    }

    if (type === '>' || type === '<') {
        const a = evaluate(children[0]);
        const b = evaluate(children[1]);
        const isVecA = Vector2d.is(a);
        const isVecB = Vector2d.is(b);
        const isNumA = typeof a === 'number';
        const isNumB = typeof b === 'number';
        if (isVecA && isNumB) {
            throw new Error('向量与数字不能比较');
        } else if (isVecB && isNumA) {
            throw new Error('向量与数字不能比较');
        } else if (isVecB && isVecA) {
            throw new Error('向量与向量不能比较');
        } else {
            if (type === '>') return a > b;
            if (type === '<') return a < b;
        }
    }

    if (type === '*' || type === '/') {
        const a = evaluate(children[0]);
        const b = evaluate(children[1]);
        const isVecA = Vector2d.is(a);
        const isVecB = Vector2d.is(b);
        const isNumA = typeof a === 'number';
        const isNumB = typeof b === 'number';
        if (isNumA && isNumB) {
            if (type === '*') return a * b;
            if (type === '/') return a / b;
        } else if (isVecA && isNumB) {
            if (type === '*') return Vector2d.scale(a, b);
            if (type === '/') return Vector2d.scale(a, 1 / b);
        } else if (isVecB && isNumA) {
            if (type === '*') return Vector2d.scale(b, a);
            if (type === '/') return Vector2d.scale(b, 1 / a);
        } else {
            throw new Error('两个向量不能相乘，请用@dot');
        }
    }

    if (type === 'NEGATE') {
        const a = evaluate(children[0]);
        if (Vector2d.is(a)) {
            return Vector2d.scale(a, -1);
        } else {
            return a * -1;
        }
    }

    if (type === '@dot') {
        const a = evaluate(children[0]);
        const b = evaluate(children[1]);
        const isVecA = Vector2d.is(a);
        const isVecB = Vector2d.is(b);
        if (isVecA && isVecB) {
            return Vector2d.dot(a, b);
        } else {
            throw new Error('只有向量和向量能点乘');
        }
    }

    if (type === '@rot') {
        const a = evaluate(children[0]);
        const b = evaluate(children[1]);
        const isVecA = Vector2d.is(a);
        const isVecB = Vector2d.is(b);
        const isNumA = typeof a === 'number';
        const isNumB = typeof b === 'number';
        if (isVecA && isNumB) {
            return Vector2d.rotate(a, b);
        } else if (isVecB && isNumA) {
            return Vector2d.rotate(b, a);
        } else {
            throw new Error('只有向量和数量能旋转');
        }
    }

    if (type === '@deg') {
        const a = evaluate(children[0]);
        const isNumA = typeof a === 'number';
        if (isNumA) {
            return (a / 180) * Math.PI;
        } else {
            throw new Error('非数字不能转换deg');
        }
    }

    if (type === '@len') {
        const a = evaluate(children[0]);
        const isVecA = Vector2d.is(a);
        if (isVecA) {
            return Vector2d.length(a);
        } else {
            throw new Error('非向量不能计算模');
        }
    }

    if (type === '@lens') {
        const a = evaluate(children[0]);
        const isVecA = Vector2d.is(a);
        if (isVecA) {
            return Vector2d.lengthSquared(a);
        } else {
            throw new Error('非向量不能计算模平方');
        }
    }
}
