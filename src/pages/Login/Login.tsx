import './Login.scss';
import useLogin from './Login.hook';

function Login() {
  const {
    signUp,
    toggleObj,
    inputProps,
    purpose,
    FetchSignUp,
    login,
    inputHandler,
    inputValue,
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
            <input name="id" className="id" type="email" {...inputProps} />
          </div>
          <div className="pwWrapper">
            <small>Password</small>
            <input name="pw" className="pw" type="password" {...inputProps} />
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
