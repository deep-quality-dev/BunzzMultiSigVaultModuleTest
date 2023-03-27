import { BigNumber } from 'ethers';

export const BIG_TEN = BigNumber.from(10);
export const BIG_TEN_EIGHTEEN = BigNumber.from(10).pow(18);

export const getDecimalAmount = (amount: BigNumber, decimals = 18) => {
  return BigNumber.from(amount).mul(BIG_TEN.pow(decimals));
};

export const getBalanceNumber = (balance: BigNumber, decimals = 18) => {
  return getBalanceAmount(balance, decimals).toNumber();
};

export const getBalanceAmount = (amount: BigNumber, decimals = 18) => {
  return BigNumber.from(amount).div(BIG_TEN.pow(decimals));
};

export const formatNumber = (
  number: number,
  minPrecision = 2,
  maxPrecision = 2,
) => {
  const options = {
    minimumFractionDigits: minPrecision,
    maximumFractionDigits: maxPrecision,
  };
  return number.toLocaleString(undefined, options);
};
