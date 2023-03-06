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
import EnterpriseRecruitment from './components/pages/Enterprise/EnterpriseRecruitment';
import EnterpriseHeader from './components/modules/pagecomponents/Header/EnterpriseHeader';
import ManagerHeader from './components/modules/pagecomponents/Header/ManagerHeader';
import HRHeader from './components/modules/pagecomponents/Header/HRHeader';
import ProfessorHeader from './components/modules/pagecomponents/Header/ProfessorHeader';
import EmployeeRecruitment from './components/pages/Employee/EmployeeRecruitment';

const App: FC = () => {
  const user = useSelector((state: any) => state.auth.login.currentUser);
  return (
    <div id="App">
      {(() => {
        switch (user?.role.name) {
          case "CANDIDATE":
            return <CandidateHeader setUser={user} />;
          case "ENTERPRISE":
            return <EnterpriseHeader setUser={user} />;
          case "EMPLOYEE":
            return <ProfessorHeader setUser={user} />;
          default:
            return <Header setUser={user} />
        }
      })()}
      <Routes>
        <Route path='/profile' element={(user?.role.name  ) == "ENTERPRISE" ? <EnterpriseProfile /> : <CandidateProfile />}></Route>;
        <Route path='/enterprise-recruitment' element={<EnterpriseRecruitment />}></Route>;
        <Route path='/employee-recruitment' element={<EmployeeRecruitment />}></Route>;
        <Route path='/register-candidate' element={<CandidateRegister />}></Route>;
        <Route path='/' element={<LandingPage />}></Route>;
      </Routes>
    </div>
  )
}

export default App;
