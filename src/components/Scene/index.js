import React, { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import './index.css';
import range from 'lodash.range';
import { emptyStyles, randStyles } from './styles';
import Planet from './Planet';
import { rand } from '../../utils';
import { ReactComponent as IconLike } from '../../static/icons/heart.svg';

const PLANETS_COUNT = 11;
const PLANETS_INDEX = range(0, PLANETS_COUNT);

const PLANETS_VISIBLE_MIN = 2;
const PLANETS_VISIBLE_MAX = 6;

const SCENES_MAX = 100;

const randScene = () => {
  const visibleCount = rand(PLANETS_VISIBLE_MIN, PLANETS_VISIBLE_MAX);
  const planets = PLANETS_INDEX.map((index) => index < visibleCount ? randStyles() : emptyStyles());
  console.log('generate scene', { visibleCount, planets });
  return planets;
};
const INITIAL_SCENE = randScene();

const Scene = () => {
  const [scenes, setScenes] = useState([INITIAL_SCENE]);
  const [sceneIndex, setSceneIndex] = useState(0);

  const nextScene = useCallback(() => {
    if (scenes[sceneIndex + 1] === undefined) {
      setScenes([ ...scenes, randScene()].slice(-SCENES_MAX));
    }
    setSceneIndex(Math.min(SCENES_MAX - 1, sceneIndex + 1));
  }, [sceneIndex, setSceneIndex, scenes, setScenes]);

  const prevScene = useCallback(() => {
    setSceneIndex(Math.max(0, sceneIndex - 1));
  }, [sceneIndex, setSceneIndex, scenes.length]);

  const onLike = useCallback(() => nextScene(), [nextScene]);

  const planets = scenes[sceneIndex];
  return <div className={'scene'}>
    <div className={'frame'}>
      {planets.map((planet, index) => <Planet key={index} id={index} styles={planet} />)}
    </div>
    <div className={'actions'}>
      <button onClick={prevScene} disabled={sceneIndex === 0}>&larr; prev</button>
      <button onClick={onLike}><IconLike /></button>
      <button onClick={nextScene}>next &rarr;</button>
    </div>
  </div>
}


export default Scene;