import { ChangeEvent, useState } from "react";
import "./EnterpriseRegister.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { DepItems, DepOps, Tester } from "./SkillItem";

const RegisterForm4 = () => {
    const navigate = useNavigate();
    const [skill,setSkill] = useState('');
    const [desired, setDesired] = useState('');
    const handleClick = () => {
        navigate('/enterprise/register5')
    }
    const handleBackClick = () => {
        navigate('/enterprise/register3')
    }
    const handleChangeDesired = (e: ChangeEvent<HTMLInputElement>) => {
        setDesired(e.target.value)
        
    }
    return (   
        <div id="enterprise-register">       
            <img src="/images/ApitsLogo.png" alt="Logo" className="logo"/>
            <div className="content-left">
                <h3>What skills would you like to see in your new hire?</h3>
                <div className="input-block">
                    <input type="text" placeholder="Desired areas of expertise (e.g., JavaScript, Ruby, etc.)" 
                        className="input-text"
                        value={desired}
                        onChange={handleChangeDesired}    
                    />
                    <div className="skill-selected"></div>
                </div>
                <div className="skills">
                    <span>Popular skills for</span>
                    <select className="select-skills" onChange={(e) => setSkill(e.target.value)}>
                        <option>Software Developers</option>
                        <option>Tester</option>
                        <option>DevOps</option>
                    </select>
                </div>
                <div className="skill-items">
                    {
                        skill === 'Software Developers' 
                        ?  <DepItems/>
                        : skill === 'Tester'
                        ? <Tester/>
                        : <DepOps/>
                    }                 
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
 
export default RegisterForm4;