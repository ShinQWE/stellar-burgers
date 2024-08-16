// Регулярные выражения для валидации различных типов ввода
export const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
// Это регулярное выражение гарантирует, что пароль содержит хотя бы одну строчную букву,
// одну заглавную букву и имеет длину не менее 6 символов.
export const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
// Это регулярное выражение проверяет имена, разрешая только буквы (как латинские, так и кириллические) и пробелы.
export const namePattern = /^[a-zа-яё\s]+$/i;

export const isValidInput = (name: string, value: string) => {
  let pattern: RegExp;
  switch (name) {
    case 'email':
      pattern = emailPattern;
      break;
    case 'password':
      pattern = passwordPattern;
      break;
    case 'name':
      pattern = namePattern;
      break;
    default:
      pattern = /.+/;
  }

  return pattern.test(value);
};

// Функция для проверки валидности всей формы на основе состояния полей ввода
export const isValidForm = (state: { [key: string]: boolean }) =>
  !Object.values(state).some((item) => item === true);
