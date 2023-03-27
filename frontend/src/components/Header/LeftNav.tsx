import { Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { ROUTES } from '../../config';

const LeftNav: React.FC = () => {
  const location = useLocation();

  return (
    <Stack direction={'row'} spacing={4} alignItems={'center'}>
      {ROUTES.map((route) => (
        <Link key={route.path} to={route.path}>
          <Text
            color={
              location.pathname.startsWith(route.path) ? 'pink.400' : 'gray.600'
            }
            fontSize={'md'}
            fontWeight={500}
            _hover={{ color: 'gray.800' }}
          >
            {route.title}
          </Text>
        </Link>
      ))}
    </Stack>
  );
};

export default LeftNav;
