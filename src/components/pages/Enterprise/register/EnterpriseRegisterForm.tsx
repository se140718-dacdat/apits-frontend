
import { useState } from "react";
import "./EnterpriseRegister.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const EnterpriseRegisterForm = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/enterprise/register8')
    }
    return (   
        <div id="enterprise-register">       
            <div className="content-left">
                <img src="/images/ApitsLogo.png" alt="Logo" className="logo"/>
                <h3>Success! Let's connect you with talent.</h3>
                
                <div className="bot-button btn-res1">
                    <button className="btn con-btn" onClick={handleClick}>Next</button>        
                </div>            
            </div>
            <div className="content-right">
                <img src="https://thumbs.dreamstime.com/z/register-now-button-vector-illustration-orange-round-web-icon-white-background-121332081.jpg" alt="" className="intro-image"/>
            </div>
        </div>     
     );
}
 
export default EnterpriseRegisterForm;