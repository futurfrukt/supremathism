import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './index.css';
import { rand } from '../Ship';
import range from 'lodash.range';

const randCol = () => `rgba(${rand(0,256)}, ${rand(0,256)}, ${rand(0,256)}, ${rand(1, 10) / 10})`;

const CIRCLE = 0;
const SQUARE = 1;

const Planet = () => {
  const style = useMemo(() => {
    const figure = rand(0, 3);
    const size = rand(20, 100);
    return {
      left: `${rand(0, 100)}%`,
      top: `${rand(0, 100)}%`,
      width: size,
      height: figure === CIRCLE
        ? size
        : size + rand(-size*0.95, size*0.95),
      borderRadius: figure === CIRCLE
        ? '50%'
        : 'none',
      backgroundColor: randCol(),
      backgroundImage: rand(0, 2) ? `linear-gradient(${rand(0, 360)}deg, ${randCol()}, ${randCol()})` : undefined,
      animationDuration: `${size / 5 + rand(1, 15)}s`,
      animationName: rand(0, 2) ? 'flow-spin-left' : 'flow-spin-right',
    }
  }, []);
  return <div style={style} className={'sky__planet'} />
}

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const MAX_PLANETS_COUNT = 40;

const Sky = () => {
  const [planetsCount, setPlanetsCount] = useState(0);

  useEffect(() => {
    if (planetsCount <= MAX_PLANETS_COUNT) {
      console.log('add planet', planetsCount);
      sleep(rand(100, 2000))
        .then(() => setPlanetsCount(planetsCount + 1));
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
