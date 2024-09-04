import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  isErrorSelector,
  isLoadingSelector,
  registerUser,
  resetErrorMessage
} from '@slices';
import { Preloader } from '@ui';
import { useForm } from '../../components/hooks/useHooks';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const isError = useSelector(isErrorSelector);
  const isLoading = useSelector(isLoadingSelector);

  const [formData, handleInputChange, handleSubmit, inputErrors, isValid] =
    useForm({
      name: '',
      email: '',
      password: '',
      repPassword: ''
    });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
    repPassword: false
  });

  useEffect(() => {
    dispatch(resetErrorMessage());
  }, [dispatch]);

  const onSubmit = (e: SyntheticEvent) => {
    handleSubmit(e);
    setErrors({ ...errors, ...inputErrors });
    if (isValid)
      dispatch(
        registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      );
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setErrors({ ...errors, [e.target.name]: false });
  };

  if (isLoading) return <Preloader />;

  return (
    <RegisterUI
      errorText={isError ? 'Пользователь с таким адресом уже существует' : ''}
      email={formData.email}
      userName={formData.name}
      password={formData.password}
      repPassword={formData.repPassword}
      errors={errors}
      onFocus={onFocus}
      handleInputChange={handleInputChange}
      handleSubmit={onSubmit}
    />
  );
};
