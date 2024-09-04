import { FC } from 'react';

import styles from './profile-orders.module.css';

import { ProfileOrdersUIProps } from './type';
import { ProfileMenu, OrdersList } from '@components';
import { Outlet } from 'react-router-dom';

export const ProfileOrdersUI: FC<ProfileOrdersUIProps> = ({ orders }) => (
  <div className={`${styles.main}`}>
    <div className={`mt-30 mr-15 ml-3 ${styles.menu}`}>
      <ProfileMenu />
    </div>
    <div className={styles.orders}>
      <h1 className={`${styles.title} text_type_main-large`}>
        История заказов
      </h1>
      <OrdersList orders={orders} />
    </div>
    <Outlet />
  </div>
);
