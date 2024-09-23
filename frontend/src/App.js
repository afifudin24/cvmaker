import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Box, Button, Flex, Heading, Toast } from '@chakra-ui/react';
import 'react-toastify/dist/ReactToastify.css'; // Import stylesheet Toastify
import Login from './components/Login';
import Register from './components/Register';
import Main from './components/Main';
import Root from './components/Root';
import PrivateRoute from './components/PrivateRoutes';
import NotFound from './components/NotFound';
function App() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const usr = JSON.parse(localStorage.getItem('users'));
    if (usr) {
      setUser(usr);
      console.log(usr);
    } else {
      console.log('Nothing Users');
    }
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root user={user} setUser={setUser} />} />
        <Route
          path="/login"
          element={<Login user={user} setUser={setUser} />}
        />
        <Route
          path="/register"
          element={<Register user={user} setUser={setUser} />}
        />
        {/* <Route path='/main' element={<Main />} /> */}
        <Route path="/main" element={<PrivateRoute element={<Main />} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer />
    </Router>
  );
}

export default App;
