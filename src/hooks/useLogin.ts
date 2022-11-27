import React, { useState } from 'react';

const useLogin = () => {
  const [login, setLogin] = useState('signin');
  const [inputValue, setInputValue] = useState({
    id: '',
    pw: '',
    confirm: '',
  });

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue(prev => ({ ...prev, [name]: value }));
  };

  const signUp = () => {
    login === 'signin' ? setLogin('signup') : setLogin('signin');
  };

  const disabledSignIn =
    inputValue.id.includes('@') && inputValue.pw.length >= 8;

  const disabledSignUp = disabledSignIn && inputValue.pw === inputValue.confirm;

  const toggleObj = {
    signin: disabledSignIn,
    signup: disabledSignUp,
  };

  const inputProps = {
    inputValue,
    inputHandler,
  };

  const purpose = () => (login === 'signin' ? 'SIGN-IN' : 'SIGN-UP');

  return {
    purpose,
    inputHandler,
    inputProps,
    toggleObj,
    inputValue,
    signUp,
    login,
  };
};

export default useLogin;
