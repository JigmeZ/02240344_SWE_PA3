import { useState } from 'react';

type ValidationRules<T> = Partial<Record<keyof T, (val: string) => string | null>>;

export const useForm = <T extends Record<string, string>>(
  initialValues: T,
  validationRules?: ValidationRules<T>
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const setValue = (field: keyof T, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear error on change
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    if (!validationRules) return true;
    const newErrors: Partial<Record<keyof T, string>> = {};
    let valid = true;
    for (const field in validationRules) {
      const rule = validationRules[field];
      const error = rule?.(values[field] ?? '');
      if (error) {
        newErrors[field] = error;
        valid = false;
      }
    }
    setErrors(newErrors);
    return valid;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  return { values, errors, setValue, validate, reset };
};