import '../../index.css';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { checkUserAuth, getBurgerIngredients } from '@slices';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../../pages/layouts';
import { ConstructorPage, NotFound404 } from '@pages';
import { ProtectedRoute } from '@components';

// loading функция
const INGRIDIENT = async () => {
  const { Modal, IngredientDetails } = await import('@components');
  return {
    element: (
      <Modal title='Детали ингредиента'>
        <IngredientDetails />
      </Modal>
    )
  };
};

const FEED = async () => {
  const { Feed } = await import('@pages');
  return { element: <Feed /> };
};

const ORDER = async () => {
  const { OrderInfo, OrderModalWrapper } = await import('@components');
  return {
    element: (
      <OrderModalWrapper>
        <OrderInfo />
      </OrderModalWrapper>
    )
  };
};

const LOGIN = async () => {
  const { Login } = await import('@pages');
  return { element: <Login /> };
};

const REGISTER = async () => {
  const { Register } = await import('@pages');
  return { element: <Register /> };
};

const PASSWORD = async () => {
  const { ForgotPassword } = await import('@pages');
  return { element: <ForgotPassword /> };
};

const RESETPASSWORD = async () => {
  const { ResetPassword } = await import('@pages');
  return { element: <ResetPassword /> };
};

const PROFILE = async () => {
  const { Profile } = await import('@pages');
  return { element: <Profile /> };
};

const PROFILEORDERS = async () => {
  const { ProfileOrders } = await import('@pages');
  return { element: <ProfileOrders /> };
};

const ORDERDETAILSWMODAL = async () => {
  const { Modal, OrderInfo } = await import('@components');
  return {
    element: (
      <Modal title='Детали заказа' onClosePath='/profile/orders'>
        <OrderInfo />
      </Modal>
    )
  };
};

// router
const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <NotFound404 />,
    children: [
      {
        path: '/',
        element: <ConstructorPage />,
        children: [
          {
            path: 'ingredients/:id',
            lazy: () => INGRIDIENT()
          }
        ]
      },
      {
        path: '/feed',
        lazy: () => FEED(),
        children: [
          {
            path: ':number',
            lazy: () => ORDER()
          }
        ]
      },
      {
        element: <ProtectedRoute unAuth />,
        children: [
          {
            path: '/login',
            lazy: () => LOGIN()
          },
          {
            path: '/register',
            lazy: () => REGISTER()
          },
          {
            path: '/forgot-password',
            lazy: () => PASSWORD()
          },
          {
            path: '/reset-password',
            lazy: () => RESETPASSWORD()
          }
        ]
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/profile',
            children: [
              {
                index: true,
                lazy: () => PROFILE()
              },
              {
                path: 'orders',
                lazy: () => PROFILEORDERS(),
                children: [
                  {
                    path: ':number',
                    lazy: () => ORDERDETAILSWMODAL()
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]);

// Main App
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeApp = async () => {
      await dispatch(getBurgerIngredients());
      await dispatch(checkUserAuth());
    };
    initializeApp();
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

export default App;
