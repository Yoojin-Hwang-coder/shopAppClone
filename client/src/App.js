import { BrowserRouter as Suspense, Switch, Route } from 'react-router-dom';
import LandingPage from './component/view/LandingPage/LandingPage';
import LoginPage from './component/view/LoginPage/LoginPage';
import RegisterPage from './component/view/RegisterPage/RegisterPage';
import './App.css';
import Auth from './HOC/auth';
import Navbar from './component/view/Navbar/Navbar';
import UploadPage from './component/view/UploadPage/UploadPage';
import DetailProductPage from './component/view/DetailProductPage/DetailProductPage';
import CartPage from './component/view/CartPage/CartPage';
import History from './component/view/History/History';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Navbar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path='/' component={Auth(LandingPage, null)} />
          <Route exact path='/login' component={Auth(LoginPage, false)} />
          <Route exact path='/register' component={Auth(RegisterPage, false)} />
          <Route
            exact
            path='/product/upload'
            component={Auth(UploadPage, true)}
          />
          <Route
            exact
            path='/product/:productId'
            component={Auth(DetailProductPage, true)}
          />
          <Route exact path='/user/cart' component={Auth(CartPage, true)} />
          <Route exact path='/history' component={Auth(History, true)} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
