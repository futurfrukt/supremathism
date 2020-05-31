import React from 'react';
import './index.css';
import Scene from '../Scene';
import { noop } from '../../utils';

export const IS_FULLSCREEN_AVAILABLE = Boolean(document.exitFullscreen && document.documentElement && document.documentElement.requestFullscreen);

const toggleFullscreen = IS_FULLSCREEN_AVAILABLE ? () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
} : noop;

const App = () => {
  return (<div className={'app'} onDoubleClick={toggleFullscreen}>
    <div className={'scene'}>
      <Scene />
    </div>
  </div>)
};

export default App;
