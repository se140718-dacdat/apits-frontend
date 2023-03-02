import { useState } from "react";
import "./EnterpriseRegister.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const RegisterForm5 = () => {
    const [selectedOption, setSelectedOption] = useState("Immediately");
    const handleChange = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(changeEvent.currentTarget.value)
    }
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/enterprise/register6')
    }
    const handleBackClick = () => {
        navigate('/enterprise/register4')
    }
    return (   
        <div id="enterprise-register">       
            <div className="content-left">
                <img src="/images/ApitsLogo.png" alt="Logo" className="logo"/>
                <h3>When do you need the developer to start?</h3>
                <div className="radio">
                    <input type="radio" 
                        value='Immediately'
                        checked={selectedOption === 'Immediately'} 
                        onChange={handleChange}    
                    />
                    <label className="radio-content">
                        <span className="radio-header">Immediately</span>
                    </label>
                </div>
                <div className="radio">
                    <input type="radio" 
                        value='In 1 to 2 weeks'
                        checked={selectedOption === 'In 1 to 2 weeks'} 
                        onChange={handleChange}    
                    />
                    <label className="radio-content" >
                        <span className="radio-header">In 1 to 2 weeks</span>
                    </label>
                </div>
                <div className="radio">
                    <input type="radio" 
                        value='More than 2 weeks from now'
                        checked={selectedOption === 'More than 2 weeks from now'} 
                        onChange={handleChange}    
                    />
                    <label className="radio-content">
                        <span className="radio-header">More than 2 weeks from now</span>
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
                <img src="https://www.york.k12.sc.us/cms/lib/SC02205956/Centricity//Domain/48/011923%20JoinourTeam%20ICON.png" alt="" className="intro-image"/>
            </div>
        </div>     
     );
}
 
export default RegisterForm5;