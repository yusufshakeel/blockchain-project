import AxiosHttpAction from './axios-http-action';
import { v4 as uuidV4 } from 'uuid';

function TransactionApiHandler({ axiosInstance }) {
  const httpAction = AxiosHttpAction(axiosInstance);

  this.sendCoins = async function(requestBody) {
    return await httpAction.post({
      url: '/blockchain/v1/blocks/statistics',
      requestBody,
      headers: {
        'Content-Type': 'application/json',
        'x-trace-id': uuidV4(),
        'x-app-id': 'react-app'
      }
    })
  };
}

export default TransactionApiHandler;