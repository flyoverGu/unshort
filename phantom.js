var page = require('webpage').create();
var args = require('system').args;
var originUrl = args[1];

page.onLoadFinished = function(status) {
    if (status == 'success') {
        var url = page.evaluate(function() {
            return window.location.href;
        });
        if (!~originUrl.indexOf(url)) {
            console.log('[result] open url: ' + url);
            phantom.exit();
        }
    } else {
        console.log('[error] open url error');
    }
};

var openPage = function(originUrl) {
    page.open(originUrl);
}

var start = function() {
    if (originUrl) openPage(originUrl);
    else console.log('[error] originUrl miss');
}

setTimeout(function() {
    console.log('[error] time out');
    phantom.exit();
}, 1000 * 30);

start();
