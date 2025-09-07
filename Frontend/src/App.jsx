import { Route, Routes } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Start from './pages/Start'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'
import "remixicon/fonts/remixicon.css"
import Payment from './pages/Payment'
import Terms from './pages/Terms'
import  Policy from './pages/Policy'
// Add these imports
import UserForgotPassword from './pages/UserForgotPassword';
import UserResetPassword from './pages/UserResetPassword';
// Add these imports
// import CaptainForgotPassword from './pages/CaptainForgotPassword';
// import CaptainResetPassword from './pages/CaptainResetPassword';
// Add this import at the top
import NotFound from './pages/NotFound';

// Add this route at the bottom of your routes (after all other routes)

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/userlogin" element={<UserLogin />} />
      <Route path="/riding" element={<Riding />} />
      <Route path="/captainriding" element={<CaptainRiding/>} />
      <Route path="/usersignup" element={<UserSignup />} />
      <Route path="/captainlogin" element={<CaptainLogin/>} />
      <Route path="/captainsignup" element={<CaptainSignup />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/home" element={
        <UserProtectWrapper>
          <Home />
        </UserProtectWrapper>
      } />
      <Route path='/user/logout' element={<UserProtectWrapper>
        <UserLogout/>
      </UserProtectWrapper>  } />
      <Route path='/captain-home' element={
        <CaptainProtectedWrapper>
          <CaptainHome/>
        </CaptainProtectedWrapper>
      } />
      <Route path="/payment" element={<Payment />} />
      <Route path="/user-forgot-password" element={<UserForgotPassword />} />
      <Route path="/user-reset-password/:token" element={<UserResetPassword />} />
      <Route path="*" element={<NotFound />} />
      {/* <Route path="/captain-forgot-password" element={<CaptainForgotPassword />} />
      <Route path="/captain-reset-password/:token" element={<CaptainResetPassword />} /> */}
    </Routes>
    </>
  )
}

export default App
