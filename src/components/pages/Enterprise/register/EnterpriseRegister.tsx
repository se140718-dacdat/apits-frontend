import { useState } from "react";
import "./EnterpriseRegister.css"
import { useNavigate } from "react-router-dom";

const EnterpriseRegister = () => {
    const [selectedOption, setSelectedOption] = useState("Developers");
    const handleChange = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(changeEvent.currentTarget.value)
    }
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/enterprise/register1');       
    }

    return ( 
        <div id="enterprise-register">       
            <div className="content-left">
                <img src="/images/ApitsLogo.png" alt="Logo" className="logo"/>
                <h3>What type of project are you hiring for?</h3>
                <div className="radio">
                    <input type="radio" 
                        value='Developers'
                        checked={selectedOption === 'Developers'} 
                        onChange={handleChange}    
                    />
                    <label className="radio-content">
                        <span className="radio-header">Developers</span>
                        <span className="radio-description">Software Developers, Data Scientists, DevOps, and QA</span>
                    </label>
                </div>
                <div className="radio">
                    <input type="radio" 
                        value='Designers'
                        checked={selectedOption === 'Designers'} 
                        onChange={handleChange}    
                    />
                    <label className="radio-content" >
                        <span className="radio-header">Designers</span>
                        <span className="radio-description">Web, Mobile, UI/UX, Branding, and Visual Designers</span>
                    </label>
                </div>
                <div className="radio">
                    <input type="radio" 
                        value='Project Managers'
                        checked={selectedOption === 'Project Managers'} 
                        onChange={handleChange}    
                    />
                    <label className="radio-content">
                        <span className="radio-header">Project Managers</span>
                        <span className="radio-description">Digital Project Managers, IT Project Managers, Scrum Masters, and Agile Coaches</span>
                    </label>
                </div>
                <div className="radio">
                    <input type="radio" 
                        value='Product Managers'
                        checked={selectedOption === 'Product Managers'} 
                        onChange={handleChange}    
                    />
                    <label className="radio-content">
                        <span className="radio-header">Product Managers</span>
                        <span className="radio-description">Digital Product Managers, Product Owners, and Business Analysts</span>
                    </label>
                </div>
                <div className="radio">
                    <input type="radio" 
                        value='Finance Experts'
                        checked={selectedOption === 'Finance Experts'} 
                        onChange={handleChange}    
                    />
                    <label className="radio-content">
                        <span className="radio-header">Tester</span>
                        <span className="radio-description">Tests software or similar projects for bugs, errors, defects, or any problems that the end-user might come across.</span>
                    </label>
                </div> 
                <div className="bot-button">
                    <button className="btn con-btn" onClick={handleClick}>Get Started</button>        
                </div>            
            </div>
            <div className="content-right">
                <img src="https://thumbs.dreamstime.com/z/register-now-button-vector-illustration-orange-round-web-icon-white-background-121332081.jpg" alt="" className="intro-image"/>
            </div>
        </div>
     );
}
 
export default EnterpriseRegister;