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

import { useMatch } from 'react-router-dom';

export const OrderModalWrapper: FC<{
  onClosePath?: string;
  children: React.ReactNode;
  onClose?: () => void;
}> = memo(({ onClosePath, children, onClose }) => {
  // Извлечение номера заказа из URL
  const profileMatch = useMatch('/profile/orders/:number')?.params.number;
  const feedMatch = useMatch('/feed/:number')?.params.number;
  const orderNumber = profileMatch || feedMatch;

  const formattedOrderNumber = orderNumber
    ? orderNumber.padStart(5, '0')
    : '00000';

  return (
    <Modal
      title={`Номер заказа: ${formattedOrderNumber}`}
      onClosePath={onClosePath}
      onClose={onClose}
    >
      {children}
    </Modal>
  );
});
