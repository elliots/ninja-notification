var util = require('util');
var stream = require('stream');
var osxNotifier = require('osx-notifier');

util.inherits(Driver,stream);
util.inherits(Device,stream);

function Driver(opts,app) {
  var self = this;
  var device;

  if (process.platform !== 'darwin') {
    app.log.error("The notification driver currently only works on mac.");
    return;
  }

  app.on('client::up',function(){
    if (!device) {
      device = new Device(app);
      self.emit('register', device);
    }

  });

}

function Device(app) {
  var self = this;

  this._app = app;
  this.writeable = true;
  this.readable = false;
  this.V = 0;
  this.D = 311;
  this.G = 'notification';
  this.name = 'Notification - ' + require('os').hostname();
}

Device.prototype.write = function(data) {
  if (typeof data == 'string') {
    data = {
      message: data
    };
  }

  osxNotifier({
    title: data.title || 'NinjaBlocks',
    subtitle: data.subtitle,
    message: data.message,
    type: data.type || 'info',
    open: data.url || undefined
  });
  this._app.log.info('Showing notification', data);
};

module.exports = Driver;
