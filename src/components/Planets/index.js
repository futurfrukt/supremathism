import React, { Fragment, useEffect, useState } from 'react';
import './index.css';
import { rand } from '../Ship';
import range from 'lodash.range';
import Planet from '../Planet';

const MAX_PLANETS_COUNT = 20;

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const Planets = () => {
  const [planetsCount, setPlanetsCount] = useState(0);

  useEffect(() => {
    if (planetsCount < MAX_PLANETS_COUNT) {
      const delay = planetsCount < 5 ? 0 : rand(100, 2000);
      console.log('add planet', planetsCount, `${delay}ms`);
      sleep(delay).then(() => setPlanetsCount(planetsCount + 1));
    }
    return () => {};
  }, [planetsCount, setPlanetsCount])

  return <Fragment>
    {range(0, planetsCount).map((i) => <Planet key={i} id={i} />)}
  </Fragment>
};

export default Planets;
