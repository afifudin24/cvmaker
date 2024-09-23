import { Box, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
const NotFound = () => {
  return (
    <Box
      display="flex"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Box p={5} borderWidth={2} rounded={5}>
        <Text textAlign={'center'} fontWeight={'bold'} fontSize={120}>
          404
        </Text>
        <Text textAlign={'center'} fontSize={30}>
          Not Found Page
        </Text>
        <Box textAlign={'center'}>
          <Link to={'/'}>
            <Button colorScheme="teal" my={3}>
              Return To Main Page
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default NotFound;
