import { Navigate, Outlet } from 'react-router-dom';
import { Preloader } from '../preloader';
import { TUser } from '@utils-types';
import { Location } from 'react-router-dom';

export type TProtectedRouteUIProps = {
  onlyUnAuth?: boolean;
  isAuthChecked: boolean;
  user: TUser | null;
  location: Location<any>;
};

export const Protected = ({
  onlyUnAuth,
  isAuthChecked,
  user,
  location
}: TProtectedRouteUIProps) => {
  if (!isAuthChecked) return <Preloader />;

  if (!onlyUnAuth && !user)
    return <Navigate replace to='/login' state={{ from: location }} />;

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return <Outlet />;
};
