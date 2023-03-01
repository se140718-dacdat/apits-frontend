import React, { FC, useState } from 'react';
import './App.css';
import Header from './components/modules/pagecomponents/Header/Header';
import LandingPage from './components/pages/Landing/LandingPage';
import { useSelector } from 'react-redux';

import { Roles, User } from './model';
import CandidateHeader from './components/modules/pagecomponents/Header/CandidateHeader';
import { Route, Routes } from 'react-router';
import { CandidateProfile } from './components/pages/Candidate/CandidateProfile';
import EnterpriseProfile from './components/pages/Enterprise/EnterpriseProfile';
import ProfessorHeader from './components/modules/pagecomponents/Header/ProfessorHeader';
import ManagerHeader from './components/modules/pagecomponents/Header/ManagerHeader';
import HRHeader from './components/modules/pagecomponents/Header/HRHeader';
import EmployeeHeader from './components/modules/pagecomponents/Header/EmployeeHeader';

 const User1 = {
  name: 'DacDat',
  gender: 'male'
}
const App: FC = () => {
  const user = useSelector((state: any) => state.auth.login.currentUser);


  return (
    <div id="App">
      {(() => {
        switch (user?.roleId) {
          case Roles.Candidate:
            return <CandidateHeader setUser={user} />;
          default:
            return <ProfessorHeader user={User1}/>
        }
      })()}
      <Routes>
        <Route path='/profile' element={<CandidateProfile />}></Route>;
        <Route path='/' element={<LandingPage />}></Route>;
      </Routes>
    </div>
  )
}

export default App;
