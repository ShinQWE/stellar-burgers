import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
  moveDownConstructorItem,
  moveUpConstructorItem,
  removeConstructorItem
} from '@slices';

/**
 * Компонент BurgerConstructorElement отвечает за отображение элемента конструктора бургера,
 * а также управление его перемещением и удалением.
 *
 * @param {BurgerConstructorElementProps} ingredient - Ингредиент бургера.
 * @param {number} index - Индекс элемента в списке.
 * @param {number} totalItems - Общее количество элементов в конструкторе.
 *
 * @returns {JSX.Element} Компонент BurgerConstructorElementUI с переданными свойствами.
 */
export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    // Получаем функцию dispatch для отправки действий в Redux
    const dispatch = useDispatch();

    // Обработчик перемещения элемента вниз
    const handleMoveDown = () => {
      dispatch(moveDownConstructorItem(ingredient));
    };

    // Обработчик перемещения элемента вверх
    const handleMoveUp = () => {
      dispatch(moveUpConstructorItem(ingredient));
    };

    // Обработчик удаления элемента из конструктора
    const handleClose = () => {
      dispatch(removeConstructorItem(index));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
