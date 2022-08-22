export const WIDTH = 500;
export const HEIGHT = 500;
export const POINT = 10;
export const DIRECTION = {
  up: 'up',
  right: 'right',
  down: 'down',
  left: 'left',
};
export const directions = {
  37: DIRECTION.left,
  38: DIRECTION.up,
  39: DIRECTION.right,
  40: DIRECTION.down,
};
export const offsetX = {
  [DIRECTION.left]: -POINT,
  [DIRECTION.right]: POINT,
};
export const offsetY = {
  [DIRECTION.up]: -POINT,
  [DIRECTION.down]: POINT,
};

export const reverse = {
  [DIRECTION.left]: DIRECTION.right,
  [DIRECTION.right]: DIRECTION.left,
  [DIRECTION.up]: DIRECTION.down,
  [DIRECTION.down]: DIRECTION.up,
};
