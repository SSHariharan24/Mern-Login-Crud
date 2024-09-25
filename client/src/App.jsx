import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import User from './components/User';
import CreateUser from './components/CreateUser';
import UpdateUser from './components/UpdateUser';
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import {ToastContainer} from "react-toastify"

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path='/register' element={<Signup/>}></Route>
      <Route path='/login' element={<Signin/>}></Route>
      <Route path='/user' element={<User/>}></Route>
        <Route path='/' element={<Signup />}></Route>
        <Route path='/create' element={<CreateUser />}></Route>
        <Route path='/update/:id' element={<UpdateUser />}></Route>
       
      </Routes>
      <ToastContainer/>
      </BrowserRouter>
    </div>
  )
}

export default App
