import { ChangeEvent, SyntheticEvent, useState, useEffect } from 'react';
import { isValidForm, isValidInput } from '../../utils/validation';

const initialStateErrors = (initialState: { [key: string]: string }) => {
  let state: { [key: string]: boolean } = {};
  for (const key in initialState) {
    state = { ...state, [key]: false };
  }
  return state;
};

export const useForm = (initialState: { [key: string]: string }) => {
  const [formData, setFormData] = useState(initialState);
  const [inputErrors, setInputErrors] = useState(
    initialStateErrors(initialState)
  );
  const isValid = isValidForm(inputErrors);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    setFormData({ ...formData, [inputName]: inputValue });

    if (
      inputName === 'repPassword' ||
      (inputName === 'password' &&
        'repPassword' in formData &&
        formData.repPassword.length > 0)
    ) {
      setInputErrors({
        ...inputErrors,
        repPassword: inputValue !== formData.password
      });
    } else {
      setInputErrors({
        ...inputErrors,
        [inputName]: !isValidInput(inputName, inputValue)
      });
    }
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return [
    formData,
    handleInputChange,
    handleSubmit,
    inputErrors,
    isValid
  ] as const;
};

export const useResize = () => {
  const [size, setSize] = useState(0);
  useEffect(() => {
    const getSize = () => setSize(window.innerWidth);
    getSize();
    window.addEventListener('resize', getSize);
    return () => window.removeEventListener('resize', getSize);
  }, []);
  return size;
};
