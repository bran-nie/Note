import { TOKEN_TYPE } from './type.js';
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
            this.emmitToken(TOKEN_TYPE.EOF.type, 'EOF');
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
