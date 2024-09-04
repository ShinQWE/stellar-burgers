import { FC } from 'react';
import { Button } from '@zlden/react-developer-burger-ui-components';
import styles from '../common.module.css';
import { Link } from 'react-router-dom';
import { PageUIProps } from '../common-type';
import { Input } from '@ui';

export const ForgotPasswordUI: FC<PageUIProps> = ({
  errorText,
  email,
  handleSubmit,
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
        noValidate
      >
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
        <div className={`pb-6 ${styles.button}`}>
          <Button
            type='primary'
            size='medium'
            htmlType='submit'
            disabled={email ? false : true}
          >
            Восстановить
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
        <Link to={'/login'} className={`pl-2 ${styles.link}`}>
          Войти
        </Link>
      </div>
    </div>
  </>
);
