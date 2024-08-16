import { FC, useState, SyntheticEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ForgotPasswordUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  forgotPassword,
  isErrorSelector,
  isLoadingSelector,
  resetErrorMessage
} from '@slices';
import { Preloader } from '@ui';
import { useForm } from '../../components/hooks/useHooks';

export const ForgotPassword: FC = () => {
  const [formData, handleInputChange, handleSubmit, inputErrors, isValid] =
    useForm({
      email: ''
    });

  const [errors, setErrors] = useState({
    email: false
  });
  const isError = useSelector(isErrorSelector);
  const isLoading = useSelector(isLoadingSelector);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetErrorMessage());
  }, [dispatch]);

  const onSubmit = (e: SyntheticEvent) => {
    handleSubmit(e);
    setErrors({ ...errors, ...inputErrors });
    if (isValid)
      dispatch(forgotPassword({ email: formData.email })).then((data) => {
        if (data.payload) {
          localStorage.setItem('resetPassword', 'true');
          navigate('/reset-password', { replace: true });
        }
      });
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setErrors({ ...errors, [e.target.name]: false });
  };

  if (isLoading) return <Preloader />;

  return (
    <ForgotPasswordUI
      errorText={isError ? 'Электронный адрес не существует или не найден' : ''}
      email={formData.email}
      handleSubmit={onSubmit}
      handleInputChange={handleInputChange}
      errors={errors}
      onFocus={onFocus}
    />
  );
};
