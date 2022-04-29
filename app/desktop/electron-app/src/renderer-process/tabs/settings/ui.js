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
        <div class="mb-3">
          <label for="settings-network" class="form-label">Network</label>
          <div class="input-group">
            <input type="text" class="form-control" id="settings-network" value="localhost" readonly>
          </div>
        </div>
        <div class="mb-3">
          <label for="settings-network-port" class="form-label">Port</label>
          <input type="number" class="form-control" id="settings-network-port" step="1" min="10000" value="10101">
        </div>
      </div>
    </div>
  </div>
</div>`;
};
