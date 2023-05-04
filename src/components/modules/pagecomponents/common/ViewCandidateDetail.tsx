import { faCakeCandles, faHouse, faPhone, faRightToBracket, faVenusMars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from '../../../../api/axios';
import { formatDateMonthYear, getCVName } from '../../../../convert';
import { CandidateResponse, SpecialtyExpResponse } from '../../../../entity';
import { CandidateSkill } from '../../../../model';
import "../../../pages/Candidate/CandidateProfile.css";


const ViewCandidateDetail = () => {
    const { id } = useParams();

    const [candidate, setCandidate] = useState<CandidateResponse>();
    const [specialties, setSpecialties] = useState<SpecialtyExpResponse[]>([]);
    const [specialty, setSpecialty] = useState<SpecialtyExpResponse>();
    const [skills, setSkills] = useState<CandidateSkill[]>([]);


    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        getSkills();
    }, [specialty]);

    async function fetchData() {
        await axios.get(`/candidate/getCandidateByID?id=${id}`).then((res) => {
            if(res.data.status === "SUCCESS") {
                setCandidate(res.data.data);
                console.log(res)
            }
        })
        await axios.get(`/canspec/getSESLCandidateSpecialExp?candidateId=${id}`).then(async (res) => {
            const data = await res?.data.data.specialties;
            setSpecialties(data);
            setSpecialty(data[0]);
        });
    }

    async function getSkills() {
        const response = await axios.get(`/candidate-skill-level/getListSkillWithCurrentLevelByCandidateId?candidateId=${id}&specialtyId=${specialty?.specialtyId}`);
        setSkills(response.data.data);
    }

    const handleSelect = (e: SpecialtyExpResponse) => {
        setSpecialty(e);
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
                                <div className="profile-body-description">
                                    <h6>FPT Software Intern  //  Jan 2022 - April 2022</h6>
                                    <ul>
                                        <li>Collaborated with cross-functional teams to complete projects related to medical</li>
                                        <li>Participated in team meetings and contributed to group brainstorming sessions</li>
                                        <li>Completed feature and fix bug for application functional</li>
                                    </ul>
                                </div>
                                <div className="profile-body-description">
                                    <h6>FPT Software Intern  //  Jan 2022 - April 2022</h6>
                                    <ul>
                                        <li>Collaborated with cross-functional teams to complete projects related to medical</li>
                                        <li>Participated in team meetings and contributed to group brainstorming sessions</li>
                                        <li>Completed feature and fix bug for application functional</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="profile-input">
                            <div className="profile-header">
                                <div className="profile-header-name">Certification</div>
                            </div>
                            <div className="profile-body">
                                <div className="profile-body-description">
                                    <h6>March 28, 2020</h6>
                                    <div className='certificate-link'>Basic of Web Developement & Coding (Coursera)
                                    </div>
                                </div>
                                <div className="profile-body-description">
                                    <h6>March 11, 2023</h6>
                                    <div className='certificate-link'>Building mordern java application (Coursera)
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="profile-input">
                            <div className="profile-header flex-space-between">
                                <div className="profile-header-name">Specialty</div>
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        <span className="category-name">{specialty?.specialtyName}   <strong>{specialty?.expName}</strong></span>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {
                                            specialties.map((specialty, index) => {
                                                return (
                                                    <div key={index}>
                                                        <Dropdown.Item onClick={() => { handleSelect(specialty) }}>{specialty.specialtyName}   <strong style={{ color: "var(--primary-color)" }}>{specialty?.expName}</strong></Dropdown.Item>
                                                    </div>
                                                )
                                            })
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <div className="profile-body verification">
                                {
                                    skills?.map((skill) => {
                                        return (
                                            <div className="item" key={skill.id}>
                                                <img src={skill.image} alt="" className='item-icon' />
                                                <strong className='item-name'>{skill.name}</strong>
                                                <span className='item-level'>{skill.level.name}</span>
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