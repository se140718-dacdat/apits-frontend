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

const App: FC = () => {
  const user = useSelector((state: any) => state.auth.login.currentUser);
  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <div id="App">
      {(() => {
        switch (user?.roleName) {
          case "Candidate":
            return <CandidateHeader setUser={user} />;
          default:
            return <EnterpriseHeader setUser={user}/>
        }
      })()}
      <Routes>
        <Route path='/profile' element={<EnterpriseProfile />}></Route>;
        <Route path='/enterprise-recruitment' element={<EnterpriseRecruitment />}></Route>;
        <Route path='/register-candidate' element={<CandidateRegister />}></Route>;
        <Route path='/' element={<LandingPage />}></Route>;
      </Routes>
    </div>
  )
}

export default App;
