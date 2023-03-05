import { ChangeEvent, FC, useState } from "react";
import "./EnterpriseRegister.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./SkillItems.css"

const RegisterForm4 = () => {
    const developerList: Array<string> = ['JavaScript', 'CSS', 'PhP', 'React', 'HTML', 'Node.js', 'IOS', 'MySQL', 'Python', 'C++'];
    const testList: Array<string> = ['Test Plan', 'Test Auto', 'SDLC', 'Agile', 'Test web', 'Mobile Test', 'Database or SQL', 'Logic Test'];
    const depOpsList: Array<string> = ['AWS', 'Kubernetes', 'Python', 'DevOps', 'Docker', 'CI', 'CD', 'Jenkins', 'AWS EC2', 'Ansible'];

    const [itemSelected, setItemSelected] = useState(Array<string>);
    const navigate = useNavigate();
    const [skill, setSkill] = useState('Software Developers');
    const [desired, setDesired] = useState('');
    const handleNextClick = () => {
        navigate('/enterprise/register5')
    }
    const handleBackClick = () => {
        navigate('/enterprise/register3')
    }
    const handleChangeDesired = (e: ChangeEvent<HTMLInputElement>) => {
        setDesired(e.target.value)

    }
    const handleItemClick = (name: string) => {
        if (skill === 'Software Developers')
            setItemSelected(itemSelected.concat(name));
        else if (skill === 'Tester')
            setItemSelected(itemSelected.concat(name));
        else
            setItemSelected(itemSelected.concat(name));
    }

    const handleItemClose = (name: string) => {
        if (skill === 'Software Developers') {
            const newList = itemSelected.filter(i => i !== name)
            setItemSelected(newList);
        }
        else if (skill === 'Tester') {
            const newList = itemSelected.filter(i => i !== name)
            setItemSelected(newList);
        }
        else {
            const newList = itemSelected.filter(i => i !== name)
            setItemSelected(newList);
        }
    }

    return (
        <div id="enterprise-register">
            <img src="/images/ApitsLogo.png" alt="Logo" className="logo" />
            <div className="content-left">
                <h3>What skills would you like to see in your new hire?</h3>
                <div className="input-block">
                    <input type="text" placeholder="Desired areas of expertise (e.g., JavaScript, Ruby, etc.)"
                        className="input-text"
                        value={desired}
                        onChange={handleChangeDesired}
                    />
                    <div className="skill-selected">
                        {
                            itemSelected.map((name: string, key: number) =>
                                <button key={key} className="btn-item item-minus" onClick={() => handleItemClose(name)}>
                                    <span>{name}</span>
                                    <FontAwesomeIcon icon={faClose} />
                                </button>
                            )
                        }
                    </div>
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
                            ? (
                                <div className="btn-items">
                                    {
                                        developerList.map((name: string, key: number) =>
                                            <button key={key} className="btn-item item-plus" onClick={() => handleItemClick(name)}>
                                                <FontAwesomeIcon icon={faPlus} />
                                                <span>{name}</span>
                                            </button>
                                        )
                                    }
                                </div>
                            )
                            : skill === 'Tester'
                                ? (
                                    <div className="btn-items">
                                        {
                                            testList.map((name: string, key: number) =>
                                                <button key={key} className="btn-item item-plus" onClick={() => handleItemClick(name)}>
                                                    <FontAwesomeIcon icon={faPlus} />
                                                    <span>{name}</span>
                                                </button>
                                            )
                                        }
                                    </div>
                                )
                                : (
                                    <div className="btn-items">
                                        {
                                            depOpsList.map((name: string, key: number) =>
                                                <button key={key} className="btn-item item-plus" onClick={() => handleItemClick(name)}>
                                                    <FontAwesomeIcon icon={faPlus} />
                                                    <span>{name}</span>
                                                </button>
                                            )
                                        }
                                    </div>
                                )
                    }
                </div>




                <div className="bot-button btn-res1">
                    <div className="btn-back">
                        <FontAwesomeIcon icon={faChevronLeft} />
                        <a href="#" onClick={handleBackClick}>Back</a>
                    </div>
                    <button className="btn con-btn" onClick={handleNextClick}>Next</button>
                </div>
            </div>
            <div className="content-right">
                <img src="https://weisseradlerng.com/images/It-consulting2.png?fbclid=IwAR1xFcrUNJmC6K1qNd-RTaTSScB6r-PKvQB3elqxfVTCSiXGp4YxZVLx6ys" alt="" className="intro-image" />
            </div>
        </div>
    );
}

export default RegisterForm4;