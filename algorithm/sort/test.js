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

    let zeroCount = 0,
        numArr = [];
    arr.forEach((v) => {
        if (v === 0) {
            zeroCount += 1;
        } else {
            numArr.push(v === 1 ? 14 : v);
        }
    });
    numArr = numArr.sort((a, b) => a - b); // 先排序

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
    if (!Array.isArray(arr)) throw Error('not array');
    if (arr.length !== 5) throw Error('array not true length');

    const nextNum = (num) => {
        return num === 13 ? 1 : num + 1;
    };

    let zeroCount = 0,
        numArr = [];
    arr.forEach((v) => {
        if (v === 0) {
            zeroCount += 1;
        } else {
            numArr.push(v === 1 ? 14 : v);
        }
    });
    numArr = numArr.sort((a, b) => a - b); // 先排序

    // const result = numArr.reduce(
    //     (acc, cur) => {
    //         if (nextNum(acc.v) === cur) {
    //             acc.v = cur;
    //         } else {
    //             while (zeroArr.length > 0 || nextNum(acc.v) === cur) {
    //                 zeroArr.pop();
    //                 acc.v = nextNum(acc.v);
    //             }
    //             if (nextNum(acc.v) === cur) {
    //                 acc.v = cur;
    //             } else {
    //                 acc.r = false;
    //             }
    //         }
    //         return acc;
    //     },
    //     { v: numArr[0] - 1, r: true }
    // );

    // return result.r;
};
