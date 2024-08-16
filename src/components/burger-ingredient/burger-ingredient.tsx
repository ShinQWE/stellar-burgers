import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch } from '../../services/store';
import { addConstructorItem } from '@slices';

/**
 * Компонент BurgerIngredient отвечает за отображение ингредиента бургера
 * и добавление его в конструктор.
 *
 * @param {TBurgerIngredientProps} ingredient - Ингредиент бургера.
 * @param {number} count - Количество данного ингредиента.
 *
 * @returns {JSX.Element} Компонент BurgerIngredientUI с переданными свойствами.
 */
export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    // Получаем текущее местоположение из маршрутизатора
    const location = useLocation();
    // Получаем функцию dispatch для отправки действий в Redux
    const dispatch = useDispatch();

    // Обработчик добавления ингредиента в конструктор
    const handleAdd = () => {
      dispatch(addConstructorItem(ingredient));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
