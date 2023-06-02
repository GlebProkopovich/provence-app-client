import { Route, Routes, useLocation } from 'react-router-dom';
import Aboutpage from './pages/Aboutpage/Aboutpage';
import Homepage from './pages/Homepage/Homepage';
import Locationspage from './pages/Locationpage/Locationspage';
import Navbar from './components/Navbar/Navbar';
import ContactInfo from './components/ContactInfo/ContactInfo';
import { useState, useEffect } from 'react';
import { ILogin, IRegistration, IRegistrationCompleteWindow } from './types';
import { useDispatch, useSelector } from 'react-redux';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Menupage from './pages/Menupage/Menupage';
import { actionCreators } from './state';
import Cartpage from './pages/Cartpage/Cartpage';
import RegistrationCompletedModal from './components/RegistrationCompleted/RegistrationCompleted';
import ApprovedMail from './pages/ApprovedMailpage/ApprovedMail';
import './App.scss';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const isLoginOpened = useSelector(
    (state: ILogin) => state.loginForm.isOpened
  );
  const isRegistrationOpened = useSelector(
    (state: IRegistration) => state.registrationForm.isOpened
  );
  const isRegistrationCompleted = useSelector(
    (state: IRegistrationCompleteWindow) =>
      state.registrationCompletedWindow.isOpened
  );

  const { refresh, getDefaultCart } = actionCreators;

  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/menu')) {
      setIsMenuOpen(true);
    } else {
      setIsMenuOpen(false);
    }
  }, [location]);

  useEffect(() => {
    const isAppStarted = localStorage.getItem('persist:root');
    !isAppStarted && dispatch(getDefaultCart());

    if (localStorage.getItem('token')) {
      dispatch(refresh());
    }
  }, []);

  return (
    <>
      <header className={isMenuOpen ? 'header-relative' : 'header-sticky'}>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route index element={<Homepage />} />
          <Route
            path="locations/batumi"
            element={
              <Locationspage
                position={[41.64780334961626, 41.637785801151125]}
                locationOfTheRestaurant="batumi"
                adressOfTheRestaurant="44 Vakhtang Gorgasali St, Batumi"
              />
            }
          />
          <Route
            path="locations/tbilisi"
            element={
              <Locationspage
                position={[41.690252362708584, 44.80768211499577]}
                locationOfTheRestaurant="tbilisi"
                adressOfTheRestaurant="49 Kote Afkhazi St, T'bilisi"
              />
            }
          />
          <Route path="menu/:dishUrl" element={<Menupage />} />
          <Route path="cart" element={<Cartpage />} />
          <Route path="about" element={<Aboutpage />} />
          <Route path="approval" element={<ApprovedMail />} />
          <Route path="*" element={<Homepage />} />
        </Routes>
        {isLoginOpened && <Login />}
        {isRegistrationOpened && <Registration />}
        {isRegistrationCompleted && <RegistrationCompletedModal />}
      </main>
      <footer>
        <ContactInfo />
      </footer>
    </>
  );
}

export default App;
