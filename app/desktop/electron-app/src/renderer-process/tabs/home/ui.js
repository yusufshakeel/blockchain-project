'use strict';

module.exports = () => {
  return `<div class="container-fluid">
  <div class="row">
    <div id="col">
      <img src="./image/logo.png" 
        style="height: 96px; width: 96px;" alt="logo"
        class="img-fluid  mx-auto d-block my-3">
      <div id="coin-balance-container" class="text-center my-5">
        <h1 id="coin-balance" class="display-4">0.0 CC</h1>
      </div>
      <hr>
      <div id="home-action-section"></div>
    </div>
  </div>
</div>`;
};
