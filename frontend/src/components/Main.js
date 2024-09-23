import {
  Box,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Text,
  Flex,
  AbsoluteCenter,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast, Bounce } from 'react-toastify';
import { useEffect, useState } from 'react';
import apiMethod from '../api/apiMethod';
const Main = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const logout = async () => {
    try {
      const res = await apiMethod.logout();
      localStorage.removeItem('user');
      console.log(res);
      if ((res.status = 200)) {
        toast.success(res.data.message, {
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
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getUserLogin = async () => {
      try {
        const res = await apiMethod.getUserLogin();
        console.log(res);
        const data = res.data;
        localStorage.setItem('user', data);
        setUser(data);
        setName(data.name);
        setEmail(data.email);
      } catch (err) {
        console.log(err);
      }
    };
    getUserLogin();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const pw = password.length > 0 ? password : '';
    console.log('oke');
    const id = user.id;
    const data = {
      email: email,
      name: name,
      password: pw,
    };
    try {
      const res = await apiMethod.updateUser(id, data);
      // console.log(res.data);
      if (res.status == 200) {
        setUser(res.data.user);
        setPassword('');
        localStorage.setItem('user', JSON.stringify(res.data.user));
        toast.success(res.data.message, {
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
      } else {
        toast.error(res.data.message, {
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
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      display="flex"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Box borderWidth={2} p={6} rounded={5} width={400}>
        <Text textAlign="center" fontWeight="bold" fontSize="xx-large" mb={4}>
          Selamat Datang, {user.name}
        </Text>
        <Text textAlign="center" fontWeight="normal" mb={5}>
          Email : {user.email}
        </Text>
        <Flex justify="center" mb={6}>
          <Button
            mx={2}
            onClick={() => setIsEdit(!isEdit)}
            colorScheme="yellow"
          >
            Edit
          </Button>
          <Button mx={2} onClick={logout} colorScheme="teal">
            Logout
          </Button>
        </Flex>
        {isEdit ? (
          <div>
            <form onSubmit={handleUpdate}>
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

                {/* <FormControl id="confirmPassword">
            <FormLabel>Confirm Password</FormLabel>
            <Input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
             
            />
          </FormControl> */}

                <Button colorScheme="blue" type="submit" width="full">
                  Save
                </Button>
              </VStack>
            </form>
          </div>
        ) : (
          ''
        )}
      </Box>
    </Box>
  );
};
export default Main;
