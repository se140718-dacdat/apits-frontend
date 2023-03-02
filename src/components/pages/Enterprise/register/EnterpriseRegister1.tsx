import { useState } from "react";
import "./EnterpriseRegister.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const RegisterForm1 = () => {
    const [selectedOption, setSelectedOption] = useState("New idea or project");
    const handleChange = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(changeEvent.currentTarget.value)
    }
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/enterprise/register2')
    }
    const handleBackClick = () => {
        navigate('/enterprise/register')
    }
    return (   
        <div id="enterprise-register">       
            <div className="content-left">
                <img src="/images/ApitsLogo.png" alt="Logo" className="logo"/>
                <h3>What role would you like to hire?</h3>
                <div className="radio">
                    <input type="radio" 
                        value='New idea or project'
                        checked={selectedOption === 'New idea or project'} 
                        onChange={handleChange}    
                    />
                    <label className="radio-content">
                        <span className="radio-header">New idea or project</span>
                    </label>
                </div>
                <div className="radio">
                    <input type="radio" 
                        value='Existing project that needs more resources'
                        checked={selectedOption === 'Existing project that needs more resources'} 
                        onChange={handleChange}    
                    />
                    <label className="radio-content" >
                        <span className="radio-header">Existing project that needs more resources</span>
                    </label>
                </div>
                <div className="radio">
                    <input type="radio" 
                        value='Ongoing assistance or consultation'
                        checked={selectedOption === 'Ongoing assistance or consultation'} 
                        onChange={handleChange}    
                    />
                    <label className="radio-content">
                        <span className="radio-header">Ongoing assistance or consultation</span>
                    </label>
                </div>
                <div className="radio">
                    <input type="radio" 
                        value="None of the above, I'm just looking to learn more about Toptal"
                        checked={selectedOption === "None of the above, I'm just looking to learn more about Toptal"} 
                        onChange={handleChange}    
                    />
                    <label className="radio-content">
                        <span className="radio-header">None of the above, I'm just looking to learn more about Toptal</span>
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
                <img src="https://thumbs.dreamstime.com/z/register-now-button-vector-illustration-orange-round-web-icon-white-background-121332081.jpg" alt="" className="intro-image"/>
            </div>
        </div>     
     );
}
 
export default RegisterForm1;