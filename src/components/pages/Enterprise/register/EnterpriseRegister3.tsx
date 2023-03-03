import { useState } from "react";
import "./EnterpriseRegister.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const RegisterForm3 = () => {
    const [selectedOption, setSelectedOption] = useState("Full time (40 or more hrs/week)");
    const handleChange = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(changeEvent.currentTarget.value)
    }
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/enterprise/register4')
    }
    const handleBackClick = () => {
        navigate('/enterprise/register2')
    }
    return (   
        <div id="enterprise-register">       
            <img src="/images/ApitsLogo.png" alt="Logo" className="logo"/>
            <div className="content-left">
                <h3>What level of time commitment will you require from the developer?</h3>
                <div className="radio">
                    <input type="radio" 
                        value='Full time (40 or more hrs/week)'
                        checked={selectedOption === 'Full time (40 or more hrs/week)'} 
                        onChange={handleChange}    
                    />
                    <label className="radio-content">
                        <span className="radio-header">Full time (40 or more hrs/week)</span>
                    </label>
                </div>
                <div className="radio">
                    <input type="radio" 
                        value='Part time (Less than 40 hrs/week)'
                        checked={selectedOption === 'Part time (Less than 40 hrs/week)'} 
                        onChange={handleChange}    
                    />
                    <label className="radio-content" >
                        <span className="radio-header">Part time (Less than 40 hrs/week)</span>
                    </label>
                </div>
                <div className="radio">
                    <input type="radio" 
                        value='Hourly'
                        checked={selectedOption === 'Hourly'} 
                        onChange={handleChange}    
                    />
                    <label className="radio-content">
                        <span className="radio-header">Hourly</span>
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
 
export default RegisterForm3;