import { FC } from 'react';
import { Button } from '@zlden/react-developer-burger-ui-components';
import styles from '../common.module.css';
import { Link } from 'react-router-dom';
import { LoginUIProps } from './type';
import { PasswordInput } from '../../password-input';
import { Input } from '@ui';

export const LoginUI: FC<LoginUIProps> = ({
  email,
  errorText,
  handleSubmit,
  password,
  handleInputChange,
  errors,
  onFocus
}) => (
  <>
    <div className={`pt-6 ${styles.wrapCenter}`}>
      <h3 className='pb-6 text text_type_main-medium'>Вход</h3>
      <form
        className={`pb-15 ${styles.form}`}
        name='login'
        onSubmit={handleSubmit}
        noValidate
      >
        <>
          <div className='pb-6'>
            <Input
              type='email'
              placeholder='E-mail'
              onChange={handleInputChange}
              value={email}
              name='email'
              error={errors.email}
              errorText='Некоректный формат адреса'
              size={'default'}
              onFocus={onFocus}
              extraClass={styles.input}
            />
          </div>
          <div className='pb-6'>
            <PasswordInput
              password={password}
              onChange={handleInputChange}
              error={errors.password}
              errorText='Не менее 6 символов, включая заглавные буквы и цифры'
              onFocus={onFocus}
              extraClass={styles.input}
            />
          </div>
          <div className={`pb-6 ${styles.button}`}>
            <Button
              type='primary'
              size='medium'
              htmlType='submit'
              disabled={email && password ? false : true}
            >
              Войти
            </Button>
          </div>
          {errorText && (
            <p className={`${styles.error} text text_type_main-default pb-6`}>
              {errorText}
            </p>
          )}
        </>
      </form>

      <div className={`pb-4 ${styles.question} text text_type_main-default`}>
        Вы - новый пользователь?
        <Link to='/register' className={`pl-2 ${styles.link}`}>
          Зарегистрироваться
        </Link>
      </div>
      <div className={`${styles.question} text text_type_main-default pb-6`}>
        Забыли пароль?
        <Link to={'/forgot-password'} className={`pl-2 ${styles.link}`}>
          Восстановить пароль
        </Link>
      </div>
    </div>
  </>
);
