import { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import { sassTrue } from 'sass';
import { b } from 'vitest/dist/types-ad1c3f45';

interface PreloadedImageProps extends PropsWithChildren {
  src: string;
  alt: string;
  className?: string;
  title?: string;
}

interface ImageLoader {
  loadedImages: Record<string, Promise<boolean> | boolean>;
  load: (src: string) => Promise<boolean> | boolean;
}

const imagePreloader: ImageLoader = {
  loadedImages: {},
  load: (src: string) => {
    console.log('load', src);
    if (!imagePreloader.loadedImages[src]) {
      console.log('create promise', src);
      return (imagePreloader.loadedImages[src] = new Promise<boolean>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          console.log('resolve', src);
          imagePreloader.loadedImages[src] = true;
          resolve(true);
        };
      }));
    }
    return imagePreloader.loadedImages[src];
  },
};

export function PreloadedImage(props: PreloadedImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const load = imagePreloader.load(props.src);
    if(load instanceof Promise) {
      setImageLoaded(false);
      load.then((result) => setImageLoaded(result));
    } else {
      setImageLoaded(load);
    }
  }, [props]);

  if (!imageLoaded) {
    return null;
  }

  return <img title={props.title} alt={props.alt} src={props.src} className={props.className} />;
}
