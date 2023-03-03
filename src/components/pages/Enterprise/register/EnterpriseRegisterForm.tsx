
import { useState } from "react";
import "./EnterpriseRegister.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook, faBuilding, faChevronLeft, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const EnterpriseRegisterForm = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/enterprise/register8')
    }
    return (   
        <div id="enterprise-register">       
            <img src="/images/ApitsLogo.png" alt="Logo" className="logo"/>
            <div className="content-left">
                <h3>Success! Let's connect you with candidate.</h3>
                <div className="input-tab">
                    <div className="input-icon">
                        <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    <input type="text" className="input-text input-style" placeholder="Email"/>
                </div>
                <div className="input-tab">
                    <div className="input-icon">
                        <FontAwesomeIcon icon={faBuilding} />
                    </div>
                    <input type="text" className="input-text input-style" placeholder="Company name"/>
                </div>
                <div className="input-tab">
                    <div className="input-icon">
                        <FontAwesomeIcon icon={faAddressBook} />
                    </div>
                    <input type="text" className="input-text input-style" placeholder="Contact me"/>
                </div>
                <div className="input-tab">
                    <div className="input-icon">
                        <FontAwesomeIcon icon={faPhone} />
                    </div>
                    <input type="text" className="input-text input-style" placeholder="+84 94 123 45 67 (Optional)"/>
                </div>
                
                <div className="prolicy">
                    <p>By completing signup, you are agreeing to Apits’s<span className="text-underline">Terms of Service</span>, <span className="text-underline">Privacy Policy</span>, <span className="text-underline">Sourced Talent Matching Agreement</span>, and <span className="text-underline">Cookie Policy</span> and that Toptal may monitor or record audio or video calls for quality assurance and training purposes.</p>
                </div>
                
                
                <div className="bot-button btn-res1">
                    <button className="btn con-btn" onClick={handleClick}>Next</button>        
                </div>            
            </div>
            <div className="content-right">
                <img src="https://weisseradlerng.com/images/It-consulting2.png?fbclid=IwAR1xFcrUNJmC6K1qNd-RTaTSScB6r-PKvQB3elqxfVTCSiXGp4YxZVLx6ys" alt="" className="intro-image"/>
            </div>
        </div>     
     );
}
 
export default EnterpriseRegisterForm;