import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';
import Input from './Input/input';
import './Login.scss';

function Login() {
  const navigate = useNavigate();
  const {
    purpose,
    inputHandler,
    inputProps,
    toggleObj,
    inputValue,
    signUp,
    login,
  } = useLogin();
  // 왜 state 는 inteface로 안 빼는 게 좋은지
  // => useState() 안에 초기값을 설정 안 해주므로 이때 string || undefined 으로 변환되기 때문에 밑의 애들까지 undefined 일때 어떻게 할지 다 설정해줘야함
  // 그래서 State 초기값 안에서 타입과 함께 설정해주는 것이 best

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

  return (
    <div className="login">
      <div className="loginWrapper">
        <section className="header">
          <p>{purpose()}</p>
        </section>
        <section className="inputWrapper">
          <div className="idWrapper">
            <small>Email</small>
            <Input name="id" className="id" type="email" {...inputProps} />
          </div>
          <div className="pwWrapper">
            <small>Password</small>
            <Input name="pw" className="pw" type="password" {...inputProps} />
          </div>
          {login === 'signup' && (
            <div className="pwWrapper">
              <span>confirm</span>
              <input
                name="confirm"
                className="pw"
                type="password"
                onChange={inputHandler}
                {...inputProps}
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
