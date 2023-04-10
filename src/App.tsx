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
import { getSpecialtiesDetail, logoutUser } from './redux/apiRequest';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EnterpriseRegister from './components/pages/Enterprise/EnterpriseRegister';
import EmployeeProfile from './components/pages/Employee/EmployeeProfile';
import Specialty from './components/pages/Employee/Manager/Specialty';
import Request from './components/modules/pagecomponents/common/Request';
import InterviewList from './components/pages/Employee/Manager/InterviewList';
import Notification from './components/modules/pagecomponents/common/Notification';
import Footer from './components/modules/pagecomponents/footer/Footer';
import ContractCreateForm from './components/pages/Employee/HR/ContractCreateForm';
import NotificationList from './components/pages/Candidate/CandidateNotificationList';
import AdminHeader from './components/modules/pagecomponents/Header/AdminHeader';
import CandidateList from './components/pages/Admin/CandidateList';
import EmployeeList from './components/pages/Admin/EmployeeList';
import CandidateViewAssign from './components/pages/Candidate/CandidateViewAssign';
import CandidateCourse from './components/pages/Candidate/CandidateCourses';

const App: FC = () => {
  const user = useSelector((state: any) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // getSpecialtiesDetail(dispatch);
  }, [])

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
          case "ADMIN":
            return <AdminHeader setUser={user} />
          default:
            return <Header setUser={user} />
        }
      })()}
      <Routes>
        <Route path='https://dacdat--bejewelled-sopapillas-9d63f0.netlify.app/profile' element={
          (user?.role.name) == "ENTERPRISE" ? <EnterpriseProfile />
            :
            (user?.role.name) === "EMPLOYEE" ? (
              <EmployeeProfile />)
              : (<CandidateProfile />)
        }></Route>;
        <Route path='https://dacdat--bejewelled-sopapillas-9d63f0.netlify.app/candidates-management' element={<CandidateList />}></Route>;
        <Route path='https://dacdat--bejewelled-sopapillas-9d63f0.netlify.app/employee-management' element={<EmployeeList />}></Route>;
        <Route path='https://dacdat--bejewelled-sopapillas-9d63f0.netlify.app/enterprise-recruitment' element={<RecruitmentPost />}></Route>;
        <Route path='https://dacdat--bejewelled-sopapillas-9d63f0.netlify.app/employee-recruitment' element={<RecruitmentPost />}></Route>;
        <Route path='https://dacdat--bejewelled-sopapillas-9d63f0.netlify.app/update-candidate' element={<CandidateRegister />}></Route>;
        <Route path='https://dacdat--bejewelled-sopapillas-9d63f0.netlify.app/register-enterprise' element={<EnterpriseRegister />}></Route>;
        <Route path='https://dacdat--bejewelled-sopapillas-9d63f0.netlify.app/create-post' element={<EnterpriseCreatePost />}></Route>;
        <Route path='https://dacdat--bejewelled-sopapillas-9d63f0.netlify.app/candidates' element={<Candidates />}></Route>;
        <Route path='https://dacdat--bejewelled-sopapillas-9d63f0.netlify.app/enterprises' element={<Enterprises />}></Route>;
        <Route path='https://dacdat--bejewelled-sopapillas-9d63f0.netlify.app/post-detail/:id' element={<RecruitmentPostDetail />}></Route>;
        <Route path='https://dacdat--bejewelled-sopapillas-9d63f0.netlify.app/specialty' element={<Specialty />}></Route>;
        <Route path='https://dacdat--bejewelled-sopapillas-9d63f0.netlify.app/candidate-courses' element={<CandidateCourse />}></Route>;
        <Route path='https://dacdat--bejewelled-sopapillas-9d63f0.netlify.app/request' element={<Request />}></Route>;
        <Route path='https://dacdat--bejewelled-sopapillas-9d63f0.netlify.app/interview' element={<InterviewList />}></Route>;
        <Route path='https://dacdat--bejewelled-sopapillas-9d63f0.netlify.app/notification' element={<Notification roleName={user?.role.name} />}></Route>;
        <Route path='https://dacdat--bejewelled-sopapillas-9d63f0.netlify.app/contract' element={<ContractCreateForm />}></Route>;

        <Route path='https://dacdat--bejewelled-sopapillas-9d63f0.netlify.app/candidate-notification' element={<NotificationList roleName={user?.role?.name} />}></Route>;
        <Route path='https://dacdat--bejewelled-sopapillas-9d63f0.netlify.app/candidate-view-assign' element={<CandidateViewAssign />}></Route>;
        <Route path='https://dacdat--bejewelled-sopapillas-9d63f0.netlify.app/' element={<LandingPage />}></Route>;
      </Routes>
      <Footer />
    </div>
  )
}

export default App;
