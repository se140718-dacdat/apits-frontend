import { useState } from "react";
import "./EnterpriseRegister.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { DepItems, DepOps, Tester } from "./SkillItem";

const RegisterForm4 = () => {
    const navigate = useNavigate();
    const [skill,setSkill] = useState('');
    const handleClick = () => {
        navigate('/enterprise/register5')
    }
    const handleBackClick = () => {
        navigate('/enterprise/register3')
    }
    const skillChange = (e: any) => {
        setSkill(e.target.value)
        
    }
    return (   
        <div id="enterprise-register">       
            <div className="content-left">
                <img src="/images/ApitsLogo.png" alt="Logo" className="logo"/>
                <h3>What skills would you like to see in your new hire?</h3>
                <div className="input-block">
                    <input type="text" placeholder="Desired areas of expertise (e.g., JavaScript, Ruby, etc.)" className="input-text"/>
                    <div className="skill-selected"></div>
                </div>
                <div className="skills">
                    <span>Popular skills for</span>
                    <select className="select-skills" onChange={skillChange}>
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
                <img src="https://www.york.k12.sc.us/cms/lib/SC02205956/Centricity//Domain/48/011923%20JoinourTeam%20ICON.png" alt="" className="intro-image"/>
            </div>
        </div>     
     );
}
 
export default RegisterForm4;