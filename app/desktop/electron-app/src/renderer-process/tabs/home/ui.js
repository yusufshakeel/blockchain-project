'use strict';

module.exports = () => {
  return `<div class="container-fluid">
  <div class="row">
    <div id="col">
      <img src="./image/logo.png" 
        style="height: 96px; width: 96px;" alt="logo"
        class="img-fluid  mx-auto d-block my-3">
      <div id="coin-balance-container" class="text-center">
        <h1 id="coin-balance" class="display-4 mb-3">0.0000 CC</h1>
        <p><a type="button" class="btn btn-sm btn-outline-secondary" id="refresh-get-coin-balance-btn">Refresh</a></p>
        <p class="text-center"><small>Address:</small> <small id="address-on-home-tab" style="max-width: 200px; overflow: hidden">Not yet set!</small></p>
      </div>
      <hr>
      <div id="home-action-section">
        <ul class="nav nav-pills mb-3 nav-fill bg-light" id="pills-tab-home" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="pills-home-tab-buy" data-bs-toggle="pill" data-bs-target="#pills-home-buy" type="button" role="tab" aria-controls="pills-home-buy" aria-selected="true">BUY</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="pills-home-tab-send" data-bs-toggle="pill" data-bs-target="#pills-pills-home-send" type="button" role="tab" aria-controls="pills-pills-home-send" aria-selected="false">SEND</button>
          </li>
        </ul>
        <div class="tab-content">
          <!-- buy -->
          <div class="tab-pane show active" id="pills-home-buy" role="tabpanel" aria-labelledby="pills-home-buy-tab">
            <div class="row">
              <div class="col-sm-6">
                <div class="mb-3">
                  <label for="buy-1cc-rate" class="form-label">Exchange Rate</label>
                  <div class="input-group">
                    <span class="input-group-text">1 CC</span>
                    <input type="text" class="form-control" id="buy-1cc-rate" value="100.00" readonly>
                    <span class="input-group-text">INR</span>
                  </div>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="mb-3">
                  <label for="buy-number-of-coins" class="form-label">Buy Coins</label>
                  <div class="input-group">
                    <input type="number" class="form-control" id="buy-number-of-coins" value="1" step="0.0001" min="0.0001">
                    <span class="input-group-text">CC</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <div class="mb-3">
                  <label for="buy-total-amount" class="form-label">Total Amount</label>
                  <div class="input-group">
                    <span class="input-group-text">INR</span>
                    <input type="text" class="form-control" id="buy-total-amount" value="100.00" readonly>
                  </div>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="mb-3">
                  <label for="buy-coin-fee" class="form-label">Fee Coins <small><abbr title="To be deducted from your number of buy coins">?</abbr></small></label>
                  <div class="input-group">
                    <input type="text" class="form-control" id="buy-coin-fee" value="0" step="0.0001" min="0.0001" readonly>
                    <span class="input-group-text">CC</span>
                  </div>
                </div>
              </div>
              <div class="col-sm-12">
                <a type="button" class="btn btn-success float-end" id="buy-coins-btn">BUY COINS</a>
              </div>
            </div>
          </div>
          <!-- send -->
          <div class="tab-pane" id="pills-pills-home-send" role="tabpanel" aria-labelledby="pills-pills-home-send-tab">
            <div class="row">
              <div class="col-sm-6">
                <div class="mb-3">
                  <label for="send-coin-receiver-address" class="form-label">Receiver Address</label>
                  <div class="input-group">
                    <input type="text" class="form-control" id="send-coin-receiver-address">
                  </div>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="mb-3">
                  <label for="send-number-of-coins" class="form-label">Send Coins</label>
                  <div class="input-group">
                    <input type="number" class="form-control" id="send-number-of-coins" value="0.0001" step="0.0001" min="0.0001">
                    <span class="input-group-text">CC</span>
                  </div>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="mb-3">
                  <label for="send-number-of-fee-coins" class="form-label">Fee Coins</label>
                  <div class="input-group">
                    <input type="number" class="form-control" id="send-number-of-fee-coins" value="0" step="0.0001" min="0">
                    <span class="input-group-text">CC</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <a type="button" class="btn btn-success float-end" id="send-coins-btn">SEND COINS</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;
};
