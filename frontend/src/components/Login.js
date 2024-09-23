// src/components/Login.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
} from '@chakra-ui/react';
import { toast, Bounce } from 'react-toastify';
import Root from './Root';
import apiMethod from '../api/apiMethod';
import Cookies from 'js-cookie';
import validator from 'validator';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      console.log(user);
      setUser(user);
    } else {
      console.log('Nothing User');
    }

    console.log('ok');
  }, []);

  const validateForm = () => {
    const errors = [];

    // Validasi nama
    if (email.trim().length === 0) {
      errors.push('Email not filled in');
    }

    if (password.trim().length === 0) {
      errors.push('Password not filled in');
    }

    // Set array pesan error ke state
    setErrorMessages(errors);

    // Jika tidak ada error, kembalikan true, sebaliknya false
    return errors.length === 0;
  };
  const validateUser = (email, user, password) => {
    // return user.some(usr => usr.email === email);
    const errors = [];
    const pengguna = user.find((usr) => usr.email === email);
    if (pengguna) {
      if (pengguna.password === password) {
        return {
          success: true,
          pengguna: pengguna,
        };
      } else {
        errors.push('Password is False!');
        setErrorMessages(errors);
      }
    } else {
      errors.push('User is not found!');
      setErrorMessages(errors);
    }
  };
  const handleGoogleLogin = () => {
    window.open('http://localhost:8000/auth/google', '_self');
  };
  // const handleGoogleLogin = async () => {
  //   try {
  //     const response = await fetch('http://localhost:8000/auth/google'); // Trigger Google login
  //     if (response.ok) {
  //       // Redirect to main page
  //       window.location.href = 'http://localhost:3000/main';
  //     }
  //   } catch (error) {
  //     console.error('Login failed', error);
  //   }
  // };

  const handleLogin = (e) => {
    const errors = [];
    e.preventDefault();
    setErrorMessages([]);
    if (validateForm()) {
      const login = async () => {
        try {
          const dataLogin = await apiMethod.login(email, password);
          console.log(dataLogin);
          if (dataLogin.status === 'success') {
            localStorage.setItem('user', JSON.stringify(dataLogin.user));
            toast.success(dataLogin.message, {
              // Toast untuk sukses
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
              transition: Bounce,
            });
            setTimeout(() => {
              setEmail('');
              setPassword('');
              navigate('/main');
            }, 2000);
          } else {
            toast.error(dataLogin.message, {
              // Toast untuk error
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
              transition: Bounce,
            });
          }
        } catch (err) {
          console.log(err);
        }
      };
      login();
      console.log('lanjutin');
    }
  };

  return (
    <div>
      <Root />
      <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg">
        <Heading mb={6} textAlign="center">
          Login
        </Heading>
        {errorMessages.length > 0 && (
          <Box mb={4} bg={'red'} p={2} rounded={5} fill="red">
            {errorMessages.map((message, index) => (
              <Text color="white" key={index}>
                {message}
              </Text>
            ))}
          </Box>
        )}
        <form onSubmit={handleLogin}>
          <VStack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <Button colorScheme="teal" type="submit" width="full">
              Login
            </Button>
            <Button colorScheme="blue" onClick={handleGoogleLogin} width="full">
              Login with Google
            </Button>
          </VStack>
        </form>
      </Box>
    </div>
  );
};

export default Login;
