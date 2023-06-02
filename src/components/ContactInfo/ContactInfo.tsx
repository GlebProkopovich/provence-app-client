import { FC } from 'react';
import instagramIcon from '../../images/icons/instagramIcon.png';
import twitterIcon from '../../images/icons/twitterIcon.png';
import whatsappIcon from '../../images/icons/whatsappIcon.png';
import facebookIcon from '../../images/icons/facebookIcon.png';
import './ContactInfo.scss';

const ContactInfo: FC = () => {
  return (
    <div className="contactInfo-container">
      <h3>contact</h3>
      <div className="separator"></div>
      <a
        className="gmail"
        href="https://www.provencesaburtalo@gmail.com"
        target="_blank"
        rel="noreferrer"
      >
        provencesaburtalo@gmail.com
      </a>
      <div className="social-medias">
        <a
          href="https://www.instagram.com/provence.georgia/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={instagramIcon} alt="instagramIcon" />
        </a>
        <a
          href="https://www.facebook.com/provence.batumi?mibextid=LQQJ4d"
          target="_blank"
          rel="noreferrer"
        >
          <img src={facebookIcon} alt="facebookIcon" />
        </a>
        <a
          href="https://api.whatsapp.com/send?phone=995568863212"
          target="_blank"
          rel="noreferrer"
        >
          <img src={whatsappIcon} alt="whatsappIcon" />
        </a>
        <a
          href="https://api.whatsapp.com/send?phone=995568863212"
          target="_blank"
          rel="noreferrer"
        >
          <img src={twitterIcon} alt="twitterIcon" />
        </a>
      </div>
      <h6>provence</h6>
    </div>
  );
};

export default ContactInfo;
