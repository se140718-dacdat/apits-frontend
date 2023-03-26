import { faUser, faHouse, faPhone, faVenusMars, faCamera, faChevronLeft, faPlus, faX, faMinus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap';
import { CandidateUpdate, genderList } from '../../../model';
import "./CandidateRegister.css";
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router-dom';
import { updateCandidate } from '../../../redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const developerList: Array<string> = ['Frontend Developer', 'Backend Developer', 'Tester', 'DevOps Developer', 'FullStack Developer', 'Network Engineer', 'Cybersecurity', 'Cloud Administrator', 'Database Administrator', 'Cloud DevOps Engineer'];


const storage = getStorage();

const CandidateRegister = () => {
    const user = useSelector((state: any) => state.auth.login.currentUser);
    const now = new Date();
    const [birth, setBirth] = React.useState<Dayjs | null>(dayjs(now.toLocaleDateString()));
    const [gender, setGender] = useState<string>("Male");
    const [avatar, setAvatar] = useState<string>("/images/avt-blank.png");
    const [fullName, setFullName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [cv, setCv] = useState<string>("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [progress, setProgress] = useState<string>("50%");
    const [specialties, setSpecialties] = useState<String[]>([]);

    const handleSelect = (e: string) => {
        setGender(e);
    }

    useEffect(() => {
        console.log(user)
    }, [specialties])

    const handleChangeProgress = (progess: string, height: string) => {
        setProgress(progess);
        const registerModal = document.getElementById("CandidateRegister")!;
        (registerModal as HTMLElement).style.height = height;
        
    }

    const handleAddSpecialty = (specialty: String) => {
        if (!specialties.includes(specialty)) {
            setSpecialties((prevSpecialties) => [...prevSpecialties, specialty]);
        }
    }

    const handleRemoveSpecialty = (specialty: String) => {
        if (specialties.includes(specialty)) {
            setSpecialties((prevSpecialties) => prevSpecialties.filter((e) => e !== specialty));
            console.log(specialties)
        }
    }



    const convertFile = async (files: FileList | null, type: string) => {
        if (files) {
            const fileRef = files[0];
            const fileType = fileRef.type;
            const fileData = fileRef.slice();
            const storageRef = ref(storage, fileRef.name);

            try {
                // Upload the file to Firebase Storage
                const snapshot = await uploadBytes(storageRef, fileData);

                // Get the download URL for the file
                const downloadURL = await getDownloadURL(snapshot.ref);

                // Set the state to the download URL
                (type == "cv") ?
                    setCv(downloadURL)
                    :
                    setAvatar(downloadURL);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const registerHandle = () => {
        const newUser: CandidateUpdate = {
            name: fullName,
            phone: phone,
            image: avatar,
            gender: gender,
            dob: "2023-03-06T06:12:41.626Z",
            address: address,
            cv: cv
        }
        console.log(newUser)
        // updateCandidate(user.information.id, navigate, newUser, dispatch)
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
                                <input type="text" placeholder='Full name' required onChange={(e) => { setFullName(e.target.value) }} />
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
                                        value={birth}
                                        onChange={(newValue) => {
                                            setBirth(newValue);
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
                                    <input type="file" id="img-file" accept='.pdf' onChange={(e) => { convertFile(e.target.files, "cv") }} />
                                </div>
                            </div>
                            <div className="footer-register">
                                <div className="btn-continue">
                                    <button className='btn' type='submit' onClick={() => { handleChangeProgress("100%", "auto") }}>Continue</button>
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
                        <div className="btn-back" onClick={() => { handleChangeProgress("50%", "inherit") }}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                            <span>Back</span>
                        </div>
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
                                    <input type="file" id="img-file" accept='.jpg, .png' style={{ display: "none" }} onChange={(e) => { convertFile(e.target.files, "avatar") }} />
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
                            <h5>Your specialties:</h5>
                            <div className="skill-items" style={{ marginLeft: "-10px" }}>
                                <div className="btn-items">
                                    {
                                        specialties.map((specialty: String, key: number) =>
                                            <button key={key} className="btn-item item-plus" onClick={() => handleRemoveSpecialty(specialty)}>
                                                <FontAwesomeIcon icon={faXmark} />
                                                <span>{specialty}</span>
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                            <h5>
                                List of specialty for Information Technology:
                            </h5>
                            <div className="skill-items" style={{ marginLeft: "-10px" }}>
                                <div className="btn-items">
                                    {
                                        developerList.map((specialty: String, key: number) =>
                                            <button key={key} className="btn-item item-plus" onClick={() => handleAddSpecialty(specialty)}>
                                                <FontAwesomeIcon icon={faPlus} />
                                                <span>{specialty}</span>
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="form-input">
                                <div className="input-icon">
                                    <img src="/images/momo.png" alt="" className='icon' />
                                </div>
                                <input type="text" placeholder='Momo number' />
                            </div>
                            <textarea className="form-input description" placeholder="Description" style={{ minHeight: "200px" }} />

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