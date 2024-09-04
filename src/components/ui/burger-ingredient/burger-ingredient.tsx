import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import styles from './burger-ingredient.module.css';

import {
  Counter,
  CurrencyIcon,
  Button
} from '@zlden/react-developer-burger-ui-components';

import { TBurgerIngredientUIProps } from './type';

export const BurgerIngredientUI: FC<TBurgerIngredientUIProps> = memo(
  ({ ingredient, count, handleAdd, locationState }) => {
    const { image, price, name, _id } = ingredient;

    return (
      <li className={styles.container} data-cy={_id}>
        <Link
          className={styles.article}
          to={`/ingredients/${_id}`}
          state={locationState}
        >
          {count && <Counter count={count} />}
          <img className={styles.img} src={image} alt='картинка ингредиента.' />
          <p className={`text text_type_main-default ${styles.text}`}>{name}</p>
        </Link>
        <div className={styles.footer}>
          <div className={styles.cost}>
            <p className='text text_type_digits-default mr-2'>{price}</p>
            <CurrencyIcon type='primary' />
          </div>
          <Button
            type='secondary'
            htmlType='button'
            onClick={handleAdd}
            extraClass={`${styles.addButton}`}
          >
            Добавить
          </Button>
        </div>
      </li>
    );
  }
);
