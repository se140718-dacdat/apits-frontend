import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react"
import "./EnterpriseRegister.css"
import { Login, RegisterEnterprise } from "../../../model";
import { registerEnterprise } from "../../../redux/apiRequest";

const EnterpriseRegister = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirm, setConfirm] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [scale, setScale] = useState<string>("");
    const [industry, setIndustry] = useState<string>("");
    const [introduce, setIntroduce] = useState<string>("");


    const registerHandler = () => {
        const newUser: RegisterEnterprise = {
            name: name,
            address: address,
            phone: phone,
            email: username,
            password: password
        }
        registerEnterprise(newUser, navigate);
        navigate("/")
    }

    return (
        <div id="EnterpriseRegister">
            <div className="bg">
                <div className="header">
                    <h5>The registration of an Employer account</h5>
                    <span>
                        Let's build an advantage for the business by registering<br /> a business account with the most accurate information
                    </span>
                </div>
            </div>
            <div className="container">
                <form action="">
                    <div className="form-group">
                        <div className="tilte">Account</div>
                        <div className="underline"></div>
                        <div className="content">
                            <div className="group-input">
                                <label>Email:</label>
                                <div className="form-input">
                                    <input type="text" className="input regis-input" placeholder="Email" required onChange={(e) => { setUsername(e.target.value) }} />
                                    <p className="note">*Apits recommends registering with the company email (according to the company's website domain) to receive quick news approval support and unlimited job postings.</p>
                                </div>
                            </div>
                            <div className="group-input">
                                <label>Password:</label>
                                <div className="form-input">
                                    <input type="text" className="input regis-input" placeholder="Password" required onChange={(e) => { setPassword(e.target.value) }} />
                                    <span className="text-err"></span>
                                </div>
                            </div>
                            <div className="group-input">
                                <label>Confirm Password:</label>
                                <div className="form-input">
                                    <input type="text" className="input regis-input" placeholder="Confirm Password" required onChange={(e) => { setConfirm(e.target.value) }} />
                                    <span className="text-err"></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="tilte">Company Information</div>
                        <div className="underline"></div>
                        <div className="content">
                            <div className="group-input">
                                <label>Company name:</label>
                                <div className="form-input">
                                    <input type="text" className="input regis-input" placeholder="Company name" required onChange={(e) => { setName(e.target.value) }} />
                                    <span className="text-err"></span>
                                </div>
                            </div>
                            <div className="group-input">
                                <label>Company address:</label>
                                <div className="form-input">
                                    <input type="text" className="input regis-input" placeholder="Company address" required onChange={(e) => { setAddress(e.target.value) }} />
                                    <span className="text-err"></span>
                                </div>
                            </div>
                            <div className="group-input">
                                <label>Phone number:</label>
                                <div className="form-input">
                                    <input type="text" className="input regis-input input-phone" placeholder="+84 123 456 789" required onChange={(e) => { setPhone(e.target.value) }} />
                                    <span className="text-err"></span>
                                </div>
                            </div>
                            <div className="group-input">
                                <label>Company Scale:</label>
                                <div className="form-input">
                                    <input type="text" className="input regis-input input-phone" placeholder="100-499 employees" required onChange={(e) => { setScale(e.target.value) }} />
                                    <span className="text-err"></span>
                                </div>
                            </div>
                            <div className="group-input">
                                <label>Company Industry:</label>
                                <div className="form-input">
                                    <input type="text" className="input regis-input input-phone" placeholder="IT Software" required onChange={(e) => { setIndustry(e.target.value) }} />
                                    <span className="text-err"></span>
                                </div>
                            </div>
                            <div className="group-input">
                                <label>Introduction:</label>
                                <div className="form-input">
                                    <textarea className="input regis-input input-phone" placeholder="Company introduction" required onChange={(e) => { setIntroduce(e.target.value) }} />
                                    <span className="text-err"></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rules">
                        <input type="checkbox" className="rule-checkbox" />
                        <label>I agree to the <span className="rule-text">Terms of Service</span> of Apits.</label>
                    </div>
                    <div className="group-button">
                        <button className="btn btn-cancel" onClick={() => { navigate("/") }}>Cancel</button>
                        <button className="btn" type="submit" onClick={() => { registerHandler() }}>Finish</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EnterpriseRegister;