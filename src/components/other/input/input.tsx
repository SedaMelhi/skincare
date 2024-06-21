import React, { ChangeEvent, FC } from "react";

import starSvg from "./../../../../public/inputStar.svg";

import style from "./input.module.sass";

interface InputProps {
  placeholder?: string;
  value?: any;
  type?: string;
  isNecessary?: boolean;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void; // Добавлено свойство onChange
  onClick?: any;
  disabled?: boolean;
  autoComplete?: string;
  error?: boolean;
}

const Input: FC<InputProps> = ({
  placeholder,
  value,
  type,
  onChange,
  isNecessary,
  onBlur,
  onClick,
  disabled,
  autoComplete,
  error,
}) => {
  return (
    <div className={style.input__wrap} style={disabled ? { opacity: 0.4 } : {}}>
      <input
        className={
          style.input +
          " " +
          (value ? style.input_active + " " : "") +
          (error ? style.input_err + " " : "")
        }
        placeholder={placeholder}
        type={type || "text"}
        value={value || ""}
        onChange={onChange || ((event) => {})} // Используйте переданный обработчик onChange
        onBlur={onBlur || ((event) => {})}
        onClick={onClick || ((event) => {})}
        disabled={disabled}
        autoComplete={autoComplete}
      />
      {!value && (
        <div className={style.text}>
          <span>{placeholder}</span>{" "}
          {isNecessary && <img src={starSvg.src} alt="" />}
        </div>
      )}
    </div>
  );
};

export default Input;
