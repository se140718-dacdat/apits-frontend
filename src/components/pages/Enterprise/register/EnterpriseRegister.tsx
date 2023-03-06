import { Fragment, useState } from "react";
import "./EnterpriseRegister.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook, faBuilding, faChevronLeft, faClose, faEnvelope, faPhone, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./SkillItems.css"

const EnterpriseRegister = () => {
    const [etpProcess, setEtpProcess] = useState("Enterprise-Register");
    const [typeOfProject, setTypeOfProject] = useState('Developers');
    const [roleToHire, setRoleToHire] = useState('New idea or project');
    const [howLong, setHowLong] = useState('Less than 1 week');
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
            case 'Enterprise-Register':
                return (
                    <div id="enterprise-register">
                        <img src="/images/ApitsLogo.png" alt="Logo" className="logo" />
                        <div className="content-left">
                            <h3>What type of project are you hiring for?</h3>
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
                                <button className="btn con-btn" onClick={() => { setEtpProcess('Enterprise-Register1') }}>Get Started</button>
                            </div>
                        </div>
                        <div className="content-right">
                            <img src="https://weisseradlerng.com/images/It-consulting2.png?fbclid=IwAR1xFcrUNJmC6K1qNd-RTaTSScB6r-PKvQB3elqxfVTCSiXGp4YxZVLx6ys" alt="" className="intro-image" />
                        </div>
                    </div>
                );
            case 'Enterprise-Register1':
                return (
                    <div id="enterprise-register">
                        <img src="/images/ApitsLogo.png" alt="Logo" className="logo" />
                        <div className="content-left">
                            <h3>What role would you like to hire?</h3>
                            <div className="radio">
                                <input type="radio"
                                    value='New idea or project'
                                    checked={roleToHire === 'New idea or project'}
                                    onChange={(e) => setRoleToHire(e.target.value)}
                                />
                                <label className="radio-content">
                                    <span className="radio-header">New idea or project</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio"
                                    value='Existing project that needs more resources'
                                    checked={roleToHire === 'Existing project that needs more resources'}
                                    onChange={(e) => setRoleToHire(e.target.value)}
                                />
                                <label className="radio-content" >
                                    <span className="radio-header">Existing project that needs more resources</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio"
                                    value='Ongoing assistance or consultation'
                                    checked={roleToHire === 'Ongoing assistance or consultation'}
                                    onChange={(e) => setRoleToHire(e.target.value)}
                                />
                                <label className="radio-content">
                                    <span className="radio-header">Ongoing assistance or consultation</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio"
                                    value="None of the above, I'm just looking to learn more about Apits"
                                    checked={roleToHire === "None of the above, I'm just looking to learn more about Apits"}
                                    onChange={(e) => setRoleToHire(e.target.value)}
                                />
                                <label className="radio-content">
                                    <span className="radio-header">None of the above, I'm just looking to learn more about Apits</span>
                                </label>
                            </div>
                            <div className="bot-button btn-res1">
                                <div className="btn-back">
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                    <a href="#" onClick={() => { setEtpProcess('Enterprise-Register') }}>Back</a>
                                </div>
                                <button className="btn con-btn" onClick={() => { setEtpProcess('Enterprise-Register2') }}>Next</button>
                            </div>
                        </div>
                        <div className="content-right">
                            <img src="https://weisseradlerng.com/images/It-consulting2.png?fbclid=IwAR1xFcrUNJmC6K1qNd-RTaTSScB6r-PKvQB3elqxfVTCSiXGp4YxZVLx6ys" alt="" className="intro-image" />
                        </div>
                    </div>
                );
            case 'Enterprise-Register2':
                return (
                    <div id="enterprise-register">
                        <img src="/images/ApitsLogo.png" alt="Logo" className="logo" />
                        <div className="content-left">
                            <h3>How long do you need the developer?</h3>
                            <div className="radio">
                                <input type="radio"
                                    value='Less than 1 week'
                                    checked={howLong === 'Less than 1 week'}
                                    onChange={(e) => setHowLong(e.target.value)}
                                />
                                <label className="radio-content">
                                    <span className="radio-header">Less than 1 week</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio"
                                    value='1 to 4 weeks'
                                    checked={howLong === '1 to 4 weeks'}
                                    onChange={(e) => setHowLong(e.target.value)}
                                />
                                <label className="radio-content" >
                                    <span className="radio-header">1 to 4 weeks</span>
                                </label>
                            </div>
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
                                    value="Longer than 6 months"
                                    checked={howLong === "Longer than 6 months"}
                                    onChange={(e) => setHowLong(e.target.value)}
                                />
                                <label className="radio-content">
                                    <span className="radio-header">Longer than 6 months</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio"
                                    value="I'll decide later"
                                    checked={howLong === "I'll decide later"}
                                    onChange={(e) => setHowLong(e.target.value)}
                                />
                                <label className="radio-content">
                                    <span className="radio-header">I'll decide later</span>
                                </label>
                            </div>
                            <div className="bot-button btn-res1">
                                <div className="btn-back">
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                    <a href="#" onClick={() => setEtpProcess('Enterprise-Register1')}>Back</a>
                                </div>
                                <button className="btn con-btn" onClick={() => setEtpProcess('Enterprise-Register3')}>Next</button>
                            </div>
                        </div>
                        <div className="content-right">
                            <img src="https://weisseradlerng.com/images/It-consulting2.png?fbclid=IwAR1xFcrUNJmC6K1qNd-RTaTSScB6r-PKvQB3elqxfVTCSiXGp4YxZVLx6ys" alt="" className="intro-image" />
                        </div>
                    </div>
                );
            case 'Enterprise-Register3':
                return (
                    <div id="enterprise-register">
                        <img src="/images/ApitsLogo.png" alt="Logo" className="logo" />
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
                            <div className="radio">
                                <input type="radio"
                                    value='Hourly'
                                    checked={levelOfTime === 'Hourly'}
                                    onChange={(e) => setLevelOfTime(e.target.value)}
                                />
                                <label className="radio-content">
                                    <span className="radio-header">Hourly</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio"
                                    value="I'll decide later"
                                    checked={levelOfTime === "I'll decide later"}
                                    onChange={(e) => setLevelOfTime(e.target.value)}
                                />
                                <label className="radio-content">
                                    <span className="radio-header">I'll decide later</span>
                                </label>
                            </div>
                            <div className="bot-button btn-res1">
                                <div className="btn-back">
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                    <a href="#" onClick={() => setEtpProcess('Enterprise-Register2')}>Back</a>
                                </div>
                                <button className="btn con-btn" onClick={() => setEtpProcess('Enterprise-Register4')}>Next</button>
                            </div>
                        </div>
                        <div className="content-right">
                            <img src="https://weisseradlerng.com/images/It-consulting2.png?fbclid=IwAR1xFcrUNJmC6K1qNd-RTaTSScB6r-PKvQB3elqxfVTCSiXGp4YxZVLx6ys" alt="" className="intro-image" />
                        </div>
                    </div>
                );
            case 'Enterprise-Register4':
                return (
                    <div id="enterprise-register">
                        <img src="/images/ApitsLogo.png" alt="Logo" className="logo" />
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
                                    <a href="#" onClick={() => setEtpProcess('Enterprise-Register3')}>Back</a>
                                </div>
                                <button className="btn con-btn" onClick={() => setEtpProcess('Enterprise-Register5')}>Next</button>
                            </div>
                        </div>
                        <div className="content-right">
                            <img src="https://weisseradlerng.com/images/It-consulting2.png?fbclid=IwAR1xFcrUNJmC6K1qNd-RTaTSScB6r-PKvQB3elqxfVTCSiXGp4YxZVLx6ys" alt="" className="intro-image" />
                        </div>
                    </div>
                );
            case 'Enterprise-Register5':
                return (
                    <div id="enterprise-register">
                        <img src="/images/ApitsLogo.png" alt="Logo" className="logo" />
                        <div className="content-left">
                            <h3>When do you need the developer to start?</h3>
                            <div className="radio">
                                <input type="radio"
                                    value='Immediately'
                                    checked={whenStart === 'Immediately'}
                                    onChange={(e) => setWhenStart(e.target.value)}
                                />
                                <label className="radio-content">
                                    <span className="radio-header">Immediately</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio"
                                    value='In 1 to 2 weeks'
                                    checked={whenStart === 'In 1 to 2 weeks'}
                                    onChange={(e) => setWhenStart(e.target.value)}
                                />
                                <label className="radio-content" >
                                    <span className="radio-header">In 1 to 2 weeks</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio"
                                    value='More than 2 weeks from now'
                                    checked={whenStart === 'More than 2 weeks from now'}
                                    onChange={(e) => setWhenStart(e.target.value)}
                                />
                                <label className="radio-content">
                                    <span className="radio-header">More than 2 weeks from now</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio"
                                    value="I'll decide later"
                                    checked={whenStart === "I'll decide later"}
                                    onChange={(e) => setWhenStart(e.target.value)}
                                />
                                <label className="radio-content">
                                    <span className="radio-header">I'll decide later</span>
                                </label>
                            </div>
                            <div className="bot-button btn-res1">
                                <div className="btn-back">
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                    <a href="#" onClick={() => setEtpProcess('Enterprise-Register4')}>Back</a>
                                </div>
                                <button className="btn con-btn" onClick={() => setEtpProcess('Enterprise-Register6')}>Next</button>
                            </div>
                        </div>
                        <div className="content-right">
                            <img src="https://weisseradlerng.com/images/It-consulting2.png?fbclid=IwAR1xFcrUNJmC6K1qNd-RTaTSScB6r-PKvQB3elqxfVTCSiXGp4YxZVLx6ys" alt="" className="intro-image" />
                        </div>
                    </div>
                );
            case 'Enterprise-Register6':
                return (
                    <div id="enterprise-register">
                        <img src="/images/ApitsLogo.png" alt="Logo" className="logo" />
                        <div className="content-left">
                            <h3>Are you open to working with a remote developer?</h3>
                            <div className="radio">
                                <input type="radio"
                                    value='Yes'
                                    checked={workRemote === 'Yes'}
                                    onChange={(e) => setWorkRemote(e.target.value)}
                                />
                                <label className="radio-content">
                                    <span className="radio-header">Yes</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio"
                                    value='No'
                                    checked={workRemote === 'No'}
                                    onChange={(e) => setWorkRemote(e.target.value)}
                                />
                                <label className="radio-content" >
                                    <span className="radio-header">No</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio"
                                    value="I'm not sure"
                                    checked={workRemote === "I'm not sure"}
                                    onChange={(e) => setWorkRemote(e.target.value)}
                                />
                                <label className="radio-content">
                                    <span className="radio-header">I'm not sure</span>
                                </label>
                            </div>
                            <div className="bot-button btn-res1">
                                <div className="btn-back">
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                    <a href="#" onClick={() => setEtpProcess('Enterprise-Register5')}>Back</a>
                                </div>
                                <button className="btn con-btn" onClick={() => setEtpProcess('Enterprise-Register7')}>Next</button>
                            </div>
                        </div>
                        <div className="content-right">
                            <img src="https://weisseradlerng.com/images/It-consulting2.png?fbclid=IwAR1xFcrUNJmC6K1qNd-RTaTSScB6r-PKvQB3elqxfVTCSiXGp4YxZVLx6ys" alt="" className="intro-image" />
                        </div>
                    </div>
                );
            case 'Enterprise-Register7':
                return (
                    <div id="enterprise-register">
                        <img src="/images/ApitsLogo.png" alt="Logo" className="logo" />
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
                                    value='More than $110/hr'
                                    checked={budget === 'More than $110/hr'}
                                    onChange={(e) => setBudget(e.target.value)}
                                />
                                <label className="radio-content" >
                                    <span className="radio-header">More than $110/hr</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio"
                                    value="Not sure on budget yet"
                                    checked={budget === "Not sure on budget yet"}
                                    onChange={(e) => setBudget(e.target.value)}
                                />
                                <label className="radio-content">
                                    <span className="radio-header">Not sure on budget yet</span>
                                </label>
                            </div>
                            <div className="bot-button btn-res1">
                                <div className="btn-back">
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                    <a href="#" onClick={() => setEtpProcess('Enterprise-Register6')}>Back</a>
                                </div>
                                <button className="btn con-btn" onClick={() => setEtpProcess('Enterprise-Register8')}>Next</button>
                            </div>
                        </div>
                        <div className="content-right">
                            <img src="https://weisseradlerng.com/images/It-consulting2.png?fbclid=IwAR1xFcrUNJmC6K1qNd-RTaTSScB6r-PKvQB3elqxfVTCSiXGp4YxZVLx6ys" alt="" className="intro-image" />
                        </div>
                    </div>
                );
            case 'Enterprise-Register8':
                return (
                    <div id="enterprise-register">
                        <img src="/images/ApitsLogo.png" alt="Logo" className="logo" />
                        <div className="content-left">
                            <h3>Success! Let's connect you with candidate.</h3>
                            <div className="input-tab">
                                <div className="input-icon">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </div>
                                <input type="text" className="input-text input-style" placeholder="Email" />
                            </div>
                            <div className="input-tab">
                                <div className="input-icon">
                                    <FontAwesomeIcon icon={faBuilding} />
                                </div>
                                <input type="text" className="input-text input-style" placeholder="Company name" />
                            </div>
                            <div className="input-tab">
                                <div className="input-icon">
                                    <FontAwesomeIcon icon={faAddressBook} />
                                </div>
                                <input type="text" className="input-text input-style" placeholder="Contact me" />
                            </div>
                            <div className="input-tab">
                                <div className="input-icon">
                                    <FontAwesomeIcon icon={faPhone} />
                                </div>
                                <input type="text" className="input-text input-style" placeholder="+84 94 123 45 67 (Optional)" />
                            </div>

                            <div className="prolicy">
                                <p>By completing signup, you are agreeing to Apits’s<span className="text-underline">Terms of Service</span>, <span className="text-underline">Privacy Policy</span>, <span className="text-underline">Sourced Talent Matching Agreement</span>, and <span className="text-underline">Cookie Policy</span> and that Apits may monitor or record audio or video calls for quality assurance and training purposes.</p>
                            </div>


                            <div className="bot-button btn-res1">
                                <button className="btn con-btn" onClick={handleClick}>Next</button>
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

export default EnterpriseRegister;