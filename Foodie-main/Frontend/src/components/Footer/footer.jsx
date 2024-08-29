import React from 'react';
import './footer.css';


import instagramIcon from '../../assets/instagram.svg';
import twitterIcon from '../../assets/twitter.svg';
import facebookIcon from '../../assets/facebook.svg';

function Footer() {
  return (
    <div className="footer">
      <div className="footer1">
        <div className="footer1-grid">
          <div className="footer-list">
            <h4>Foodie</h4>
            <p><a href="#">About</a></p>
            <p><a href="#">Help and Support</a></p>
            <p><a href="#">Contact Us</a></p>
            <p><a href="#">Delivery Policies</a></p>
            <p><a href="#">Privacy Policies</a></p>
          </div>
          <div className="footer-list">
            <h4>Explore</h4>
            <p><a href="#">Offers</a></p>
            <p><a href="#">Disclaimers</a></p>
            <p><a href="#">Refer and Earn</a></p>
            <p><a href="#">Investors</a></p>
            <p><a href="#">Vendors</a></p>
          </div>
          <div className="footer-list follow-box">
            <h4>Follow</h4>
            <img className="icon-imgg btn" src={instagramIcon} alt="Instagram" />
            <img className="icon-imgg btn" src={twitterIcon} alt="Twitter" />
            <img className="icon-imgg btn" src={facebookIcon} alt="Facebook" />
          </div>
        </div>
      </div>
      <div className="footer2">
        <p id="copyright-txt">All Right Reserved &copy;2024 Foodie</p>
      </div>
    </div>
  );
}

export default Footer;
