import { FC, useMemo, useState } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  getConstructorItemsSelector,
  getOrderRequestSelector,
  getOrderResponseSelector,
  getUserDataSelector,
  orderBurger,
  resetConstructorItems,
  resetOrderResponse
} from '@slices';
import { useNavigate } from 'react-router-dom';
import { useResize } from '../hooks/useHooks';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const screenSize = useResize();

  const [isOpen, setIsOpen] = useState(false);

  const user = useSelector(getUserDataSelector);
  const constructorItems = useSelector(getConstructorItemsSelector);
  const orderRequest = useSelector(getOrderRequestSelector);
  const orderModalData = useSelector(getOrderResponseSelector);

  const onOrderClick = () => {
    if (screenSize > 1260 || isOpen) {
      if (!user) {
        navigate('/login');
        return;
      }
      dispatch(orderBurger(constructorItems));
      dispatch(resetConstructorItems());
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const onCloseClick = () => {
    setIsOpen(false);
  };

  const closeOrderModal = () => {
    dispatch(resetOrderResponse());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      (constructorItems.ingredients.length > 0
        ? constructorItems.ingredients?.reduce(
            (accum, currentValue) => accum + currentValue.price,
            0
          )
        : 0),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      isOrderOpen={isOpen}
      onCloseClick={onCloseClick}
    />
  );
};
