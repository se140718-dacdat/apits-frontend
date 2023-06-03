import { faCakeCandles, faHouse, faPhone, faRightToBracket, faVenusMars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CandidateCurrentSpecialty, CandidateSkillLevel } from '../../../../Models';
import axios from '../../../../api/axios';
import { formatDateMonthYear, getCVName } from '../../../../convert';
import { CandidateResponse } from '../../../../entity';
import { PersonalExperience } from '../../../../model';
import "../../../pages/Candidate/CandidateProfile.css";


const ViewCandidateDetail = () => {
    const { id } = useParams();

    const [candidate, setCandidate] = useState<CandidateResponse>();
    const [specialties, setSpecialties] = useState<CandidateCurrentSpecialty[]>([]);
    const [skills, setSkills] = useState<CandidateSkillLevel[]>([]);
    const [experiences, setExperiences] = useState<PersonalExperience[]>([]);


    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        await axios.get(`/candidate/getCandidateByID?id=${id}`).then((res) => {
            if(res.data.status === "SUCCESS") {
                setCandidate(res.data.data);
            }
        })
        await axios.get(`/candidate-level/getListCurrentExpCandidate?candidateId=${id}`).then(async (res) => {
            const data = await res?.data.data;
            setSpecialties(data);
        });
        await axios.get(`/candidate/getAllPersonalExperience?candidateId=${id}`).then(async (res) => {
            const data = await res?.data.data;
            console.log(data)
            setExperiences(data);
        })
        await axios.get(`/candidate-skillLevel/getListSkillLevelDONEByCandidate?candidateId=${id}`).then(async (res) => {
            const data = await res?.data.data;
            setSkills(data);
        })
    }

    return (
        <div id='CandidateProfile' className='clearfix'>
            <img src="../images/banner.jpg" className='banner' alt="" />
            <div className="profile-container">
                <div className="left">
                    <div className="profile">
                        <div className="col-left">
                            <img src={candidate?.image} className='avatar' alt="" />
                            <div className="join">
                                <FontAwesomeIcon icon={faRightToBracket} className="icon" />
                                {candidate?.createAt && formatDateMonthYear(`${candidate?.createAt}`.slice(0, 10))}
                            </div>
                        </div>
                        <div className="col-right">
                            <div className="col-half mb-50">
                                <div className="fullname">{candidate?.name}</div>
                            </div>
                            <div>
                                <div className="col-half">
                                    <div className="work-status">
                                        <FontAwesomeIcon icon={faPhone} className="icon m-0" />
                                        <span>{candidate?.phone}</span>
                                    </div>
                                    <div className="work-status">
                                        <FontAwesomeIcon icon={faCakeCandles} className="icon m-0" />
                                        <span>{candidate?.dob && formatDateMonthYear(`${candidate?.dob}`.slice(0, 10))}</span>
                                    </div>
                                </div>
                                <div className="col-half m-0">
                                    <div className="work-status">
                                        <FontAwesomeIcon icon={faHouse} className="icon m-0" />
                                        <span>{candidate?.address}</span>
                                    </div>
                                    <div className="work-status">
                                        <FontAwesomeIcon icon={faVenusMars} className="icon m-0" />
                                        <span>{candidate?.gender}</span>
                                    </div>
                                </div>
                                <div className="col-half">
                                    <div className="work-status">
                                        <span className='m-0 profile-title'>CV</span>
                                        <Link to={(candidate?.cv) ? candidate?.cv : ""} style={{ marginLeft: "24px" }}>{(candidate?.cv) ? getCVName(candidate?.cv) : ""}</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="profile-input">
                        <div className="profile-header">
                            <div className="profile-header-name">Experiences</div>
                        </div>
                        <div className="profile-body">
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="profile-input">
                        <div className="profile-header flex-space-between">
                            <div className="profile-header-name">Specialties</div>
                        </div>
                        <div className="profile-body verification">
                            {
                                specialties?.map((specialty) => {
                                    return (
                                        <div className="item" key={specialty.id}>
                                            <strong className='item-name' style={{ fontSize: "1  rem" }}>{specialty.name}</strong>
                                            <span className='item-level'>{specialty.experience}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className="profile-input">
                        <div className="profile-header flex-space-between">
                            <div className="profile-header-name">Skills</div>
                        </div>
                        <div className="profile-body verification">
                            {
                                skills?.map((skill) => {
                                    return (
                                        <div className="item" key={skill.id}>
                                            <img src={skill.image} alt="" className='item-icon' />
                                            <strong className='item-name'>{skill.name}</strong>
                                            <span className='item-level'>Level {skill.levels[skill.levels.length - 1].level}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewCandidateDetail;