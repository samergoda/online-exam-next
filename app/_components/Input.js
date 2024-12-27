'use client';
import { useState } from 'react';

function Input({ type, placeholder, name, value, onChange }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const isPasswordField = type === 'password';

  return (
    <div className="relative w-[410px]">
      <input
        required
        className="w-full border-2 p-[15px] block rounded-[10px] shadow-[0_10px_20px_0_#4461F20D]"
        value={value}
        type={isPasswordField && isPasswordVisible ? 'text' : type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
      {isPasswordField && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-[10px] top-[50%] translate-y-[-50%] text-gray-500"
          aria-label="Toggle password visibility"
        >
          {isPasswordVisible ? '🙈' : '👁️'}
        </button>
      )}
    </div>
  );
}

export default Input;
