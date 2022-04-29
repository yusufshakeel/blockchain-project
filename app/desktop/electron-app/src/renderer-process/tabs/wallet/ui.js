'use strict';

module.exports = () => {
  return `<div class="container-fluid">
  <div class="row">
    <div id="col">
      <div id="create-or-import-wallet-container">
        <div class="text-center">
          <img src="./image/logo.png" 
            style="height: 96px; width: 96px;" alt="logo"
            class="img-fluid  mx-auto d-block my-3">
          <div class="btn-group" role="group">
            <a type="button" class="btn btn-outline-primary" id="btn-create-wallet">Create wallet</a>
            <a type="button" class="btn btn-outline-secondary" id="btn-import-wallet">Import wallet</a>
          </div>
        </div>
      </div>
      <div id="configured-wallet-container">
        <p class="my-3 text-center">Wallet</p>
        <div class="mb-3">
          <label for="wallet-address" class="form-label">Address</label>
          <div class="input-group">
            <input type="text" class="form-control" id="wallet-address" readonly>
            <a type="button" class="btn btn-outline-secondary" id="btn-copy-wallet-address">Copy</a>
          </div>
        </div>
        <div class="mb-3">
          <label for="wallet-public-key" class="form-label">Public key</label>
          <input type="text" class="form-control" id="wallet-public-key" readonly>
          <input type="text" class="form-control" id="wallet-public-key-hidden" hidden>
        </div>
        <div class="mb-3">
          <label for="wallet-private-key" class="form-label">Private key</label>
          <input type="text" class="form-control" id="wallet-private-key" readonly>
          <input type="text" class="form-control" id="wallet-private-key-hidden" hidden>
        </div>
      </div>
    </div>
  </div>
</div>`;
};
