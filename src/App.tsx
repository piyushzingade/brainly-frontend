
import { RecoilRoot } from 'recoil'
import './App.css'
import { DashBoard } from './pages/Dashboard'
import { LandingPage } from './pages/Landing'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import  { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/RouteType/ProtectedRoute'
// import { BentoGridThirdDemo } from './components/shadcn/BentoGrid'

import PublishedBrain from './pages/PublishedPage'
import { Shimmer } from './components/cards/Shimmer'


function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          {/* <Route path='/bento' element={< BentoGridThirdDemo/>} /> */}
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signin" element={<SignIn />} />
           <Route path="/shimmer" element={<Shimmer />} /> 
          <Route path="/share/:hash" element={<PublishedBrain/>}></Route>
          <Route path="/dashboard" element={
            <ProtectedRoute><DashBoard /></ProtectedRoute>
            } 
            />
        </Routes>
      </RecoilRoot>
      <Toaster />
    </BrowserRouter>
  );
}

export default App
