const Input = ({ className, name, type, inputHandler, inputValue }) => {
  return (
    <input
      name={name}
      className={className}
      type={type}
      onChange={inputHandler}
      value={inputValue[name]}
    />
  );
};

export default Input;
