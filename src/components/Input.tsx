import React from 'react';
import styles from '../styles/Input.module.scss';

interface InputProps {
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  label: string;
}

const Input: React.FC<InputProps> = ({ id, type, value, onChange, required = false, disabled = false, label }) => {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;