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
        <Route path='/profile' element={<EnterpriseProfile/>}></Route>;
        <Route path='/' element={<LandingPage/>}></Route>;
      </Routes>
    </div>
  )
}

export default App;
