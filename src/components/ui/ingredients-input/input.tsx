import React, { useCallback, useState, FC, useRef } from 'react';
import clsx from 'clsx';
import * as Icons from '@zlden/react-developer-burger-ui-components/dist/ui/icons';
import styles from './input.module.css';
import { TInputInterface } from './types';

export const Input: FC<TInputInterface> = ({
  type,
  placeholder,
  onChange,
  icon,
  onIconClick,
  error,
  value,
  errorText,
  onBlur,
  onFocus,
  size = 'default',
  extraClass = '',
  ...rest
}) => {
  const [focus, setFocus] = useState(false);
  const ref = useRef<HTMLInputElement | null>(null);
  const Icon = icon && Icons[icon];

  const handleInputFocus = useCallback(
    (e?: React.FocusEvent<HTMLInputElement>) => {
      setFocus(true);
      if (typeof onFocus === 'function') {
        onFocus(e);
      }
    },
    [setFocus, onFocus]
  );

  const handleInputBlur = useCallback(
    (e?: React.FocusEvent<HTMLInputElement>) => {
      setFocus(false);
      if (typeof onBlur === 'function') {
        onBlur(e);
      }
    },
    [setFocus, onBlur]
  );

  const forceFocus = useCallback(() => {
    ref?.current?.focus();
  }, [ref]);

  const onWrapperClick = useCallback(() => {
    forceFocus();
  }, [forceFocus]);

  return (
    <div className={`${styles.input__container} ${extraClass}`}>
      <div
        className={clsx(styles.input, {
          [styles.input_size_default]: size === 'default',
          [styles.input_size_small]: size === 'small',
          [styles.input_status_error]: error,
          [styles.input_status_active]: focus
        })}
        onClick={onWrapperClick}
      >
        <label
          className={clsx(`${styles.input__placeholder} text noselect`, {
            [`text_type_main-${size}`]: size,
            [styles.input__placeholder_focused]: focus,
            [styles.input__placeholder_filled]: value
          })}
        >
          {placeholder}
        </label>

        <input
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className={clsx('text', styles.input__textfield, {
            [`text_type_main-${size}`]: size,
            [styles.input__icon_action]:
              icon === 'HideIcon' || icon === 'ShowIcon'
          })}
          type={type}
          ref={ref}
          onChange={onChange}
          value={value}
          {...rest}
        />
        {Icon && (
          <div className={styles.input__icon} onClick={onIconClick}>
            <Icon type='primary' />
          </div>
        )}
      </div>
      {error && errorText && (
        <p
          className={clsx(styles.input__error, {
            [`text_type_main-${size}`]: size
          })}
        >
          {errorText}
        </p>
      )}
    </div>
  );
};

Input.displayName = 'Input';
