import { FC, memo } from 'react';

import styles from './feed.module.css';

import { FeedUIProps } from './type';
import { OrdersList, FeedInfo } from '@components';
import { RefreshButton } from '@zlden/react-developer-burger-ui-components';
import { Outlet } from 'react-router-dom';

export const FeedUI: FC<FeedUIProps> = memo(({ orders, handleGetFeeds }) => (
  <>
    <div className={styles.titleBox}>
      <div className={styles.title_content}>
        <h1 className={`${styles.title} text text_type_main-large`}>
          Лента заказов
        </h1>
        <RefreshButton
          text='Обновить'
          onClick={handleGetFeeds}
          extraClass={styles.refresh_button}
        />
      </div>
    </div>
    <div className={styles.main}>
      <div className={styles.columnOrders}>
        <OrdersList orders={orders} />
      </div>
      <div className={styles.columnInfo}>
        <FeedInfo />
      </div>
    </div>
    <Outlet />
  </>
));
