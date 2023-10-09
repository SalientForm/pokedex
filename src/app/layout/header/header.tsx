import { PropsWithChildren } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { DefaultLayoutProps, MenuItemConfig } from '../default-layout.model';
import styles from './header.module.scss';

export function Header(props: PropsWithChildren<DefaultLayoutProps>) {
  const { appTitle, menuItems, links } = props;
  const navigate = useNavigate();
  const onClickLink = (path: string) => {
    navigate(path);
  };

  return (
    <div className={styles['container']}>
      <div className={styles['options']}>
      <div className={`${styles['title']} flex-grow-1`}>{appTitle}</div>
      <div className={'flex-grow-1'}></div>
      {links?.map((mi: MenuItemConfig, index) => (
        <Button variant='dark' key={index} onClick={() => onClickLink(mi.config as string)}>
          {mi.label}
        </Button>
      ))}
      </div>
      <div className={styles['border']}></div>
    </div>
  );
}

export default Header;
