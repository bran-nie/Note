/** 高阶函数 - 合成函数 */
const compose =
  (...fns) =>
  (val) =>
    fns.reduce((composed, fn) => fn(composed), val);
// 用于获取值和管理控制台的方法
const oneSecond = () => 1000;
const getCurTime = () => new Date();
const clear = () => console.clear();
const log = (msg) => console.log(msg);
/** 将 Date 转为 clockTime */
function serializeClockTime(date) {
  return {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    ampm: 'am',
  };
}
/** 处理小时，将 24 小时制转为 12 小时制 */
function civilianHours(clockTime) {
  return Object.assign(Object.assign({}, clockTime), {
    hours: clockTime.hours > 12 ? clockTime.hours - 12 : clockTime.hours,
  });
}
/** 添加 am pm 标识 */
function appendAMPM(clockTime) {
  return Object.assign(Object.assign({}, clockTime), {
    ampm: clockTime.hours >= 12 ? 'pm' : 'am',
  });
}
/** 格式化时钟数据 */
const formatClock =
  (format = 'hh:mm:ss tt') =>
  (time) =>
    format
      .replace('hh', `${time.hours}`)
      .replace('mm', `${time.minutes}`)
      .replace('ss', `${time.seconds}`)
      .replace('tt', `${time.ampm}`);
/** 将数据长度补齐，前置 0 */
const prependZero = (key) => (clockTime) =>
  Object.assign(Object.assign({}, clockTime), {
    [key]: `${clockTime[key]}`.padStart(2, '0'),
  });
/** 添加上下午标识，处理小时格式 */
const convertToCivilianTime = (clockTime) =>
  compose(appendAMPM, civilianHours)(clockTime);
/** 补零 */
const doubleDigitas = (civilianTime) =>
  compose(
    prependZero('hours'),
    prependZero('minutes'),
    prependZero('seconds')
  )(civilianTime);
/** 时钟程序主进程，返回值是停止时钟 */
function startTicking() {
  const timer = setInterval(
    compose(
      clear,
      getCurTime,
      serializeClockTime,
      convertToCivilianTime,
      doubleDigitas,
      formatClock(),
      log
    ),
    oneSecond()
  );
  return () => clearInterval(timer);
}
