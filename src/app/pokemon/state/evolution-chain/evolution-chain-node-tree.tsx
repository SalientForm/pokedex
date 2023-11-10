import styles from './evolution-chain.module.scss';
import { useEffect, useRef } from 'react';

export function EvolutionChainNodeTree(props: any) {
  const canvas = useRef<HTMLCanvasElement>(null);
  let ctx:any;

  // initialize the canvas context
  useEffect(() => {
    // dynamically assign the width and height to canvas
    const canvasEle: any = canvas?.current;
    if(!canvasEle) {
      return;
    }
    canvasEle.width = canvasEle.clientWidth + 10;
    canvasEle.height = canvasEle.clientHeight + 10;

    // get context of the canvas
    ctx = canvasEle.getContext("2d");
  }, []);

  useEffect(() => {
    drawLine({ x: 20, y: 20, x1: 40, y1: 40 });

    // drawLine({ x: 50, y: 50, x1: 200, y1: 100 }, { color: 'red' });
    //
    // drawLine({ x: 300, y: 100, x1: 260, y1: 20 }, { color: 'green', width: 5 });
    //
    // drawLine({ x: 70, y: 240, x1: 160, y1: 120 }, { color: 'blue' });
  }, []);

  // draw a line
  const drawLine = (info: any, style: any = {}) => {
    const { x, y, x1, y1 } = info;
    const { color = 'black', width = 1 } = style;

    ctx.beginPath();
    // ctx.moveTo(x, y);
    // ctx.lineTo(x1, y1);
    ctx.moveTo(x, y);
    // ctx.bezierCurveTo(300, 50, 200, 400, x, y);
    ctx.bezierCurveTo(x+20, y, x1-20, y1, x1, y1);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
  }

  return (
    <div className={styles['container']}>
      <canvas ref={canvas}></canvas>
    </div>
  );
  
}

export default EvolutionChainNodeTree;
