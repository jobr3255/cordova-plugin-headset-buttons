// Empty constructor
function MyTestPlugin() {}

// The function that passes work along to native shells
// Message is a string, duration may be 'long' or 'short'
MyTestPlugin.prototype.show = function(message, duration, successCallback, errorCallback) {
  var options = {};
  options.message = message;
  options.duration = duration;
  cordova.exec(successCallback, errorCallback, 'MyTestPlugin', 'show', [options]);
}

// Installation constructor that binds MyTestPlugin to window
MyTestPlugin.install = function() {
  if (!window.plugins) {
    window.plugins = {};
  }
  window.plugins.myTestPlugin = new MyTestPlugin();
  return window.plugins.myTestPlugin;
};
cordova.addConstructor(MyTestPlugin.install);