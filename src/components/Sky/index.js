import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './index.css';
import { rand } from '../Ship';
import range from 'lodash.range';

const randCol = () => `rgba(${rand(0,256)}, ${rand(0,256)}, ${rand(0,256)}, ${rand(1, 10) / 10})`;

const CIRCLE = 0;
const SQUARE = 1;

const randStyle = () => {
  const figure = rand(0, 2);
  const size = rand(20, 100);
  return {
    borderWidth: `${figure}px`,
    left: `calc(${rand(0, 100)}% - ${size}px)`,
    top: `-${size}px`,
    height: size,
    width: figure === CIRCLE
      ? size
      : size + rand(-size*0.95, size*0.95),
    borderRadius: figure === CIRCLE
      ? '50%'
      : '0',
    backgroundColor: randCol(),
    backgroundImage: rand(0, 2) ? `linear-gradient(${rand(0, 360)}deg, ${randCol()}, ${randCol()})` : undefined,
    animationDuration: `${size / 5 + rand(1, 15)}s`,
    animationName: rand(0, 2) ? 'flow-spin-left' : 'flow-spin-right',
  }
};

const Planet = () => {
  const [style, setStyle] = useState(randStyle());
  const onIteration = useCallback(() => {
    console.log('update planet');
    // setStyle(randStyle());
  }, [style, setStyle]);

  return <div style={style} onAnimationIteration={onIteration} className={'sky__planet'} />
}

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const MAX_PLANETS_COUNT = 40;

const Sky = () => {
  const [planetsCount, setPlanetsCount] = useState(0);

  useEffect(() => {
    if (planetsCount < MAX_PLANETS_COUNT) {
      const delay = planetsCount < 5 ? 0 : rand(100, 2000);
      console.log('add planet', planetsCount, `${delay}ms`);
      sleep(delay).then(() => setPlanetsCount(planetsCount + 1));
    }
    return () => {};
  }, [planetsCount, setPlanetsCount])

  return <div className="sky">
    <div className={'sky__inner'}>
      {range(0, planetsCount).map((i) => <Planet key={i} />)}
    </div>
  </div>
};

export default Sky;
