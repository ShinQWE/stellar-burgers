import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ResetPasswordUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  isErrorSelector,
  isLoadingSelector,
  resetErrorMessage,
  resetPassword
} from '@slices';
import { Preloader } from '@ui';
import { useForm } from '../../components/hooks/useHooks';

export const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, handleInputChange, handleSubmit, inputErrors, isValid] =
    useForm({
      password: '',
      token: ''
    });

  const [errors, setErrors] = useState({
    password: false,
    token: false
  });

  const isError = useSelector(isErrorSelector);
  const isLoading = useSelector(isLoadingSelector);

  const onSubmit = (e: SyntheticEvent) => {
    handleSubmit(e);
    setErrors({ ...errors, ...inputErrors });
    if (isValid)
      dispatch(
        resetPassword({ password: formData.password, token: formData.token })
      )
        .then((data) => {
          if (data.payload) {
            localStorage.removeItem('resetPassword');
            navigate('/login');
          }
        })
        .catch(() => console.log('Ошибка сброса пароля'));
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setErrors({ ...errors, [e.target.name]: false });
  };

  useEffect(() => {
    dispatch(resetErrorMessage());
    if (!localStorage.getItem('resetPassword')) {
      navigate('/forgot-password', { replace: true });
    }
  }, [navigate, dispatch]);

  if (isLoading) return <Preloader />;

  return (
    <ResetPasswordUI
      errorText={isError ? 'Указан неверный код подтверждения' : ''}
      password={formData.password}
      token={formData.token}
      handleSubmit={onSubmit}
      handleInputChange={handleInputChange}
      errors={errors}
      onFocus={onFocus}
    />
  );
};
