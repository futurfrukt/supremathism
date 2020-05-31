import React, { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import './index.css';
import range from 'lodash.range';
import { emptyStyles, randStyles } from './styles';
import Planet from './Planet';
import { rand } from '../../utils';

const PLANETS_COUNT = 11;
const PLANETS_INDEX = range(0, PLANETS_COUNT);

const PLANETS_VISIBLE_MIN = 2;
const PLANETS_VISIBLE_MAX = 6;

const Scene = () => {
  const [iteration, setIteration] = useState(0);
  const nextIteration = useCallback(() => setIteration(iteration + 1), [iteration, setIteration]);

  const onLike = useCallback(() => nextIteration(), [nextIteration]);
  const onDislike = useCallback(() => nextIteration(), [nextIteration]);

  const planets = useMemo(() => {
    const visibleCount = rand(PLANETS_VISIBLE_MIN, PLANETS_VISIBLE_MAX);
    const styles = PLANETS_INDEX.map((index) => index < visibleCount ? randStyles() : emptyStyles());
    console.log('generate planets', { iteration, visibleCount, styles });
    return styles;
  }, [iteration]);

  return <div className={'scene'}>
    <div className={'frame'}>
      {planets.map((planet, index) => <Planet key={index} id={index} styles={planet} />)}
    </div>
    <div className={'actions'}>
      <button onClick={onDislike}>- dislike</button>
      <button onClick={onLike}>like +</button>
    </div>
  </div>
}


export default Scene;