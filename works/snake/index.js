/**
 * 1. 初始化项目，定义数据结构
 * 1.1   画布 500x500，节点块为 10x10，方向为上下左右，通过偏移量的计算来修改位置
 * 1.2   snake 结构为头位置，细胞数组，food 则是随机出现的节点块
 * 2. 使用 fillRect 画出 snake 和 food。
 * 3. 实现 snake move 功能：结合画布特性(每次全部清除)、snake 数据结构，选定通过修改细胞的信息来实现
 * 4. 实现 eat 功能：通过判断 snake 头和 food 的坐标上的全等，在 move 时不再移除最后一个节点
 * 5. 使用 canvas font 相关 API 实现文字提示
 * 6. 使用游戏内变量实现数据控制如：速度变化、暂停继续功能、辅助线功能
 * 7. 拆分代码块，使用 esmodule 模块化
 * 8. 添加重新开始功能、计分功能、
 * 9. 待添加功能：障碍物、等等
 */

import { WIDTH, HEIGHT, POINT, directions, offsetX, offsetY, DIRECTION, reverse } from './const.js';
import { random } from './utils.js';
import { draw } from './draw.js';
import { eat, move, checkGameOver, checkGameWin, gamePause } from './controller.js';

// 1. 初始化项目
// const canvas = document.getElementById('snake');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = WIDTH;
canvas.height = HEIGHT;
// 让元素聚焦，可以使用 keyup 等事件，后续还要将其 focus 才行。
canvas.tabIndex = -1;
document.body.appendChild(canvas);

// 2. 定义数据结构
const snake = {
  // 起始位置
  x: 10 * POINT,
  y: 10 * POINT,
  /** 初始方向 */
  direction: DIRECTION.right,
  /** 左：-10， 右：10，0 为上下 */
  offsetX: POINT,
  /** 上：-10， 下：10，0 为左右 */
  offsetY: 0,
  /** 身体的位置信息，初始化时候放了三个身体 */
  cells: [
    { x: 9 * POINT, y: 10 * POINT },
    { x: 8 * POINT, y: 10 * POINT },
    { x: 7 * POINT, y: 10 * POINT },
  ],
};
const food = {
  /** food 的 x 坐标 */
  x: -1,
  /** food 的 y 坐标 */
  y: -1,
  /** food 新的 x 坐标 */
  get newX() {
    return random(0, WIDTH / POINT - 1) * POINT;
  },
  /** food 新的 y 坐标 */
  get newY() {
    return random(0, HEIGHT / POINT - 1) * POINT;
  },
};
const model = {
  snake,
  food,
  /** snake 是否吃到食物 */
  isEat: false,
  /** 游戏暂停 */
  isPause: false,
  /** 辅助线 */
  isNeedHelpLine: false,
  /** 得分 */
  score: 0,
};

function game() {
  // 判定为游戏结束
  if (checkGameOver(ctx, model)) {
    return;
  }
  // 判定为游戏胜利
  if (checkGameWin(ctx, model)) {
    return;
  }
  // 暂停游戏
  if (model.isPause) {
    gamePause(ctx, model);
    return;
  }
  canvas.focus();
  eat(model);
  move(model);
  draw(ctx, model);
  let speed = document.getElementById('speed')?.value || 5;

  if (snake.cells.length < 20) {
    speed = Math.min(speed, 10);
  } else if (snake.cells.length < 20) {
    speed = Math.min(speed, 4);
  } else if (snake.cells.length < 30) {
    speed = Math.min(speed, 6);
  }
  const timer = setTimeout(() => {
    game();
    clearTimeout(timer);
  }, 100 * (11 - speed));
}

/**
 * 处理 canvas 键盘监听事件
 * @param {KeyboardEvent} e
 */
function keyDown(e) {
  const key = e.keyCode;
  const direction = directions[key];
  console.log({ direction });
  if (direction === reverse[model.snake.direction]) {
    return;
  } else {
    model.snake.direction = direction;
  }
  // 更新移动方向，即修改偏移量
  if (direction) {
    snake.offsetX = offsetX[direction] || 0;
    snake.offsetY = offsetY[direction] || 0;
  }
  // enter 按键，切换暂停继续
  if (e.keyCode === 32) {
    model.isPause = !model.isPause;
    game();
  }
}
canvas.addEventListener('keydown', keyDown);
canvas.focus();
document.getElementById('mode').addEventListener('change', (e) => {
  model.isNeedHelpLine = e.target.checked;
});

// 开始游戏
game();

function restart() {
  location.reload();
}
document.getElementById('restart').addEventListener('click', restart);
