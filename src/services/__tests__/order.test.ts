import { orderBurger, ordersReducer, resetOrderResponse } from '@slices';
import { TOrder } from '@utils-types';

describe('ТЕСТ ordersSlice', () => {
  const initialState = {
    error: null,
    orderResponse: {
      order: null
    },
    orderRequest: false
  };

  const testOrder: TOrder = {
    _id: 'order123',
    status: 'done',
    name: 'Test Burger',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    number: 12345,
    ingredients: ['ingredient1', 'ingredient2']
  };

  it('проверка статуса "pending" для orderBurger', () => {
    const requestAction = { type: orderBurger.pending.type };
    const state = ordersReducer(initialState, requestAction);
    expect(state).toEqual({
      ...initialState,
      orderRequest: true,
      error: null
    });
  });

  it('проверка статуса "fulfilled" для orderBurger', () => {
    const successAction = {
      type: orderBurger.fulfilled.type,
      payload: { order: testOrder }
    };
    const state = ordersReducer(initialState, successAction);
    expect(state).toEqual({
      ...initialState,
      orderRequest: false,
      orderResponse: { order: testOrder }
    });
  });

  it('проверка статуса "rejected" для orderBurger', () => {
    const error = { message: 'Ошибка заказа' };
    const failedAction = {
      type: orderBurger.rejected.type,
      error: error
    };
    const state = ordersReducer(initialState, failedAction);
    expect(state).toEqual({
      ...initialState,
      orderRequest: false,
      error: error.message
    });
  });

  it('сбросить ответ заказа', () => {
    const stateWithOrder = {
      ...initialState,
      orderResponse: { order: testOrder }
    };
    const newState = ordersReducer(stateWithOrder, resetOrderResponse());
    expect(newState.orderResponse.order).toBeNull();
  });
});
