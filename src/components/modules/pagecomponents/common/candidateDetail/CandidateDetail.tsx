import React, { FC, useState, useEffect } from 'react'
import './CandidateDetail.css';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { CandidateConfirmed, ConfirmedEntity, SpecialtyExpResponse } from '../../../../../entity';
import axios from '../../../../../api/axios';
import { CandidateSkill } from '../../../../../model';
import { CandidateSkillDetail } from '../../../../../Models';

interface Props {
    candidate: CandidateConfirmed | undefined;
}


const CandidateDetail: FC<Props> = ({ candidate }) => {
    const [specialties, setSpecialties] = useState<SpecialtyExpResponse[]>([]);
    const [specialty, setSpecialty] = useState<SpecialtyExpResponse>();
    const [skills, setSkills] = useState<CandidateSkillDetail>();


    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        getSkills();
    }, [specialty])

    async function fetchData() {
        await axios.get(`/candidate-level/getListCurrentExpCandidate?candidateId=${candidate?.id}`).then(async (res) => {
            const data = await res?.data.data;
            setSpecialties(data);
            setSpecialty(data[0]);
            console.log(data)
        });
    }

    async function getSkills() {
        const response = await axios.get(`/getCandidateSpecialtyWithExpSkillLevel?candidateId=${candidate?.id}&specialtyId=${specialty?.id}`);
        setSkills(response.data.data);
    }


    return (
        <div id='CandidateDetail'>
            <div className="avt">
                <img src={candidate?.image} alt="" />
            </div>
            <div className="information">
                <h3 className='name'>{candidate?.name}</h3>
                <span className="description" style={{marginBottom: "24px"}}>{candidate?.description}</span>
                <span className="address"><strong>From: </strong>{candidate?.address}</span>
            </div>
            <div className="specialty">
                <FormControl sx={{ m: 1, minWidth: 200, marginBottom: "20px" }} size="small">
                    <InputLabel id="demo-select-small-label">{specialty?.name}</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={specialty}
                        label="Specialty"
                        onChange={(event) => {
                            setSpecialty(specialties.find((e) => e.name === event.target.value));
                        }}
                    >
                        {
                            specialties.map((specialty) => {
                                return (
                                    <MenuItem value={specialty.name}>{specialty.name}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
                <span style={{ margin: "8px" }}>Experience: <strong style={{ color: "var(--primary-color)" }}>{specialty?.experience}</strong></span>
                <div style={{ margin: "8px" }} className="skills">
                    {
                        skills?.skills.map((skill) => {
                            return (
                                <div className="skill-icon" style={{ marginTop: "8px" }} key={skill.id}>
                                    <img src={skill.image} alt="" />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default CandidateDetail