export function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * 判断数字是否相等
 * @param {number[]} arr1
 * @param {number[]} arr2
 */
export function checkEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}
