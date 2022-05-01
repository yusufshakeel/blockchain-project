import axios from 'axios';
import ExchangeApiHandler from './exchange-api-handler';
import AppConstants from '../constants';

const axiosInstanceExchange = new axios.create({
  baseURL: AppConstants.API_BASE_URL_EXCHANGE_DOMAIN
});

function ApiHandlers() {
  this.exchangeApiHandler = new ExchangeApiHandler({ axiosInstance: axiosInstanceExchange });
}

export default ApiHandlers;