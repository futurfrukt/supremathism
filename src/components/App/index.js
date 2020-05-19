import React, { useCallback, useEffect, useState } from 'react';
import './index.css';
import Ship from '../Ship';
import Sky from '../Sky';
import cls from "classnames";

export const IS_FULLSCREEN_AVAILABLE = Boolean(document.exitFullscreen && document.documentElement && document.documentElement.requestFullscreen);

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

const App = () => {
  const [paused, setPaused] = useState(false);

  const togglePaused = useCallback(() => {
    setPaused(!paused);
  }, [paused, setPaused]);

  useEffect(() => {
    document.addEventListener('click', togglePaused, { passive: true });
    return () => document.removeEventListener('click', togglePaused, { passive: true });
  }, [togglePaused]);

  useEffect(() => {
    document.addEventListener('dblclick', toggleFullscreen, { passive: true });
    return () => document.removeEventListener('click', toggleFullscreen, { passive: true });
  }, [IS_FULLSCREEN_AVAILABLE]);

  return (<div className={cls("app", { 'paused': paused })}>
    <Sky/>
    <Ship/>
  </div>)
};

export default App;
