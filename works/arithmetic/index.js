import { Lexer, Parser, evaluate } from './js/ast.js';
const App = {
    data() {
        return {
            name: '四则运算 - 字符串转公式',
            val: '',
            result: 0,
            lexer: new Lexer(),
            parser: new Parser(),
            tokens: [],
        };
    },
    created() {
        console.log('created');
    },
    methods: {
        computedResult() {
            console.log('computed');
            const { val, lexer, parser } = this;

            for (let c of val.split('')) {
                this.tokens = [...this.tokens, ...lexer.push(c)];
            }
            this.tokens = [...this.tokens, ...lexer.end()];

            console.log({ tokens: this.tokens });
            this.tokens.forEach((token) => {
                parser.push(token);
            });

            const ast = parser.end();

            console.log({ ast });

            const result = evaluate(ast);
            this.result = result;
        },
        clearVal() {
            this.tokens = [];
            this.val = '';
            this.result = 0;
            this.parser.clear();
            this.lexer.clear();
        },
    },
};

Vue.createApp(App).mount('#app');

// const lexer = new Lexer();

// let input = `1 + 2.3 + 3`;

// let tokens = [];

// for (let c of input.split('')) {
//     tokens = [...tokens, ...lexer.push(c)];
// }

// tokens = [...tokens, ...lexer.end()];
// console.log(tokens);
// let parser = new Parser();

// tokens.forEach((token) => {
//     parser.push(token);
// });

// const ast = parser.end();

// console.log({ ast });

// const result = evaluate(ast);
// console.log({ result });
