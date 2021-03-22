import { BrowserRouter as Suspense, Switch, Route } from 'react-router-dom';
import LandingPage from './component/view/LandingPage/LandingPage';
import LoginPage from './component/view/LoginPage/LoginPage';
import RegisterPage from './component/view/RegisterPage/RegisterPage';
import './App.css';
import Auth from './HOC/auth';
import Navbar from './component/view/Navbar/Navbar';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Navbar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path='/' component={Auth(LandingPage, null)} />
          <Route exact path='/login' component={Auth(LoginPage, false)} />
          <Route exact path='/register' component={Auth(RegisterPage, false)} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
