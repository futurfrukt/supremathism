import React, { useCallback, useEffect, useMemo, useState } from 'react';
import cls from 'classnames';
import './index.css';

const printKeyframes = (keyframes) => {
  if (!keyframes) {
    return '';
  }
  const { id, from, to } = keyframes;
  return `
    @keyframes ${id} {
      0% { ${from} }
      100% { ${to} }
    }
  `;
}

const Planet = ({ id, styles: { outer, inner, keyframes, meta } }) => {
  const [margins, setMargins] = useState({ marginLeft: 0, marginTop: 0 });
  const [startPosition, setStartPosition] = useState(undefined);

  const onMouseDown = useCallback(({ screenX, screenY, touches, button }) => {
    if (button !== undefined && button !== 0) {
      return;
    }
    if (touches !== undefined && touches.length !== 1) {
      return;
    }
    setStartPosition({
      x: screenX - margins.marginLeft,
      y: screenY - margins.marginTop,
    });
  }, [setStartPosition, margins]);

  const onMouseUp = useCallback(() => {
    setStartPosition(undefined);
  }, [setStartPosition]);

  const onMouseMove = useCallback(({ screenX, screenY }) => {
    if (!startPosition) {
      return;
    }

    setMargins({
      marginLeft: screenX - startPosition.x,
      marginTop: screenY - startPosition.y,
    });
  }, [startPosition, setMargins]);

  useEffect(() => {
    document.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => {
      document.removeEventListener('mouseup', onMouseUp, { passive: true });
      document.removeEventListener('mousemove', onMouseMove, { passive: true });
    };
  }, [onMouseUp, onMouseMove]);

  useEffect(() => {
    const style = document.createElement('style');
    document.head.insertAdjacentElement('beforeend', style);
    style.innerHTML = printKeyframes(keyframes);
    console.log('[[ keyframes', { keyframes, inner: style.innerHTML });
    return () => {
      document.head.removeChild(style);
    };
  }, [keyframes]);

  const outerStyle = useMemo(() => ({
    ...outer,
    ...margins,
  }), [outer, margins]);

  return <div
    data-meta={JSON.stringify(meta)}
    style={outerStyle}
    onMouseDown={onMouseDown}
    className={cls('planet', {
      'planet_active': startPosition,
    })}
  >
    <div style={inner} className={'planet__inner'}/>
  </div>;
};


export default Planet;
