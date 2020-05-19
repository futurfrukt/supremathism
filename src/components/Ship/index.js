import React, { useCallback, useMemo, useState } from 'react';
import './index.css';

export const getRandomInt = (min, max) => min + Math.floor(Math.random() * (max - min));

const Ship = () => {
  return <div className="ship">
    <div className={'ship__cab'}/>
    <div className={'ship__engine ship__engine_left'} />
    <div className={'ship__engine ship__engine_right'}>
      <div className={'ship__flame'} />
    </div>
    <div className={'ship__wing'}/>
  </div>;
};

export default Ship;
