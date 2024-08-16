import { FC, memo } from 'react';
import {
  CurrencyIcon,
  FormattedDate
} from '@zlden/react-developer-burger-ui-components';

import styles from './order-info.module.css';

import { OrderInfoUIProps } from './type';
import { OrderStatus } from '@components';

export const OrderInfoUI: FC<OrderInfoUIProps> = memo(({ orderInfo }) => (
  <div className={styles.wrap}>
    <h3 className={`text text_type_main-medium ${styles.header}`}>
      {orderInfo.name}
    </h3>
    <OrderStatus status={orderInfo.status} />
    <p className={`text text_type_main-medium ${styles.text}`}>Состав:</p>
    <ul className={styles.list}>
      {Object.values(orderInfo.ingredientsInfo).map((item, index) => (
        <li className={styles.item} key={index}>
          <div className={styles.product}>
            <div className={styles.img_wrap}>
              <div className={styles.border}>
                <img
                  className={styles.img}
                  src={item.image_mobile}
                  alt={item.name}
                />
              </div>
            </div>
            <span className={`text text_type_main-default ${styles.name}`}>
              {item.name}
            </span>
          </div>
          <div className={styles.cost}>
            <span
              className={`text text_type_digits-default ${styles.quantity}`}
            >
              {item.count} x {item.price}
            </span>
            <CurrencyIcon type={'primary'} />
          </div>
        </li>
      ))}
    </ul>
    <div className={styles.bottom}>
      <p className='text text_type_main-default text_color_inactive'>
        <FormattedDate date={orderInfo.date} />
      </p>
      <span className={`text text_type_digits-default pr-4 ${styles.total}`}>
        {orderInfo.total}
      </span>
      <CurrencyIcon type={'primary'} />
    </div>
  </div>
));
