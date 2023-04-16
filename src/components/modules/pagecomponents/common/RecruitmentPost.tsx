import { faBusinessTime, faClock, faCoins, faLocation, faLocationDot, faMagnifyingGlass, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "./RecruitmentPost.css";
import { getAllPost } from '../../../../redux/apiRequest';
import { Post, PostEntity, PostResponse } from '../../../../entity';
import { getDaysLeft } from '../../../../handle';

const RecruitmentPost = () => {
    const navigate = useNavigate();

    const [posts, setPosts] = useState<PostResponse[]>([]);

    useEffect(() => {
        fetchData();
        console.log(posts)
    }, [])

    const fetchData = async () => {
        setPosts(await getAllPost());
        console.log(posts)
    }

    return (
        <div id='RecruitmentPost'>
            <h2 className='primary-color'>Jobs</h2>
            <div className="filter">
                <div className="filter-form-input">
                    <div className="filter-input-icon">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
                    </div>
                    <input type="text" placeholder='Enter search keywords' />
                </div>
                <Dropdown className="filter-dropdown ml-8">
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className='filter-selected'>
                        <span>All Specialty</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='filter-menu'>
                        <div>
                            <Dropdown.Item className='filter-item'>Developer</Dropdown.Item>
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="filter-dropdown ml-8" style={{ width: "18%" }}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className='filter-selected'>
                        <span>All Durations</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='filter-menu'>
                        <div>
                            <Dropdown.Item className='filter-item'>All durations</Dropdown.Item>
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
                <button className='btn-search ml-8'>Search</button>
            </div>
            <div className="post-container">
                <div className="container-header">
                    <div className='quantity'><strong>{posts?.length}</strong> Post</div>

                </div>
                <div className="post-list">
                    {
                        posts && posts?.length > 0 && posts?.map((post: PostResponse, index) => {
                            return (
                                <div className="post" onClick={() => { 
                                    navigate(`/post-detail/${post.id}`) 
                                    }} key={index}>
                                    <div className="avt-post-cover inline-block">
                                        <img src="https://cdn.topcv.vn/140/company_logos/cong-ty-co-phan-tga-63ec6766228b6.jpg" alt="" className="post-avt" />
                                    </div>
                                    <div className="post-detail inline-block">
                                        <div className="post-name">{post.title}</div>
                                        <div className="post-company-name">{post.creator.name}</div>
                                    </div>

                                    <div className="skills">
                                        {
                                            post?.skills.map((skill, index) => {
                                                return (
                                                    <div className="skill" key={index}>
                                                        {skill.skillName}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="post-description">
                                        <div className="description-item">
                                            <FontAwesomeIcon icon={faCoins} className="icon primary-color mr-8" />
                                            {post.salaryFrom}
                                        </div>
                                        <div className="description-item">
                                            <FontAwesomeIcon icon={faBusinessTime} className="icon primary-color mr-8" />
                                            {post.typeOfWork}
                                        </div>
                                        <div className="description-item">
                                            <FontAwesomeIcon icon={faClock} className="icon primary-color mr-8" />
                                            {getDaysLeft(post?.createAt, post?.expiryDate) > 0 ? `${getDaysLeft(post?.createAt, post?.expiryDate)} days left to apply` : "Expired"}
                                        </div>
                                        <div className="description-item">
                                            <FontAwesomeIcon icon={faLocationDot} className="icon primary-color mr-8" />
                                            {post.creator.address}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>

    )
}

export default RecruitmentPost