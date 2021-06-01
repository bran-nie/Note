/**
 * 计算两个时间之间的相差天数
 * @param {Date} date 距离 2021-05-21 的相差时间
 * @returns 相差天数
 */
function calculateDiffDay(date = new Date()) {
    const nowDate = new Date(date);
    const targetDate = new Date('2021-05-21');
    const milliSeconds = nowDate.getTime() - targetDate.getTime();
    const days = Math.floor(milliSeconds / (1000 * 60 * 60 * 24));

    return days;
}

/**
 * 返回起始时间未来某一天的日期
 * @param {number} day 以 date 为起始，随后的某天
 * @param {Date} date 起始时间，默认是当前
 * @returns string
 */
function calcFutureDateString(day, date = new Date()) {
    return new Date(new Date(date).getTime() + day * 1000 * 24 * 3600).toLocaleDateString();
}

/**
 * 距离下次刷新的天数
 * @param {number} cur 在周期中的某一天
 * @param {number[]} arr 在周期中出现的天数 数组
 * @param {number} cycle 周期天数
 * @returns number
 */
function getDiffDay(cur, arr, cycle) {
    for (let val of arr) {
        if (cur <= val) {
            return val - cur;
        }
    }
    return cycle - cur + arr[0];
}

/**
 * 从起始日期开始，下一次有英雄之书或者药水的时间日期。
 * @param {Date} date 起始日期开始
 */
function getNext(date = new Date()) {
    const STORE_REFERSH_CYCLE = 39; // 商店刷新周期
    const books = [6, 15, 20, 33]; // 英雄之书的刷新时间
    const potions = [5, 13, 20, 31, 38]; // 免费的训练药水的刷新时间

    // date 在周期中的那一天
    const cur = calculateDiffDay(date) % STORE_REFERSH_CYCLE;

    // 下一次书刷新的时间点
    const diffBookDay = getDiffDay(cur, books, STORE_REFERSH_CYCLE);
    const diffPotionDay = getDiffDay(cur, potions, STORE_REFERSH_CYCLE);

    console.clear();
    console.log(`一个周期是 ${STORE_REFERSH_CYCLE} 天，当前在周期中是第 ${cur} 天。`);
    console.log(`距离下一次英雄之书刷新还有 ${diffBookDay} 天，是 ${calcFutureDateString(diffBookDay, date)}\n\n`);
    console.log(`距离下一次训练药水刷新还有 ${diffPotionDay} 天，是 ${calcFutureDateString(diffPotionDay, date)}\n\n`);
}
getNext();
