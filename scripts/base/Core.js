var ICF = {};
var App;
ICF.App = function() {
}

ICF.App.prototype.init = function(debugMode) {
  this.version = '0.1';
  this.DEBUG_MODE = debugMode;

  this.eventManager = new EVT.EventManager();
  this.eventManager.init(this);

  this.element = document;
  this.registeredComponents = {};

  if (this.DEBUG_MODE) {
    if (BRW.isIE) { // Error logging for IE
        window.onerror = function(msg, url, lno) {
            Log({ msg: msg, url: url, lno: lno });
        }
    }
  }
}


ICF.App.prototype.setDebugMode = function(debugMode) {
  this.DEBUG_MODE = debugMode;
}

App = new ICF.App();
App.init();
App.setDebugMode(true);
