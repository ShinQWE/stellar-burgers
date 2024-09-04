import { FC } from 'react';
import styles from './profile-menu.module.css';
import { NavLink } from 'react-router-dom';
import { ProfileMenuUIProps } from './type';

export const ProfileMenuUI: FC<ProfileMenuUIProps> = ({
  pathname,
  handleLogout
}) => (
  <>
    <NavLink
      to={'/profile'}
      className={({ isActive }) =>
        `${styles.link} ${styles.text} ${styles.first_link} ${isActive ? styles.link_active : ''}`
      }
    >
      Профиль
    </NavLink>
    <NavLink
      to={'/profile/orders'}
      className={({ isActive }) =>
        `${styles.link} ${styles.text} ${isActive ? styles.link_active : ''}`
      }
    >
      История заказов
    </NavLink>
    <button
      className={`${styles.button} ${styles.text}`}
      onClick={handleLogout}
    >
      Выход
    </button>
    <p
      className={`pt-20 text text_type_main-default text_color_inactive ${styles.details}`}
    >
      {pathname === '/profile'
        ? 'В этом разделе вы можете изменить свои персональные данные'
        : 'В этом разделе вы можете просмотреть свою историю заказов'}
    </p>
  </>
);
