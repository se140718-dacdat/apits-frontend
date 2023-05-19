import { faAddressBook, faChevronLeft, faClose, faCoins, faEnvelope, faLocationDot, faMedal, faPerson, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextField from '@mui/material/TextField';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import React, { Fragment, useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ExperienceSpecialy, LevelShow, PostEntity, SkillRequire, SkillSelect, SkillShow, SpecialtyExpDetail } from "../../../entity";
import { LevelEntity, SkillEntity, SpecialtyEntity } from "../../../model";
import { createPost, getAllSpecialtyExperience, getAllSpecialtyWithoutExperience } from "../../../redux/apiRequest";
import "./EnterpriseCreatePost.css";
import "./SkillItems.css";
import axios from "../../../api/axios";
import { currencyMask, currencyMaskString } from "../../../mask";
import MessageBox from "../../modules/pagecomponents/Popup/MessageBox/MessageBox";
import { ExperienceOnly, Level, Skill, SpecialtyExperience, SpecialtyWithoutExperience } from "../../../Models";


const EnterpriseCreatePost = () => {
    const now = new Date();
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.user.user.user);


    const [etpProcess, setEtpProcess] = useState("specialty");
    const [exprid, setExprid] = React.useState<Dayjs | null>(dayjs(now.toLocaleDateString()));
    const [specialties, setSpecialties] = useState<SpecialtyExperience[]>([]);
    const [specialtiesChoose, setSpecialtiesChoose] = useState<SpecialtyWithoutExperience>();
    const [specialty, setSpecialty] = useState<SpecialtyExperience>();
    const [specialtySelect, setSpecialtySelect] = useState<SpecialtyExperience>();
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [requirements, setRequiments] = useState<string>('');
    const [benefits, setBenefits] = useState<string>('');
    const [workForm, setWorkForm] = useState<string>('Full time (40 or more hrs/week)');
    const [salary, setSalary] = useState<string>("");
    const [skills, setSkills] = useState<SkillSelect[]>([]);
    const [skillsShow, setSkillsShow] = useState<SkillShow[]>([]);
    const [quantity, setQuantity] = useState<number>(0);
    const [experienceSelect, setExperienceSelect] = useState<ExperienceOnly>();
    const [experience, setExperience] = useState<string>('');
    const [workLocation, setWorkLocation] = useState<string>('');
    const [hrName, setHrName] = useState<string>('');
    const [hrPhone, setHrPhone] = useState<string>('');
    const [hrEmail, setHrEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [messageStatus, setMessageStatus] = useState('');

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        getSpecialtyChoose();
    }, [specialty])


    const handleSelectSkill = (skill: Skill, level: Level) => {
        if (!skills.some(skillSelect => skillSelect.skillId === skill.id)) {
            const skillSelect: SkillSelect = {
                skillId: skill.id,
                skillName: skill.name,
                levelName: level.level
            }
            setSkills((prevSkills) => [...prevSkills, skillSelect]);
        } else {
            const index = skills.findIndex(skillSelect => skillSelect.skillId === skill.id);
            if (index !== -1) {
                const updatedSkills = [...skills];
                updatedSkills[index] = {
                    ...updatedSkills[index],
                    levelName: level.level
                };
                setSkills(updatedSkills);
            }
        }
    }

    const handleRemoveSkill = (skill: SkillSelect) => {
        if (skills.some(skillSelect => skillSelect === skill)) {
            setSkills((prevSkill) => prevSkill.filter((e) => e !== skill))
        }
    }
    const fetchData = async () => {
        setSpecialties(await getAllSpecialtyExperience())
    }

    const getSpecialtyChoose = async () => {
        setSpecialtiesChoose(await getAllSpecialtyWithoutExperience(specialty?.id));
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSalary(e.target.value);
    }



    const handleClick = () => {
        const skillList: SkillRequire[] = skills.map(({ skillId, levelName }) => ({
            skillId,
            levelName,
        }));
        if (specialtySelect !== undefined) {
            const newPost: PostEntity = {
                expiryDate: `${exprid?.format("YYYY-MM-DD")}`,
                title: title,
                name: "",
                quantity: quantity,
                benefits: benefits,
                experience: experience,
                typeOfWork: workForm,
                salaryDetail: parseInt(salary.replace(/\./g, ""), salary.length),
                description: description,
                requirement: requirements,
                workLocation: workLocation,
                hrName: hrName,
                hrEmail: hrEmail,
                hrPhone: hrPhone,
                enterpriseId: user?.id,
                skillId: 0,
                levelId: 0,
                skillLevelRequests: skillList,
                specialtyId: specialtySelect !== undefined ? specialtySelect?.id : 0,
                experienceId: experienceSelect !== undefined ? experienceSelect?.id : 0,
            }
            console.log(newPost)
            createPost(newPost, navigate);
        } else {
            setMessage("Create post error")
            setMessageStatus("red")
        }
    }
    const handleRegisProcess = () => {
        switch (etpProcess) {
            case 'specialty':
                return (
                    <div id="EnterpriseCreatePost">
                        <div className="content-left">
                            <h3>What type of specialty are you hiring for?</h3>
                            {
                                specialties?.map((item, index: number) => {
                                    return (
                                        <div className="radio hover-primary" key={index} onClick={() => { setSpecialtySelect(item) }}>
                                            <input type="radio"
                                                value={item.name}
                                                checked={item.name === specialtySelect?.name}
                                            />
                                            <label className="radio-content hover">
                                                <span className="radio-header">{item.name}</span>
                                            </label>
                                        </div>
                                    )
                                })
                            }
                            <div className="bot-button">
                                <button className="btn con-btn" onClick={() => { setEtpProcess('salary');
                                setSpecialty(specialties[1])
                            }}>Get Started</button>
                            </div>
                        </div>
                        <div className="content-right">
                            <img src="https://weisseradlerng.com/images/It-consulting2.png?fbclid=IwAR1xFcrUNJmC6K1qNd-RTaTSScB6r-PKvQB3elqxfVTCSiXGp4YxZVLx6ys" alt="" className="intro-image" />
                        </div>
                    </div>
                );
            case 'salary':
                return (
                    <div id="EnterpriseCreatePost">
                        <div className="content-left">
                            <h3>What level of specialty would you like your candidate to reach in <strong color="var(--primary-color)">{specialtySelect?.name}</strong>?</h3>
                            {
                                specialtySelect?.experiences.map((experience) => {
                                    return (
                                        <div className="radio" key={experience.id}>
                                            <input type="radio"
                                                value={experience.name}
                                                checked={experienceSelect?.name === experience.name}
                                                onChange={(e) => setExperienceSelect(experience)}
                                            />
                                            <label className="radio-content">
                                                <span className="radio-header">{experience.name}</span>
                                            </label>
                                        </div>
                                    )
                                })
                            }

                            <h3>What level of time commitment will you require from the candidate?</h3>
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
                            <h3>What is your budget for this role?</h3>
                            <div className="input-tab salary">
                                <div className="input-icon">
                                    <FontAwesomeIcon icon={faCoins} />
                                </div>
                                <input type="text" className="input-text input-style" placeholder="Salary budget" value={salary} onChange={(e) => {
                                    handleChange(currencyMask(e));
                                }} />
                                <span>(VNĐ)</span>
                            </div>
                            <div className="bot-button btn-res1">
                                <div className="btn-back">
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                    <a href="#" onClick={() => setEtpProcess('specialty')}>Back</a>
                                </div>
                                <button className="btn con-btn" onClick={() => (salary === "") ? setMessage("Salary is empty") : setEtpProcess("title")}>Next</button>
                            </div>
                        </div>
                        <div className="content-right">
                            <img src="https://weisseradlerng.com/images/It-consulting2.png?fbclid=IwAR1xFcrUNJmC6K1qNd-RTaTSScB6r-PKvQB3elqxfVTCSiXGp4YxZVLx6ys" alt="" className="intro-image" />
                        </div>
                    </div>
                );
            case 'title':
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
                                    <a href="#" onClick={() => { setEtpProcess('salary') }}>Back</a>
                                </div>
                                <button className="btn con-btn" onClick={() => { setEtpProcess('recruitment') }}>Next</button>
                            </div>
                        </div>
                        <div className="content-right">
                            <img src="https://weisseradlerng.com/images/It-consulting2.png?fbclid=IwAR1xFcrUNJmC6K1qNd-RTaTSScB6r-PKvQB3elqxfVTCSiXGp4YxZVLx6ys" alt="" className="intro-image" />
                        </div>
                    </div>
                );
            case 'recruitment':
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
                                    <a href="#" onClick={() => { setEtpProcess('title') }}>Back</a>
                                </div>
                                <button className="btn con-btn" onClick={() => {
                                    getSpecialtyChoose();
                                    setEtpProcess('skills')
                                }}>Next</button>
                            </div>
                        </div>
                        <div className="content-right">
                            <img src="https://weisseradlerng.com/images/It-consulting2.png?fbclid=IwAR1xFcrUNJmC6K1qNd-RTaTSScB6r-PKvQB3elqxfVTCSiXGp4YxZVLx6ys" alt="" className="intro-image" />
                        </div>
                    </div>

                );
            case 'skills':
                return (
                    <div id="EnterpriseCreatePost">
                        <div className="content-left">
                            <h3>What skills would you like to see in your new hire?</h3>
                            <div className="input-block">
                                <div className="skill-selected">
                                    {
                                        skills.map((skill: SkillSelect, key: number) =>
                                            <button key={key} className="btn-item item-minus" onClick={() => handleRemoveSkill(skill)}>
                                                <span>{skill.skillName} level {skill.levelName}</span>
                                                <FontAwesomeIcon icon={faClose} />
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="skills">
                                <span>Popular skills for</span>
                                <select className="select-skills" onChange={(e) => {
                                    const selectedSpecialty = specialties?.find((specialty) => specialty.name === e.target.value);
                                    if (selectedSpecialty) {
                                        setSpecialty(selectedSpecialty);
                                    }
                                }}>
                                    {specialties?.map((specialty, index: number) => (
                                        <option key={index}>{specialty.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="skill-items">
                                <div className="btn-items">
                                    {
                                        specialtiesChoose !== null && specialtiesChoose?.skills.map((skill, index) => {

                                            return (
                                                <div style={{ display: "inline-block" }} key={index}>
                                                    <Dropdown>
                                                        <Dropdown.Toggle variant="success" className="btn-item item-plus" id="dropdown-basic">
                                                            {skill.name}
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            {
                                                                skill.levels.map((level, index) => {
                                                                    return (
                                                                        <Dropdown.Item onClick={() => handleSelectSkill(skill, level)} key={index}>{level.level}</Dropdown.Item>
                                                                    )
                                                                })
                                                            }
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="bot-button btn-res1">
                                <div className="btn-back">
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                    <a href="#" onClick={() => setEtpProcess('recruitment')}>Back</a>
                                </div>
                                <button className="btn con-btn" onClick={() => setEtpProcess('information')}>Next</button>
                            </div>
                        </div>
                        <div className="content-right">
                            <img src="https://weisseradlerng.com/images/It-consulting2.png?fbclid=IwAR1xFcrUNJmC6K1qNd-RTaTSScB6r-PKvQB3elqxfVTCSiXGp4YxZVLx6ys" alt="" className="intro-image" />
                        </div>
                    </div>
                );
            case 'information':
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
                                    <a href="#" onClick={() => setEtpProcess('skills')}>Back</a>
                                </div>
                                <button className="btn con-btn" onClick={() => setEtpProcess('hr')}>Next</button>
                            </div>
                        </div>
                        <div className="content-right">
                            <img src="https://weisseradlerng.com/images/It-consulting2.png?fbclid=IwAR1xFcrUNJmC6K1qNd-RTaTSScB6r-PKvQB3elqxfVTCSiXGp4YxZVLx6ys" alt="" className="intro-image" />
                        </div>
                    </div>
                );
            case 'hr':
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
                                    <a href="#" onClick={() => setEtpProcess('information')}>Back</a>
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
        <Fragment>
            {
                message != '' ?
                    <MessageBox status={messageStatus} message={message} setMessage={setMessage} title='inasd'></MessageBox>
                    :
                    null
            }
            {handleRegisProcess()}
        </Fragment>
    )

}

export default EnterpriseCreatePost;