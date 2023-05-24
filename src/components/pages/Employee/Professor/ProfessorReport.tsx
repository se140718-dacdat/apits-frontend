import React, { useEffect, useState } from 'react'
import "./ProfessorReport.css";
import { useLocation } from 'react-router-dom';
import axios from '../../../../api/axios';
import { CandidateSkillDetail, CandidateUpdateSkillLevel } from '../../../../Models';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const ProfessorReport = () => {
    const location = useLocation();

    const [specialty, setSpecialty] = useState<CandidateSkillDetail>();
    const [skills, setSkills] = useState<CandidateUpdateSkillLevel[]>([]);


    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        console.log(skills)
    }, [skills])

    async function fetchData() {
        const res = await axios.get(`/specialization/getDetailSpecializationWithoutExperience?specialtyId=${2}`);
        const data = await res?.data.data;
        setSpecialty(data);
    }


    const handleSelectSkill = (skillId: number, level: any) => {
        if (!skills.some(skillSelect => skillSelect.skillId === skillId)) {
            const skillSelect: CandidateUpdateSkillLevel = {
                skillId: skillId,
                level: level
            }
            setSkills((prevSkills) => [...prevSkills, skillSelect]);
        } else {
            const index = skills.findIndex(skillSelect => skillSelect.skillId === skillId);
            if (index !== -1) {
                const updatedSkills = [...skills];
                updatedSkills[index] = {
                    ...updatedSkills[index],
                    level: level
                };
                setSkills(updatedSkills);
            }
        }
    }

    return (
        <div id='ProfessorReport'>
            <div className="header">
                <h2>Evaluation Report</h2>
                <span className='specialty'>Frontend Developer</span>
            </div>
            <div className="evaluation-container">
                <div className="col-left">
                    <h4>List of skills evaluated</h4>
                    <ul>
                        {
                            skills.map((skill) => {
                                const tmp = specialty?.skills.find((e) => e.id === skill.skillId)
                                if(skill.level !== 0) {
                                    return (
                                        <li key={tmp?.id}>
                                            <div>
                                                <img src={tmp?.image} alt="" />
                                                <span>{tmp?.name}</span>
                                            </div>
                                            <div className='level-selected'>Level {skill.level}</div>
                                        </li>
                                    )
                                }                                
                            })
                        }
                    </ul>
                </div>
                <div className="col-right">
                    {
                        specialty?.skills.map((skill) => {
                            return (
                                <div className="skill">
                                    <div className="skill-img">
                                        <img src={skill.image} alt="" />
                                    </div>
                                    <div className="skill-name">{skill.name}</div>
                                    <FormControl fullWidth className="skill-level">
                                        <InputLabel id="demo-simple-select-label">Level</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={skills.find((e) => e.skillId === skill.id)?.level}
                                            label="Age"
                                            onChange={(e) => { handleSelectSkill(skill.id, e.target.value) }}
                                        >
                                            <MenuItem value={0}>Not yet</MenuItem>
                                            {
                                                skill.levels.map((level) => {
                                                    return (
                                                        <MenuItem value={level.level}>Level {level.level}</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default ProfessorReport