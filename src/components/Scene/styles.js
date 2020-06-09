import { rand, randBool, randCol } from '../../utils';
import { nanoid } from 'nanoid';

const MIN_SIZE = 8;
const MAX_SIZE = 38;

const FIGURES = {
  CIRCLE: 0,
  RECTANGLE: 1,
  TRIANGLE: 2,
};
const FIGURE_MAX = FIGURES.RECTANGLE;

const randFigureStyles = {
  [FIGURES.CIRCLE]: ({ size }) => ([{
    borderRadius: '50%',
  }, {
    height: `${size}%`,
    width: `${size}%`,
    borderRadius: '50%',
  }]),
  [FIGURES.RECTANGLE]: ({ size }) => ([{}, {
    height: `${size + rand(-size * 0.95, size * 0.95)}%`,
    width: `${size}%`,
  }]),
};

const FILLS = {
  FLAT: 0,
  GRADIENT: 1,
  NEON: 2,
  NEON_HOLE: 3,
  GLOW: 4,
  GREY: 5,
};
const FILL_MAX = FILLS.GREY;

const randFillStyles = {
  [FILLS.FLAT]: ({ size }) => ([{
    backgroundColor: randCol(),
  }]),
  [FILLS.GRADIENT]: ({ size }) => ([{
    backgroundImage: `linear-gradient(${rand(0, 360)}deg, ${randCol()}, ${randCol()})`,
  }]),
  [FILLS.NEON]: ({ size }) => {
    const col = randCol();
    const width = rand(1, 3);
    const boxShadow = `0 0 ${width * 0.07}vh 0 ${col}`;
    return [{
      border: `${width * 0.05}vh solid ${col}`,
      boxShadow: `inset ${boxShadow}`,
      background: '#000000',
    }, {
      boxShadow,
    }];
  },
  [FILLS.NEON_HOLE]: ({ size }) => {
    const [inner, outer] = randFillStyles[FILLS.NEON]({ size });
    return [{
      ...inner,
      background: 'transparent',
    }, outer];
  },
  [FILLS.GLOW]: ({ size }) => {
    const backgroundColor = randCol();
    return [{
      filter: `brightness(${rand(120, 170)}%) blur(${size * 0.7}px)`,
      backgroundColor,
    }, {
      backgroundColor,
    }];
  },
  [FILLS.GREY]: ({ size }) => {
    const a = rand(2, 10) / 10;
    return [{
      backgroundColor: `rgba(255, 255, 255, ${a})`,
    }];
  },
};

const MOTIONS = {
  NONE: 0,
  ROTATE3D: 1,
};
const MOTION_MAX = MOTIONS.NONE;
const randMotionStyle = {
  [MOTIONS.NONE]: () => [],
  [MOTIONS.ROTATE3D]: ({ id }) => {
    const rotateX = randBool();
    const rotateY = !rotateX;
    const fixed = rand(-180, 180);
    const direction = randBool() ? 360 : -360;
    return [{
      id,
      from: `transform: rotateX(${rotateX ? 0 : fixed}deg) rotateY(${rotateY ? 0 : fixed}deg)`,
      to: `transform: rotateX(${rotateX ? direction : fixed}deg) rotateY(${rotateY ? direction : fixed}deg)`,
    }, `${id} ${rand(1, 16)}s linear infinite`];
  },
};

const randPosition = ({ size }) => `${rand(5, 95) - size / 2}%`;

export const randStyles = () => {
  const id = nanoid();
  const motion = rand(0, MOTION_MAX);
  const figure = rand(0, FIGURE_MAX);
  const fill = rand(0, FILL_MAX);
  const size = rand(MIN_SIZE, MAX_SIZE);
  const [innerFill, outerFill] = randFillStyles[fill]({ size });
  const [keyframes, animation] = randMotionStyle[motion]({ size, id });
  const [innerFigure, outerFigure] = randFigureStyles[figure]({ size });

  const top = randPosition({ size });
  const left = randPosition({ size });
  const transform = true
    ? `rotateX(${rand(-45, 45)}deg) rotateY(${rand(-45, 45)}deg)`
    : `rotate(${rand(-45, 45)}deg)`;
  return {
    keyframes,
    meta: {
      id,
      figure,
      fill,
      size,
      motion,
    },
    inner: {
      ...innerFigure,
      ...innerFill,
      width: '100%',
      height: '100%',
    },
    outer: {
      top,
      left,
      transform,
      animation,
      ...outerFigure,
      ...outerFill,
    },
  };
};

export const emptyStyles = () => ({
  meta: {},
  inner: {},
  outer: {
    top: randPosition({ size: 0 }),
    left: randPosition({ size: 0 }),
  },
});