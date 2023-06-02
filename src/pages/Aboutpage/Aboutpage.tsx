import { FC } from 'react';
import smilingGirl from '../../images/smilingGirl.jpg';
import './Aboutpage.scss';

const Aboutpage: FC = () => {
  return (
    <div className="aboutpage-container">
      <div className="img">
        <img src={smilingGirl} alt="Smiling girl" />
      </div>
      <div className="text-content">
        <h1>Welcome to Provence!</h1>
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;A Georgia-based restaurant offering vibrant
          European flavors. Our menu features waffle-sandwiches, sweet waffles,
          and more, embodying European gastronomy.
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;Inspired by Provence's culinary traditions,
          our inviting ambiance transports you to Southern France. Our talented
          chefs curate a menu that celebrates European cuisine, using the finest
          local and international ingredients to create culinary masterpieces.
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;At Provence, we believe in the power of food
          to foster community. With impeccable service, we provide a delightful
          dining experience where European cuisine and Georgian hospitality
          intertwine.
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;Join us at Provence for a memorable
          gastronomic adventure.
        </p>
      </div>
    </div>
  );
};

export default Aboutpage;
