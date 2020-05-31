import { rand, randCol } from '../../utils';

const MIN_SIZE = 5;
const MAX_SIZE = 40;

const FIGURES = {
  CIRCLE: 0,
  RECTANGLE: 1,
  TRIANGLE: 2,
}
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
    height: `${size + rand(-size*0.95, size*0.95)}%`,
    width: `${size}%`,
  }])
}

const FILLS = {
  FLAT: 0,
  GRADIENT: 1,
  NEON: 2,
  NEON_HOLE: 3,
  GLOW: 4,
}
const FILL_MAX = FILLS.GLOW;

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
  }
};

const randPosition = ({ size }) => `${rand(5, 95) - size/2}%`;

export const randStyles = () => {
  const figure = rand(0, FIGURE_MAX);
  const fill = rand(0, FILL_MAX);
  const size = rand(MIN_SIZE, MAX_SIZE);
  const [innerFill, outerFill] = randFillStyles[fill]({ size });
  const [innerFigure, outerFigure] = randFigureStyles[figure]({ size });

  const top = randPosition({ size });
  const left = randPosition({ size });
  const transform = `rotate(${rand(-90, 90)}deg)`;
  return {
    meta: {
      figure,
      fill,
      size,
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
      ...outerFigure,
      ...outerFill,
    },
  }
}

export const emptyStyles = () => ({
  meta: {},
  inner: {},
  outer: {
    top: randPosition({ size: 0 }),
    left: randPosition({ size: 0 }),
  },
});