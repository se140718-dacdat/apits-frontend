import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { Button, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { CandidateSkillDetailOneLevelOnly } from '../../../../../Models';
import axios from '../../../../../api/axios';
import { CandidateConfirmed, SpecialtyExpResponse } from '../../../../../entity';
import './CandidateDetail.css';

interface Props {
    candidate: CandidateConfirmed | undefined;
}


const CandidateDetail: FC<Props> = ({ candidate }) => {
    const [specialties, setSpecialties] = useState<SpecialtyExpResponse[]>([]);
    const [specialty, setSpecialty] = useState<SpecialtyExpResponse>();
    const [skills, setSkills] = useState<CandidateSkillDetailOneLevelOnly>();


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
        const response = await axios.get(`/specialization/getCandidateSpecialtyWithExpSkillLevel?candidateId=${candidate?.id}&specialtyId=${specialty?.id}`);
        setSkills(response.data.data);
        console.log(response)
    }

    return (
        <div id='CandidateDetail'>
            <div className="avt">
                <img src={candidate?.image} alt="" />
            </div>
            <div className="information">
                <h3 className='name'>{candidate?.name}</h3>
                <span className="description" style={{ marginBottom: "24px" }}>{candidate?.description}</span>
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
                                <div className="item" key={skill.id}>
                                    <img src={skill.image} alt="" className='item-icon' />
                                    <strong className='item-name'>{skill.name}</strong>
                                    <span className='item-level'>Level {skill.level}</span>
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