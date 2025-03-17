import React from "react";
import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: React.HTMLInputTypeAttribute;
  label?: string;
  styles?: string;
  min?: number;
  register?: UseFormRegisterReturn;
  error?: string;
}

const TextInput = ({type = "text",placeholder,styles = "",label,min,register,name,error,}: TextInputProps) => {
  return (
    <div className="flex flex-col mt-2">
      {label && <p className="text-gray-600 text-sm mb-1">{label}</p>}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        min={min}
        className={`rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 ${styles}`}
        {...register}
        aria-invalid={error ? "true" : "false"}
      />
      {error && <span className="text-xs text-red-500 mt-0.5">{error}</span>}
    </div>
  );
};

export default TextInput;