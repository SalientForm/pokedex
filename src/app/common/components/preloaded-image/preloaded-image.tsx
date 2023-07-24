import { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import styles from './preloaded-image.module.scss';
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

  // TODO: to manage multiple for animation track queue of PreloadedImageProps?

  useEffect(() => {
    const preloaded = imagePreloader.load(props.src);
    if (preloaded instanceof Promise) {
      setImageLoaded(false);
      preloaded.then((result) => {
        setImageLoaded(result);
      });
    } else {
      setImageLoaded(preloaded);
    }
  }, [props]);

  if (!imageLoaded) {
    return null;
  }

  // TODO: cookbook - how to destroy and rerender an, instead of just updated

  return (
    <img
      key={props.src}
      className={`${imageLoaded && styles['container']} ${props.className}`}
      title={props.title}
      alt={props.alt}
      src={props.src}
    />
  );
}
