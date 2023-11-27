import React, { ChangeEvent } from 'react';

interface InputProps {
  customClass: string;
  placeholder: string;
  onChange: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ customClass, placeholder, onChange }) => {

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  }; 
  return (
    <input
      className={`w-72 outline-none font-normal border border-black ${customClass}`}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};

export default Input;
