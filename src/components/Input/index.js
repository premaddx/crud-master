import React from "react";
import './style.css';
const Input = ({ label, disabled, value, onChange, name, type, ...rest,pre='' }) => {
  const onInputChange = e => {
    onChange(name, e.target.value);
  };
  return (
    <div className="form-input">
      <label>{label}</label>
      <div className="input-wrap">
        {pre}
      <input
        className={`${pre?'with-pre':''}`}
        type={type||"text"}
        placeholder={label}
        name={name}
        disabled={disabled}
        value={value}
        onChange={onInputChange}
        {...rest}
      />
      </div>
    </div>
  );
};

export default Input;
