import { useEffect, useState } from 'react';
import LoginModal from './components/modals/LoginModal';
import SignUpModal from './components/modals/SignUpModal';
import NavBar from './components/NavBar';
import { User } from './models/userModel';
import * as TasksApi from "./network/api";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import TaskPage from './components/pages/TaskPage';
import PageNotFound from './components/pages/PageNotFound';
import styles from './styles/app.module.css'
import ProjectsPage from './components/pages/ProjectsPage';
import backgroundImage from './background.jpg'

function App() {

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)
  const [showSignUpModal, setShowSignUpModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await TasksApi.getLoggedInUser();
        setLoggedInUser(user)
      } catch (error) {
        console.error(error);
        
      }
    }
    fetchLoggedInUser() 
  }, [])
  
  
  return (
    <div className={`${styles.appBackground}`} style={{ backgroundImage: `url(${backgroundImage})` }}>
    <div className= {styles.overlay}>
    <BrowserRouter>
      <NavBar 
      loggedInUser={loggedInUser}
      onLoginClicked={() => setShowLoginModal(true)}
      onSignUpClicked={() => setShowSignUpModal(true)}
      onLogoutSuccessful={() => setLoggedInUser(null)}
      />
      <Container className={styles.pageContainer}>
        <Routes>
          <Route path="/" element={<ProjectsPage loggedInUser={loggedInUser} />}/>
          <Route path="/:projectId" element={<TaskPage loggedInUser={loggedInUser} />}/>
          <Route path="/*" element={<PageNotFound/>}/>
        </Routes>
      </Container>
      { showSignUpModal && 
        <SignUpModal 
        onDismiss={() => setShowSignUpModal(false)}
        onSignUpSuccess={(user) => {
          setLoggedInUser(user)
          setShowSignUpModal(false)
        }}
        />
      }
      { showLoginModal && 
        <LoginModal 
        onDismiss={() => setShowLoginModal(false)}
        onLoginSuccess={(user) => {
          setLoggedInUser(user)
          setShowLoginModal(false)
        }}
        />
      }
    </BrowserRouter>
    </div>
    </div>
  );
}

export default App;
