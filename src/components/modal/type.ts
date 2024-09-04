import { ReactNode } from 'react';

export type TModalProps = {
  title: string;
  onClosePath?: string;
  children?: ReactNode;
  onClose?: () => void;
};
