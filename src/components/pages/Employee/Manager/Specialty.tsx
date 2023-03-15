import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Table } from 'react-bootstrap';
import { Category, dataEngineer, developer, Level, level1, level2, level3, Skill } from '../../../../model';
import "./Specialty.css";

const Specialty = () => {
  const [category, setCategory] = useState<Category>(developer);
  const categoryList: Category[] = [developer, dataEngineer]
  const levelList: Level[] = [level1, level2, level3]
  const [level, setLevel] = useState<Level>(level1);
  const [skills, setSkills] = useState<Skill[]>(category.skillList);
  const [editing, setEdditing] = useState<string>();

  useEffect(() => {
    setSkills(category.skillList)
  }, [category])


  return (
    <div id='Specialty'>
      <h2>Specialty Management</h2>
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
              <span>{category.categoryName}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className='filter-menu'>
              {
                categoryList.map((category) => {
                  return (
                    <div key={category.categoryId}>
                      <Dropdown.Item className='filter-item' onClick={() => { setCategory(category) }}>{category.categoryName}</Dropdown.Item>
                    </div>
                  )
                })
              }
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="filter-dropdown ml-8" style={{ width: "18%" }}>
            <Dropdown.Toggle variant="success" id="dropdown-basic" className='filter-selected'>
              <span>{level.levelName}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className='filter-menu'>
              {
                levelList.map((level) => {
                  return (
                    <div key={level.levelId}>
                      <Dropdown.Item className='filter-item' onClick={() => { setLevel(level) }}>{level.levelName}</Dropdown.Item>
                    </div>
                  )
                })
              }
            </Dropdown.Menu>
          </Dropdown>
          <button className='btn-search ml-8'>Tìm</button>
        </div>
        <Table striped bordered hover>
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
        </Table>
      </div>
    </div>
  )
}

export default Specialty;