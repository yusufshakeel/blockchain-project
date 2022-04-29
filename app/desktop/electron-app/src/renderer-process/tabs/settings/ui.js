'use strict';

module.exports = () => {
  return `<div class="container-fluid">
  <div class="row">
    <div id="col">
      <img src="./image/logo.png" 
        style="height: 96px; width: 96px;" alt="logo"
        class="img-fluid  mx-auto d-block my-3">
      <div id="settings-container">
        <p class="my-3 text-center">Settings</p>
        <ul class="nav nav-pills mb-3 nav-fill bg-light" id="pills-tab-settings" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="pills-settings-tab-exchange" data-bs-toggle="pill" data-bs-target="#pills-settings-exchange" type="button" role="tab" aria-controls="pills-settings-exchange" aria-selected="true">Exchange</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="pills-settings-tab-transaction" data-bs-toggle="pill" data-bs-target="#pills-pills-settings-transaction" type="button" role="tab" aria-controls="pills-pills-settings-transaction" aria-selected="false">Transactions</button>
          </li>
        </ul>
        <div class="tab-content">
          <!-- EXCHANGE -->
          <div class="tab-pane show active" id="pills-settings-exchange" role="tabpanel" aria-labelledby="pills-settings-exchange-tab">
            <div class="mb-3">
              <label for="settings-network-exchange" class="form-label">Network</label>
              <div class="input-group">
                <input type="text" class="form-control" id="settings-network-exchange" value="localhost" readonly>
              </div>
            </div>
            <div class="mb-3">
              <label for="settings-network-exchange-port" class="form-label">Port</label>
              <input type="number" class="form-control" id="settings-network-exchange-port" step="1" min="10000" value="10101">
            </div>
          </div>
          <!-- TRANSACTIONS -->
          <div class="tab-pane" id="pills-pills-settings-transaction" role="tabpanel" aria-labelledby="pills-pills-settings-transaction-tab">
            <div class="mb-3">
              <label for="settings-network-transaction" class="form-label">Network</label>
              <div class="input-group">
                <input type="text" class="form-control" id="settings-network-transaction" value="localhost" readonly>
              </div>
            </div>
            <div class="mb-3">
              <label for="settings-network-transaction-port" class="form-label">Port</label>
              <input type="number" class="form-control" id="settings-network-transaction-port" step="1" min="10000" value="10103">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;
};
