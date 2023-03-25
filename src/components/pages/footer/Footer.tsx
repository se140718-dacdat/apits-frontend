import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Footer.css'
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';


const Footer = () => {
    return (
        <footer id="Footer" className="footer-distributed">

            <div className="footer-left">
                <div className="footer-logo">
                    <img src='/images/ApitsIcon.png' className='footer__logo--thin'></img>
                    <h3>Apits</h3>
                </div>
                <p className="footer-links">
                    <a href="#" className="link-1">Home</a>

                    <a href="#">Blog</a>

                    <a href="#">Pricing</a>

                    <a href="#">About</a>

                    <a href="#">Faq</a>

                    <a href="#">Contact</a>
                </p>

                <p className="footer-company-name">Apits © 2023</p>
            </div>

            <div className="footer-center">

                <div>
                    <FontAwesomeIcon icon={faLocationDot} className='icon-size' />

                    <p><span>Dictrict 9, Thu Duc city</span> Ho Chi Minh city, Viet Nam</p>
                </div>

                <div>
                    <FontAwesomeIcon icon={faPhone} className='icon-size' />
                    <p>+84 555.555.555</p>
                </div>

                <div>
                    <FontAwesomeIcon icon={faEnvelope} className='icon-size' />
                    <p><a href="#">apits@gmail.com</a></p>
                </div>

            </div>

            <div className="footer-right">

                <p className="footer-company-about">
                    <span>About the company</span>
                    The application to provide high-quality information technology personnel was born to help businesses solve the problem of finding high-quality IT human resources. This system makes it easier and more time-saving for businesses to find high-quality human resources.
                </p>

                <div className="footer-icons">

                    <a href="#">
                        <img src='images/icon-facebook.png' className='icon-fb' />
                    </a>
                    <a href="#"><img src='images/icon-twitter.png' className='icon-tw' /></a>
                    <a href="#"><img src='images/icon-github.png' className='icon-git' /></a>
                    <a href="#"><img src='images/icon-linkedin.png' className='icon-in' /></a>

                </div>

            </div>

        </footer>
    );
}

export default Footer;