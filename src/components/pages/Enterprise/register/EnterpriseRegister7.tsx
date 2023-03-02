import { useState } from "react";
import "./EnterpriseRegister.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const RegisterForm7 = () => {
    const [selectedOption, setSelectedOption] = useState("Less than $70/hr");
    const handleChange = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(changeEvent.currentTarget.value)
    }
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/enterprise/register-form')
    }
    const handleBackClick = () => {
        navigate('/enterprise/register6')
    }
    return (   
        <div id="enterprise-register">       
            <div className="content-left">
                <img src="/images/ApitsLogo.png" alt="Logo" className="logo"/>
                <h3>What is your budget for this role?</h3>
                <div className="radio">
                    <input type="radio" 
                        value='Less than $70/hr'
                        checked={selectedOption === 'Less than $70/hr'} 
                        onChange={handleChange}    
                    />
                    <label className="radio-content">
                        <span className="radio-header">Less than $70/hr</span>
                    </label>
                </div>
                <div className="radio">
                    <input type="radio" 
                        value='$70 - $90/hr'
                        checked={selectedOption === '$70 - $90/hr'} 
                        onChange={handleChange}    
                    />
                    <label className="radio-content" >
                        <span className="radio-header">$70 - $90/hr</span>
                    </label>
                </div>
                <div className="radio">
                    <input type="radio" 
                        value='$91 - $110/hr'
                        checked={selectedOption === '$91 - $110/hr'} 
                        onChange={handleChange}    
                    />
                    <label className="radio-content" >
                        <span className="radio-header">$91 - $110/hr</span>
                    </label>
                </div>
                <div className="radio">
                    <input type="radio" 
                        value='More than $110/hr'
                        checked={selectedOption === 'More than $110/hr'} 
                        onChange={handleChange}    
                    />
                    <label className="radio-content" >
                        <span className="radio-header">More than $110/hr</span>
                    </label>
                </div>
                <div className="radio">
                    <input type="radio" 
                        value="Not sure on budget yet"
                        checked={selectedOption === "Not sure on budget yet"} 
                        onChange={handleChange}    
                    />
                    <label className="radio-content">
                        <span className="radio-header">Not sure on budget yet</span>
                    </label>
                </div>
                <div className="bot-button btn-res1">
                    <div className="btn-back">
                        <FontAwesomeIcon icon={faChevronLeft} />
                        <a href="#" onClick={handleBackClick}>Back</a>
                    </div>
                    <button className="btn con-btn" onClick={handleClick}>Next</button>        
                </div>            
            </div>
            <div className="content-right">
                <img src="https://www.york.k12.sc.us/cms/lib/SC02205956/Centricity//Domain/48/011923%20JoinourTeam%20ICON.png" alt="" className="intro-image"/>
            </div>
        </div>     
     );
}
 
export default RegisterForm7;