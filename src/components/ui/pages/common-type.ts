import {
  ChangeEvent,
  Dispatch,
  FocusEvent,
  SetStateAction,
  SyntheticEvent
} from 'react';

type TErrors = {
  [key: string]: boolean;
};

export type PageUIProps = {
  errorText: string | undefined;
  email: string;
  errors: TErrors;
  setEmail?: Dispatch<SetStateAction<string>>;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: SyntheticEvent) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
};
