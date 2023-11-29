import React, { ChangeEvent, KeyboardEvent } from 'react';

interface InputProps {
  customClass: string;
  placeholder: string;
  onChange: (value: string) => void;
  value: string;
  onEnterPress?: () => void;
}

const Input: React.FC<InputProps> = ({
  customClass,
  placeholder,
  onChange,
  value,
  onEnterPress,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && onEnterPress) {
      onEnterPress();
    }
  };

  return (
    <input
      className={`w-full outline-none font-normal ${customClass}`}
      placeholder={placeholder}
      onChange={handleChange}
      value={value}
      onKeyPress={handleKeyPress}
    />
  );
};

export default Input;
