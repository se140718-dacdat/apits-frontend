import { useState } from "react";
import "./EnterpriseRegister.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const RegisterForm6 = () => {
    const [selectedOption, setSelectedOption] = useState("Yes");
    const handleChange = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(changeEvent.currentTarget.value)
    }
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/enterprise/register7')
    }
    const handleBackClick = () => {
        navigate('/enterprise/register5')
    }
    return (   
        <div id="enterprise-register">       
            <div className="content-left">
                <img src="/images/ApitsLogo.png" alt="Logo" className="logo"/>
                <h3>Are you open to working with a remote developer?</h3>
                <div className="radio">
                    <input type="radio" 
                        value='Yes'
                        checked={selectedOption === 'Yes'} 
                        onChange={handleChange}    
                    />
                    <label className="radio-content">
                        <span className="radio-header">Yes</span>
                    </label>
                </div>
                <div className="radio">
                    <input type="radio" 
                        value='No'
                        checked={selectedOption === 'No'} 
                        onChange={handleChange}    
                    />
                    <label className="radio-content" >
                        <span className="radio-header">No</span>
                    </label>
                </div>
                <div className="radio">
                    <input type="radio" 
                        value="I'm not sure"
                        checked={selectedOption === "I'm not sure"} 
                        onChange={handleChange}    
                    />
                    <label className="radio-content">
                        <span className="radio-header">I'm not sure</span>
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
 
export default RegisterForm6;