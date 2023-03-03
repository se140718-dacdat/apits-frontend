import { useState } from "react";
import "./EnterpriseRegister.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const RegisterForm2= () => {
    const [selectedOption, setSelectedOption] = useState("Less than 1 week");
    const handleChange = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(changeEvent.currentTarget.value)
    }
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/enterprise/register3')
    }
    const handleBackClick = () => {
        navigate('/enterprise/register1')
    }
    return (   
        <div id="enterprise-register">       
            <img src="/images/ApitsLogo.png" alt="Logo" className="logo"/>
            <div className="content-left">
                <h3>How long do you need the developer?</h3>
                <div className="radio">
                    <input type="radio" 
                        value='Less than 1 week'
                        checked={selectedOption === 'Less than 1 week'} 
                        onChange={handleChange}    
                    />
                    <label className="radio-content">
                        <span className="radio-header">Less than 1 week</span>
                    </label>
                </div>
                <div className="radio">
                    <input type="radio" 
                        value='1 to 4 weeks'
                        checked={selectedOption === '1 to 4 weeks'} 
                        onChange={handleChange}    
                    />
                    <label className="radio-content" >
                        <span className="radio-header">1 to 4 weeks</span>
                    </label>
                </div>
                <div className="radio">
                    <input type="radio" 
                        value='1 to 3 months'
                        checked={selectedOption === '1 to 3 months'} 
                        onChange={handleChange}    
                    />
                    <label className="radio-content">
                        <span className="radio-header">1 to 3 months</span>
                    </label>
                </div>
                <div className="radio">
                    <input type="radio" 
                        value="3 to 6 months"
                        checked={selectedOption === "3 to 6 months"} 
                        onChange={handleChange}    
                    />
                    <label className="radio-content">
                        <span className="radio-header">3 to 6 months</span>
                    </label>
                </div>
                <div className="radio">
                    <input type="radio" 
                        value="Longer than 6 months"
                        checked={selectedOption === "Longer than 6 months"} 
                        onChange={handleChange}    
                    />
                    <label className="radio-content">
                        <span className="radio-header">Longer than 6 months</span>
                    </label>
                </div>
                <div className="radio">
                    <input type="radio" 
                        value="I'll decide later"
                        checked={selectedOption === "I'll decide later"} 
                        onChange={handleChange}    
                    />
                    <label className="radio-content">
                        <span className="radio-header">I'll decide later</span>
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
                <img src="https://weisseradlerng.com/images/It-consulting2.png?fbclid=IwAR1xFcrUNJmC6K1qNd-RTaTSScB6r-PKvQB3elqxfVTCSiXGp4YxZVLx6ys" alt="" className="intro-image"/>
            </div>
        </div>     
     );
}
 
export default RegisterForm2;