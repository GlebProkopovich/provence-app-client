import { FC } from 'react';
import waffleSandwich from '../../images/waffle-sandwich.png';
import { NavLink } from 'react-router-dom';
import './Homepage.scss';

const Homepage: FC = () => {
  return (
    <div className="homepage-container">
      <div className="homepage-subcontainer">
        <h4>new!</h4>
        <h3>discount 20%</h3>
        <h5>just order by our delivery service</h5>
        <NavLink to="menu/breakfasts">order now</NavLink>
        <div className="main-image">
          <img src={waffleSandwich} alt="waffle-sandwich" />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
