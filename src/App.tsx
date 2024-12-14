
import { RecoilRoot } from 'recoil'
import './App.css'
import { DashBoard } from './components/pages/Dashboard'
import { LandingPage } from './components/pages/Landing'
import { SignIn } from './components/pages/SignIn'
import { SignUp } from './components/pages/SignUp'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import  { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/RouteType/ProtectedRoute'
import { BentoGridThirdDemo } from './components/shadcn/BentoGrid'

import PublishedBrain from './components/pages/PublishedPage'


function App() {
  return (
    <BrowserRouter>
    
      <RecoilRoot>

        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/bento' element={< BentoGridThirdDemo/>} />
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signin" element={<SignIn />} />
          {/* <Route path="/shimmer" element={<Shimmer />} /> */}
          <Route path="/share/:hash" element={<PublishedBrain/>}></Route>

          <Route path="/dashboard" element={
            <ProtectedRoute><DashBoard /></ProtectedRoute>
            } 
            />
        </Routes>

      </RecoilRoot>
      <Toaster/>
    </BrowserRouter>
  )
}

export default App
