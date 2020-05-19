import React, { useEffect } from 'react';
import './index.css';
import Ship from '../Ship';
import Sky from '../Sky';

export const IS_FULLSCREEN_AVAILABLE = Boolean(document.exitFullscreen && document.documentElement && document.documentElement.requestFullscreen);

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

const App = () => {
  useEffect(() => {
    document.addEventListener('dblclick', toggleFullscreen, { passive: true });
  }, [IS_FULLSCREEN_AVAILABLE]);

  return (<div className="app">
    <Sky/>
    <Ship/>
  </div>)
};

export default App;
