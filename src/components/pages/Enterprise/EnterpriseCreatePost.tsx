import { Fragment, useState } from "react";
import "./EnterpriseCreatePost.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook, faBuilding, faChevronLeft, faClock, faClose, faEnvelope, faLocationDot, faMedal, faPerson, faPhone, faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import "./SkillItems.css"

const EnterpriseCreatePost = () => {
    const [etpProcess, setEtpProcess] = useState("EnterpriseCreatePost");
    const [typeOfProject, setTypeOfProject] = useState('Developers');
    const [roleToHire, setRoleToHire] = useState('New idea or project');
    const [howLong, setHowLong] = useState('1 to 3 months');
    const [levelOfTime, setLevelOfTime] = useState('Full time (40 or more hrs/week)');
    const [whenStart, setWhenStart] = useState('Immediately');
    const [workRemote, setWorkRemote] = useState('Yes');
    const [budget, setBudget] = useState('Less than $70/hr');
    const [skill, setSkill] = useState('Software Developers');

    const developerList: Array<string> = ['JavaScript', 'CSS', 'PhP', 'React', 'HTML', 'Node.js', 'IOS', 'MySQL', 'Python', 'C++'];
    const testList: Array<string> = ['Test Plan', 'Test Auto', 'SDLC', 'Agile', 'Test web', 'Mobile Test', 'Database or SQL', 'Logic Test'];
    const depOpsList: Array<string> = ['AWS', 'Kubernetes', 'Python', 'DevOps', 'Docker', 'CI', 'CD', 'Jenkins', 'AWS EC2', 'Ansible'];
    const [itemSelected, setItemSelected] = useState(Array<string>);
    const [desired, setDesired] = useState('');
    const handleItemClick = (name: string) => {
        if (skill === 'Software Developers')
            setItemSelected(itemSelected.concat(name));
        else if (skill === 'Tester')
            setItemSelected(itemSelected.concat(name));
        else
            setItemSelected(itemSelected.concat(name));
    }
    const handleItemClose = (name: string) => {
        if (skill === 'Software Developers')
            setItemSelected(itemSelected.filter(i => i !== name));
        else if (skill === 'Tester')
            setItemSelected(itemSelected.filter(i => i !== name));
        else
            setItemSelected(itemSelected.filter(i => i !== name));

    }
    const handleClick = () => {
        console.log('Registration form');
    }
    const handleRegisProcess = () => {
        switch (etpProcess) {
            case 'EnterpriseCreatePost':
                return (
                    <div id="EnterpriseCreatePost">
                        <div className="content-left">
                            <h3>What type of expertise are you hiring for?</h3>
                            <div className="radio">
                                <input type="radio"
                                    value='Developers'
                                    checked={typeOfProject === 'Developers'}
                                    onChange={(e) => setTypeOfProject(e.target.value)}
                                />
                                <label className="radio-content">
                                    <span className="radio-header">Developers</span>
                                    <span className="radio-description">Software Developers, Data Scientists, DevOps, and QA</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio"
                                    value='Designers'
                                    checked={typeOfProject === 'Designers'}
                                    onChange={(e) => setTypeOfProject(e.target.value)}
                                />
                                <label className="radio-content" >
                                    <span className="radio-header">Designers</span>
                                    <span className="radio-description">Web, Mobile, UI/UX, Branding, and Visual Designers</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio"
                                    value='Project Managers'
                                    checked={typeOfProject === 'Project Managers'}
                                    onChange={(e) => setTypeOfProject(e.target.value)}
                                />
                                <label className="radio-content">
                                    <span className="radio-header">Project Managers</span>
                                    <span className="radio-description">Digital Project Managers, IT Project Managers, Scrum Masters, and Agile Coaches</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio"
                                    value='Product Managers'
                                    checked={typeOfProject === 'Product Managers'}
                                    onChange={(e) => setTypeOfProject(e.target.value)}
                                />
                                <label className="radio-content">
                                    <span className="radio-header">Product Managers</span>
                                    <span className="radio-description">Digital Product Managers, Product Owners, and Business Analysts</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio"
                                    value='Finance Experts'
                                    checked={typeOfProject === 'Finance Experts'}
                                    onChange={(e) => setTypeOfProject(e.target.value)}
                                />
                                <label className="radio-content">
                                    <span className="radio-header">Tester</span>
                                    <span className="radio-description">Tests software or similar projects for bugs, errors, defects, or any problems that the end-user might come across.</span>
                                </label>
                            </div>
                            <div className="bot-button">
                                <button className="btn con-btn" onClick={() => { setEtpProcess('EnterpriseCreatePost1') }}>Get Started</button>
                            </div>
                        </div>
                        <div className="content-right">
                            <img src="https://weisseradlerng.com/images/It-consulting2.png?fbclid=IwAR1xFcrUNJmC6K1qNd-RTaTSScB6r-PKvQB3elqxfVTCSiXGp4YxZVLx6ys" alt="" className="intro-image" />
                        </div>
                    </div>
                );
            case 'EnterpriseCreatePost1':
                return (
                    <div id="EnterpriseCreatePost">
                        <div className="content-left">
                            <h3>Tell us about your recruitment</h3>
                            <div className="input-tab">
                                <input type="text" className="input-text input-style" placeholder="Title" style={{ paddingLeft: "16px", width: "100%" }} />
                            </div>
                            <div className="input-tab">
                                <textarea className="input-text input-style" placeholder="Job description" style={{ paddingLeft: "16px", width: "100%", height: "150px" }} />
                            </div>
                            <div className="bot-button btn-res1">
                                <div className="btn-back">
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                    <a href="#" onClick={() => { setEtpProcess('EnterpriseCreatePost') }}>Back</a>
                                </div>
                                <button className="btn con-btn" onClick={() => { setEtpProcess('EnterpriseCreatePost2') }}>Next</button>
                            </div>
                        </div>
                        <div className="content-right">
                            <img src="https://weisseradlerng.com/images/It-consulting2.png?fbclid=IwAR1xFcrUNJmC6K1qNd-RTaTSScB6r-PKvQB3elqxfVTCSiXGp4YxZVLx6ys" alt="" className="intro-image" />
                        </div>
                    </div>
                );
            case 'EnterpriseCreatePost2':
                return (
                    <div id="EnterpriseCreatePost">
                        <div className="content-left">
                            <h3>Tell us more about your recruitment</h3>
                            <div className="input-tab">
                                <textarea className="input-text input-style" placeholder="Candidate requirements" style={{ paddingLeft: "16px", width: "100%", height: "150px" }} />
                            </div>
                            <div className="input-tab">
                                <textarea className="input-text input-style" placeholder="Benefits" style={{ paddingLeft: "16px", width: "100%", height: "150px" }} />
                            </div>
                            <div className="bot-button btn-res1">
                                <div className="btn-back">
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                    <a href="#" onClick={() => { setEtpProcess('EnterpriseCreatePost1') }}>Back</a>
                                </div>
                                <button className="btn con-btn" onClick={() => { setEtpProcess('EnterpriseCreatePost3') }}>Next</button>
                            </div>
                        </div>
                        <div className="content-right">
                            <img src="https://weisseradlerng.com/images/It-consulting2.png?fbclid=IwAR1xFcrUNJmC6K1qNd-RTaTSScB6r-PKvQB3elqxfVTCSiXGp4YxZVLx6ys" alt="" className="intro-image" />
                        </div>
                    </div>

                );
            case 'EnterpriseCreatePost3':
                return (
                    <div id="EnterpriseCreatePost">
                        <div className="content-left">
                            <h3>How long do you need the {typeOfProject}?</h3>
                            <div className="radio">
                                <input type="radio"
                                    value='1 to 3 months'
                                    checked={howLong === '1 to 3 months'}
                                    onChange={(e) => setHowLong(e.target.value)}
                                />
                                <label className="radio-content">
                                    <span className="radio-header">1 to 3 months</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio"
                                    value="3 to 6 months"
                                    checked={howLong === "3 to 6 months"}
                                    onChange={(e) => setHowLong(e.target.value)}
                                />
                                <label className="radio-content">
                                    <span className="radio-header">3 to 6 months</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio"
                                    value="7 to 9 months"
                                    checked={howLong === "7 to 9 months"}
                                    onChange={(e) => setHowLong(e.target.value)}
                                />
                                <label className="radio-content">
                                    <span className="radio-header">7 to 9 months</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio"
                                    value="10 to 12 months"
                                    checked={howLong === "10 to 12 months"}
                                    onChange={(e) => setHowLong(e.target.value)}
                                />
                                <label className="radio-content">
                                    <span className="radio-header">10 to 12 months</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio"
                                    value="I will decide later"
                                    checked={howLong === "I will decide later"}
                                    onChange={(e) => setHowLong(e.target.value)}
                                />
                                <label className="radio-content">
                                    <span className="radio-header">I will decide later</span>
                                </label>
                            </div>
                            <div className="bot-button btn-res1">
                                <div className="btn-back">
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                    <a href="#" onClick={() => setEtpProcess('EnterpriseCreatePost2')}>Back</a>
                                </div>
                                <button className="btn con-btn" onClick={() => setEtpProcess('EnterpriseCreatePost4')}>Next</button>
                            </div>
                        </div>
                        <div className="content-right">
                            <img src="https://weisseradlerng.com/images/It-consulting2.png?fbclid=IwAR1xFcrUNJmC6K1qNd-RTaTSScB6r-PKvQB3elqxfVTCSiXGp4YxZVLx6ys" alt="" className="intro-image" />
                        </div>
                    </div>
                );
            case 'EnterpriseCreatePost4':
                return (
                    <div id="EnterpriseCreatePost">
                        <div className="content-left">
                            <h3>What level of time commitment will you require from the developer?</h3>
                            <div className="radio">
                                <input type="radio"
                                    value='Full time (40 or more hrs/week)'
                                    checked={levelOfTime === 'Full time (40 or more hrs/week)'}
                                    onChange={(e) => setLevelOfTime(e.target.value)}
                                />
                                <label className="radio-content">
                                    <span className="radio-header">Full time (40 or more hrs/week)</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio"
                                    value='Part time (Less than 40 hrs/week)'
                                    checked={levelOfTime === 'Part time (Less than 40 hrs/week)'}
                                    onChange={(e) => setLevelOfTime(e.target.value)}
                                />
                                <label className="radio-content" >
                                    <span className="radio-header">Part time (Less than 40 hrs/week)</span>
                                </label>
                            </div>
                            <div className="bot-button btn-res1">
                                <div className="btn-back">
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                    <a href="#" onClick={() => setEtpProcess('EnterpriseCreatePost3')}>Back</a>
                                </div>
                                <button className="btn con-btn" onClick={() => setEtpProcess('EnterpriseCreatePost5')}>Next</button>
                            </div>
                        </div>
                        <div className="content-right">
                            <img src="https://weisseradlerng.com/images/It-consulting2.png?fbclid=IwAR1xFcrUNJmC6K1qNd-RTaTSScB6r-PKvQB3elqxfVTCSiXGp4YxZVLx6ys" alt="" className="intro-image" />
                        </div>
                    </div>
                );
            case 'EnterpriseCreatePost5':
                return (
                    <div id="EnterpriseCreatePost">
                        <div className="content-left">
                            <h3>What skills would you like to see in your new hire?</h3>
                            <div className="input-block">
                                <input type="text" placeholder="Desired areas of expertise (e.g., JavaScript, Ruby, etc.)"
                                    className="input-text"
                                    value={desired}
                                    onChange={(e) => setDesired(e.target.value)}
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
                                    <a href="#" onClick={() => setEtpProcess('EnterpriseCreatePost4')}>Back</a>
                                </div>
                                <button className="btn con-btn" onClick={() => setEtpProcess('EnterpriseCreatePost6')}>Next</button>
                            </div>
                        </div>
                        <div className="content-right">
                            <img src="https://weisseradlerng.com/images/It-consulting2.png?fbclid=IwAR1xFcrUNJmC6K1qNd-RTaTSScB6r-PKvQB3elqxfVTCSiXGp4YxZVLx6ys" alt="" className="intro-image" />
                        </div>
                    </div>
                );
            case 'EnterpriseCreatePost6':
                return (
                    <div id="EnterpriseCreatePost">
                        <div className="content-left">
                            <h3>General information</h3>
                            <div className="input-tab">
                                <div className="input-icon">
                                    <FontAwesomeIcon icon={faPerson} />
                                </div>
                                <input type="text" className="input-text input-style" placeholder="Quantity" />
                            </div>
                            <div className="input-tab">
                                <div className="input-icon">
                                    <FontAwesomeIcon icon={faMedal} />
                                </div>
                                <input type="text" className="input-text input-style" placeholder="Experience" />
                            </div>
                            <div className="input-tab">
                                <div className="input-icon">
                                    <FontAwesomeIcon icon={faClock} />
                                </div>
                                <input type="text" className="input-text input-style" placeholder="Recruitment deadline" />
                            </div>
                            <div className="input-tab">
                                <div className="input-icon">
                                    <FontAwesomeIcon icon={faLocationDot} />
                                </div>
                                <input type="text" className="input-text input-style" placeholder="Work location" />
                            </div>
                            <div className="bot-button btn-res1">
                                <div className="btn-back">
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                    <a href="#" onClick={() => setEtpProcess('EnterpriseCreatePost5')}>Back</a>
                                </div>
                                <button className="btn con-btn" onClick={() => setEtpProcess('EnterpriseCreatePost7')}>Next</button>
                            </div>
                        </div>
                        <div className="content-right">
                            <img src="https://weisseradlerng.com/images/It-consulting2.png?fbclid=IwAR1xFcrUNJmC6K1qNd-RTaTSScB6r-PKvQB3elqxfVTCSiXGp4YxZVLx6ys" alt="" className="intro-image" />
                        </div>
                    </div>
                );
            case 'EnterpriseCreatePost7':
                return (
                    <div id="EnterpriseCreatePost">
                        <div className="content-left">
                            <h3>What is your budget for this role?</h3>
                            <div className="radio">
                                <input type="radio"
                                    value='Less than $70/hr'
                                    checked={budget === 'Less than $70/hr'}
                                    onChange={(e) => setBudget(e.target.value)}
                                />
                                <label className="radio-content">
                                    <span className="radio-header">Less than $70/hr</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio"
                                    value='$70 - $90/hr'
                                    checked={budget === '$70 - $90/hr'}
                                    onChange={(e) => setBudget(e.target.value)}
                                />
                                <label className="radio-content" >
                                    <span className="radio-header">$70 - $90/hr</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio"
                                    value='$91 - $110/hr'
                                    checked={budget === '$91 - $110/hr'}
                                    onChange={(e) => setBudget(e.target.value)}
                                />
                                <label className="radio-content" >
                                    <span className="radio-header">$91 - $110/hr</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio"
                                    value="I will decide later"
                                    checked={howLong === "I will decide later"}
                                    onChange={(e) => setHowLong(e.target.value)}
                                />
                                <label className="radio-content">
                                    <span className="radio-header">I will decide later</span>
                                </label>
                            </div>
                            <div className="bot-button btn-res1">
                                <div className="btn-back">
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                    <a href="#" onClick={() => setEtpProcess('EnterpriseCreatePost6')}>Back</a>
                                </div>
                                <button className="btn con-btn" onClick={() => setEtpProcess('EnterpriseCreatePost8')}>Next</button>
                            </div>
                        </div>
                        <div className="content-right">
                            <img src="https://weisseradlerng.com/images/It-consulting2.png?fbclid=IwAR1xFcrUNJmC6K1qNd-RTaTSScB6r-PKvQB3elqxfVTCSiXGp4YxZVLx6ys" alt="" className="intro-image" />
                        </div>
                    </div>
                );
            case 'EnterpriseCreatePost8':
                return (
                    <div id="EnterpriseCreatePost">
                        <div className="content-left">
                            <h3>Success! Let's connect you with candidate.</h3>
                            <div className="input-tab">
                                <div className="input-icon">
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                                <input type="text" className="input-text input-style" placeholder="HR specialist name" />
                            </div>
                            <div className="input-tab">
                                <div className="input-icon">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </div>
                                <input type="text" className="input-text input-style" placeholder="Email" />
                            </div>
                            <div className="input-tab">
                                <div className="input-icon">
                                    <FontAwesomeIcon icon={faAddressBook} />
                                </div>
                                <input type="text" className="input-text input-style" placeholder="Contact me" />
                            </div>
                            <div className="prolicy">
                                <p>By completing signup, you are agreeing to Apits’s<span className="text-underline">Terms of Service</span>, <span className="text-underline">Privacy Policy</span>, <span className="text-underline">Sourced Talent Matching Agreement</span>, and <span className="text-underline">Cookie Policy</span> and that Apits may monitor or record audio or video calls for quality assurance and training purposes.</p>
                            </div>
                            <div className="bot-button btn-res1">
                                <div className="btn-back">
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                    <a href="#" onClick={() => setEtpProcess('EnterpriseCreatePost7')}>Back</a>
                                </div>
                                <button className="btn con-btn">Finish</button>
                            </div>
                        </div>
                        <div className="content-right">
                            <img src="https://weisseradlerng.com/images/It-consulting2.png?fbclid=IwAR1xFcrUNJmC6K1qNd-RTaTSScB6r-PKvQB3elqxfVTCSiXGp4YxZVLx6ys" alt="" className="intro-image" />
                        </div>
                    </div>
                );
        }
    }
    return (
        <Fragment>{handleRegisProcess()}</Fragment>
    )

}

export default EnterpriseCreatePost;