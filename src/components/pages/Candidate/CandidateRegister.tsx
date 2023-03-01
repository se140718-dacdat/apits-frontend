import { faUser, faHouse, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import "./CandidateRegister.css";
const CandidateRegister = () => {
    return (
        <div id="CandidateRegister">
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
                </div>
            </div>
            <div className="col-right">
                <img src="https://www.dentistfriend.com//uploads/praxisimages/Find-a-Job.png" alt="" className="intro-img" />
            </div>
        </div>
    )
}

export default CandidateRegister