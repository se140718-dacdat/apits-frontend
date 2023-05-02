import React, { FC, useState, useEffect } from 'react'
import './CandidateDetail.css';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { ConfirmedEntity, SpecialtyExpResponse } from '../../../../../entity';
import axios from '../../../../../api/axios';
import { CandidateSkill } from '../../../../../model';

interface Props {
    candidate: ConfirmedEntity | undefined;
    specialtyId: number | undefined;
}


const CandidateDetail: FC<Props> = ({ candidate, specialtyId }) => {
    const [specialties, setSpecialties] = useState<SpecialtyExpResponse[]>([]);
    const [specialty, setSpecialty] = useState<SpecialtyExpResponse>();
    const [skills, setSkills] = useState<CandidateSkill[]>([]);


    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        getSkills();
    }, [specialty])

    async function fetchData() {
        await axios.get(`/canspec/getSESLCandidateSpecialExp?candidateId=${candidate?.candidateResponse.id}`).then(async (res) => {
            const data = await res?.data.data.specialties;
            setSpecialties(data);
            setSpecialty(data.find((e: SpecialtyExpResponse) => e.specialtyId === specialtyId));
        });
    }

    async function getSkills() {
        const response = await axios.get(`/candidate-skill-level/getListSkillWithCurrentLevelByCandidateId?candidateId=${candidate?.candidateResponse.id}&specialtyId=${specialty?.specialtyId}`);
        setSkills(response.data.data);
    }


    return (
        <div id='CandidateDetail'>
            <div className="avt">
                <img src={candidate?.candidateResponse.image} alt="" />
            </div>
            <div className="information">
                <h3 className='name'>{candidate?.candidateResponse.name}</h3>
                <span className="description">     Recent college graduate with a degree in Software Engineering seeking an entry-level
                    position to launch a career in FPT Software. Looking to apply academic knowledge and
                    relevant experience to contribute to the growth and success of an organization.</span>
                <span className="address">From: {candidate?.candidateResponse.address}</span>
            </div>
            <div className="specialty">
                <FormControl sx={{ m: 1, minWidth: 200, marginBottom: "20px" }} size="small">
                    <InputLabel id="demo-select-small-label">{specialty?.specialtyName}</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={specialty}
                        label="Specialty"
                        onChange={(event) => {
                            setSpecialty(specialties.find((e) => e.specialtyName === event.target.value));
                        }}
                    >
                        {
                            specialties.map((specialty) => {
                                return (
                                    <MenuItem value={specialty.specialtyName}>{specialty.specialtyName}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
                <span style={{ margin: "8px" }}>Experience: <strong style={{ color: "var(--primary-color)" }}>{specialty?.expName}</strong></span>
                <div style={{ margin: "8px" }} className="skills">
                    {
                        skills.map((skill) => {
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