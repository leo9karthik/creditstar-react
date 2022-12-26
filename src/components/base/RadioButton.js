import React from "react";

const RadioButton = ({
  id,
  name,
  value,
  title,
  defaultChecked,
  register,
  rules,
  ...props
}) => {


  return (
    <div className="radio-btn">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        {...props}
        {...(register && register(name, rules))}
      />
      <label className="radio-label" htmlFor={id}>
        <span>
          {title}
        </span>
      </label>
    </div>
  );
};

export default RadioButton;
