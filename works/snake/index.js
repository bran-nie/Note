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
document.getElementById('snake').appendChild(canvas);

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
let model = {
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
  timer: 0,
  /** 穿墙模式 */
  isBorderMode: false,
};

function game() {
  canvas.focus();
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
    clearTimeout(model.timer);
    return;
  }
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
  model.timer = setTimeout(() => {
    clearTimeout(model.timer);
    game();
  }, 100 * (11 - speed));
}

/**
 * 处理 canvas 键盘监听事件
 * @param {KeyboardEvent} e
 */
function keyDown(e) {
  const key = e.keyCode;
  let direction = directions[key];
  console.log({ direction });
  if (direction) {
    if (direction === reverse[model.snake.direction]) {
      return;
    } else {
      model.snake.direction = direction;
    }
  } else {
    direction = model.snake.direction;
  }
  // 更新移动方向，即修改偏移量
  model.snake.offsetX = offsetX[direction] || 0;
  model.snake.offsetY = offsetY[direction] || 0;

  // enter 按键，切换暂停继续
  if (e.keyCode === 32) {
    model.isPause = !model.isPause;
    game();
  }
}
canvas.addEventListener('keydown', keyDown);

document.getElementById('mode').addEventListener('change', (e) => {
  model.isNeedHelpLine = e.target.checked;
});

function restart() {
  model.snake = {
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
  model = {
    ...model,
    /** snake 是否吃到食物 */
    isEat: false,
    /** 游戏暂停 */
    isPause: false,
    /** 得分 */
    score: 0,
    timer: 0,
  };
  clearInterval(model.timer);
  game();
}

function pause() {
  model.isPause = !model.isPause;
  game();
}
function speedUp(up) {
  const speed = document.getElementById('speed').value;
  if (up) {
    console.log({ speed });
    document.getElementById('speed').value = Math.min(10, Number(speed) + 1);
  } else {
    document.getElementById('speed').value = Math.max(0, Number(speed) - 1);
  }
}
function openLine(e) {
  model.isNeedHelpLine = !model.isNeedHelpLine;
  document.getElementById('mode').checked = model.isNeedHelpLine;

  const el = e.target;
  if (model.isNeedHelpLine) {
    el.classList.add('open');
  } else {
    el.classList.remove('open');
  }
}

function changeDirection(direction) {
  console.log({ direction });
  if (direction) {
    if (direction === reverse[model.snake.direction]) {
      return;
    } else {
      model.snake.direction = direction;
    }
  } else {
    direction = model.snake.direction;
  }
  // 更新移动方向，即修改偏移量
  model.snake.offsetX = offsetX[direction] || 0;
  model.snake.offsetY = offsetY[direction] || 0;
}
/**
 *
 * @param {MouseEvent} e
 */
function changeBorderMode(e) {
  const el = e.target;
  model.isBorderMode = !model.isBorderMode;
  if (model.isBorderMode) {
    el.classList.add('open');
  } else {
    el.classList.remove('open');
  }
}

window.restart = restart;
window.pause = pause;
window.speedUp = speedUp;
window.openLine = openLine;
window.changeDirection = changeDirection;
window.changeBorderMode = changeBorderMode;
