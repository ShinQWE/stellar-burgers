import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  isErrorSelector,
  isLoadingSelector,
  loginUser,
  resetErrorMessage
} from '@slices';
import { Preloader } from '@ui';
import { useForm } from '../../components/hooks/useHooks';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const [formData, handleInputChange, handleSubmit, inputErrors, isValid] =
    useForm({
      email: '',
      password: ''
    });
  const [errors, setErrors] = useState({
    email: false,
    password: false
  });
  const isError = useSelector(isErrorSelector);
  const isLoading = useSelector(isLoadingSelector);

  useEffect(() => {
    dispatch(resetErrorMessage());
  }, [dispatch]);

  const onSubmit = (e: SyntheticEvent) => {
    handleSubmit(e);
    setErrors({ ...errors, ...inputErrors });
    if (isValid)
      dispatch(
        loginUser({ email: formData.email, password: formData.password })
      );
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setErrors({ ...errors, [e.target.name]: false });
  };

  if (isLoading) return <Preloader />;

  return (
    <LoginUI
      errorText={isError ? 'Электронный адрес или пароль введены неверно' : ''}
      email={formData.email}
      password={formData.password}
      errors={errors}
      handleSubmit={onSubmit}
      handleInputChange={handleInputChange}
      onFocus={onFocus}
    />
  );
};
