import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../../state';
import './ErrorModal.scss';

const ErrorModal: FC = () => {
  const dispatch = useDispatch();

  const { setErrorWindowOpened } = actionCreators;

  const handleClickOnBtn = (value: boolean): void => {
    dispatch(setErrorWindowOpened(value));
  };

  return (
    <div
      className="errorModal-container"
      onClick={() => handleClickOnBtn(false)}
    >
      <div className="errorModal-subcontainer">
        <span className="material-symbols-outlined errorIcon">error</span>
        <h1>Something went wrong...</h1>
        <h2>Please fill the form correctly!</h2>
        <button
          className="goToCart-btn"
          onClick={() => handleClickOnBtn(false)}
        >
          Go to cart
        </button>
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

export default ErrorModal;
