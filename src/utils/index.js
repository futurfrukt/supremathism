export const rand = (min, max) => min + Math.floor(Math.random() * (max + 1 - min));

export const randCol = ({ opacity = (rand(5, 9) / 10) } = {}) => `rgba(${rand(0, 255)}, ${rand(0, 255)}, ${rand(0, 255)}, ${opacity})`;

export const noop = () => undefined;