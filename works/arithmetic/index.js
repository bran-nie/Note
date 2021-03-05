import { Lexer, Parser, evaluate } from './js/ast.js';
import { createEchart } from './js/echarts.config.js';
const App = {
    data() {
        return {
            name: '四则运算 - 字符串转公式',
            val: '',
            isNotCompute: true,
            result: 0,
            lexer: new Lexer(),
            parser: new Parser(),
            tokens: [],
            myChart: null,
        };
    },
    created() {
        console.log('created');
    },
    mounted() {
        const echartDom = document.createElement('div');
        echartDom.style.minHeight = '400px';
        document.body.appendChild(echartDom);
        this.myChart = createEchart(echartDom);
    },
    methods: {
        handleClick() {
            this.isNotCompute ? this.computedResult() : this.clearVal();
        },
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

            console.log(JSON.stringify(ast));
            console.log(this.myChart);
            this.myChart &&
                this.myChart.setOption({
                    series: { data: [ast] },
                });

            const result = evaluate(ast);
            this.result = result;
            this.isNotCompute = false;
        },
        clearVal() {
            this.tokens = [];
            this.val = '';
            this.result = 0;
            this.parser.clear();
            this.lexer.clear();
            console.log(this.myChart);
            // this.myChart && this.myChart.clear();

            this.isNotCompute = true;
        },
    },
};

Vue.createApp(App).mount('#app');
