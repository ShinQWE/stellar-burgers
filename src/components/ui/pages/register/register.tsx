import { FC } from 'react';
import { Button } from '@zlden/react-developer-burger-ui-components';
import styles from '../common.module.css';
import { Link } from 'react-router-dom';
import { RegisterUIProps } from './type';
import { PasswordInput } from '../../password-input';
import { Input } from '@ui';

export const RegisterUI: FC<RegisterUIProps> = ({
  errorText,
  email,
  password,
  userName,
  repPassword,
  errors,
  handleInputChange,
  handleSubmit,
  onFocus
}) => (
  <>
    <div className={`pt-6 ${styles.wrapCenter}`}>
      <h3 className='pb-6 text text_type_main-medium'>Регистрация</h3>
      <form
        className={`pb-15 ${styles.form}`}
        name='register'
        onSubmit={handleSubmit}
        noValidate
      >
        <>
          <div className='pb-6'>
            <Input
              type='text'
              placeholder='Имя'
              onChange={handleInputChange}
              value={userName}
              name='name'
              error={errors.name}
              errorText='Только латинские, кириллические буквы, знаки дефиса и пробелы'
              size='default'
              onFocus={onFocus}
              extraClass={styles.input}
            />
          </div>
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
          <div className='pb-6'>
            <PasswordInput
              name='repPassword'
              placeholder='Повторите пароль'
              password={repPassword}
              error={errors.repPassword}
              errorText='Пароли не совпадают'
              onChange={handleInputChange}
              onFocus={onFocus}
              extraClass={styles.input}
            />
          </div>
          <div className={`pb-6 ${styles.button}`}>
            <Button
              type='primary'
              size='medium'
              htmlType='submit'
              disabled={
                userName && email && password && repPassword ? false : true
              }
            >
              Зарегистрироваться
            </Button>
          </div>
          {errorText && (
            <p className={`${styles.error} text text_type_main-default pb-6`}>
              {errorText}
            </p>
          )}
        </>
      </form>
      <div className={`${styles.question} text text_type_main-default pb-6`}>
        Уже зарегистрированы?
        <Link to='/login' className={`pl-2 ${styles.link}`}>
          Войти
        </Link>
      </div>
    </div>
  </>
);
