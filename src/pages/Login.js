import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

function Login() {
  const [login, setLogin] = useState(false);
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const saveUserId = e => {
    setId(e.target.value);
  };
  const saveUserPw = e => {
    setPw(e.target.value);
  };

  const signUp = () => {
    setLogin(!login);
  };

  const buttonStatus = (id, pw) => {
    return id.includes('@') && pw.length >= 8;
  };

  const Redirect = useNavigate();

  const FetchSignUp = () => {
    fetch('https://pre-onboarding-selection-task.shop/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: id, password: pw }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.access_token) {
          localStorage.setItem('token', result.access_token);
          alert('회원가입 성공');
        } else {
          alert('동일한 아이디가 존재합니다');
        }
      });
  };
  const FetchLogIn = () => {
    fetch('https://pre-onboarding-selection-task.shop/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: id, password: pw }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.access_token) {
          localStorage.setItem('token', result.access_token);
          alert('로그인 성공');
          Redirect('/todo');
        } else {
          alert('아이디와 비밀번호를 확인 해 주세요');
          Redirect('/');
        }
      });
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <section className="header">
          <p>{login ? 'SIGNUP' : 'LOGIN'}</p>
        </section>
        <section className="inputWrapper">
          <div className="idWrapper">
            <span>Email</span>
            <input
              className="id"
              type="email"
              onChange={saveUserId}
              value={id}
            />
          </div>
          <div className="pwWrapper">
            <span>Password</span>
            <input
              className="pw"
              type="password"
              onChange={saveUserPw}
              value={pw}
            />
          </div>

          {login ? (
            <button
              className="loginButton"
              disabled={!buttonStatus(id, pw)}
              onClick={FetchSignUp}
            >
              Sign up
            </button>
          ) : (
            <button
              className="loginButton"
              disabled={!buttonStatus(id, pw)}
              onClick={FetchLogIn}
            >
              Log in
            </button>
          )}

          <p className="haveAccount" onClick={signUp}>
            {login
              ? 'Have an account? Login here!'
              : 'Do not have an account? Sign up here!'}
          </p>
        </section>
      </div>
    </div>
  );
}

export default Login;
