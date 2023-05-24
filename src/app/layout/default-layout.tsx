import { PropsWithChildren } from 'react';
import styles from './default-layout.module.scss';
import Header from './header/header';

export function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <div className={styles['container']}>
      <Header></Header>
      <div className={styles['main-content']}>{children}</div>
    </div>
  );
}

export default DefaultLayout;
