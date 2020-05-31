import shuffle from 'lodash.shuffle';

export const rand = (min, max) => min + Math.floor(Math.random() * (max + 1 - min));

export const randCol = ({ opacity = (rand(5, 9) / 10) } = {}) => {
  const x = rand(0, 255);
  const y = rand(0, 255);
  const z = Math.min(255, 255 * 2 - x - y);
  return `rgba(${shuffle([x, y, z]).join(', ')}, ${opacity})`;
}

export const noop = () => undefined;