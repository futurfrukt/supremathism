import React, { useEffect, useMemo } from 'react';
import './index.css';

// export const getRandomInt = (max) => Math.floor(Math.random() * max);

// const STARS = [];
// for (let i = 0; i < 24; i++) {
//   const size = `${getRandomInt(5)}px`;
//   STARS.push(<div className={'sky__star'} style={{
//     top: `${getRandomInt(100)}%`,
//     left: `${getRandomInt(100)}%`,
//     width: size,
//     height: size,
//     animationDuration: `${2000 + getRandomInt(3000)}ms`
//   }}/>)
// }
//
// const Block = () => {
//   return <div className={'sky__block'}>{ STARS }</div>
// }

const Sky = () => (
  <div className="sky">
    <div className={'sky__inner'}>
      {/*<Block />*/}
      {/*<Block />*/}
    </div>
  </div>
);

export default Sky;
