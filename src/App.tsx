import React, { FC, useState } from 'react';
import './App.css';
import Header from './components/modules/pagecomponents/Header/Header';
import LandingPage from './components/pages/Landing/LandingPage';
import { Roles, User } from './model';


const App: FC = () => {
  const [user, setUser] = useState<User| null>(null);

  return (
    <div id="App">
      <Header user={user} setUser={setUser}/>
    </div>
  )
}

export default App;
