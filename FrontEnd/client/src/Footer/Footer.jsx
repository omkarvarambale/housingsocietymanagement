import Styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import Copyright from "../Copyright/Copyright";

const Footer = () => {
  return (
    <>
      <div className={`${Styles.footerWrapper}`}>
        <div className={`container ${Styles.footer}`}>
          <div className={`${Styles.aboutSociety}`}>
            <div>
              <h2>Contact us</h2>
              <p>
                <i className="fas fa-envelope"></i>
                <span> omkaradagale4883@gmail.com</span>
              </p>
              <p style={{alignItems:'flex-start'}}>
                      <i className="fas fa-map-marker-alt"></i>
                <span>
                  Housing Society ,Satara <br /> RajPath Road, Maharashtra,
                  <br /> india.
                </span>
              </p>
            </div>
          </div>
          <div className={`${Styles.quickLinks}`}>
            <div>
              <h2>Quick Links</h2>
              <ul>
                <Link to="/advertise">
                  <li>Advertise</li>
                </Link>
                <Link to="/gallery">
                  <li>Gallery</li>
                </Link>
                <Link to="/contactus">
                  <li>Contact us</li>
                </Link>
              </ul>
            </div>
          </div>
          <div className={`${Styles.eventsPlanning}`}>
            <div>
              <h2>Events Planning</h2>
              <p>
                For performing any events in the society grant permission from society admin.
              </p>
              <Link to="/contactus">
                <button className="btn btn-danger">Contact Us</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Copyright />
    </>
  );
};

export default Footer;
