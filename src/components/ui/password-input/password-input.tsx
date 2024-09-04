import { TICons } from '@zlden/react-developer-burger-ui-components/dist/ui/icons';
import { FC, useState } from 'react';
import { Input } from '@ui';
import { ChangeEvent, Dispatch, FocusEvent, SetStateAction } from 'react';

export type TPasswordInputProps = {
  password: string;
  error: boolean;
  errorText: string;
  placeholder?: string;
  name?: string;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  extraClass: string;
};

export const PasswordInput: FC<TPasswordInputProps> = ({
  password,
  error,
  errorText,
  placeholder,
  name,
  onBlur,
  onFocus,
  onChange,
  extraClass
}) => {
  const [visible, setVisible] = useState(false);
  const [currentIcon, setCurrentIcon] = useState<keyof TICons>('ShowIcon');
  const onIconClick = () => {
    if (currentIcon === 'ShowIcon') {
      setVisible(true);
      setCurrentIcon('HideIcon');
    } else {
      setCurrentIcon('ShowIcon');
      setVisible(false);
    }
  };

  return (
    <Input
      type={visible ? 'text' : 'password'}
      placeholder={placeholder ? placeholder : 'Пароль'}
      onChange={onChange}
      value={password}
      name={name ? name : 'password'}
      error={error}
      errorText={errorText}
      size='default'
      icon={currentIcon}
      onIconClick={onIconClick}
      onBlur={onBlur}
      onFocus={onFocus}
      extraClass={extraClass}
    />
  );
};
