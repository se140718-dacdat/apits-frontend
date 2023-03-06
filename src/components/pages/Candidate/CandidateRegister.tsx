import { faUser, faHouse, faPhone, faVenusMars, faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap';
import { CandidateUpdate, genderList } from '../../../model';
import "./CandidateRegister.css";
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { loginUser, registerCandidate, updateCandidate } from '../../../redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';

const CandidateRegister = () => {
    const user = useSelector((state: any) => state.auth.login.currentUser);
    const now = new Date();
    const [value, setValue] = React.useState<Dayjs | null>(dayjs(now.toLocaleDateString()));
    const [gender, setGender] = useState<string>("Male");
    const [avatar, setAvatar] = useState<string>("/images/avt-blank.png");
    const [fullName, setFullName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [birth, setBirth] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleSelect = (e: string) => {
        setGender(e);
    }

    const [progress, setProgress] = useState<string>("50%");

    const convertFile = (files: FileList | null) => {
        if (files) {
            const fileRef = files[0] || ""
            const fileType: string = fileRef.type || ""
            const reader = new FileReader()
            reader.readAsBinaryString(fileRef)
            reader.onload = (ev: any) => {
                setAvatar(`data:${fileType};base64,${btoa(ev.target.result)}`)
            }
        }
    }

    const registerHandle = () => {
        const newUser: CandidateUpdate = {
            name: fullName,
            phone: phone,
            image: avatar,
            gender: gender,
            dob: "2023-03-06T06:12:41.626Z",
            address: address
        }
        updateCandidate(user.candidate.id, navigate, newUser)
    }

    const handleProgress = () => {
        switch (progress) {
            case "50%":
                return (
                    <div className="col-left">
                        <img className='logo' src="/images/ApitsLogo.png" alt="logo" />
                        <h3 className="register-header">Welcome to Apits. Let’s get started!</h3>
                        <div style={{ fontSize: "0.9rem", marginBottom: "8%" }}>Your application should only take a few minutes. Based on the information you provide, our screening team will determine the best path for you going forward.</div>
                        <div className='form-container'>
                            <div className="form-input">
                                <div className="input-icon">
                                    <FontAwesomeIcon icon={faUser} className="icon" />
                                </div>
                                <input type="text" placeholder='Full name' onChange={(e) => { setFullName(e.target.value) }} />
                            </div>
                            <div className="form-input">
                                <div className="input-icon">
                                    <FontAwesomeIcon icon={faPhone} className="icon" />
                                </div>
                                <input type="text" placeholder='Phone' onChange={(e) => { setPhone(e.target.value) }} />
                            </div>
                            <div className="form-input">
                                <div className="input-icon">
                                    <FontAwesomeIcon icon={faHouse} className="icon" />
                                </div>
                                <input type="text" placeholder='Address' onChange={(e) => { setAddress(e.target.value) }} />
                            </div>
                            <div className="haft-input-cover">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Date of Birth"
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                                <Dropdown className="gender-dropdown" style={{ width: "40%", margin: "0" }}>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        <div className="input-icon">
                                            <FontAwesomeIcon icon={faVenusMars} className="icon" />
                                        </div>
                                        <span>{gender}</span>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {
                                            genderList.map((gender, index) => {
                                                return (
                                                    <div key={index}>
                                                        <Dropdown.Item onClick={() => { handleSelect(gender) }}>{gender}</Dropdown.Item>
                                                    </div>
                                                )
                                            })
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <div className="form-import">
                                <div className="form-import-header">Personal CV:</div>
                                <div className="haft-input-cover">
                                    <input type="file" />
                                </div>
                            </div>
                            <div className="footer-register">
                                <div className="btn-continue">
                                    <button className='btn' onClick={() => { setProgress("100%") }}>Continue</button>
                                </div>
                                <div className="register-status">
                                    <div className="register-progress">50% complete</div>
                                    <div className="status-description">You’re one step closer to unlocking access to working with the world’s top companies</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            case "100%":
                return (
                    <div className="col-left">
                        <img className='logo' src="/images/ApitsLogo.png" alt="logo" />
                        <h3 className="register-header">Tell us about yourself</h3>
                        <div style={{ fontSize: "0.9rem", marginBottom: "4%", marginTop: "4%" }}>
                            <h5>Profile Photo</h5>
                            Please upload a high-quality profile photo. Candidate with professional profile photos are prioritized and see more jobs with Apits clients</div>
                        <div className='form-container'>
                            <div className="form-input" style={{ border: "none", justifyContent: "space-between" }}>
                                <div className="img-input" style={{ cursor: "pointer" }} onClick={(e) => {
                                    document.getElementById("img-file")?.click();
                                }}>
                                    <input type="file" id="img-file" accept='.jpg, .png' style={{ display: "none" }} onChange={(e) => { convertFile(e.target.files) }} />
                                    <img src={avatar} alt="" />
                                    <div className="icon-camera">
                                        <FontAwesomeIcon icon={faCamera} className="icon" />
                                    </div>
                                </div>
                                <div className="img-guide">
                                    <h5>JPG / PNG file</h5>
                                    <h5>Minimum resolution: 380x380px</h5>
                                    <h5>Maximum file size: 25 MB</h5>
                                </div>
                            </div>
                            <div className="form-input">
                                <div className="input-icon">
                                    <img src="/images/momo.png" alt="" className='icon' />
                                </div>
                                <input type="text" placeholder='Momo number' />
                            </div>
                            <textarea className="form-input description" placeholder="Description" />

                            <div className="footer-register">
                                <div className="btn-continue">
                                    <button className='btn' onClick={() => { registerHandle() }}>Finish</button>
                                </div>
                                <div className="register-status">
                                    <div className="register-progress">100% complete</div>
                                    <div className="status-description">You’re almost done! One more step and you can start your personalized screening experience.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
        }
    }

    return (
        <div id="CandidateRegister">
            {handleProgress()}
            <div className="col-right">
                <img src="https://www.dentistfriend.com//uploads/praxisimages/Find-a-Job.png" alt="" className="intro-img" />
            </div>
        </div>
    )
}

export default CandidateRegister