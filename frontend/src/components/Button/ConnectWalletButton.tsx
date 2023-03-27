import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  StackProps,
  Text,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import React, { ReactElement } from 'react';

import { SUPPORTED_WALLETS } from '../../config';
import { useAuth } from '../../hooks/useAuth';

interface ConnectorProps extends StackProps {
  img?: ReactElement;
  title: string;
  description?: string;
}

const Connector: React.FC<ConnectorProps> = ({
  img,
  title,
  description,
  ...props
}) => {
  return (
    <Stack
      align={'center'}
      borderRadius={'md'}
      direction={'row'}
      padding={3}
      spacing={3}
      _hover={{
        backgroundColor: 'gray.300',
        cursor: 'pointer',
      }}
      {...props}
    >
      <Flex align={'center'} w={12} h={12}>
        {img}
      </Flex>
      <Flex flexDirection={'column'}>
        <Text>{title}</Text>
        <Text>{description}</Text>
      </Flex>
    </Stack>
  );
};

const ConnectWalletButton: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalSize = useBreakpointValue({ base: 'sm' });
  const { login } = useAuth();

  return (
    <>
      <Button
        display={{ base: 'none', md: 'inline-flex' }}
        fontSize={'sm'}
        fontWeight={600}
        colorScheme={'pink'}
        onClick={onOpen}
      >
        Connect
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>CONNECT</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text textAlign={'center'}>Connect with your favorite wallet.</Text>
            <Flex
              flex={{ base: 1 }}
              flexDirection={'column'}
              justifyContent={'center'}
            >
              {Object.values(SUPPORTED_WALLETS).map((option) => (
                <Connector
                  key={option.title}
                  img={
                    <img
                      src={option.icon}
                      alt={option.title}
                      width={'100%'}
                      height={'100%'}
                    />
                  }
                  title={option.title}
                  description={option.description ?? option.title}
                  marginTop={3}
                  onClick={() => login(option.connector)}
                />
              ))}
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button fontSize={'sm'} fontWeight={600} mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConnectWalletButton;
