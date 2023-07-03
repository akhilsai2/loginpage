import {
  BrowserRouter,
  Routes, Route
} from 'react-router-dom'
// import Login from './component/Login'
// import Entries from './component/Entries'
// import Home from './component/Home'
// import Count from './component/count'

import './App.css';
import Dashboard from './component/dashboard'
import Cart from './component/cartdashboard'

import MainLayout from './component/MainLayout'


const App = () => (

  <BrowserRouter>
    <Routes>
      <Route path='/' element={<MainLayout />} >
        <Route index element={<Dashboard />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/userdata" element={<Entries />} />
      <Route path="/count" element={<Count />} /> */}
      </Route>
    </Routes>
  </BrowserRouter>


)



export default App;
