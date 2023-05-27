import { PropsWithChildren } from 'react';
import { DefaultLayoutProps } from "./default-layout.model";
import styles from './default-layout.module.scss';
import Header from './header/header';

export function DefaultLayout(props: PropsWithChildren<{ layoutProps: DefaultLayoutProps }>) {
  return (
    <div className={styles['container']}>
      <Header {...props.layoutProps}></Header>
      <div className={styles['main-content']}>{props.children}</div>
    </div>
  );
}

export default DefaultLayout;
