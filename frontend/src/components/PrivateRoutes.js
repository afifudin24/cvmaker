import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import apiMethod from '../api/apiMethod'; // Pastikan `apiMethod.checkAuth` sudah diimplementasi dengan benar
import Main from './Main';
import Admin from './Admin';

const PrivateRoute = () => {
  const [currentRole, setCurrentRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isUser, setIsUser] = useState(true); // Untuk menentukan apakah peran user adalah 'user' atau 'admin'
  const components = {
    admin: <Admin />,
    user: <Main />,
  };
  const checkAuth = async () => {
    try {
      const res = await apiMethod.checkAuth(); // Memanggil API untuk cek autentikasi
      console.log(res);
      if (res.status === 200) {
        // Cek role user dari response
        // if (res.data.role === 'user') {
        //     setIsUser(true);
        // } else {
        //     setIsUser(false);
        // }
        setCurrentRole(res.data.role);
        return true; // Authenticated
      } else {
        return false; // Not authenticated
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  useEffect(() => {
    const verifyAuth = async () => {
      const authStatus = await checkAuth(); // Cek autentikasi
      setIsAuthenticated(authStatus); // Update state berdasarkan hasil autentikasi
    };

    verifyAuth();
  }, []);

  // Tampilkan 'Loading...' saat autentikasi sedang diproses
  if (isAuthenticated === null) return <div>Loading...</div>;

  // Redirect ke halaman login jika tidak terautentikasi
  if (!isAuthenticated) return <Navigate to="/login" />;

  // Render komponen Main atau Admin tergantung peran user
  // return isUser ? <Main /> : <Admin />;
  return components[currentRole];
};

export default PrivateRoute;
