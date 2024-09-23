// src/components/Register.js
import React, { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import Root from './Root';
import { FaGoogle } from 'react-icons/fa6';
import apiMethod from '../api/apiMethod';

import { toast, Bounce } from 'react-toastify'; // Import toast from react-toastify
const Register = ({ user, setUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  // Handler untuk Google Sign-In
  const handleGoogleRegister = () => {
    window.location.href = 'http://localhost:8000/auth/google';
  };
  const navigate = useNavigate();
  const validateForm = () => {
    const errors = [];

    // Validasi nama
    if (name.trim().length === 0) {
      errors.push('Name is required');
    }

    // Validasi email
    if (!validator.isEmail(email)) {
      errors.push('Invalid email format');
    }

    // Validasi password
    if (!validator.isLength(password, { min: 6 })) {
      errors.push('Password must be at least 6 characters long');
    }

    // Validasi konfirmasi password
    if (password !== confirmPassword) {
      errors.push('Passwords do not match');
    }

    // Set array pesan error ke state
    setErrorMessages(errors);

    // Jika tidak ada error, kembalikan true, sebaliknya false
    return errors.length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessages([]);

    if (validateForm()) {
      const isEmailUsed = user.some((usr) => usr.email === email);

      if (isEmailUsed) {
        toast.error('Email already used!'); // Menampilkan toast jika email sudah digunakan
        // Bersihkan semua inputan
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');

        return; // Jangan lanjutkan ke proses registrasi
      }
      // Jika tidak ada error, lanjutkan proses registrasi
      console.log('Form submitted', { name, email, password });
      const newUser = { name, email, password };
      const updatedUsers = [...user, newUser];
      setUser(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      toast('Register Successfull!', {
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
        setName('');
        setEmail('');
        setPassword('');
        navigate('/login');
      }, 2000);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessages([]);
    if (validateForm()) {
      const data = {
        name,
        email,
        password,
        role: 'user',
      };
      try {
        const response = await apiMethod.register(data);
        console.log(response);
        if (response.status === 201) {
          // localStorage.setItem('i', JSON.stringify(dataLogin.user));
          toast.success(response.data.message, {
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
            navigate('/login');
          }, 2000);
        } else {
          toast.error(response.data.message, {
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
      // apiMethod.register(data);
    }
  };

  return (
    <div>
      <Root />

      <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg">
        <Heading mb={6} textAlign="center">
          Register
        </Heading>
        {/* Menampilkan pesan error jika ada */}
        {errorMessages.length > 0 && (
          <Box mb={4} bg={'red'} p={2} rounded={5} fill="red">
            {errorMessages.map((message, index) => (
              <Text color="white" key={index}>
                {message}
              </Text>
            ))}
          </Box>
        )}
        <form onSubmit={handleRegister}>
          <VStack spacing={4}>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
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

            <FormControl id="confirmPassword">
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>

            <Button colorScheme="green" type="submit" width="full">
              Register
            </Button>
            <Button
              gap={2}
              colorScheme="purple"
              onClick={handleGoogleRegister}
              type="button"
              width="full"
            >
              <FaGoogle /> Register With Google
            </Button>
          </VStack>
        </form>
      </Box>
    </div>
  );
};

export default Register;
