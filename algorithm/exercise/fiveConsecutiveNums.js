// 题目
// 从扑克牌中随机抽5张牌，判断是不是一个顺子，即这5张牌是不是连续的。2～10为数字本身，A为1，J为11，Q为12，K为13，而大、小王为 0 ，可以看成任意数字。A 不能视为 14。
// 示例 1:
// 输入: [1,2,3,4,5]
// 输出: True

// 示例 2:
// 输入: [0,0,1,2,5]
// 输出: True

// 限制：
// 数组长度为 5
// 数组的数取值为 [0, 13] .

/**
 * 判断五张牌是否是顺子，大小王作为万能牌替换任意数，数字为0，
 *
 * 顺子规则：
 * 1. 连续，即每个数字之间等差1
 * 2. 2不能出现在顺子中，A只能是最后一张牌
 *
 * 思路：
 * 1. 检查是否为长度5的数组
 * 2. 如果含有2，直接返回结果
 * 3. 将数组中大小王（0）抽出来，对剩下的进行排序。
 * 4. 对A进行数值映射，1 -> 14。
 * 3. 因为扑克牌中可以 10 JQKA
 * @param {Number[]} arr
 * @param {Boolean} needDebugger
 */
const check = (arr, needDebugger) => {
    if (!Array.isArray(arr)) throw Error('not array');
    if (arr.length !== 5) throw Error('array not true length');
    if (arr.includes(2)) return false;

    const numArr = arr.filter((v) => v !== 0).sort((a, b) => a - b);
    const zeroCount = ARR_LEN - numArr.length;

    for (let i = 0; i < numArr.length - 1; i++) {
        const cur = numArr[i];
        const next = numArr[i + 1];
        const expectNext = cur + 1;
        if (needDebugger) {
            debugger;
        }
        if (expectNext !== next) {
            if (next > expectNext + zeroCount) {
                return false;
            } else if (next === expectNext + zeroCount) {
                zeroCount -= 1;
            }
        }
    }
    return true;
};

const checkNoRule = (arr, needDebuuger) => {
    const ARR_LEN = 5;
    if (!Array.isArray(arr)) throw Error('not array');
    if (arr.length !== ARR_LEN) throw Error('array not true length');

    const nextNum = (num) => {
        return num === 13 ? 1 : num + 1;
    };
    const numArr = arr.filter((v) => v !== 0);
    const zeroCount = ARR_LEN - numArr.length;

    const cardMap = new Map();
    numArr.forEach((v) => {
        cardMap.set(v, true);
    });
    console.log(cardMap);
    const numStart = (num, zc) => {
        for (let i = 0; i < ARR_LEN - 1; i++) {
            const next = nextNum(num);
            if (cardMap.has(next)) {
                num = next;
            } else if (zc > 0) {
                zc -= 1;
                num = next;
            } else {
                return false;
            }
        }
        return true;
    };

    const r = numArr.some((v) => {
        return numStart(v, zeroCount);
    });

    return r;
};

const checkNoRule_2 = (arr, needDebugger) => {
    const ARR_LEN = 5;
    const VALUE_LEN = 13;
    if (!Array.isArray(arr)) throw Error('not array');
    if (arr.length !== ARR_LEN) throw Error('array not true length');

    // cardMap是一个长度为13的数组，映射1-13，元素是Boolean值，true代表参数arr中有这个值，false则表示没有。默认是false，在参数arr中遍历赋值。
    const cardMap = Array(VALUE_LEN).fill(false);
    let zeroCount = 0; // 因为 0 是特殊数字即万能数字，可以替代任意一个数字，所以要知道其数量。
    arr.forEach((v) => (v === 0 ? zeroCount++ : (cardMap[v - 1] = true)));

    console.log({ cardMap });

    // 优化点，一次遍历找到起始下标，且阅读性更好。
    let falseCount = 0;
    let findTrue = false;
    let startIndex = 0;
    // cardMap.length + 1，环型操作，
    for (let n = 0; n < cardMap.length + 1; n++) {
        const i = n % cardMap.length; // 环形下标值 13 % 13 = 0， 下标12是最后一个元素。
        const v = cardMap[i];
        if (findTrue) {
            if (v) {
                startIndex = i;
                break;
            }
        } else {
            v ? (falseCount = 0) : falseCount++;
            falseCount > zeroCount && (findTrue = true);
        }
    }
    // 旧的方案在后面的注释中

    // 从起点开始检查，是否符合顺子规则，即从起点开始，cardMap的每个值都是true，不是的话用zeroCount替换。替换不了就说明检测失败。
    for (let i = 1; i < ARR_LEN; i++) {
        const cardMapIndex = (i + startIndex) % cardMap.length;
        const v = cardMap[cardMapIndex];
        if (!v && zeroCount > 0) {
            zeroCount -= 1;
        } else if (!v && zeroCount === 0) {
            return false;
        }
    }
    return true;
};

// 旧方案 寻找起始下标。
// let falseCount = 0;
// let falseIndex = 0;
// cardMap.some((v, i) => {
//     v ? (falseCount = 0) : falseCount++;
//     if (falseCount > zeroCount) {
//         falseIndex = i;
//         return true;
//     }
// });
// let startIndex = 0;
// for (let i = 0; i < cardMap.length; i++) {
//     const r = (i + falseIndex) % cardMap.length;
//     if (cardMap[r]) {
//         startIndex = r;
//         break;
//     }
// }
