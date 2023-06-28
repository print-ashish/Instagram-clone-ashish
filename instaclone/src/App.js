import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import SignIn from './Components/SignIn';
import { Route, Routes } from 'react-router-dom';
import SignUp from './Components/SignUp';
import { ToastContainer } from 'react-toastify';
import Home from './Components/Home';
import Profile from './Components/Profile';
import CreatePost from './Components/CreatePost';
function App() {
  return (
    <div className="App">

    <ToastContainer/>
      <Navbar/>
      <Routes>
          <Route  path="/signin" element = {<SignIn/>}></Route>
          <Route  path="/signup" element = {<SignUp/>}></Route>
          <Route  path="/home" element = {<Home/>}></Route>
          <Route  path="/profile" element = {<Profile/>}></Route>
          <Route  path="/createpost" element = {<CreatePost/>}></Route>

      </Routes>
    
    </div>
  );
}

export default App;
