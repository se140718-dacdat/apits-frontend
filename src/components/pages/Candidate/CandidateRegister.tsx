import { faCamera, faChevronLeft, faHouse, faPhone, faPlus, faUser, faVenusMars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextField from '@mui/material/TextField';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from '../../../api/axios';
import { getCVName } from '../../../convert';
import { CandidateUpdate, SpecialtyEntity, genderList } from '../../../model';
import { updateCandidate } from '../../../redux/apiRequest';
import "./CandidateRegister.css";


const storage = getStorage();

const CandidateRegister = () => {
    const account = useSelector((state: any) => state.auth.login.currentUser);
    const user = useSelector((state: any) => state.user.user.user);
    const specialties = useSelector((state: any) => state.specialty.specialties.specialty);
    const form50 = document.getElementById("form-50%") as HTMLElement
    const now = new Date();

    const [birth, setBirth] = React.useState<Dayjs | null>(user?.dob || dayjs(now.toLocaleDateString()));
    const [gender, setGender] = useState<string>(user?.gender || "Male");
    const [avatar, setAvatar] = useState<string>(user?.image || "/images/avt-blank.png");
    const [fullName, setFullName] = useState<string>(user?.name || "Full name");
    const [phone, setPhone] = useState<string>(user?.phone || "Phone");
    const [address, setAddress] = useState<string>(user?.address || "Address");
    const [cv, setCv] = useState<string>("");
    const [payment, setPayment] = useState<string>(user?.payment || "VNPay number");
    const [description, setDescription] = useState<string>(user?.description || "Description");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [progress, setProgress] = useState<string>("50%");
    const [selectSpecialties, setSelectSpecialties] = useState<SpecialtyEntity[]>([]);
    const [cvName, setCvName] = useState<string>(user?.cv)

    const handleSelect = (e: string) => {
        setGender(e);
    }

    form50?.addEventListener('submit', (event: any) => {
        event.preventDefault();
        console.log(cv)
        setProgress("100%");
        const registerModal = document.getElementById("CandidateRegister")!;
        if(registerModal) {
            (registerModal as HTMLElement).style.height = "auto";
        }
    });

    useEffect(() => {
        user?.cv && setCvName(getCVName(user?.cv));
        fetchData();
    }, [cv])

    const fetchData = async (): Promise<SpecialtyEntity[]> => {
        const response = await axios.get<{ data: { specials: SpecialtyEntity[] } }>(`/canspec/getListSpecsWithCan/${user?.id}`);
        const data = response?.data?.data?.specials;
        if (data) {
            setSelectSpecialties(data);
        }
        return data;
    }

    const handleChangeProgress = (progess: string, height: string) => {
        setProgress(progess);
        const registerModal = document.getElementById("CandidateRegister")!;
        (registerModal as HTMLElement).style.height = height;

    }

    const handleAddSpecialty = (specialty: SpecialtyEntity) => {
        if (!selectSpecialties.some((s) => s.id === specialty.id)) {
            setSelectSpecialties((prevSpecialties) => [...prevSpecialties, specialty]);
        }
    }

    const handleRemoveSpecialty = (specialty: SpecialtyEntity) => {
        if (selectSpecialties.includes(specialty)) {
            setSelectSpecialties((prevSpecialties) => prevSpecialties.filter((e) => e.id !== specialty.id));
            console.log(selectSpecialties)
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
                (type == "avatar") ?
                    setAvatar(downloadURL)
                    :
                    setCv(downloadURL)
                setCvName(getCVName(cv));
                console.log(downloadURL)
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
            payment: payment,
            dob: birth ? moment(birth.toString()).format('YYYY-MM-DD') : '',
            address: address,
            cv: cv,
            description: description
        }
        console.log(newUser);
        console.log(selectSpecialties);
        updateCandidate(user?.id, navigate, newUser, dispatch, selectSpecialties);
    }

    const handleProgress = () => {
        switch (progress) {
            case "50%":
                return (
                    <div className="col-left">
                        <img className='logo' src="/images/ApitsLogo.png" alt="logo" />
                        <h3 className="register-header">Welcome to Apits. Let’s get started!</h3>
                        <div style={{ fontSize: "0.9rem", marginBottom: "8%" }}>Your application should only take a few minutes. Based on the information you provide, our screening team will determine the best path for you going forward.</div>
                        <form id='form-50%' className='form-container'>
                            <div className="form-input">
                                <div className="input-icon">
                                    <FontAwesomeIcon icon={faUser} className="icon" />
                                </div>
                                <input
                                    type="text"
                                    value={fullName}
                                    placeholder={fullName}
                                    onChange={(e) => {
                                        setFullName(e.target.value);
                                    }}
                                    required
                                />
                            </div>
                            <div className="form-input">
                                <div className="input-icon">
                                    <FontAwesomeIcon icon={faPhone} className="icon" />
                                </div>
                                <input
                                    type="text"
                                    value={phone}
                                    placeholder={phone}
                                    onChange={(e) => {
                                        setPhone(e.target.value);
                                    }}
                                    required
                                    pattern="[0-9]{10}"
                                    onInvalid={(e) => {
                                        const target = e.target as HTMLInputElement;
                                        target.setCustomValidity('Please enter a valid 10-digit phone number');
                                    }}
                                    onInput={(e) => {
                                        const target = e.target as HTMLInputElement;
                                        target.setCustomValidity('');
                                    }}
                                />
                            </div>
                            <div className="form-input">
                                <div className="input-icon">
                                    <FontAwesomeIcon icon={faHouse} className="icon" />
                                </div>
                                <input
                                    type="text"
                                    value={address}
                                    placeholder={address}
                                    onChange={(e) => {
                                        setAddress(e.target.value);
                                    }}
                                    required
                                />
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
                                            genderList?.map((gender, index) => {
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
                                    <label htmlFor="cv-file" className="file-label link">
                                        {user?.cv && getCVName(user?.cv) || "Click here to upload CV"}
                                    </label>
                                    <input
                                        type="file"
                                        id="cv-file"
                                        accept=".pdf"
                                        onChange={(e) => {
                                            convertFile(e.target.files, "cv");
                                        }}
                                        style={{ display: "none" }}
                                    />
                                </div>
                            </div>
                            <div className="footer-register">
                                <div className="btn-continue">
                                    <button className='btn' type='submit'>Continue</button>
                                </div>
                                <div className="register-status">
                                    <div className="register-progress">50% complete</div>
                                    <div className="status-description">You’re one step closer to unlocking access to working with the world’s top companies</div>
                                </div>
                            </div>
                        </form>
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
                                        selectSpecialties?.map((specialty: SpecialtyEntity, key: number) =>
                                            <button key={key} className="btn-item item-plus" onClick={() => handleRemoveSpecialty(specialty)}>
                                                <FontAwesomeIcon icon={faXmark} />
                                                <span>{specialty.name}</span>
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
                                        specialties?.map((specialty: SpecialtyEntity, key: number) =>
                                            <button key={key} className="btn-item item-plus" onClick={() => handleAddSpecialty(specialty)}>
                                                <FontAwesomeIcon icon={faPlus} />
                                                <span>{specialty?.name}</span>
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                            <textarea
                                className='form-input description'
                                style={{ minHeight: "200px" }}
                                placeholder={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                                required
                            />
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