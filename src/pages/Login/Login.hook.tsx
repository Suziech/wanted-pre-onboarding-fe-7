import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useLogin() {
  const [login, setLogin] = useState('signin');
  const [inputValue, setInputValue] = useState({ id: '', pw: '', confirm: '' });

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

  const navigate = useNavigate();

  const inputProps = {
    inputValue,
    inputHandler,
  };

  const purpose = () => (login === 'signin' ? 'SIGN-IN' : 'SIGN-UP');

  const FetchSignUp = (email: string, password: string) => {
    fetch(`https://pre-onboarding-selection-task.shop/auth/${login}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.access_token) {
          localStorage.setItem('token', result.access_token);
          login === 'signup' ? alert('회원가입 성공') : alert('로그인 성공');
          navigate('/todo');
        } else {
          login === 'signup'
            ? alert('동일한 아이디가 존재합니다')
            : alert('아이디와 비밀번호를 확인 해 주세요');
        }
      });
  };

  /**자동로그인 */
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/todo');
      alert('자동로그인 되었습니다.');
    }
  }, [navigate]);

  return {
    signUp,
    toggleObj,
    inputProps,
    purpose,
    FetchSignUp,
    login,
    inputHandler,
    inputValue,
  };
}
