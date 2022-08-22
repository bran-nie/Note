import { WIDTH, HEIGHT, POINT } from './const.js';

/**
 *
 * @param {CanvasRenderingContext2D } ctx
 * @param {string} text 文本
 * @param {string} color 颜色
 */
export function drawText(ctx, text, color) {
  ctx.font = '50px Arial';
  ctx.fillStyle = color;
  const t = ctx.measureText(text);
  ctx.fillText(text, (WIDTH - t.width) / 2, HEIGHT / 2);
}

export function drawGrid(ctx) {
  ctx.beginPath();
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.lineWidth = 1;
  for (let i = 0; i < WIDTH; i += POINT) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(WIDTH, i);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, HEIGHT);
    ctx.stroke();
  }
  ctx.closePath();
}

/**
 * @param {CanvasRenderingContext2D} ctx
 */
export function draw(ctx, model) {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  // 先画 snake 再画 food，避免 food 随机到 snake 身上而看不见 0.0
  drawSnake(ctx, model);
  drawFood(ctx, model);

  if (model.isNeedHelpLine) {
    drawGrid(ctx);
  }
}

/**
 * @param {CanvasRenderingContext2D} ctx
 */
function drawFood(ctx, model) {
  const { food } = model;
  ctx.fillStyle = 'red';
  food.x = food.x >= 0 ? food.x : food.newX;
  food.y = food.y >= 0 ? food.y : food.newY;
  ctx.fillRect(food.x, food.y, POINT, POINT);
}

/**
 * @param {CanvasRenderingContext2D} ctx
 */
function drawSnake(ctx, model) {
  const { snake } = model;
  ctx.fillStyle = 'green';
  ctx.fillRect(snake.x, snake.y, POINT, POINT);
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  for (let { x, y } of snake.cells) {
    ctx.fillRect(x, y, POINT, POINT);
  }
}
