import { faUser, faHouse, faPhone, faCakeCandles, faVenusMars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap';
import { genderList } from '../../../model';
import "./CandidateRegister.css";
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

const CandidateRegister = () => {
    const now = new Date();
    const [value, setValue] = React.useState<Dayjs | null>(dayjs(now.toLocaleDateString()));
    const [gender, setGender] = useState<string>("Male");
    const handleSelect = (e: string) => {
        setGender(e);
    }
    
    const [progress, setProgress] = useState<string>("50%");

    const handleProgress = () => {
        switch(progress) {
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
                        <input type="text" placeholder='Full name' />
                    </div>
                    <div className="form-input">
                        <div className="input-icon">
                            <FontAwesomeIcon icon={faPhone} className="icon" />
                        </div>
                        <input type="text" placeholder='Phone' />
                    </div>
                    <div className="form-input">
                        <div className="input-icon">
                            <FontAwesomeIcon icon={faHouse} className="icon" />
                        </div>
                        <input type="text" placeholder='Address' />
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
                                    genderList.map((gender) => {
                                        return (
                                            <div>
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
                            <button className='btn' onClick={()=>{setProgress("100%")}}>Continue</button>
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
                    <div className="col-left">100%</div>
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