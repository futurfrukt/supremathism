import React, { useCallback, useEffect, useState } from 'react';
import './index.css';
// import Ship from '../Ship';
import cls from "classnames";
import Planets from '../Planets';

// https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API/Using_Screen_Capture
// https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Taking_still_photos

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
      <div className={'sky'} onClick={togglePaused} />
      <Planets onClick={togglePaused} />
      {/*<Ship/>*/}
    </div>
  </div>)
};

export default App;
