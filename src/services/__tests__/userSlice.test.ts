import {
  loginUser,
  registerUser,
  getUser,
  updateUser,
  logoutUser,
  userReducer,
  resetErrorMessage,
  authChecked,
  userLogout
} from '@slices';
import { TUser } from '@utils-types';

describe('ТЕСТ userSlice', () => {
  const initialState = {
    isAuthChecked: false,
    userData: null,
    userOrders: [],
    error: null,
    isLoading: false
  };

  const testUser: TUser = {
    name: 'Test',
    email: 'test@test.com'
  };

  it('проверка статуса "pending" для loginUser', () => {
    const requestAction = { type: loginUser.pending.type };
    const state = userReducer(initialState, requestAction);
    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  it('проверка статуса "fulfilled" для loginUser', () => {
    const successAction = {
      type: loginUser.fulfilled.type,
      payload: testUser
    };
    const state = userReducer(initialState, successAction);
    expect(state).toEqual({
      ...initialState,
      userData: testUser,
      isAuthChecked: true,
      error: null,
      isLoading: false
    });
  });

  it('проверка статуса "rejected" для loginUser', () => {
    const failedAction = {
      type: loginUser.rejected.type
    };
    const state = userReducer(initialState, failedAction);
    expect(state).toEqual({
      ...initialState,
      error: true,
      isLoading: false
    });
  });

  it('проверка статуса "pending" для registerUser', () => {
    const requestAction = { type: registerUser.pending.type };
    const state = userReducer(initialState, requestAction);
    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  it('проверка статуса "fulfilled" для registerUser', () => {
    const successAction = {
      type: registerUser.fulfilled.type,
      payload: testUser
    };
    const state = userReducer(initialState, successAction);
    expect(state).toEqual({
      ...initialState,
      userData: testUser,
      isAuthChecked: true,
      error: null,
      isLoading: false
    });
  });

  it('проверка статуса "rejected" для registerUser', () => {
    const failedAction = {
      type: registerUser.rejected.type
    };
    const state = userReducer(initialState, failedAction);
    expect(state).toEqual({
      ...initialState,
      error: true,
      isLoading: false
    });
  });

  it('проверка статуса "pending" для getUser', () => {
    const requestAction = { type: getUser.pending.type };
    const state = userReducer(initialState, requestAction);
    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  it('проверка статуса "fulfilled" для getUser', () => {
    const successAction = {
      type: getUser.fulfilled.type,
      payload: { user: testUser }
    };
    const state = userReducer(initialState, successAction);
    expect(state).toEqual({
      ...initialState,
      userData: testUser,
      isAuthChecked: true,
      error: null,
      isLoading: false
    });
  });

  it('проверка статуса "rejected" для getUser', () => {
    const failedAction = {
      type: getUser.rejected.type
    };
    const state = userReducer(initialState, failedAction);
    expect(state).toEqual({
      ...initialState,
      error: true,
      isLoading: false
    });
  });

  it('проверка статуса "pending" для updateUser', () => {
    const requestAction = { type: updateUser.pending.type };
    const state = userReducer(initialState, requestAction);
    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  it('проверка статуса "fulfilled" для updateUser', () => {
    const updatedUser = { ...testUser, name: 'Updated User' };
    const successAction = {
      type: updateUser.fulfilled.type,
      payload: { user: updatedUser }
    };
    const state = userReducer(initialState, successAction);
    expect(state).toEqual({
      ...initialState,
      userData: updatedUser,
      error: null,
      isLoading: false
    });
  });

  it('проверка статуса "rejected" для updateUser', () => {
    const failedAction = {
      type: updateUser.rejected.type
    };
    const state = userReducer(initialState, failedAction);
    expect(state).toEqual({
      ...initialState,
      error: true,
      isLoading: false
    });
  });

  it('проверка статуса "fulfilled" для logoutUser', () => {
    const successAction = {
      type: logoutUser.fulfilled.type
    };
    const state = userReducer(initialState, successAction);
    expect(state).toEqual({
      ...initialState,
      userData: null,
      error: null,
      isLoading: false
    });
  });

  it('проверка сброса сообщения об ошибке', () => {
    const stateWithError = {
      ...initialState,
      error: true
    };
    const newState = userReducer(stateWithError, resetErrorMessage());
    expect(newState.error).toBeNull();
  });

  it('проверка изменения статуса проверки аутентификации', () => {
    const newState = userReducer(initialState, authChecked());
    expect(newState.isAuthChecked).toBe(true);
  });

  it('проверка выхода пользователя', () => {
    const stateWithUser = {
      ...initialState,
      userData: testUser
    };
    const newState = userReducer(stateWithUser, userLogout());
    expect(newState.userData).toBeNull();
  });
});
