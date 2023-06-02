import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import './ApprovedMail.scss';

const ApprovedMail: FC = () => {
  return (
    <div className="approvedMail-container">
      <div className="approvedMail-subcontainer">
        <span className="material-symbols-outlined orderDonePicture">
          task_alt
        </span>
        <h1>Great!</h1>
        <h2>
          Your email was successfully approved.
          <br />
          Let's make an order!
        </h2>
        <NavLink to="/menu/breakfasts">Go to menu</NavLink>
      </div>
    </div>
  );
};

export default ApprovedMail;
