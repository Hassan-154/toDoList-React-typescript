import React from 'react';

interface ButtonProps {
  customClass: string;
  name: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ customClass, name, onClick }) => {
  return (
    <button
      className={`!min-w-72 outline-none py-1.5 px-2.5 font-normal border border-black bg-black text-white ${customClass}`}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Button;
