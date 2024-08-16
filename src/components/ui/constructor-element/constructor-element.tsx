import { FC } from 'react';
import clsx from 'clsx';
import styles from './constructor-element.module.css';
import { TConstructorElement } from './type';
import {
  CurrencyIcon,
  DeleteIcon,
  LockIcon
} from '@zlden/react-developer-burger-ui-components';

export const ConstructorElement: FC<TConstructorElement> = ({
  type,
  text,
  thumbnail,
  price,
  isLocked,
  extraClass = '',
  handleClose
}) => {
  const className = clsx(
    styles.constructor_element,
    {
      [styles.constructor_element_pos_top]: type === 'top'
    },
    {
      [styles.constructor_element_pos_bottom]: type === 'bottom'
    },
    extraClass
  );

  const action = isLocked ? (
    <LockIcon type='secondary' />
  ) : (
    <DeleteIcon type='primary' onClick={handleClose} />
  );

  return (
    <div className={className}>
      <span className={styles.constructor_element__row}>
        <img
          className={styles.constructor_element__image}
          src={thumbnail}
          alt={text}
        />
        <span className={styles.constructor_element__text}>{text}</span>
        <span className={styles.constructor_element__price}>
          {price}
          <CurrencyIcon type='primary' />
        </span>
        <span className={styles.constructor_element__action}>{action}</span>
      </span>
    </div>
  );
};
