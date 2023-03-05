import { Fragment, useState } from "react";
import "./EnterpriseRegister.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook, faBuilding, faChevronLeft, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import RegisterForm4 from "./EnterpriseRegister4";
import React from "react";

const EnterpriseRegister = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const handleChange = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(changeEvent.currentTarget.value)
    }
    const handleClick = () => {
        console.log('Registration form');
    }
    const [etpProcess, setEtpProcess] = useState("Enterprise-Register");
    const handleRegisProcess = () => {
        switch (etpProcess) {
            case 'Enterprise-Register':
                setSelectedOption('Developers');
                return (
                    <div id="enterprise-register">
                        <img src="/images/ApitsLogo.png" alt="Logo" className="logo" />
                        <div className="content-left">
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
                                <button className="btn con-btn" onClick={() => { setEtpProcess('Enterprise-Register1') }}>Get Started</button>
                            </div>
                        </div>
                        <div className="content-right">
                            <img src="https://weisseradlerng.com/images/It-consulting2.png?fbclid=IwAR1xFcrUNJmC6K1qNd-RTaTSScB6r-PKvQB3elqxfVTCSiXGp4YxZVLx6ys" alt="" className="intro-image" />
                        </div>
                    </div>
                );
            case 'Enterprise-Register1':
                setSelectedOption('New idea or project');
                return (
                    <div id="enterprise-register">
                        <img src="/images/ApitsLogo.png" alt="Logo" className="logo" />
                        <div className="content-left">
                            <h3>What role would you like to hire?</h3>
                            <div className="radio">
                                <input type="radio"
                                    value='New idea or project'
                                    checked={selectedOption === 'New idea or project'}
                                    onChange={handleChange}
                                />
                                <label className="radio-content">
                                    <span className="radio-header">New idea or project</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio"
                                    value='Existing project that needs more resources'
                                    checked={selectedOption === 'Existing project that needs more resources'}
                                    onChange={handleChange}
                                />
                                <label className="radio-content" >
                                    <span className="radio-header">Existing project that needs more resources</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio"
                                    value='Ongoing assistance or consultation'
                                    checked={selectedOption === 'Ongoing assistance or consultation'}
                                    onChange={handleChange}
                                />
                                <label className="radio-content">
                                    <span className="radio-header">Ongoing assistance or consultation</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio"
                                    value="None of the above, I'm just looking to learn more about Apits"
                                    checked={selectedOption === "None of the above, I'm just looking to learn more about Apits"}
                                    onChange={handleChange}
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
                setSelectedOption('Less than 1 week');
                return (
                    <div id="enterprise-register">
                        <img src="/images/ApitsLogo.png" alt="Logo" className="logo" />
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
                setSelectedOption('Full time (40 or more hrs/week)');
                return (
                    <div id="enterprise-register">
                        <img src="/images/ApitsLogo.png" alt="Logo" className="logo" />
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
                <RegisterForm4 />
                break;
            case 'Enterprise-Register5':
                setSelectedOption('Immediately');
                return (
                    <div id="enterprise-register">
                        <img src="/images/ApitsLogo.png" alt="Logo" className="logo" />
                        <div className="content-left">
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
                setSelectedOption('Yes');
                return (
                    <div id="enterprise-register">
                        <img src="/images/ApitsLogo.png" alt="Logo" className="logo" />
                        <div className="content-left">
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
                setSelectedOption('Less than $70/hr');
                return (
                    <div id="enterprise-register">
                        <img src="/images/ApitsLogo.png" alt="Logo" className="logo" />
                        <div className="content-left">
                            <h3>What is your budget for this role?</h3>
                            <div className="radio">
                                <input type="radio"
                                    value='Less than $70/hr'
                                    checked={selectedOption === 'Less than $70/hr'}
                                    onChange={handleChange}
                                />
                                <label className="radio-content">
                                    <span className="radio-header">Less than $70/hr</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio"
                                    value='$70 - $90/hr'
                                    checked={selectedOption === '$70 - $90/hr'}
                                    onChange={handleChange}
                                />
                                <label className="radio-content" >
                                    <span className="radio-header">$70 - $90/hr</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio"
                                    value='$91 - $110/hr'
                                    checked={selectedOption === '$91 - $110/hr'}
                                    onChange={handleChange}
                                />
                                <label className="radio-content" >
                                    <span className="radio-header">$91 - $110/hr</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio"
                                    value='More than $110/hr'
                                    checked={selectedOption === 'More than $110/hr'}
                                    onChange={handleChange}
                                />
                                <label className="radio-content" >
                                    <span className="radio-header">More than $110/hr</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio"
                                    value="Not sure on budget yet"
                                    checked={selectedOption === "Not sure on budget yet"}
                                    onChange={handleChange}
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
        <Fragment>
            <div className="enterprise-register">
                {handleRegisProcess()}
                <div className="content-right">
                    <img src="https://weisseradlerng.com/images/It-consulting2.png?fbclid=IwAR1xFcrUNJmC6K1qNd-RTaTSScB6r-PKvQB3elqxfVTCSiXGp4YxZVLx6ys" alt="" className="intro-image" />
                </div>
            </div>
        </Fragment>
    )

}

export default EnterpriseRegister;