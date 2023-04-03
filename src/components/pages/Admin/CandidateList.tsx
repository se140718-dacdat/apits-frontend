import React from 'react'
import "./AdminPage.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const CandidateList = () => {
    return (
        <div id='AdminPage'>
            <h2>Candidates</h2>
            <div className="filter">
                <div className="filter-form-input">
                    <div className="filter-input-icon">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
                    </div>
                    <input type="text" placeholder='Enter search keywords' />
                </div>
                <button className='btn-search ml-8'>Search</button>
            </div>
            {/* <Table striped bordered hover>
                <thead>
                    <tr>
                        <th style={{ width: "5%" }}>ID</th>
                        <th style={{ width: "5%" }}>Icon</th>
                        <th style={{ width: "15%" }}>Skill Name</th>
                        <th style={{ width: "70%" }}>Course Link</th>
                        <th style={{ width: "5%" }}></th>
                    </tr>
                </thead>
                <tbody>
                    {skills.map((skill) => {
                        if (editing == skill.skillId) {
                            return (
                                <tr key={skill.skillId}>
                                    <td>
                                        {skill.skillId}
                                    </td>
                                    <td>
                                        <img src={skill.skillIcon} alt="" className="item-icon" />
                                    </td>
                                    <td>
                                        <input style={{ padding: "8px", width: "100%" }} type="text" value={skill.skillName} />
                                    </td>
                                    <td>
                                        <input style={{ padding: "8px", width: "100%" }} type="text" value={"https://www.coursera.org/programs/fpt-university-jan-may-2023-yfdrt?collectionId=&currentTab=CATALOG&productId=qLFYrxnoEeWwrBKfKrqlSQ&productType=course&showMiniModal=true"} />
                                    </td>
                                    <td>
                                        <button className='btn-save' onClick={() => { setEdditing("") }}>Save</button>
                                    </td>
                                    <td>
                                        <button className='btn-cancel' onClick={() => { setEdditing("") }}>Cancel</button>
                                    </td>
                                </tr>
                            );
                        } else {
                            return (
                                <tr key={skill.skillId}>
                                    <td>
                                        {skill.skillId}
                                    </td>
                                    <td>
                                        <img src={skill.skillIcon} alt="" className="item-icon" />
                                    </td>
                                    <td>
                                        {skill.skillName}
                                    </td>
                                    <td>
                                        https://www.coursera.org/programs/fpt-university-jan-may-2023-yfdrt?collectionId=&currentTab=CATALOG&productId=qLFYrxnoEeWwrBKfKrqlSQ&productType=course&showMiniModal=true
                                    </td>
                                    <td>
                                        <button className='btn-edit' onClick={() => { setEdditing(skill.skillId) }}>Edit</button>
                                    </td>
                                </tr>
                            )
                        }
                    })}
                </tbody>
            </Table> */}
        </div>
    )
}

export default CandidateList