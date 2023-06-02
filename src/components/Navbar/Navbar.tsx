import { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IAuthedUser, ILoadingOpened, ILogin, ILoginUser } from '../../types';
import { actionCreators } from '../../state';
import { BeatLoader } from 'react-spinners';
import './Navbar.scss';

const Navbar: FC = () => {
  const [isOpenDropdownLocations, setIsOpenDropdownLocations] =
    useState<boolean>(false);
  const [isOpenDropdownLanguages, setIsOpenDropdownLanguages] =
    useState<boolean>(false);
  const [isOpenDropdownMenu, setIsOpenDropdownMenu] = useState<boolean>(false);
  const [isOpenPageLocations, setIsOpenPageLocations] =
    useState<boolean>(false);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const [isOpenPageMenu, setIsOpenPageMenu] = useState<boolean>(false);
  const [isDropdownMenuOpened, setIsDropdownMenuOpened] =
    useState<boolean>(false);
  const dropdownMenuLocationsRef = useRef<HTMLDivElement>(null);
  const dropdownButtonLocationsRef = useRef<HTMLButtonElement>(null);
  const dropdownMenuLanguagesRef = useRef<HTMLDivElement>(null);
  const dropdownButtonLanguagesRef = useRef<HTMLButtonElement>(null);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const dropdownButtonMenuRef = useRef<HTMLButtonElement>(null);

  const isAuthedUser = useSelector(
    (state: IAuthedUser) => state.authUser.isAuth
  );
  const userName = useSelector(
    (state: ILoginUser) => state.loginUser.userInfo?.user?.name
  );
  const isLoginOpened = useSelector(
    (state: ILogin) => state.loginForm.isOpened
  );
  const isLoadingOpened = useSelector(
    (state: ILoadingOpened) => state.loading.isOpened
  );

  const location = useLocation();

  const dispatch = useDispatch();

  const override: CSSProperties = {
    padding: '0',
  };

  const { setLoginOpened, logoutUser, setLoadingOpened } = actionCreators;

  const handleClickLoginOpen = (): void => {
    dispatch(setLoginOpened());
  };

  const handleClickOnLogout = (): void => {
    dispatch(logoutUser());
    setLoadingOpened(false);
  };

  const handleClickLocationsDropdown = (): void => {
    setIsOpenDropdownLocations(!isOpenDropdownLocations);
  };

  const handleClickLanguagesDropdown = (): void => {
    setIsOpenDropdownLanguages(!isOpenDropdownLanguages);
  };

  const handleClickCloseLocationsDropdown = (value: boolean): void => {
    setIsOpenDropdownLocations(value);
  };

  const handleClickCloseLanguagesDropdown = (value: boolean): void => {
    setIsOpenDropdownLanguages(value);
  };

  const handleClickOnDropdownMenu = (): void => {
    setIsDropdownMenuOpened(!isDropdownMenuOpened);
  };

  useEffect(() => {
    const handleClickOutsideLocations = (event: MouseEvent) => {
      if (
        dropdownMenuLocationsRef.current &&
        !dropdownButtonLocationsRef.current?.contains(event.target as Node) &&
        !dropdownMenuLocationsRef.current.contains(event.target as Node)
      ) {
        setIsOpenDropdownLocations(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutsideLocations);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideLocations);
    };
  }, [dropdownMenuLocationsRef]);

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    if (isLoginOpened) {
      body.classList.add('no-scroll');
    } else {
      body.classList.remove('no-scroll');
    }

    return () => {
      body.classList.remove('no-scroll');
    };
  }, [isLoginOpened]);

  useEffect(() => {
    const handleClickOutsideLanguages = (event: MouseEvent) => {
      if (
        dropdownMenuLanguagesRef.current &&
        !dropdownButtonLanguagesRef.current?.contains(event.target as Node) &&
        !dropdownMenuLanguagesRef.current.contains(event.target as Node)
      ) {
        setIsOpenDropdownLanguages(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutsideLanguages);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideLanguages);
    };
  }, [dropdownMenuLanguagesRef]);

  useEffect(() => {
    const handleClickOutsideMenu = (event: MouseEvent) => {
      if (
        dropdownMenuRef.current &&
        !dropdownButtonMenuRef.current?.contains(event.target as Node) &&
        !dropdownMenuRef.current.contains(event.target as Node)
      ) {
        setIsOpenDropdownMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutsideMenu);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideMenu);
    };
  }, [dropdownMenuLanguagesRef]);

  useEffect(() => {
    if (location.pathname.startsWith('/locations')) {
      setIsOpenPageLocations(true);
    } else {
      setIsOpenPageLocations(false);
    }
  }, [location]);

  useEffect(() => {
    if (location.pathname.startsWith('/menu')) {
      setIsOpenPageMenu(true);
    } else {
      setIsOpenPageMenu(false);
    }
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        setIsSmallScreen(window.visualViewport.width <= 700);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {isSmallScreen ? (
        <div className="navbarSmall-container">
          <button
            className={isDropdownMenuOpened ? 'close-btn' : 'dropdown-btn'}
            onClick={handleClickOnDropdownMenu}
          >
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </button>
          <NavLink
            to="/homepage"
            className="logo"
            onClick={handleClickOnDropdownMenu}
          >
            <h5>provence</h5>
            <h6>Europian food</h6>
          </NavLink>
          {isLoadingOpened ? (
            <button className="loginBtn">
              <BeatLoader
                color={'#fff'}
                loading={isLoadingOpened}
                cssOverride={override}
                size={10}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </button>
          ) : isAuthedUser ? (
            <button className="loginBtn" onClick={handleClickOnLogout}>
              <>
                <span className="material-symbols-outlined">logout</span>
                {userName}
              </>
            </button>
          ) : (
            <button className="loginBtn" onClick={handleClickLoginOpen}>
              log in
            </button>
          )}
          <div
            className={`dropdownMenu-container ${
              isDropdownMenuOpened ? 'opened' : 'closed'
            }`}
          >
            <button
              className={`dropdownMenu-btn ${
                isOpenDropdownLocations && 'activeBtn'
              }`}
              onClick={() => {
                handleClickLocationsDropdown();
                handleClickCloseLanguagesDropdown(false);
              }}
            >
              <p>locations</p>
              <span
                className={`material-symbols-outlined ${
                  isOpenDropdownLocations && 'more'
                }`}
              >
                expand_more
              </span>
            </button>
            {isOpenDropdownLocations && (
              <div className="dropdown">
                <NavLink
                  className="item"
                  to="locations/batumi"
                  onClick={handleClickOnDropdownMenu}
                >
                  batumi
                </NavLink>
                <NavLink
                  className="item"
                  to="locations/tbilisi"
                  onClick={handleClickOnDropdownMenu}
                >
                  tbilisi
                </NavLink>
              </div>
            )}
            <NavLink
              to="/menu/breakfasts"
              className="dropdownMenu-navlink"
              onClick={handleClickOnDropdownMenu}
            >
              menu
            </NavLink>
            <NavLink
              to="/about"
              className="dropdownMenu-navlink"
              onClick={handleClickOnDropdownMenu}
            >
              about us
            </NavLink>
            <button
              className={`dropdownMenu-btn ${
                isOpenDropdownLanguages && 'activeBtn'
              }`}
              onClick={() => {
                handleClickLanguagesDropdown();
                handleClickCloseLocationsDropdown(false);
              }}
            >
              <p>language</p>
              <span
                className={`material-symbols-outlined ${
                  isOpenDropdownLanguages && 'more'
                }`}
              >
                expand_more
              </span>
            </button>
            {isOpenDropdownLanguages && (
              <div className="dropdown">
                <p className="item">russian</p>
                <p className="item">georgian</p>
              </div>
            )}
            <div className="action-content">
              <h2>action</h2>
              <p>
                Make an order on more than 50 larries and get{' '}
                <span>free delivery</span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="navbar-container">
          <div className="navbar-subcontainer">
            <NavLink to="/homepage" className="logo">
              <h5>provence</h5>
              <h6>Europian food</h6>
            </NavLink>
            <div className="navigation">
              <button
                ref={dropdownButtonLocationsRef}
                className={`dropdownNavbarBtns ${
                  (isOpenDropdownLocations || isOpenPageLocations) && 'active'
                }`}
                onClick={() => handleClickLocationsDropdown()}
              >
                <p>locations</p>
                <span
                  className={`material-symbols-outlined ${
                    isOpenDropdownLocations && 'more'
                  }`}
                >
                  expand_more
                </span>
                {isOpenDropdownLocations && (
                  <div
                    ref={dropdownMenuLocationsRef}
                    className="dropdown-container"
                  >
                    <ul>
                      <NavLink to="locations/batumi">
                        <li>batumi</li>
                      </NavLink>
                      <NavLink to="locations/tbilisi">
                        <li>tbilisi</li>
                      </NavLink>
                    </ul>
                  </div>
                )}
              </button>
              <NavLink
                to="/menu/breakfasts"
                className={`nav-link ${isOpenPageMenu && 'active'}`}
              >
                menu
              </NavLink>
              <NavLink to="/about" className="nav-link">
                about us
              </NavLink>
              <button
                className={`dropdownNavbarBtns ${
                  isOpenDropdownLanguages && 'active'
                }`}
                onClick={() => handleClickLanguagesDropdown()}
                ref={dropdownButtonLanguagesRef}
              >
                <p>language</p>
                <span
                  className={`material-symbols-outlined ${
                    isOpenDropdownLanguages && 'more'
                  }`}
                >
                  expand_more
                </span>
                {isOpenDropdownLanguages && (
                  <div
                    className="dropdownLanguages-container"
                    ref={dropdownMenuLanguagesRef}
                  >
                    <ul>
                      <li>
                        <p>russian</p>
                      </li>
                      <li>
                        <p>georgian</p>
                      </li>
                    </ul>
                  </div>
                )}
              </button>
              {isLoadingOpened ? (
                <button className="loginBtn">
                  <BeatLoader
                    color={'#fff'}
                    loading={isLoadingOpened}
                    cssOverride={override}
                    size={10}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </button>
              ) : isAuthedUser ? (
                <button className="loginBtn" onClick={handleClickOnLogout}>
                  <>
                    <span className="material-symbols-outlined">logout</span>
                    {userName}
                  </>
                </button>
              ) : (
                <button className="loginBtn" onClick={handleClickLoginOpen}>
                  log in
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
