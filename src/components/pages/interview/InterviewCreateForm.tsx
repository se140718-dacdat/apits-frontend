import { Dropdown } from "react-bootstrap";
import "./InterviewCreate.css"
import { useState } from "react";

const InterviewCreate = () => {
    const [interviewType, setInterviewType] = useState('Interview');
    return (
        <div id="InterviewCreate">
            <div className="bg">
                <div className="header">
                    <h4>Interview schedule</h4>
                    <span>
                        Maximize your hiring efficiency by implementing<br /> an interview schedule that outlines the key details
                    </span>
                </div>
            </div>
            <div className="container">
                <form action="">
                    <div className="form-group">
                        <div className="tilte">Interview form sections</div>
                        <div className="underline"></div>
                        <div className="content">
                            <div className="group-input">
                                <label>Title:</label>
                                <div className="form-input">
                                    <input type="text" className="input regis-input" placeholder="Title" required />
                                    <span className="text-err">This is the error message liner   </span>
                                </div>
                            </div>
                            <div className="group-input">
                                <label>Type interview:</label>
                                <div className="form-input form-input-select">
                                    <select className="form-select" onChange={(e) => setInterviewType(e.target.value)}>
                                        <option>Interview with Enterprise</option>
                                        <option>Meeting with Professor</option>
                                    </select>
                                </div>
                            </div>
                            <div className="group-input">
                                <label>Time:</label>
                                <div className="form-input">
                                    <input type="datetime-local" className="input regis-input input-date" />
                                </div>
                            </div>
                            <div className="group-input">
                                <label>Link:</label>
                                <div className="form-input">
                                    <input type="text" className="input regis-input" placeholder="Link interview" required />
                                    <span className="text-err"></span>
                                </div>
                            </div>
                            <div className="group-input">
                                <label>Participants:</label>
                                <div className="form-input">
                                    <textarea className="input regis-input" placeholder="Participants" required />
                                    <span className="text-err"></span>
                                </div>
                            </div>
                        </div>
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

export default InterviewCreate;
