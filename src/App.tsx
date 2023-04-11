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
import Request from './components/modules/pagecomponents/common/Request';
import Footer from './components/modules/pagecomponents/footer/Footer';
import CandidateList from './components/pages/Admin/CandidateList';
import EmployeeList from './components/pages/Admin/EmployeeList';
import CandidateCourse from './components/pages/Candidate/CandidateCourses';
import CandidateRegister from './components/pages/Candidate/CandidateRegister';
import CandidateViewAssign from './components/pages/Candidate/CandidateViewAssign';
import ContractCreateForm from './components/pages/Employee/HR/ContractCreateForm';
import Enterprises from './components/pages/Employee/HR/Enterprises';
import Candidates from './components/pages/Employee/Manager/Candidates';
import InterviewList from './components/pages/Employee/Manager/InterviewList';
import Specialty from './components/pages/Employee/Manager/Specialty';
import EnterpriseCreatePost from './components/pages/Enterprise/EnterpriseCreatePost';
import EnterpriseRegister from './components/pages/Enterprise/EnterpriseRegister';
import EnterpriseProfile from './components/pages/Enterprise/EnterpriseProfile';
import EmployeeProfile from './components/pages/Employee/EmployeeProfile';
import { CandidateProfile } from './components/pages/Candidate/CandidateProfile';
import Notification from './components/modules/pagecomponents/common/Notification';
import NotificationList from './components/pages/Candidate/CandidateNotificationList';
import { getSpecialtiesDetail } from './redux/apiRequest';
import ProfessorInterview from './components/pages/Employee/Professor/ProfessorInterview';
import CandidateInterview from './components/pages/Candidate/CandidateInterview';
import EnterpriseInterview from './components/pages/Enterprise/EnterpriseInterview';

const App: FC = () => {
  const user = useSelector((state: any) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getSpecialtiesDetail(dispatch);
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
        <Route path='/request' element={<Request />}></Route>;
        <Route path='/interview' element={<InterviewList />}></Route>;
        <Route path='/notification' element={<Notification roleName={user?.role.name} />}></Route>;
        <Route path='/contract' element={<ContractCreateForm />}></Route>;
        <Route path='/candidate-notification' element={<NotificationList roleName={user?.role?.name} />}></Route>;
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
