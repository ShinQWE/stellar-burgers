import { useSelector } from '../../services/store';
import { useLocation } from 'react-router-dom';
import { Protected } from '@ui';
import { authCheckedSelector, getUserDataSelector } from '@slices';

export type TProtectedProps = {
  unAuth?: boolean;
};

export const ProtectedRoute: React.FC<TProtectedProps> = ({ unAuth }) => {
  // Используем селекторы для получения статуса аутентификации и данных пользователя
  const isAuthChecked = useSelector(authCheckedSelector);
  const user = useSelector(getUserDataSelector);
  const location = useLocation();

  // Отображаем компонент Protected с необходимыми пропсами
  return (
    <Protected
      onlyUnAuth={unAuth}
      isAuthChecked={isAuthChecked}
      user={user}
      location={location}
    />
  );
};
