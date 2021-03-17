import { snowGlobeABI } from '../configure';
import { iceQueenAddress } from '../configure';
import BigNumber from 'bignumber.js';
import { enqueueSnackbar } from '../common/redux/actions';

export const snowglobeApproval = ({ web3, address, contractAddress , amount, dispatch }) => {

  return new Promise((resolve, reject) => {

    const contract = new web3.eth.Contract(snowGlobeABI, contractAddress);

    contract.methods
      .approve(iceQueenAddress, amount)
      .send({ from: address })
      .on('transactionHash', function (hash) {
        dispatch(
          enqueueSnackbar({
            message: hash,
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'success',
            },
            hash,
          })
        );
      })
      .on('receipt', function (receipt) {
        resolve(new BigNumber(80000000000).toNumber());
      })
      .on('error', function (error) {
        reject(error);
      })
      .catch(error => {
        reject(error);
      });
  });
};
