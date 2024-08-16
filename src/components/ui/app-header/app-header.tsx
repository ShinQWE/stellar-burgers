import { FC, useRef } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  ArrowDownIcon,
  BurgerIcon,
  CloseIcon,
  ListIcon,
  Logo,
  MenuIcon,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { ProfileMenu } from '@components';
import { CSSTransition } from 'react-transition-group';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({
  userName,
  isOpen,
  onCloseClick,
  onMenuIconClick
}) => {
  const mobileMenuRef = useRef(null);
  const overlayRef = useRef(null);

  return (
    <header className={styles.header}>
      <nav className={styles.menu}>
        <div className={styles.menu_part_left}>
          <NavLink
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.link_active : ''}`
            }
            to={'/'}
          >
            <BurgerIcon type={'primary'} />
            <p className={`text ml-2 mr-10 ${styles.text_type_link}`}>
              Конструктор
            </p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.link_active : ''}`
            }
            to={'/feed'}
          >
            <ListIcon type={'primary'} />
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </NavLink>
        </div>
        <div className={styles.logo}>
          <Logo className={styles.logo_element} />
        </div>
        <div className={styles.menu_part_right}>
          <NavLink
            className={({ isActive }) =>
              `${styles.link} ${styles.link_position_last} ${isActive ? styles.link_active : ''}`
            }
            to={userName ? '/profile' : '/login'}
          >
            <ProfileIcon type={'primary'} />
            <p className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </p>
          </NavLink>
        </div>
        <div className={styles.mobile_menu}>
          <MenuIcon
            className={styles.mobile_menu_icon}
            type='primary'
            onClick={onMenuIconClick}
          />
          <CSSTransition
            in={isOpen}
            nodeRef={overlayRef}
            timeout={300}
            unmountOnExit
            classNames={{
              enter: styles.overlay_enter,
              enterActive: styles.overlay_enter_active,
              exit: styles.overlay_exit,
              exitActive: styles.overlay_exit_active
            }}
          >
            <div
              ref={overlayRef}
              className={styles.mobile_menu_overlay}
              onClick={onCloseClick}
            />
          </CSSTransition>
          <CSSTransition
            in={isOpen}
            nodeRef={mobileMenuRef}
            timeout={300}
            unmountOnExit
            classNames={{
              enter: styles.mobile_menu_enter,
              enterActive: styles.mobile_menu_enter_active,
              exit: styles.mobile_menu_exit,
              exitActive: styles.mobile_menu_exit_active
            }}
          >
            <div ref={mobileMenuRef} className={styles.mobile_menu_wrapper}>
              <div className={styles.mobile_menu_header}>
                <h1 className={`${styles.title} text_type_main-large`}>Меню</h1>
                <CloseIcon
                  className={styles.close_button}
                  type='primary'
                  onClick={onCloseClick}
                />
              </div>
              <ul className={styles.mobile_menu_list}>
                <li
                  className={`${styles.mobile_menu_link} ${styles.link_with_icon}`}
                >
                  <ProfileIcon type={'primary'} />
                  <details className={styles.mobile_menu_details}>
                    <summary className={styles.mobile_menu_summary} />
                    <ProfileMenu />
                  </details>
                </li>
                <li className={styles.mobile_menu_link}>
                  <NavLink
                    className={({ isActive }) =>
                      `${styles.link} ${isActive ? styles.link_active : ''}`
                    }
                    to={'/'}
                  >
                    <BurgerIcon type={'primary'} />
                    <p className={`text ml-2 mr-10 ${styles.text_type_link}`}>
                      Конструктор
                    </p>
                  </NavLink>
                </li>
                <li className={styles.mobile_menu_link}>
                  <NavLink
                    className={({ isActive }) =>
                      `${styles.link} ${isActive ? styles.link_active : ''}`
                    }
                    to={'/feed'}
                  >
                    <ListIcon type={'primary'} />
                    <p className='text text_type_main-default ml-2'>
                      Лента заказов
                    </p>
                  </NavLink>
                </li>
              </ul>
            </div>
          </CSSTransition>
        </div>
      </nav>
    </header>
  );
};
