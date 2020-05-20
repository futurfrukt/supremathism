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

  const [zoom, setZoom] = useState('');
  const zoomIn = useCallback(() => {
    setZoom(zoom === 'out' ? '' : 'in');
  }, [zoom, setZoom]);
  const zoomOut = useCallback(() => {
    setZoom(zoom === 'in' ? '' : 'out');
  }, [zoom, setZoom]);

  const handleKeyDown = useCallback(({ code }) => {
    if (code === 'ArrowUp') {
      zoomIn();
    }
    if (code === 'ArrowDown') {
      zoomOut();
    }
  }, [zoomIn, zoomOut]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, { passive: true });
    return () => document.removeEventListener('keydown', handleKeyDown, { passive: true });
  }, [zoomIn, zoomOut]);

  return (<div className={cls("app", { 'paused': paused })}>
    <div className={cls('scene', {
      'scene_in': zoom === 'in',
      'scene_out': zoom === 'out',
    })}>
      <Sky/>
      <Ship/>
    </div>
  </div>)
};

export default App;
