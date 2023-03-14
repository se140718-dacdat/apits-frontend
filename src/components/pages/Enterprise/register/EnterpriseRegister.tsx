import "./EnterpriseRegister.css"

const EnterpriseRegister = () => {
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
                                    <input type="text" className="input regis-input" placeholder="Email" required />
                                    <span className="text-err">This is the error message liner   </span>
                                    <p className="note">*Apits recommends registering with the company email (according to the company's website domain) to receive quick news approval support and unlimited job postings.</p>
                                </div>
                            </div>
                            <div className="group-input">
                                <label>Password:</label>
                                <div className="form-input">
                                    <input type="text" className="input regis-input" placeholder="Password" required />
                                    <span className="text-err"></span>
                                </div>
                            </div>
                            <div className="group-input">
                                <label>Confirm Password:</label>
                                <div className="form-input">
                                    <input type="text" className="input regis-input" placeholder="Confirm Password" required />
                                    <span className="text-err"></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="tilte">The information of the recruiter</div>
                        <div className="underline"></div>
                        <div className="content">
                            <div className="group-input">
                                <label>Company name:</label>
                                <div className="form-input">
                                    <input type="text" className="input regis-input" placeholder="Company name" required />
                                    <span className="text-err"></span>
                                </div>
                            </div>
                            <div className="group-input">
                                <label>Company address:</label>
                                <div className="form-input">
                                    <input type="text" className="input regis-input" placeholder="Company address" required />
                                    <span className="text-err"></span>
                                </div>
                            </div>
                            <div className="group-input">
                                <label>Phone number:</label>
                                <div className="form-input">
                                    <input type="text" className="input regis-input input-phone" placeholder="+84 123 456 789" required />
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
                        <button className="btn btn-cancel">Cancel</button>
                        <button className="btn" type="submit">Finish</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EnterpriseRegister;