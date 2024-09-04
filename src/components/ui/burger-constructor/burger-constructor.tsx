import { FC } from 'react';
import {
  Button,
  CloseIcon,
  CurrencyIcon
} from '@zlden/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { BurgerConstructorUIProps } from './type';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorElement, Modal } from '@components';
import { Preloader, OrderDetailsUI, ConstructorElement } from '@ui';
import { useResize } from '../../hooks/useHooks';
import clsx from 'clsx';

export const BurgerConstructorUI: FC<BurgerConstructorUIProps> = ({
  constructorItems,
  orderRequest,
  price,
  orderModalData,
  onOrderClick,
  closeOrderModal,
  isOrderOpen,
  onCloseClick
}) => {
  const screenSize = useResize();
  const textButton =
    !isOrderOpen && screenSize < 1261 ? 'Смотреть заказ' : 'Оформить заказ';
  const disabledButton =
    !isOrderOpen && screenSize < 1261
      ? false
      : textButton === 'Оформить заказ' &&
          constructorItems.bun &&
          constructorItems.ingredients.length > 0
        ? false
        : true;

  return (
    <section className={styles.burger_constructor}>
      <div
        className={clsx(styles.content, {
          [styles.content_visible]: isOrderOpen && screenSize < 1330
        })}
      >
        <div className={styles.header}>
          <h1 className={`${styles.title} text text_type_main-large`}>Заказ</h1>
          <CloseIcon
            type='primary'
            className={styles.close_button}
            onClick={onCloseClick}
          />
        </div>
        {screenSize < 1261 &&
        !constructorItems.bun &&
        constructorItems.ingredients.length === 0 ? (
          <div className={styles.order_wrapper}>
            <p
              className={`text text_type_main-large mb-4 ${styles.order_text}`}
            >
              Пока тут пусто
            </p>
            <p className='text text_type_main-default mb-10'>
              Добавьте булочки и ингредиенты
            </p>
            <Button
              htmlType='button'
              type='primary'
              children='Перейти в конструктор'
              onClick={onCloseClick}
              extraClass={styles.button}
            />
          </div>
        ) : (
          <div className={styles.constructor_wrapper}>
            {constructorItems.bun ? (
              <div className={styles.element} data-cy='constructorItemBun'>
                <ConstructorElement
                  type='top'
                  isLocked
                  text={`${constructorItems.bun.name} (верх)`}
                  price={constructorItems.bun.price}
                  thumbnail={constructorItems.bun.image}
                  extraClass={styles.constructor_element}
                />
              </div>
            ) : (
              <div
                className={`${styles.noBuns} ${styles.noBunsTop} text text_type_main-default`}
                data-cy='constructorItemNoBun'
              >
                Выберите булки
              </div>
            )}
            <ul className={styles.elements}>
              {constructorItems.ingredients.length > 0 ? (
                constructorItems.ingredients.map(
                  (item: TConstructorIngredient, index: number) => (
                    <BurgerConstructorElement
                      ingredient={item}
                      index={index}
                      totalItems={constructorItems.ingredients.length}
                      key={item.id}
                    />
                  )
                )
              ) : (
                <div
                  className={`${styles.noBuns} text text_type_main-default`}
                  data-cy='constructorItemNoFillings'
                >
                  Выберите начинку
                </div>
              )}
            </ul>
            {constructorItems.bun ? (
              <div className={styles.element}>
                <ConstructorElement
                  type='bottom'
                  isLocked
                  text={`${constructorItems.bun.name} (низ)`}
                  price={constructorItems.bun.price}
                  thumbnail={constructorItems.bun.image}
                  extraClass={`${styles.constructor_element} ${styles.constructor_element_bottom}`}
                />
              </div>
            ) : (
              <div
                className={`${styles.noBuns} ${styles.noBunsBottom} text text_type_main-default`}
                data-cy='constructorItemNoBun'
              >
                Выберите булки
              </div>
            )}
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <div className={styles.total}>
          <div className={styles.cost}>
            <p className={`text ${styles.text} mr-2`}>{price}</p>
            <CurrencyIcon type='primary' />
          </div>
          <Button
            htmlType='button'
            type='primary'
            size='large'
            children={textButton}
            onClick={onOrderClick}
            disabled={disabledButton}
            data-cy='orderButton'
            extraClass={styles.button}
          />
        </div>
      </div>

      {orderRequest && (
        <Modal title={'Оформляем заказ...'} onClose={closeOrderModal}>
          <Preloader />
        </Modal>
      )}

      {orderModalData && (
        <Modal title='Заказ оформлен' onClose={closeOrderModal}>
          <OrderDetailsUI orderNumber={orderModalData.number} />
        </Modal>
      )}
    </section>
  );
};
