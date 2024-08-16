import { TICons } from '@zlden/react-developer-burger-ui-components/dist/ui/icons';

export interface TInputInterface
  extends Omit<React.HTMLProps<HTMLInputElement>, 'size'> {
  value: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  error?: boolean;
  icon?: keyof TICons;
  errorText?: string;
  size?: 'default' | 'small';
  extraClass?: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onIconClick?(e: React.MouseEvent<HTMLDivElement>): void;
  onBlur?(e?: React.FocusEvent<HTMLInputElement>): void;
  onFocus?(e?: React.FocusEvent<HTMLInputElement>): void;
}
