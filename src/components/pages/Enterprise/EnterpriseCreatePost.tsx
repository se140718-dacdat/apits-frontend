import React, { Fragment, useState, useEffect } from "react";
import "./EnterpriseCreatePost.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook, faBuilding, faChevronLeft, faClock, faClose, faEnvelope, faLocationDot, faMedal, faPerson, faPhone, faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import "./SkillItems.css"
import { PostEntity } from "../../../entity";
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

const EnterpriseCreatePost = () => {
    const [etpProcess, setEtpProcess] = useState("EnterpriseCreatePost");
    const specialties = [
        {
            id: 1,
            name: "Developers",
            description: "Software Developers, Data Scientists, DevOps, and QA"
        },
        {
            id: 2,
            name: "Designers",
            description: "Web, Mobile, UI/UX, Branding, and Visual Designers"
        },
        {
            id: 3,
            name: "Project Managers",
            description: "Digital Project Managers, IT Project Managers, Scrum Masters, and Agile Coaches"
        },
        {
            id: 4,
            name: "DevOps",
            description: "Digital Product Managers, Product Owners, and Business Analysts"
        },
        {
            id: 5,
            name: "Tester",
            description: "Tests software or similar projects for bugs, errors, defects, or any problems that the end-user might come across."
        },
    ]
    const developerList: Array<string> = ['JavaScript', 'CSS', 'PhP', 'React', 'HTML', 'Node.js', 'IOS', 'MySQL', 'Python', 'C++'];
    const testList: Array<string> = ['Test Plan', 'Test Auto', 'SDLC', 'Agile', 'Test web', 'Mobile Test', 'Database or SQL', 'Logic Test'];
    const depOpsList: Array<string> = ['AWS', 'Kubernetes', 'Python', 'DevOps', 'Docker', 'CI', 'CD', 'Jenkins', 'AWS EC2', 'Ansible'];
    const now = new Date();

    const [exprid, setExprid] = React.useState<Dayjs | null>(dayjs(now.toLocaleDateString()));
    const [desired, setDesired] = useState('');
    const [specialty, setSpecialty] = useState(specialties[0]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [requirements, setRequiments] = useState('');
    const [benefits, setBenefits] = useState('');
    const [hiringTime, setHiringtime] = useState('1 to 3 months');
    const [workForm, setWorkForm] = useState('Full time (40 or more hrs/week)');
    const [salary, setSalary] = useState('Less than $70/hr');
    const [skills, setSkills] = useState<string[]>([]);
    const [skillList, setSkillList] = useState<string[]>([]);
    const [quantity, setQuantity] = useState(0);
    const [experience, setExperience] = useState('');
    const [workLocation, setWorkLocation] = useState('');
    const [hrName, setHrName] = useState('');
    const [hrPhone, setHrPhone] = useState('');
    const [hrEmail, setHrEmail] = useState('');
    const [specialtySelect, setSpecialtySelect] = useState(specialties[0].name);

    useEffect(() => {
        handleSelectSpecialty();
    }, [specialtySelect])

    const handleSelectSpecialty = () => {
        switch (specialtySelect) {
            case specialties[0].name:
                setSkills(developerList)
                break;
            case specialties[4].name:
                setSkills(testList)
                break;
            case specialties[3].name:
                setSkills(depOpsList)
                break;
            default:
                setSkills([...developerList, ...testList, ...depOpsList])
                break;
        }
    }

    const handleSelectSkill = (skill: string) => {
        if (!skillList.includes(skill)) {
            setSkillList((prevSpecialties) => [...prevSpecialties, skill]);
        }
    }

    const handleRemoveSkill = (skill: string) => {
        if (skillList.includes(skill)) {
            setSkillList((prevSpecialties) => prevSpecialties.filter((e) => e !== skill));
            console.log(specialties)
        }
    }



    const handleClick = () => {
        const newPost: PostEntity = {
            title: title,
            specialty: specialty.name,
            description: description,
            requirements: requirements,
            benefits: benefits,
            exprid: `${exprid?.format("YYYY-MM-DD")}`,
            workForm: workForm,
            skillList: skillList,
            quantity: quantity,
            experience: experience,
            hiringTime: hiringTime,
            workLocation: workLocation,
            salary: salary,
            hrName: hrName,
            hrEmail: hrEmail,
            hrPhone: hrPhone
        }
        console.log(newPost);
    }
    const handleRegisProcess = () => {
        switch (etpProcess) {
            case 'EnterpriseCreatePost':
                return (
                    <div id="EnterpriseCreatePost">
                        <div className="content-left">
                            <h3>What type of expertise are you hiring for?</h3>
                            {
                                specialties.map((item, index) => {
                                    return (
                                        <div className="radio" key={index}>
                                            <input type="radio"
                                                value={item.name}
                                                checked={item.name === specialty.name}
                                                onChange={() => {
                                                    setSpecialty(item);
                                                }}
                                            />
                                            <label className="radio-content">
                                                <span className="radio-header">{item.name}</span>
                                                <span className="radio-description">{item.description}</span>
                                            </label>
                                        </div>
                                    )
                                })
                            }
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
                                <input type="text" className="input-text input-style" placeholder="Title" value={title} style={{ paddingLeft: "16px", width: "100%" }} onChange={(e) => { setTitle(e.target.value) }} />
                            </div>
                            <div className="input-tab">
                                <textarea className="input-text input-style" placeholder="Job description" value={description} style={{ paddingLeft: "16px", width: "100%", height: "150px" }} onChange={(e) => { setDescription(e.target.value) }} />
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
                                <textarea className="input-text input-style" placeholder="Candidate requirements" value={requirements} style={{ paddingLeft: "16px", width: "100%", height: "150px" }} onChange={(e) => { setRequiments(e.target.value) }} />
                            </div>
                            <div className="input-tab">
                                <textarea className="input-text input-style" placeholder="Benefits" value={benefits} style={{ paddingLeft: "16px", width: "100%", height: "150px" }} onChange={(e) => { setBenefits(e.target.value) }} />
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
                            <h3>How long do you need the {specialty.name}?</h3>
                            <div className="radio">
                                <input type="radio"
                                    value='1 to 3 months'
                                    checked={hiringTime === '1 to 3 months'}
                                    onChange={(e) => setHiringtime(e.target.value)}
                                />
                                <label className="radio-content">
                                    <span className="radio-header">1 to 3 months</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio"
                                    value="3 to 6 months"
                                    checked={hiringTime === "3 to 6 months"}
                                    onChange={(e) => setHiringtime(e.target.value)}
                                />
                                <label className="radio-content">
                                    <span className="radio-header">3 to 6 months</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio"
                                    value="7 to 9 months"
                                    checked={hiringTime === "7 to 9 months"}
                                    onChange={(e) => setHiringtime(e.target.value)}
                                />
                                <label className="radio-content">
                                    <span className="radio-header">7 to 9 months</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio"
                                    value="10 to 12 months"
                                    checked={hiringTime === "10 to 12 months"}
                                    onChange={(e) => setHiringtime(e.target.value)}
                                />
                                <label className="radio-content">
                                    <span className="radio-header">10 to 12 months</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio"
                                    value="I will decide later"
                                    checked={hiringTime === "I will decide later"}
                                    onChange={(e) => setHiringtime(e.target.value)}
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
                                    checked={workForm === 'Full time (40 or more hrs/week)'}
                                    onChange={(e) => setWorkForm(e.target.value)}
                                />
                                <label className="radio-content">
                                    <span className="radio-header">Full time (40 or more hrs/week)</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio"
                                    value='Part time (Less than 40 hrs/week)'
                                    checked={workForm === 'Part time (Less than 40 hrs/week)'}
                                    onChange={(e) => setWorkForm(e.target.value)}
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
                                        skillList.map((name: string, key: number) =>
                                            <button key={key} className="btn-item item-minus" onClick={() => handleRemoveSkill(name)}>
                                                <span>{name}</span>
                                                <FontAwesomeIcon icon={faClose} />
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="skills">
                                <span>Popular skills for</span>
                                <select className="select-skills" onChange={(e) => { setSpecialtySelect(e.target.value) }}>
                                    {
                                        specialties.map((specialty, index) => {
                                            return (
                                                <option key={index} >{specialty.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="skill-items">
                                <div className="btn-items">
                                    {
                                        skills.map((skill, index) => {
                                            return (
                                                <button key={index} className="btn-item item-plus" onClick={() => handleSelectSkill(skill)}>
                                                    <FontAwesomeIcon icon={faPlus} />
                                                    <span>{skill}</span>
                                                </button>
                                            )
                                        })
                                    }
                                </div>
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
                                <input type="text" className="input-text input-style" placeholder="Quantity" value={quantity} onChange={(e) => { setQuantity(parseInt(e.target.value)) }} />
                            </div>
                            <div className="input-tab">
                                <div className="input-icon">
                                    <FontAwesomeIcon icon={faMedal} />
                                </div>
                                <input type="text" className="input-text input-style" placeholder="Experience" value={experience} onChange={(e) => { setExperience(e.target.value) }} />
                            </div>
                            <div className="input-tab">
                                <div className="input-icon">
                                    <FontAwesomeIcon icon={faLocationDot} />
                                </div>
                                <input type="text" className="input-text input-style" placeholder="Work location" value={workLocation} onChange={(e) => { setWorkLocation(e.target.value) }} />
                            </div>
                            <div className="input-tab">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Recruitment deadline"
                                        value={exprid}
                                        onChange={(newValue) => {
                                            setExprid(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
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
                                    checked={salary === 'Less than $70/hr'}
                                    onChange={(e) => setSalary(e.target.value)}
                                />
                                <label className="radio-content">
                                    <span className="radio-header">Less than $70/hr</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio"
                                    value='$70 - $90/hr'
                                    checked={salary === '$70 - $90/hr'}
                                    onChange={(e) => setSalary(e.target.value)}
                                />
                                <label className="radio-content" >
                                    <span className="radio-header">$70 - $90/hr</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio"
                                    value='$91 - $110/hr'
                                    checked={salary === '$91 - $110/hr'}
                                    onChange={(e) => setSalary(e.target.value)}
                                />
                                <label className="radio-content" >
                                    <span className="radio-header">$91 - $110/hr</span>
                                </label>
                            </div>
                            <div className="radio">
                                <input type="radio"
                                    value="I will decide later"
                                    checked={salary === "I will decide later"}
                                    onChange={(e) => setSalary(e.target.value)}
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
                                <input type="text" className="input-text input-style" placeholder="HR specialist name" value={hrName} onChange={(e) => { setHrName(e.target.value) }} />
                            </div>
                            <div className="input-tab">
                                <div className="input-icon">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </div>
                                <input type="text" className="input-text input-style" placeholder="Email" value={hrEmail} onChange={(e) => { setHrEmail(e.target.value) }} />
                            </div>
                            <div className="input-tab">
                                <div className="input-icon">
                                    <FontAwesomeIcon icon={faAddressBook} />
                                </div>
                                <input type="text" className="input-text input-style" placeholder="Contact me" value={hrPhone} onChange={(e) => { setHrPhone(e.target.value) }} />
                            </div>
                            <div className="prolicy">
                                <p>By completing signup, you are agreeing to Apits’s<span className="text-underline">Terms of Service</span>, <span className="text-underline">Privacy Policy</span>, <span className="text-underline">Sourced Talent Matching Agreement</span>, and <span className="text-underline">Cookie Policy</span> and that Apits may monitor or record audio or video calls for quality assurance and training purposes.</p>
                            </div>
                            <div className="bot-button btn-res1">
                                <div className="btn-back">
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                    <a href="#" onClick={() => setEtpProcess('EnterpriseCreatePost7')}>Back</a>
                                </div>
                                <button className="btn con-btn" onClick={() => { handleClick() }}>Finish</button>
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