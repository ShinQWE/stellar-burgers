import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  constructorItemsReducer,
  feedsReducer,
  ingredientsReducer,
  ordersReducer,
  userReducer
} from '@slices';

it('Тест корневого редьюсера', () => {
  // Объединяем все редьюсеры в один корневой редьюсер
  const rootReducer = combineReducers({
    ingredients: ingredientsReducer, // Редьюсер для ингредиентов
    constructorItems: constructorItemsReducer, // Редьюсер для элементов конструктора
    feeds: feedsReducer, // Редьюсер для ленты
    orders: ordersReducer, // Редьюсер для заказов
    user: userReducer // Редьюсер для пользователя
  });

  // Создаем хранилище с корневым редьюсером
  const store = configureStore({
    reducer: rootReducer
  });

  // Проверяем, что состояние хранилища соответствует начальному состоянию редьюсера
  expect(store.getState()).toEqual(
    rootReducer(undefined, { type: 'UNKNOWN_ACTION' }) // Ожидаем, что состояние будет равно начальному
  );
});
