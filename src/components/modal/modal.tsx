import { FC, memo, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { TModalProps } from './type';
import { ModalUI } from '@ui';
import { useNavigate } from 'react-router-dom';

const modalRoot = document.getElementById('modals');

export const Modal: FC<TModalProps> = memo(
  ({ title, onClosePath, children, onClose }) => {
    const navigate = useNavigate();
    let onCloseHandler: () => void;

    if (!onClose) {
      onCloseHandler = onClosePath
        ? () => navigate(onClosePath)
        : () => navigate(-1);
    } else {
      onCloseHandler = onClose;
    }

    useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
        e.key === 'Escape' && onCloseHandler();
      };

      document.addEventListener('keydown', handleEsc);
      return () => {
        document.removeEventListener('keydown', handleEsc);
      };
    }, [onCloseHandler]);

    return ReactDOM.createPortal(
      <ModalUI title={title} onClose={onCloseHandler}>
        {children}
      </ModalUI>,
      modalRoot as HTMLDivElement
    );
  }
);
