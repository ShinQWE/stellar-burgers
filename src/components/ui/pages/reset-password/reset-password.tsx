import { FC } from 'react';
import { Button } from '@zlden/react-developer-burger-ui-components';
import styles from '../common.module.css';
import { Link } from 'react-router-dom';
import { ResetPasswordUIProps } from './type';
import { PasswordInput } from '../../password-input';
import { Input } from '@ui';

export const ResetPasswordUI: FC<ResetPasswordUIProps> = ({
  errorText,
  password,
  handleSubmit,
  token,
  handleInputChange,
  errors,
  onFocus
}) => (
  <>
    <div className={`pt-6 ${styles.wrapCenter}`}>
      <h3 className='pb-6 text text_type_main-medium'>Восстановление пароля</h3>
      <form
        className={`pb-15 ${styles.form}`}
        name='login'
        onSubmit={handleSubmit}
      >
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
          <Input
            type='text'
            placeholder='Введите код из письма'
            onChange={handleInputChange}
            value={token}
            name='token'
            error={errors.token}
            errorText=''
            size={'default'}
            onFocus={onFocus}
            extraClass={styles.input}
          />
        </div>
        <div className={`pb-6 ${styles.button}`}>
          <Button
            type='primary'
            size='medium'
            htmlType='submit'
            disabled={password && token ? false : true}
          >
            Сохранить
          </Button>
        </div>
        {errorText && (
          <p className={`${styles.error} text text_type_main-default pb-6`}>
            {errorText}
          </p>
        )}
      </form>
      <div className={`${styles.question} text text_type_main-default pb-6`}>
        Вспомнили пароль?
        <Link to='/login' className={`pl-2 ${styles.link}`}>
          Войти
        </Link>
      </div>
    </div>
  </>
);
