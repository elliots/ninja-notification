var opts = {};

var d = new (require('index'))(opts, {
    on : function(x,cb){
        setTimeout(cb, 1000);
    },
    log: {
        debug: console.log,
        info: console.log,
        warn: console.log,
        error: console.log
    }
});

d.emit = function(channel, value) {
    console.log('Driver.emit', channel, value);
    if (channel == 'register') {
        value.emit = function(channel, value) {
            console.log('Device.emit', channel, value);
        };

        value.write({
            title: 'NinjaBlocks',
            subtitle: 'Home',
            message: 'Someone is at the front door.',
            url: 'http://ninjablocks.com',
            type: 'fail'
        });

        setTimeout(function() {
            value.write('Simple text notification');
        }, 2000);

        setTimeout(function() {
            value.write('{"title":"hello","subtitle":"what up?","message":"you rock!"}');
        }, 4000);


    }

};

d.save = function() {
    console.log('Saved opts', opts);
};
