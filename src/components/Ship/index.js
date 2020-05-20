import React, { useCallback, useMemo, useRef, useState } from 'react';
import './index.css';

export const rand = (min, max) => min + Math.floor(Math.random() * (max - min));

export const randScale = () => rand(5, 15) / 10;

export const randStyle = (rest) => ({
  transform: `scale3d(${randScale()}, ${randScale()}, 1) translate3d(${rand(-80, 80)}vw, ${rand(-80, 80)}vh, 0) rotate(${rand(-180, 180)}deg)`,
  animationName: 'none',
  ...rest
})

export const randStyles = () => ({
  cab: randStyle(),
  engine_left: randStyle(),
  engine_right: randStyle(),
  flame_right: randStyle(),
  wing: randStyle(),
});

const DELAY_RESTORE_MS = 1500;

const Ship = () => {
  const [styles, setStyles] = useState({});
  const timerId = useRef(null);

  const onClick = useCallback(({ nativeEvent } = {}) => {
    nativeEvent && nativeEvent.stopImmediatePropagation();
    clearTimeout(timerId.current);
    setStyles(randStyles());
    timerId.current = setTimeout(() => setStyles({}), DELAY_RESTORE_MS);
  }, [styles, setStyles]);


  return <div className="ship" onClick={onClick}>
    <div className={'ship__cab'} style={styles.cab} />
    <div className={'ship__engine ship__engine_left'} style={styles.engine_left} />
    <div className={'ship__engine ship__engine_right'} style={styles.engine_right}>
      <div className={'ship__flame ship__flame_right'} style={styles.flame_right} />
    </div>
    <div className={'ship__wing'} style={styles.wing}/>
  </div>;
};

export default Ship;
