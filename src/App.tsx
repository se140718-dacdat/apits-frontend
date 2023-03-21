import React, { FC, useEffect, useState } from 'react';
import './App.css';
import Header from './components/modules/pagecomponents/Header/Header';
import LandingPage from './components/pages/Landing/LandingPage';
import { useSelector } from 'react-redux';

import { Roles, User } from './model';
import CandidateHeader from './components/modules/pagecomponents/Header/CandidateHeader';
import { Route, Routes } from 'react-router';
import { CandidateProfile } from './components/pages/Candidate/CandidateProfile';
import EnterpriseProfile from './components/pages/Enterprise/EnterpriseProfile';
import CandidateRegister from './components/pages/Candidate/CandidateRegister';
import EnterpriseHeader from './components/modules/pagecomponents/Header/EnterpriseHeader';
import EnterpriseCreatePost from './components/pages/Enterprise/EnterpriseCreatePost';
import EmployeeHeader from './components/modules/pagecomponents/Header/EmployeeHeader';
import Candidates from './components/pages/Employee/Manager/Candidates';
import RecruitmentPost from './components/modules/pagecomponents/common/RecruitmentPost';
import Enterprises from './components/pages/Employee/HR/Enterprises';
import RecruitmentPostDetail from './components/modules/pagecomponents/common/RecruitmentPostDetail';
import { logoutUser } from './redux/apiRequest';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EnterpriseRegister from './components/pages/Enterprise/EnterpriseRegister';
import EmployeeProfile from './components/pages/Employee/EmployeeProfile';
import Specialty from './components/pages/Employee/Manager/Specialty';
import Request from './components/modules/pagecomponents/common/Request';
import InterviewList from './components/pages/Employee/Manager/InterviewList';
import InterviewCreate from './components/pages/Employee/Manager/InterviewCreate';
import Notification from './components/modules/pagecomponents/common/Notification';

const App: FC = () => {
  const user = useSelector((state: any) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div id="App">
      {(() => {
        // logoutUser(dispatch, navigate);
        switch (user?.role?.name) {
          case "CANDIDATE":
            return <CandidateHeader setUser={user} />;
          case "ENTERPRISE":
            return <EnterpriseHeader setUser={user} />;
          case "EMPLOYEE":
            return <EmployeeHeader position={user?.position.name} setUser={user} />
          default:
            return <Header setUser={user} />
        }
      })()}
      <Routes>
        <Route path='/profile' element={
          (user?.role.name) == "ENTERPRISE" ? <EnterpriseProfile />
            :
            (user?.role.name) === "EMPLOYEE" ? (
              <EmployeeProfile />)
              : (<CandidateProfile />)
        }></Route>;
        <Route path='/enterprise-recruitment' element={<RecruitmentPost />}></Route>;
        <Route path='/employee-recruitment' element={<RecruitmentPost />}></Route>;
        <Route path='/register-candidate' element={<CandidateRegister />}></Route>;
        <Route path='/register-enterprise' element={<EnterpriseRegister />}></Route>;
        <Route path='/create-post' element={<EnterpriseCreatePost />}></Route>;
        <Route path='/candidates' element={<Candidates />}></Route>;
        <Route path='/enterprises' element={<Enterprises />}></Route>;
        <Route path='/post-detail' element={<RecruitmentPostDetail />}></Route>;
        <Route path='/specialty' element={<Specialty />}></Route>;
        <Route path='/request' element={<Request />}></Route>;
        <Route path='/interview' element={<InterviewList />}></Route>;
        <Route path='/create-interview' element={<InterviewCreate />}></Route>;
        <Route path='/notification' element={<Notification roleName={user?.role.name} />}></Route>;
        <Route path='/' element={<LandingPage />}></Route>;
      </Routes>
    </div>
  )
}

export default App;
