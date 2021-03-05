import Vector2d from '../lib/vector2d.js';

export { Lexer } from './lexer.js';
export { Parser } from './parser.js';

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
