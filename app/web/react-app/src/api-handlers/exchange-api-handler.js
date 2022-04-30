import AxiosHttpAction from './axios-http-action';
import { v4 as uuidV4 } from 'uuid';

function ExchangeApiHandler({ axiosInstance }) {
  const httpAction = AxiosHttpAction(axiosInstance);

  this.getStatistics = async function() {
    return await httpAction.get({
      url: '/blockchain/v1/blocks/statistics',
      headers: {
        'x-trace-id': uuidV4(),
        'x-app-id': 'react-app'
      }
    })
  };
}

export default ExchangeApiHandler;