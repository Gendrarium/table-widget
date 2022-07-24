import { useState } from 'react';

type Value<T> = { [index: string]: T };

export type HandleChange<T = string> = (
  e: React.ChangeEvent<HTMLInputElement> | { target: { [index: string]: any } },
  k?: T,
) => void;

type Form<T> = {
  values: Value<T>;
  handleChange: HandleChange<T>;
  setValues: React.Dispatch<React.SetStateAction<Value<T>>>;
};

export default function useForm<T = string | number>(): Form<T> {
  const [values, setValues] = useState<Value<T>>({});

  const handleChange = (
    evt:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { [index: string]: any } },
    key?: T,
  ): void => {
    const input = evt.target;
    const value: T = key ? key : input.value;
    const name: string = input.name;
    setValues((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return { values, handleChange, setValues };
}
