import { WIDTH, HEIGHT, POINT } from './const.js';
import { checkEqual } from './utils.js';
import { drawText } from './draw.js';

/**
 * @type {function({snake:{x: number, y:number, cells: {x:number, y:number}[]}, isEat: boolean})}
 */
export function move(model) {
  const { snake, isEat } = model;
  // 身体添加一个节点
  snake.cells.unshift({ x: snake.x, y: snake.y });
  // 如没吃到食物，则身体最后移动
  if (!isEat) {
    // 移除身体最后一个
    snake.cells.pop();
  } else {
    model.score++;
    console.log(document.getElementById('score'));
    document.getElementById('score').innerHTML = model.score;
  }
  model.isEat = false;
  // 更新头部
  if (model.isBorderMode) {
    const x = snake.x + snake.offsetX;
    const y = snake.y + snake.offsetY;
    snake.x = x > WIDTH - POINT ? x - WIDTH : x < 0 ? WIDTH - x : x;
    snake.y = y > HEIGHT - POINT ? y - HEIGHT : y < 0 ? HEIGHT - y : y;
  } else {
    snake.x += snake.offsetX;
    snake.y += snake.offsetY;
  }
}
/**
 * @type {function({snake:{x: number, y:number}, food: {x: number, y:number}, isEat: boolean})}
 * 通过检测 snake 头和 food 的坐标是否全等
 */
export function eat(model) {
  const { snake, food } = model;
  if (checkEqual([snake.x, snake.y], [food.x, food.y])) {
    model.isEat = true;
    // 更新 food 位置
    food.x = food.newX;
    food.y = food.newY;
  }
}

function checkCollisionWithBorder({ snake, isBorderMode }) {
  if (isBorderMode) return false;
  return snake.x < 0 || snake.x > WIDTH || snake.y < 0 || snake.y > HEIGHT;
}
function checkCollisionWithSelf({ snake }) {
  const { x, y } = snake;
  return snake.cells.some((cell) => checkEqual([cell.x, cell.y], [x, y]));
}

export function checkGameOver(ctx, model) {
  // 边界情况
  if (checkCollisionWithBorder(model) || checkCollisionWithSelf(model)) {
    drawText(ctx, 'Game Over', 'red');
    return true;
  }
  return false;
}

export function checkGameWin(ctx, { snake }) {
  if (snake.cells.length > 100) {
    drawText(ctx, 'You Win', 'green');
    return true;
  }
  return false;
}

export function gamePause(ctx) {
  drawText(ctx, 'Pause', 'blue');
}
