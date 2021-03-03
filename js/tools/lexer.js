// const EOF = Symbol('EOF');

const lexer = new Lexer();

let input = `1 + 2.3`;

let tokens = [];

for (let c of input.split('')) {
    tokens = [...tokens, ...lexer.push(c)];
}

tokens = [...tokens, ...lexer.end()];
