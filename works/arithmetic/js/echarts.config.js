export const defaultOption = {
    tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
    },
    series: [
        {
            type: 'tree',

            data: [],

            left: '2%',
            right: '2%',
            top: '8%',
            bottom: '20%',

            symbol: 'emptyCircle',

            orient: 'vertical',

            expandAndCollapse: false,
            initialTreeDepth: 5,

            label: {
                position: 'top',
                rotate: 0,
                verticalAlign: 'middle',
                align: 'right',
                fontSize: 16,
            },

            leaves: {
                label: {
                    position: 'bottom',
                    rotate: 0,
                    verticalAlign: 'middle',
                    align: 'left',
                },
            },

            animationDurationUpdate: 750,
        },
    ],
};

export const createEchart = (echartDom, option = {}) => {
    var myChart = echarts.init(echartDom);
    const _option = { ...defaultOption, ...option };

    myChart.setOption(_option);
    return myChart;
};
