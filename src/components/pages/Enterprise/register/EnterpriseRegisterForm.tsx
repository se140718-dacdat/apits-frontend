
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
            <img src="/images/ApitsLogo.png" alt="Logo" className="logo"/>
            <div className="content-left">
                <h3>Success! Let's connect you with talent.</h3>
                
                <input type="text" />
                
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