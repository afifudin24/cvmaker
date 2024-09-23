import {
  Box,
  Button,
  Text,
  Flex,
  IconButton,
  VStack,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { toast, Bounce } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import {
  PhoneIcon,
  DeleteIcon,
  EditIcon,
  AddIcon,
  WarningIcon,
} from '@chakra-ui/icons'; // Ikon dari Chakra UI
import { FaUsersLine } from 'react-icons/fa6';
import { FiLogOut } from 'react-icons/fi';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import apiMethod from '../api/apiMethod';
const socket = io('http://localhost:8000');
const Admin = () => {
  const navigate = useNavigate();
  const [isDisplayUsers, setIsDisplayUsers] = useState(false);
  const cancelRef = useRef();
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dataUsers, setDataUsers] = useState([]);
  const [selectUser, setSelectUser] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isEditUser, setIsEditUser] = useState(false);
  const handleEditModal = (data) => {
    console.log(data);
    setEditModal(true);
    setDeleteModal(false);
    setSelectUser(data);
  };
  const handleDeleteModal = (data) => {
    console.log(data);
    setEditModal(false);
    setDeleteModal(true);
    setSelectUser(data);
  };
  const onClose = () => {
    setEditModal(false);
    setDeleteModal(false);
  };
  const updateUser = async (e) => {
    e.preventDefault();
    const { id, email, name } = selectUser;

    const dataUpdate = {
      email: email,
      name: name,
    };
    try {
      const res = await apiMethod.adminUpdateUser(id, dataUpdate);
      console.log(res);
      setDataUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, email: email, name: name } : user,
        ),
      );
      toast.success('User updated successfully!', {
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
      onClose(); // Close the modal after update
    } catch (err) {
      console.log(err);
      toast.error('Failed to update user.', {
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
  };

  const deleteUser = async (e) => {
    e.preventDefault();
    const { id, name, email } = selectUser;
    try {
      const res = await apiMethod.adminDeleteUser(id);
      console.log(res);
      setDataUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      if (res.status == 200) {
        toast.success('User deleted successfully!', {
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
        onClose(); // Close the modal after update
      } else {
        toast.error('Failed to delete user.', {
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
      toast.error('Failed to delete user.', {
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
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await apiMethod.adminGetUsers();
        console.log(response);
        setDataUsers(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      console.log(user);
      setUser(user);
      setName(user.name);
      setEmail(user.email);
    } else {
      setUser({
        id: 1,
        name: 'Kosong',
        email: 'Kosong',
        role: 'Kosong',
      });
    }
    getUsers();
  }, []);

  useEffect(() => {
    // Mendengarkan event 'user-added' untuk menerima data user baru
    socket.on('user-added', (newUser) => {
      console.log('User baru ditambahkan:', newUser);
      setDataUsers((prevUsers) => [...prevUsers, newUser]); // Tambahkan user baru ke daftar
    });

    // Cleanup listener ketika komponen unmount
    return () => {
      socket.off('user-added');
    };
  }, []);

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
    <div>
      <Box my={5}>
        <div>
          <Text textAlign={'center'} fontWeight={'bold'} fontSize="xx-large">
            Admin Page
          </Text>
          <Box borderWidth={2} p={3} rounded={5} w={['50%', '75%']} mx={'auto'}>
            <Text textAlign="center" fontWeight="bold" fontSize="large" mb={2}>
              Welcome, {user.name}
            </Text>
            <Text textAlign="center" fontWeight="normal" mb={2}>
              Email : {user.email}
            </Text>
            <Flex justify="center" mb={6} gap={2}>
              <Button
                gap={1}
                onClick={() => {
                  setIsDisplayUsers(!isDisplayUsers);
                  setIsEditUser(false);
                }}
                colorScheme="green"
              >
                <FaUsersLine /> Users
              </Button>
              <Button
                gap={1}
                onClick={() => {
                  setIsDisplayUsers(false);
                  setIsEditUser(!isEditUser);
                }}
                colorScheme="yellow"
              >
                <EditIcon /> Edit
              </Button>
              <Button gap={1} onClick={logout} colorScheme="teal">
                Logout <FiLogOut />
              </Button>
            </Flex>

            {/* Table */}
            {isDisplayUsers ? (
              <TableContainer>
                <Table variant="striped" colorScheme="teal">
                  <TableCaption>Data Users</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>NO</Th>
                      <Th>Name</Th>
                      <Th>Email</Th>
                      <Th>Role</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {dataUsers.length > 0 ? (
                      dataUsers.map((item, index) => (
                        <Tr key={index}>
                          <Td>{index + 1}</Td>
                          <Td>{item.name}</Td>
                          <Td>{item.email}</Td>
                          <Td>{item.role}</Td>
                          <Td>
                            <IconButton
                              mx={1}
                              onClick={() => handleEditModal(item)}
                            >
                              <EditIcon w={4} h={4} color="yellow.500" />
                            </IconButton>
                            <IconButton onClick={() => handleDeleteModal(item)}>
                              <DeleteIcon w={4} h={4} color="red.500" />
                            </IconButton>
                          </Td>
                        </Tr>
                      ))
                    ) : (
                      <Tr>
                        <Td colSpan={4}>Nothing Data Users</Td>
                      </Tr>
                    )}
                  </Tbody>
                  <Tfoot>
                    <Tr>
                      <Th>NO</Th>
                      <Th>Name</Th>
                      <Th>Email</Th>
                      <Th>Role</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </TableContainer>
            ) : (
              ''
            )}

            {/* Modal */}
            <Modal isOpen={editModal} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <form onSubmit={updateUser}>
                  <ModalHeader>Edit User</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <VStack spacing={4}>
                      <FormControl id="name">
                        <FormLabel>Name</FormLabel>
                        <Input
                          type="text"
                          value={selectUser.name}
                          onChange={(e) =>
                            setSelectUser((prevState) => ({
                              ...prevState,
                              name: e.target.value,
                            }))
                          }
                        />
                      </FormControl>
                      <FormControl id="email">
                        <FormLabel>Email address</FormLabel>
                        <Input
                          type="email"
                          value={selectUser.email}
                          onChange={(e) =>
                            setSelectUser((prevState) => ({
                              ...prevState,
                              email: e.target.value,
                            }))
                          }
                        />
                      </FormControl>
                    </VStack>
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="green" mx={3} type="submit">
                      Save
                    </Button>
                    <Button colorScheme="blue" onClick={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </form>
              </ModalContent>
            </Modal>
            {/* Alert Dialog */}
            <AlertDialog
              isOpen={deleteModal}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Delete User {selectUser.name}
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Are you sure? You can't undo this action afterwards.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button colorScheme="red" onClick={deleteUser} ml={3}>
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>

            {/* Form Update User Login */}
            {isEditUser ? (
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
        </div>
      </Box>
    </div>
  );
};

export default Admin;
