import bubbleSort from './bubbleSort/bubbleSort.js';
import quickSort from './quickSort/quickSort.js';
import selectSort from './selectSort/selectSort.js';
import heapSort from './heapSort/heapSort.js';

const { createApp } = Vue;

const App = {
    data() {
        return {
            sortFns: [bubbleSort, quickSort, selectSort, heapSort],
            sortId: 0,

            curSortIndex: 0,
            curSortData: '[1, 4, 7, 0, 2, 6, 5, 8, 10, 3, 9]',
            curSortRightData: [],
            curGenerator: null,
            curShowArr: [],
            curShowArrIndex: 0,
        };
    },
    computed: {
        sortFnsObj() {
            return this.sortFns.map((sort, i) => {
                return {
                    id: this.sortId++,
                    sortIndex: i,
                    label: sort.name,
                };
            });
        },
    },
    created() {
        // console.log(this.sortFnsObj);
    },
    methods: {
        runSortFn() {
            const { sortFns, curSortData, curSortIndex, generator, copyData } = this;
            try {
                // 将字符串形式的数组转成数组，并做校验
                const data = JSON.parse(curSortData);
                if (Array.isArray(data)) {
                    // 清空已有的排序过程的展示信息。
                    this.curShowArr = [];
                    this.curShowArrIndex = 0;

                    this.curShowArr.push({
                        data: [].concat(data),
                        msg: `数组长度：${data.length}`,
                    });
                    // 拿到所有步骤的数据。根据数据创建新的遍历器对象。
                    const stepData = sortFns[curSortIndex](data);
                    console.log(stepData);
                    this.curShowArr = this.curShowArr.concat(stepData);
                    this.curSortRightData = stepData[stepData.length - 1].data;
                    // this.curGenerator = generator(stepData);
                    // this.curGenerator.next();
                } else {
                    console.log('data error');
                }
            } catch (error) {
                console.log(error);
            }
        },
        sortPrevStep() {
            if (this.curShowArrIndex > 0) {
                this.curShowArrIndex--;
            }
        },
        sortNextStep() {
            if (this.curShowArrIndex < this.curShowArr.length - 1) {
                this.curShowArrIndex++;
            }

            // const { curGenerator, curShowArr, copyData } = this;
            // console.log(curGenerator);
            // if (curGenerator && !curGenerator.done) {
            //     let res = curGenerator.next().value;
            //     console.log(res);
            //     res && curShowArr.push(res.data);
            // }
        },
        *generator(data) {
            for (let v of data) {
                yield v;
            }
        },
        copyData(data) {
            return [].concat(data);
        },
    },
};

// 创建应用
const app = createApp(App);

// 使用 element-ui 插件
app.use(ElementPlus);

// 挂载应用
app.mount('#app');
