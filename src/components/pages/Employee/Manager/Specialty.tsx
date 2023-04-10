import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import axios from '../../../../api/axios';
import { SpecialtyResponse } from '../../../../entity';
import { SpecialtyEntity } from '../../../../model';
import "./Specialty.css";

const Specialty = () => {

  const [specialties, setSpecialties] = useState<SpecialtyResponse[]>([]);
  const [specialty, setSpecialty] = useState<SpecialtyEntity>();
  const [specialtySelect, setSpecialtySelect] = useState<SpecialtyResponse>();

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    const res = await axios.get("/specialty/getAll");
    const data = await res.data.data;
    setSpecialties(data);
    setSpecialtySelect(data[0]);
    getSpecialtyDetail(data[0].id)
  }

  async function getSpecialtyDetail(id: number) {
    const res = await axios.get(`/special-skill/getSpecialDetail?id=${id}`);
    const data = await res.data.data;
    setSpecialty(data);
    console.log(specialty);
  }

  return (
    <div id='Specialty'>
      <h2>All Skills</h2>
      <div className="specialty-container">
        <div className="filter">
          <div className="filter-form-input">
            <div className="filter-input-icon">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
            </div>
            <input type="text" placeholder='Enter search keywords' />
          </div>
          <Dropdown className="filter-dropdown ml-8">
            <Dropdown.Toggle variant="success" id="dropdown-basic" className='filter-selected'>
              <span>{specialtySelect?.name}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className='filter-menu'>
              {
                specialties.map((specialty) => {
                  return (
                    <div key={specialty.id}>
                      <Dropdown.Item className='filter-item' onClick={() => {
                        setSpecialtySelect(specialty);
                        getSpecialtyDetail(specialty.id);
                      }}>{specialty.name}</Dropdown.Item>
                    </div>
                  )
                })
              }
            </Dropdown.Menu>
          </Dropdown>
          <button className='btn-search ml-8'>Search</button>
        </div>
        {
          specialty?.skills.map((skill) => {
            return (
              <div className="skill-container" key={skill?.id}>
                <span className="skill-name">{skill?.name}</span>
                <div className="courses">
                  {
                    skill.levels.map((level) => {
                      return (
                        <div className='level-cover'>
                          {
                            level.courses.map((course) => {
                              return (
                                <div className="course">
                                  <img src={skill?.image} alt="" className='skill-icon' />
                                  <div className="course-description">
                                    <h3 className='course-name'>{course?.name}</h3>
                                    <span className="level">{level?.name}</span>
                                  </div>
                                </div>
                              )
                            })
                          }
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Specialty;