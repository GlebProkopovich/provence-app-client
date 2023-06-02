import {
  FocusEvent,
  ChangeEvent,
  FC,
  useState,
  FormEvent,
  CSSProperties,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../../state';
import { BeatLoader } from 'react-spinners';
import { ILoadingOpened, ILoginError } from '../../types';
import './Login.scss';

const Login: FC = () => {
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [emailValueDirty, setEmailValueDirty] = useState<boolean>(false);
  const [passwordValueDirty, setPasswordValueDirty] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("Email can't be empty");
  const [passwordError, setPasswordError] = useState<string>(
    "Password can't be empty"
  );
  const [isEmailFocused, setIsEmailFocused] = useState<boolean>(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false);

  const loginError = useSelector((state: ILoginError) => state.loginUser.error);
  const isLoadingOpened = useSelector(
    (state: ILoadingOpened) => state.loading.isOpened
  );

  const override: CSSProperties = {
    margin: '0 auto',
  };

  const dispatch = useDispatch();

  const { setLoginOpened, setRegistrationOpened, loginUser } = actionCreators;

  const handleEmailValue = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmailValue(e.target.value);
    if (
      !String(e.target.value)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setEmailError('Incorrect email');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordValue = (e: ChangeEvent<HTMLInputElement>): void => {
    setPasswordValue(e.target.value);
    if (e.target.value.length === 0) {
      setPasswordError("Password can't be empty");
    } else if (e.target.value.length < 3) {
      setPasswordError(
        "The length of the password can't be less than 3 symbols"
      );
    } else {
      setPasswordError('');
    }
  };

  const handleClickOnSignUp = (): void => {
    dispatch(setRegistrationOpened());
    dispatch(setLoginOpened());
  };

  const handleClickLoginOpen = (): void => {
    dispatch(setLoginOpened());
  };

  const handleClickOnCloseLogin = (): void => {
    dispatch(setLoginOpened());
  };

  const handleOnBlurEmail = (): void => {
    emailValue ? setIsEmailFocused(true) : setIsEmailFocused(false);
  };

  const handleOnBlurPassword = (): void => {
    passwordValue ? setIsPasswordFocused(true) : setIsPasswordFocused(false);
  };

  const handleOnBlurValidation = (e: FocusEvent<HTMLInputElement>): void => {
    switch (e.target.name) {
      case 'email':
        setEmailValueDirty(true);
        break;
      case 'password':
        setPasswordValueDirty(true);
        break;
    }
  };

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser(emailValue, passwordValue));
  };

  return (
    <div className="login-container" onClick={handleClickLoginOpen}>
      <div className="login-subcontainer" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmitForm}>
          <div className="email-container inputs">
            <label
              htmlFor="email"
              className={`${(isEmailFocused || emailValue) && 'label-focused'}`}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={emailValue}
              onChange={handleEmailValue}
              onFocus={() => setIsEmailFocused(true)}
              onBlur={(e) => {
                handleOnBlurEmail();
                handleOnBlurValidation(e);
              }}
            />
            {emailValueDirty && emailError && (
              <div className="error">{emailError}</div>
            )}
          </div>
          <div className="password-container inputs">
            <label
              htmlFor="password"
              className={`${isPasswordFocused && 'label-focused'}`}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={passwordValue}
              onChange={handlePasswordValue}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={(e) => {
                handleOnBlurPassword();
                handleOnBlurValidation(e);
              }}
            />
            {passwordError && passwordValueDirty && (
              <div className="error">{passwordError}</div>
            )}
          </div>
          {loginError && <div className="loginError">{`${loginError}!`}</div>}
          <button className="signIn-btn" type="submit">
            {isLoadingOpened ? (
              <BeatLoader
                color={'#fff'}
                loading={isLoadingOpened}
                cssOverride={override}
                size={15}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              'Sign In'
            )}
          </button>
          <div className="signUp-container">
            <p>Don't have an account?</p>
            <button onClick={handleClickOnSignUp}>Sign Up</button>
          </div>
        </form>
        <button>
          <span
            className="material-symbols-outlined close-btn"
            onClick={handleClickOnCloseLogin}
          >
            close
          </span>
        </button>
      </div>
    </div>
  );
};

export default Login;
