import React from 'react';
import './Login.scss';
import useLogin from './useLogin';

function Login() {
  const {
    purpose,
    inputValue,
    inputHandler,
    login,
    toggleObj,
    FetchSignUp,
    signUp,
  } = useLogin();

  return (
    <div className="login">
      <div className="loginWrapper">
        <section className="header">
          <p>{purpose()}</p>
        </section>
        <section className="inputWrapper">
          <div className="idWrapper">
            <small>Email</small>
            <input
              name="id"
              className="id"
              type="email"
              value={inputValue.id}
              onChange={inputHandler}
            />
          </div>
          <div className="pwWrapper">
            <small>Password</small>
            <input
              name="pw"
              className="pw"
              type="password"
              value={inputValue.pw}
              onChange={inputHandler}
            />
          </div>
          {login === 'signup' && (
            <div className="pwWrapper">
              <span>confirm</span>
              <input
                name="confirm"
                className="pw"
                type="password"
                value={inputValue.pw}
                onChange={inputHandler}
              />
            </div>
          )}
          <button
            className="loginButton"
            disabled={!toggleObj[login]}
            onClick={() => FetchSignUp(inputValue.id, inputValue.pw)}
          >
            {purpose()}
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
