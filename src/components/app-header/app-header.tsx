import { FC, useEffect, useState } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUserDataSelector } from '@slices';

export const AppHeader: FC = () => {
  const userData = useSelector(getUserDataSelector);
  const [isOpen, setIsOpen] = useState(false);
  const onMenuIconClick = () => setIsOpen(true);
  const onCloseClick = () => setIsOpen(false);

  useEffect(() => {
    const handleLink = (event: MouseEvent) => {
      const element = event.target as HTMLElement;
      if (
        element.matches('a') ||
        element.matches('p') ||
        element.textContent === 'Выход'
      )
        setIsOpen(false);
    };
    const header = document.querySelector('header');
    header!.addEventListener('click', handleLink);
    return () => {
      header!.removeEventListener('click', handleLink);
    };
  }, []);

  return (
    <AppHeaderUI
      isOpen={isOpen}
      userName={userData ? userData.name : ''}
      onCloseClick={onCloseClick}
      onMenuIconClick={onMenuIconClick}
    />
  );
};
