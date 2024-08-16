import { constructorItemsReducer } from './slices/constructorItems';
import { feedsReducer } from './slices/feeds';
import { ingredientsReducer } from './slices/ingredients';
import { ordersReducer } from './slices/orders';
import { userReducer } from './slices/user';

export const rootReducer = {
  ingredients: ingredientsReducer,
  constructorItems: constructorItemsReducer,
  feeds: feedsReducer,
  orders: ordersReducer,
  user: userReducer
};
