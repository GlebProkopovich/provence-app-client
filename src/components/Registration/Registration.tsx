import {
  FocusEvent,
  ChangeEvent,
  FC,
  useState,
  useEffect,
  FormEvent,
  CSSProperties,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { ILoadingOpened, IRegistration, IRegistrationError } from '../../types';
import { actionCreators } from '../../state';
import './Registration.scss';

const Registration: FC = () => {
  const [nameValue, setNameValue] = useState<string>('');
  const [numberValue, setNumberValue] = useState<string>('');
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [isNameFocused, setIsNameFocused] = useState<boolean>(false);
  const [isNumberFocused, setIsNumberFocused] = useState<boolean>(false);
  const [isEmailFocused, setIsEmailFocused] = useState<boolean>(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false);
  const [nameError, setNameError] = useState<string>("Name can't be empty");
  const [numberError, setNumberError] = useState<string>(
    "Phone number can't be empty"
  );
  const [emailError, setEmailError] = useState<string>("Email can't be empty");
  const [passwordError, setPasswordError] = useState<string>(
    "Password can't be empty"
  );
  const [nameValueDirty, setNameValueDirty] = useState<boolean>(false);
  const [numberValueDirty, setNumberValueDirty] = useState<boolean>(false);
  const [emailValueDirty, setEmailValueDirty] = useState<boolean>(false);
  const [passwordValueDirty, setPasswordValueDirty] = useState<boolean>(false);

  const isRegistrationOpened = useSelector(
    (state: IRegistration) => state.registrationForm.isOpened
  );
  const registrationError = useSelector((state: IRegistrationError) => state)
    .registrationUser.error;
  const isLoadingOpened = useSelector(
    (state: ILoadingOpened) => state.loading.isOpened
  );

  const dispatch = useDispatch();

  const { setLoginOpened, setRegistrationOpened, registrationUser } =
    actionCreators;

  const override: CSSProperties = {
    margin: '0 auto',
  };

  const handleClickOutsideForm = (): void => {
    dispatch(setRegistrationOpened());
  };

  const handleClickOnCloseBtn = (): void => {
    dispatch(setRegistrationOpened());
  };

  const handleClickOnSignIn = (): void => {
    dispatch(setRegistrationOpened());
    dispatch(setLoginOpened());
  };

  const handleNameValue = (e: ChangeEvent<HTMLInputElement>): void => {
    setNameValue(e.target.value);
    if (e.target.value.length === 0) {
      setNameError("Name can't be empty");
    } else if (e.target.value.length < 2) {
      setNameError("The length of the name can't be less than 2 symbols");
    } else {
      setNameError('');
    }
  };

  const handleNumberValue = (e: ChangeEvent<HTMLInputElement>): void => {
    setNumberValue(e.target.value);
    const re = /^(\+?995)?(79\d{7}|5\d{8})$/;
    if (e.target.value.length === 0) {
      setNumberError("Phone number can't be empty");
    } else if (!re.test(e.target.value)) {
      setNumberError('Incorrect phone number');
    } else {
      setNumberError('');
    }
  };

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

  const handleOnBlurName = (): void => {
    nameValue ? setIsNameFocused(true) : setIsNameFocused(false);
  };

  const handleOnBlurNumber = (): void => {
    numberValue ? setIsNumberFocused(true) : setIsNumberFocused(false);
  };

  const handleOnBlurEmail = (): void => {
    emailValue ? setIsEmailFocused(true) : setIsEmailFocused(false);
  };

  const handleOnBlurPassword = (): void => {
    passwordValue ? setIsPasswordFocused(true) : setIsPasswordFocused(false);
  };

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const registrationRequest = async () => {
      await dispatch(
        registrationUser(nameValue, numberValue, emailValue, passwordValue)
      );
    };
    registrationRequest();
  };

  const handleOnBlurValidation = (e: FocusEvent<HTMLInputElement>): void => {
    switch (e.target.name) {
      case 'name':
        setNameValueDirty(true);
        break;
      case 'number':
        setNumberValueDirty(true);
        break;
      case 'email':
        setEmailValueDirty(true);
        break;
      case 'password':
        setPasswordValueDirty(true);
        break;
    }
  };

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    if (isRegistrationOpened) {
      body.classList.add('no-scroll');
    } else {
      body.classList.remove('no-scroll');
    }
    return () => {
      body.classList.remove('no-scroll');
    };
  }, [isRegistrationOpened]);

  return (
    <>
      <div>
        <div
          className="registration-container"
          onClick={handleClickOutsideForm}
        >
          <div
            className="registration-subcontainer"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSubmitForm}>
              <div className="name-container inputs">
                <label
                  htmlFor="name"
                  className={`${
                    (isNameFocused || nameValue) && 'label-focused'
                  }`}
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={nameValue}
                  onChange={handleNameValue}
                  onFocus={() => setIsNameFocused(true)}
                  onBlur={(e) => {
                    handleOnBlurName();
                    handleOnBlurValidation(e);
                  }}
                />
                {nameValueDirty && nameError && (
                  <div className="error">{nameError}</div>
                )}
              </div>
              <div className="number-container inputs">
                <label
                  htmlFor="number"
                  className={`${
                    (isNumberFocused || numberValue) && 'label-focused'
                  }`}
                >
                  Phone number
                </label>
                <input
                  id="number"
                  type="tel"
                  name="number"
                  value={numberValue}
                  onChange={handleNumberValue}
                  onFocus={() => setIsNumberFocused(true)}
                  onBlur={(e) => {
                    handleOnBlurNumber();
                    handleOnBlurValidation(e);
                  }}
                />
                {numberValueDirty && numberError && (
                  <div className="error">{numberError}</div>
                )}
              </div>
              <div className="email-container inputs">
                <label
                  htmlFor="email"
                  className={`${
                    (isEmailFocused || emailValue) && 'label-focused'
                  }`}
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
                  className={`${
                    (isPasswordFocused || passwordValue) && 'label-focused'
                  }`}
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
                {passwordValueDirty && passwordError && (
                  <div className="error">{passwordError}</div>
                )}
              </div>
              {registrationError && (
                <div className="registrationError">{`${registrationError}!`}</div>
              )}
              <button className="signUp-btn" type="submit">
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
                  'Sign Up'
                )}
              </button>
              <div className="signIn-container">
                <p>Already have an account?</p>
                <button onClick={handleClickOnSignIn}>Sign In</button>
              </div>
            </form>
            <button>
              <span
                className="material-symbols-outlined close-btn"
                onClick={handleClickOnCloseBtn}
              >
                close
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
