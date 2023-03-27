import {
  Container,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

import LeftNav from './LeftNav';
import RightNav from './RightNav';

const Header: React.FC = () => {
  return (
    <Flex
      as={'header'}
      pos={'fixed'}
      top={'0'}
      w={'full'}
      minH={'60px'}
      boxShadow={'sm'}
      zIndex={'999'}
      justify={'center'}
      alignItems={'center'}
      css={{
        backdropFilter: 'saturate(180%) blur(5px)',
        backgroundColor: useColorModeValue(
          'rgba(255, 255, 255, 0.8)',
          'rgba(26, 32, 44, 0.8)',
        ),
      }}
    >
      <Container
        as={Flex}
        maxW={'7xl'}
        width={'100%'}
        justifyContent={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          justify={{ base: 'center', md: 'start' }}
        >
          <Heading as={'h1'} fontSize={'3xl'}>
            MultiSigVault
          </Heading>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <LeftNav />
          </Flex>
        </Flex>
        <Stack
          align={'center'}
          flex={{ base: 1, md: 0 }}
          direction={'row'}
          justify={'flex-end'}
          spacing={6}
        >
          <RightNav />
        </Stack>
      </Container>
    </Flex>
  );
};

export default Header;
