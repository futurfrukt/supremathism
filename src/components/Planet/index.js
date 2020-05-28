import { rand } from '../Ship';
import React, { useCallback, useEffect, useState } from 'react';
import cls from 'classnames';
import './index.css';

const MIN_SIZE = 80;
const MAX_SIZE = 200;

const randBool = () => Boolean(rand(0, 2));

const randCol = ({ opacity = (rand(1, 11) / 10) } = {}) => `rgba(${rand(100, 256)}, ${rand(100, 256)}, ${rand(100, 256)}, ${opacity})`;

const FIGURES = {
  CIRCLE: 0,
  RECTANGLE: 1,
  TRIANGLE: 2,
}

const figureStyles = {
  [FIGURES.CIRCLE]: ({ size }) => ([{
    borderRadius: '50%',
  }, {
    height: size,
    width: size,
    borderRadius: '50%',
  }]),
  [FIGURES.RECTANGLE]: ({ size }) => ([{}, {
    height: size + rand(-size*0.95, size*0.95),
    width: size,
  }]),
  [FIGURES.TRIANGLE]: ({ size }) => ([{}, {}]),
}

const FILLS = {
  FLAT: 0,
  GRADIENT: 0,
  NEON: 1,
  GLOW: 2,
}

const fillStyles = {
  [FILLS.FLAT]: () => ([{
    backgroundColor: randCol(),
  }]),
  [FILLS.GRADIENT]: () => ([{
    backgroundImage: `linear-gradient(${rand(0, 360)}deg, ${randCol()}, ${randCol()})`,
  }]),
  [FILLS.NEON]: () => {
    const col = randCol();
    const width = rand(1, 4);
    const boxShadow = `0 0 ${width * 2 + 10}px 0 ${col}`;
    return [{
      border: `${width}px solid ${col}`,
      boxShadow: `inset ${boxShadow}`,
      background: 'transparent',
    }, {
      boxShadow,
    }];
  },
  [FILLS.GLOW]: () => ([{
    backgroundColor: randCol(),
  }]),
};

const randStyles = ({ outer: prevOuter = {} } = {}) => {
  const figure = rand(0, 2);
  const fill = rand(0, 3);
  const size = rand(MIN_SIZE, MAX_SIZE + 1);
  const animationName = prevOuter.animationName === undefined
    ? randBool() && 'flow-rotate-right' || 'flow-rotate-left'
    : prevOuter.animationName === 'flow-rotate-right'
      ? 'flow-rotate-left'
      : 'flow-rotate-right';
  const [innerFill = {}, outerFill = {}] = fillStyles[fill]({ size });
  const [innerFigure = {}, outerFigure = {}] = figureStyles[figure]({ size });
  return {
    inner: {
      ...innerFigure,
      ...innerFill,
    },
    outer: {
      top: `-${size}px`,
      left: `calc(${rand(0, 100)}% - ${size / 2}px)`,
      animationName,
      animationDuration: `${size * 0.1 + rand(1, 15)}s`,
      ...outerFigure,
      ...outerFill,
    },
  }
}

const updateStyles = (styles = {}) => {
  const { inner, outer } = randStyles();
  return {
    inner,
    outer: {
      ...outer,
      top: styles.outer.top,
      left: styles.outer.left,
      animationName: styles.outer.animationName,
      animationDuration: styles.outer.animationDuration,
    },
  }
}

const Planet = ({ id }) => {
  const [styles, setStyles] = useState(randStyles());
  const [margins, setMargins] = useState({ marginLeft: 0, marginTop: 0 });
  const [startPosition, setStartPosition] = useState(undefined);

  const onOuterIteration = useCallback(() => {
    console.log('update planet', id);
    setStyles(randStyles(styles));
  }, [styles, setStyles]);

  const onClick = useCallback(({ nativeEvent } = {}) => {
    nativeEvent && nativeEvent.stopImmediatePropagation();
    console.log('update planet', id);
    setStyles(updateStyles(styles));
  }, [styles, setStyles]);

  const onMouseDown = useCallback(({ screenX, screenY }) => {
    setStartPosition({
      x: screenX - margins.marginLeft,
      y: screenY - margins.marginTop,
    });
  }, [setStartPosition, margins]);

  const onMouseUp = useCallback(() => {
    setStartPosition(undefined);
  }, [setStartPosition]);

  const onMouseMove = useCallback(({ screenX, screenY }) => {
    if (!startPosition) {
      return;
    }

    setMargins({
      marginLeft: screenX - startPosition.x,
      marginTop: screenY - startPosition.y,
    });
  }, [startPosition, setMargins]);

  useEffect(() => {
    document.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => {
      document.removeEventListener('mouseup', onMouseUp, { passive: true });
      document.removeEventListener('mousemove', onMouseMove, { passive: true });
    }
  }, [onMouseUp, onMouseMove]);

  return <div
    style={{...styles.outer, ...margins}}
    onAnimationIteration={onOuterIteration}
    // onClick={onClick}
    onMouseDown={onMouseDown}
    className={cls('planet', { 'planet_active': startPosition })}
  >
    <div style={styles.inner} className={'planet__inner'}>{ id }</div>
  </div>
}


export default Planet;
