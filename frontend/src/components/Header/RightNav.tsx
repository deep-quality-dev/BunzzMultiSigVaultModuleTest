import { ChevronDownIcon, SmallCloseIcon } from '@chakra-ui/icons';
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from '@chakra-ui/react';
import { shortenAddress, useEthers, useTokenBalance } from '@usedapp/core';
import React from 'react';

import { useERC20MockContract } from '../../hooks';
import { formatNumber, getBalanceNumber } from '../../utils/number';
import { ConnectWalletButton } from '../Button';

const RightNav: React.FC = () => {
  const { account, deactivate } = useEthers();
  const erc20MockContract = useERC20MockContract();
  const balance = useTokenBalance(erc20MockContract.address, account);

  return (
    <Stack direction={'row'} spacing={4} alignItems={'center'}>
      {!account || !balance ? (
        <ConnectWalletButton />
      ) : (
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} size={'sm'}>
            <Text>{`${shortenAddress(account)}: ${formatNumber(
              getBalanceNumber(balance),
              0,
              0,
            )}`}</Text>
          </MenuButton>
          <MenuList>
            <MenuItem icon={<SmallCloseIcon />} onClick={deactivate}>
              Disconnect
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </Stack>
  );
};

export default RightNav;
