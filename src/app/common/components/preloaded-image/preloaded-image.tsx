import { useCallback, useEffect, useRef, useState } from 'react';
import { b } from 'vitest/dist/types-ad1c3f45';
import styles from './preloaded-image.module.scss';

interface PreloadedImageProps {
  src: string;
  alt: string;
  title: string;
}

interface PreloadItem {
  src: string;
  success: boolean;
}

interface ImageLoader {
  loadedImages: Record<string, Promise<PreloadItem> | PreloadItem>;
  load: (src: string) => Promise<PreloadItem> | PreloadItem;
  isLoaded: (src: string) => boolean;
}

const imagePreloader: ImageLoader = {
  loadedImages: {},
  load: (src: string) => {
    if (!imagePreloader.loadedImages[src]) {
      return (imagePreloader.loadedImages[src] = new Promise<PreloadItem>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          const result = { src, success: true };
          imagePreloader.loadedImages[src] = result;
          resolve(result);
        };
      }));
    }
    return imagePreloader.loadedImages[src];
  },
  isLoaded: (src: string) => !!imagePreloader.loadedImages[src],
};

export function PreloadedImage(props: PreloadedImageProps) {
  const [currentIsLoaded, setCurrentIsLoaded] = useState(false);
  const currentImageProps= useRef<PreloadedImageProps>();
  const previousImageProps = useRef<PreloadedImageProps>();

  const listenToPromise = (result: Promise<PreloadItem>) => {
    setCurrentIsLoaded(false);
    result.then(({ src, success }) => {
      if (src === currentImageProps.current?.src) {
        setCurrentIsLoaded(success);
      }
    });
  };

  useEffect(() => {
    if (props.src !== currentImageProps.current?.src) {
      previousImageProps.current = currentImageProps.current;
      currentImageProps.current = props;
      const result = imagePreloader.load(props.src);
      if (result instanceof Promise) {
        listenToPromise(result);
      } else {
        setCurrentIsLoaded(result.success);
      }
    }
  }, [props]);

  const getClassNames = (image: PreloadedImageProps) => {
    if (image.src === currentImageProps.current?.src) {
      return `${styles['image']} ${styles['image-in']}`;
    }
    return `${styles['image']} ${styles['image-out']}`;
  };

  return (
    <div className={`${styles['container']}`}>
      {currentIsLoaded && currentImageProps.current ? (
        <img
          key={currentImageProps.current.src}
          className={getClassNames(currentImageProps.current)}
          title={currentImageProps.current.title}
          alt={currentImageProps.current.alt}
          src={currentImageProps.current.src}
        />
      ) : (
        ''
      )}
      {previousImageProps.current ? (
        <img
          key={previousImageProps.current.src}
          className={getClassNames(previousImageProps.current)}
          title={previousImageProps.current.title}
          alt={previousImageProps.current.alt}
          src={previousImageProps.current.src}
        />
      ) : (
        ''
      )}
    </div>
  );
}
