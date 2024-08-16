import { AppHeader } from '@components';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './main-layout.module.css';

export const MainLayout: FC = () => (
  <>
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  </>
);
