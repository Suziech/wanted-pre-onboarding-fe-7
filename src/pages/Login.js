import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import './Login.scss';

function Login() {
  const [login, setLogin] = useState('signin');
  const [inputValue, setInputValue] = useState({
    id: '',
    pw: '',
    confirm: '',
  });

  const inputHandler = e => {
    const { name, value } = e.target;
    setInputValue(prev => ({ ...prev, [name]: value }));
  };

  const signUp = () => {
    if (login === 'signin') {
      setLogin('signup');
    } else {
      setLogin('signin');
    }
  };

  const disabledSignIN =
    inputValue.id.includes('@') && inputValue.pw.length >= 8;
  const disabledSignUp = disabledSignIN && inputValue.pw === inputValue.confirm;

  const toggleObj = {
    signin: disabledSignIN,
    signup: disabledSignUp,
  };

  const navigate = useNavigate();

  const FetchSignUp = (email, password) => {
    fetch(`https://pre-onboarding-selection-task.shop/auth/${login}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.access_token) {
          localStorage.setItem('token', result.access_token);
          if (login === 'signup') {
            alert('회원가입 성공');
          } else {
            alert('로그인성공');
          }
          navigate('/todo');
        } else {
          if (login === 'signup') {
            alert('동일한 아이디가 존재합니다');
          } else {
            alert('아이디와 비밀번호를 확인 해 주세요');
          }
        }
      });
  };
  const inputProps = {
    inputValue,
    inputHandler,
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/todo');
      alert('자동로그인 되었습니다.');
    }
  }, [navigate]);

  return (
    <div className="login">
      <div className="loginWrapper">
        <section className="header">{login}</section>
        <section className="inputWrapper">
          <div className="idWrapper">
            <span>Email</span>
            <Input name="id" className="id" type="email" {...inputProps} />
          </div>
          <div className="pwWrapper">
            <span>Password</span>
            <Input name="pw" className="pw" type="password" {...inputProps} />
          </div>
          {login === 'signup' && (
            <div className="pwWrapper">
              <span>confirm</span>
              <Input
                name="confirm"
                className="pw"
                type="password"
                inputHandler={inputHandler}
                {...inputProps}
              />
            </div>
          )}
          <button
            className="loginButton"
            disabled={!toggleObj[login]}
            onClick={() => FetchSignUp(inputValue.id, inputValue.pw)}
          >
            {login}
          </button>
          <p className="haveAccount" onClick={signUp}>
            {login !== 'signin'
              ? 'Have an account? Login here!'
              : 'Do not have an account? Sign up here!'}
          </p>
        </section>
      </div>
    </div>
  );
}

export default Login;

const SIGN = {
  className: 'id',
  type: 'email',
};
