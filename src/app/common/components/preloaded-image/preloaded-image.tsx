import { useEffect, useState } from 'react';
import styles from './preloaded-image.module.scss';

interface PreloadedImageProps {
  src: string;
  alt: string;
  title: string;
}

interface ImageLoader {
  loadedImages: Record<string, Promise<boolean> | boolean>;
  load: (src: string) => Promise<boolean> | boolean;
  isLoaded: (src: string) => boolean;
}

const imagePreloader: ImageLoader = {
  loadedImages: {},
  load: (src: string) => {
    if (!imagePreloader.loadedImages[src]) {
      return (imagePreloader.loadedImages[src] = new Promise<boolean>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          imagePreloader.loadedImages[src] = true;
          resolve(true);
        };
      }));
    }
    return imagePreloader.loadedImages[src];
  },
  isLoaded: (src: string) => !!imagePreloader.loadedImages[src],
};

export function PreloadedImage(props: PreloadedImageProps) {
  const [current, setCurrent] = useState<PreloadedImageProps>(props);
  const [previous, setPrevious] = useState<PreloadedImageProps>();

  useEffect(() => {
    if (props.src !== current.src) {
      imagePreloader.load(props.src);
      setPrevious(current);
      setCurrent(props);
    }
  }, [props]);

  const getClassNames = (image: PreloadedImageProps) => {
    if (image.src === props.src) {
      return `${styles['image']} ${styles['image-in']}`;
    }
    return `${styles['image']} ${styles['image-out']}`;
  };

  return (
    <div className={`${styles['container']}`}>
      <img
        key={current.src}
        className={getClassNames(current)}
        title={current.title}
        alt={current.alt}
        src={current.src}
      />
      {previous ? (
        <img
          key={previous.src}
          className={getClassNames(previous)}
          title={previous.title}
          alt={previous.alt}
          src={previous.src}
        />
      ) : (
        ''
      )}
    </div>
  );
}
