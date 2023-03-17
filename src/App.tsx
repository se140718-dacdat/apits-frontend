import React, { FC, useState } from 'react';
import './App.css';
import Header from './components/modules/pagecomponents/Header/Header';
import LandingPage from './components/pages/Landing/LandingPage';
import { useSelector } from 'react-redux';

import { Roles, User } from './model';
import CandidateHeader from './components/modules/pagecomponents/Header/CandidateHeader';
import { Route, Routes } from 'react-router';
import { CandidateProfile } from './components/pages/Candidate/CandidateProfile';
import EmployeeProfile from './components/pages/employee/EmployeeProfile';
import EnterpriseRegister from './components/pages/Enterprise/register/EnterpriseRegister';
import InterviewCreate from './components/pages/interview/InterviewCreateForm';
import Footer from './components/pages/footer/Footer';
import Contract from './components/pages/contract/Contract';
import EnterpriseCreateForm from './components/pages/Enterprise/form/EnterpriseCreateForm';

const App: FC = () => {
  const user = useSelector((state: any) => state.auth.login.currentUser);


  return (
    <div id="App">
      {(() => {
        switch (user?.roleId) {
          case Roles.Candidate:
            return <CandidateHeader setUser={user} />;
          default:
            return <Header setUser={user} />
        }
      })()}
      <Routes>
        <Route path='/profile' element={<CandidateProfile />}></Route>;
        <Route path='/' element={<LandingPage />}></Route>;
        <Route path='/enterprise/register' element={<EnterpriseRegister />}></Route>;
        <Route path='/enterprise/profile' element={<EmployeeProfile />}></Route>;
        <Route path='/test' element={<InterviewCreate />}></Route>;
      </Routes>
      <Contract />
      <Footer></Footer>
    </div>
  )
}

export default App;
