import React, { ChangeEvent } from 'react';

interface InputProps {
  customClass: string;
  placeholder: string;
  onChange: (value: string) => void;
  value: string;
}

const Input: React.FC<InputProps> = ({ customClass, placeholder, onChange, value }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      className={`w-full outline-none font-normal border border-black ${customClass}`}
      placeholder={placeholder}
      onChange={handleChange}
      value={value}
    />
  );
};

export default Input;
