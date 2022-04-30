import axios from 'axios';
import ExchangeApiHandler from './exchange-api-handler';
import TransactionApiHandler from './transaction-api-handler';
import AppConstants from '../constants';

const axiosInstanceExchange = new axios.create({
  baseURL: AppConstants.API_BASE_URL_EXCHANGE_DOMAIN
});

const axiosInstanceTransaction = new axios.create({
  baseURL: AppConstants.API_BASE_URL_TRANSACTION_DOMAIN
});

function ApiHandlers() {
  this.exchangeApiHandler = new ExchangeApiHandler({ axiosInstance: axiosInstanceExchange });
  this.transactionApiHandler = new TransactionApiHandler({ axiosInstance: axiosInstanceTransaction });
}

export default ApiHandlers;