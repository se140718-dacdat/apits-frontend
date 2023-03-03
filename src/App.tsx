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
import EnterpriseRegister from './components/pages/Enterprise/register/EnterpriseRegister';
import RegisterForm1 from './components/pages/Enterprise/register/EnterpriseRegister1';
import RegisterForm2 from './components/pages/Enterprise/register/EnterpriseRegister2';
import RegisterForm3 from './components/pages/Enterprise/register/EnterpriseRegister3';
import RegisterForm4 from './components/pages/Enterprise/register/EnterpriseRegister4';
import RegisterForm5 from './components/pages/Enterprise/register/EnterpriseRegister5';
import RegisterForm6 from './components/pages/Enterprise/register/EnterpriseRegister6';
import RegisterForm7 from './components/pages/Enterprise/register/EnterpriseRegister7';
import EnterpriseRegisterForm from './components/pages/Enterprise/register/EnterpriseRegisterForm';

const App: FC = () => {
  const user = useSelector((state: any) => state.auth.login.currentUser);


  return (
    <div id="App">
      {/* {(() => {
        switch (user?.roleId) {
          case Roles.Candidate:
            return <CandidateHeader setUser={user} />;
          default:
            return <Header setUser={user}/>
        }
      })()}  */}
      <Routes>
        <Route path='/profile' element={<CandidateProfile />}></Route>;
        <Route path='/' element={<LandingPage />}></Route>;
        <Route path='/enterprise/register' element={<EnterpriseRegister />}></Route>;
        <Route path='/enterprise/register1' element={<RegisterForm1 />}></Route>;
        <Route path='/enterprise/register2' element={<RegisterForm2 />}></Route>;
        <Route path='/enterprise/register3' element={<RegisterForm3 />}></Route>;
        <Route path='/enterprise/register4' element={<RegisterForm4 />}></Route>;
        <Route path='/enterprise/register5' element={<RegisterForm5 />}></Route>;
        <Route path='/enterprise/register6' element={<RegisterForm6 />}></Route>;
        <Route path='/enterprise/register7' element={<RegisterForm7 />}></Route>;
        <Route path='/enterprise/register-form' element={<EnterpriseRegisterForm />}></Route>;
      </Routes>
    </div>
  )
}

export default App;
