import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../../state';
import './SuccessModal.scss';

const SuccessfullOrder = () => {
  const dispatch = useDispatch();

  const { setSuccessfullWindowOpened } = actionCreators;

  const handleClickOnBtn = (value: boolean): void => {
    dispatch(setSuccessfullWindowOpened(value));
  };

  return (
    <div
      className="successModal-container"
      onClick={() => handleClickOnBtn(false)}
    >
      <div className="successModal-subcontainer">
        <span className="material-symbols-outlined orderDonePicture">
          task_alt
        </span>
        <h1>Great!</h1>
        <h2>
          Your order was sent! Our operator make you a call in few minutes.
        </h2>
        <NavLink to="/menu/breakfasts" onClick={() => handleClickOnBtn(false)}>
          Go to menu
        </NavLink>
        <button>
          <span
            className="material-symbols-outlined close-btn"
            onClick={() => handleClickOnBtn(false)}
          >
            close
          </span>
        </button>
      </div>
    </div>
  );
};

export default SuccessfullOrder;
