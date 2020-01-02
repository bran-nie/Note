const data = [
    {
        "taskId": 265,
        "taskName": "test",
        "taskImage": "",
        "indicators": [
            {
                "indicatorId": 2509,
                "indicatorName": "班级评价",
                "weight": 1.1
            },
            {
                "indicatorId": 2278,
                "indicatorName": "非标准二年级一班-班级",
                "weight": 1.2
            },
            {
                "indicatorId": 2471,
                "indicatorName": "浮动改固定分数2",
                "weight": 1.3
            }
        ],
        "weight": 1
    },
    {
        "taskId": 244,
        "taskName": "全部管理员",
        "taskImage": "",
        "indicators": [
            {
                "indicatorId": 2463,
                "indicatorName": "测试评价班级",
                "weight": 1.4
            },
            {
                "indicatorId": 2463,
                "indicatorName": "测试评价班级",
                "weight": 1.5
            },
            {
                "indicatorId": 2470,
                "indicatorName": "浮动和固定指标内容",
                "weight": 1.6
            }
        ],
        "weight": 1
    }
]
// 输出字符串如下
// (班级评价*1.1+非标准二年级一班-班级*1.2+浮动改固定分数2*1.3)+(测试评价班级*1.4+测试评价班级*1.5+浮动和固定指标内容*1.6)

// author tzr
function dealData(data) {
    let result = ''
    data.forEach(element => {
        let str = element.indicators.reduce(function (pre, cur) {
            return pre ? pre + ('+' + cur.indicatorName + '*' + cur.weight) : (cur.indicatorName + '*' + cur.weight)
        }, '')
        result = result ? `${result}+(${str})`: `(${str})`
    });
    return result
}

function dealData(data) {
    data.reduce((p, n) => {
        let str = n.indicators.reduce(function (pre, cur) {
            return pre ? pre + ('+' + cur.indicatorName + '*' + cur.weight) : (cur.indicatorName + '*' + cur.weight)
        }, '')
        console.log('p', p)
        console.log('str', str)
        return p ? `${p}+(${str})`: `(${str})`
    }, '');
}

function dealData(data) {
    return data.reduce((p, n) => {
        let str = n.indicators.reduce(function (pre, cur) {
            return pre ? `${pre}+${cur.indicatorName}*${cur.weight}` : `${cur.indicatorName}*${cur.weight}`
        }, '')
        return p ? `${p}+(${str})`: `(${str})`
    }, '');
}

// npc
function handleData(data) {
    let result = ''
    data.forEach((a, a_i, arr1) => {
        result += '('
        a.indicators.forEach((b, b_i, arr2) => {
            result += `${b.indicatorName}*${b.weight}`
            result += b_i !== arr2.length - 1 ? '+' : ')'
        })
        result += a_i !== arr1.length - 1 ? '+' : ''
    })
    return result
}

function handleData(data) {
    let r = ''
    data.forEach(obj => {
        let s = ''
        obj.indicators.forEach(b => {
            s += s ? `+${b.indicatorName}*${b.weight}` : `${b.indicatorName}*${b.weight}`
        })
        r += r ? `+(${s})` : `(${s})`
    })
    return r
}


/*
    觉得比较好的点是:
    1. 合理使用 forEach 和 reduce
    2. 合理根据需求结果使用条件判断,
    3. 了解并加深对reduce的使用
    4. 精益求精
 */
