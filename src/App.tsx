import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Header from './components/modules/pagecomponents/Header/Header';
import LandingPage from './components/pages/Landing/LandingPage';

import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './components/modules/pagecomponents/Header/AdminHeader';
import CandidateHeader from './components/modules/pagecomponents/Header/CandidateHeader';
import EmployeeHeader from './components/modules/pagecomponents/Header/EmployeeHeader';
import EnterpriseHeader from './components/modules/pagecomponents/Header/EnterpriseHeader';
import RecruitmentPost from './components/modules/pagecomponents/common/RecruitmentPost';
import RecruitmentPostDetail from './components/modules/pagecomponents/common/RecruitmentPostDetail';
import Footer from './components/modules/pagecomponents/footer/Footer';
import CandidateList from './components/pages/Admin/CandidateList';
import EmployeeList from './components/pages/Admin/EmployeeList';
import EnterpriseList from './components/pages/Admin/EnterpriseList';
import CandidateContract from './components/pages/Candidate/CandidateContract';
import CandidateCourse from './components/pages/Candidate/CandidateCourses';
import CandidateInterview from './components/pages/Candidate/CandidateInterview';
import { CandidateProfile } from './components/pages/Candidate/CandidateProfile';
import CandidateRegister from './components/pages/Candidate/CandidateRegister';
import CandidateViewAssign from './components/pages/Candidate/CandidateViewAssign';
import EmployeeProfile from './components/pages/Employee/EmployeeProfile';
import Enterprises from './components/pages/Employee/HR/Enterprises';
import HRContract from './components/pages/Employee/HR/HRContract';
import Candidates from './components/pages/Employee/Manager/Candidates';
import InterviewList from './components/pages/Employee/Manager/InterviewList';
import Specialty from './components/pages/Employee/Manager/Specialty';
import ProfessorInterview from './components/pages/Employee/Professor/ProfessorInterview';
import EnterpriseCreatePost from './components/pages/Enterprise/EnterpriseCreatePost';
import EnterpriseInterview from './components/pages/Enterprise/EnterpriseInterview';
import EnterpriseProfile from './components/pages/Enterprise/EnterpriseProfile';
import EnterpriseRegister from './components/pages/Enterprise/EnterpriseRegister';
import EnterpriseContract from './components/pages/Enterprise/EnterpriseContract';
import ViewCandidateDetail from './components/modules/pagecomponents/common/ViewCandidateDetail';

const App: FC = () => {
  const user = useSelector((state: any) => state.auth.login.currentUser);

  useEffect(() => {
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
        <Route path='/profile' element={
          (user?.role.name) == "ENTERPRISE" ? <EnterpriseProfile />
            :
            (user?.role.name) === "EMPLOYEE" ? (
              <EmployeeProfile />)
              : (<CandidateProfile />)
        }></Route>;
        <Route path='/candidates-management' element={<CandidateList />}></Route>;
        <Route path='/employee-management' element={<EmployeeList />}></Route>;
        <Route path='/enterprises-management' element={<EnterpriseList />}></Route>;
        <Route path='/candidate-detail/:id' element={<ViewCandidateDetail />}></Route>;
        <Route path='/enterprise-recruitment' element={<RecruitmentPost />}></Route>;
        <Route path='/employee-recruitment' element={<RecruitmentPost />}></Route>;
        <Route path='/update-candidate' element={<CandidateRegister />}></Route>;
        <Route path='/register-enterprise' element={<EnterpriseRegister />}></Route>;
        <Route path='/create-post' element={<EnterpriseCreatePost />}></Route>;
        <Route path='/candidates' element={<Candidates />}></Route>;
        <Route path='/enterprises' element={<Enterprises />}></Route>;
        <Route path='/post-detail/:id' element={<RecruitmentPostDetail />}></Route>;
        <Route path='/specialty' element={<Specialty />}></Route>;
        <Route path='/candidate-courses' element={<CandidateCourse />}></Route>;
        <Route path='/interview' element={<InterviewList />}></Route>;
        <Route path='/contract' element={<HRContract />}></Route>;
        <Route path='/candidate-contract' element={<CandidateContract />}></Route>;
        <Route path='/enterprise-contract' element={<EnterpriseContract />}></Route>;
        <Route path='/candidate-view-assign' element={<CandidateViewAssign />}></Route>;
        <Route path='/professor-interview' element={<ProfessorInterview />}></Route>;
        <Route path='/candidate-interview' element={<CandidateInterview />}></Route>;
        <Route path='/enterprise-interview' element={<EnterpriseInterview />}></Route>;
        <Route path='/' element={<LandingPage />}></Route>;
      </Routes>
      <Footer />
    </div>
  )
}

export default App;
