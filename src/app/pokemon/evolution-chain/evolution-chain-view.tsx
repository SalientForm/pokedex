import { useEffect, useRef, useState } from 'react';
import styles from './evolution-chain-view.module.scss';
import PokemonThumb from './pokemon-thumb/pokemon-thumb';

/* eslint-disable-next-line */
export interface EvolutionChainProps {}

export function EvolutionChainView(props: EvolutionChainProps) {
  const canvas = useRef<HTMLCanvasElement>(null);
  let ctx: any;

  const refA = useRef<HTMLDivElement>(null);
  const refB = useRef<HTMLDivElement>(null);

  const [objectAPosition, setObjectAPosition] = useState();

  // use mutation observer

  const createConnector = () => {
    const connector = canvas.current;
    const target = refA.current;
    // Modify styles to position the component at the top left
    if (connector && target) {
      const targetRect = target.getBoundingClientRect();
      console.log('target offsetParent', target.offsetParent);
      console.log('target offsetTop', target.offsetTop);

      const top = `${target.offsetTop + targetRect.height / 2}px`;
      const left = `${target.offsetLeft + targetRect.width / 2}px`;

      console.log(`top`, top);
      console.log(`left`, left);

      connector.style.top = top;
      connector.style.left = left;
    }
  };

  useEffect(() => {
    setInterval(createConnector, 2000);
  }, [props]);

  // initialize the canvas context
  useEffect(() => {
    // dynamically assign the width and height to canvas
    const canvasEle: any = canvas?.current;
    if (!canvasEle) {
      return;
    }
    canvasEle.width = canvasEle.clientWidth + 10;
    canvasEle.height = canvasEle.clientHeight + 10;

    // get context of the canvas
    ctx = canvasEle.getContext('2d');
  }, []);

  useEffect(() => {
    drawLine({ xA: 50, yA: 0, xB: 100, yB: 100 });
  }, []);

  // draw a line
  const drawLine = (info: any, style: any = {}) => {
    const { xA, yA, xB, yB } = info;
    const { color = 'black', width = 1 } = style;

    // breakdown
    // a. determine 2 points
    // a. direction from a -> b (x, y, -x, -y)
    // b. point a, direction determines connector point
    //     a. (xA < xB) && (yA < yB) && ((xB - xA) > (yB - yB)) if d = x
    // c. stem a, length = (1/2 distance of direction) - (2 x connectorRadius)
    // d. connector
    //      1. point a is end of stem
    //      2. bezier a, (point a of direction) + radius
    //      3. bezier b, (bezier a)
    //      4. point b
    // e. stem b
    // f. point b

    // object a
    // object b

    const xControlOffset = xB;
    const yControlOffset = yB;

    ctx.beginPath();

    // 1. starting point
    ctx.moveTo(xA, yA);
    // 2. draw line
    ctx.bezierCurveTo(xA + xControlOffset, yA, xB - yControlOffset, yB, xB + xA, yB + yA);

    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
  };

  return (
    <div className={styles['container']}>
      <div className='absolute d-flex'>
        <div ref={refA} className={'m-5'}>
          <PokemonThumb></PokemonThumb>
        </div>
        <div ref={refB} className={'m-5'}>
          <PokemonThumb></PokemonThumb>
        </div>
      </div>
      <canvas className={styles['connector']} ref={canvas}></canvas>
    </div>
  );
}

export default EvolutionChainView;
