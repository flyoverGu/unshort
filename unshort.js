'use strict';

let exec = require('child_process').exec;

let unshort = function(originUrl, done) {
    let cmd = `phantomjs ./phantom.js ${originUrl}`;
    exec(cmd, (err, stdout, stderr) => {
        if (err) done(err);
        else {
            let res = stdout.slice(0, stdout.indexOf('\n'));
            if (/\[error\]/.test(res)) {
                done(res);
            } else {
                let m = res.match(/\[result\] open url: (\S+)/);
                if (m && m[1]) done(null, m[1]);
                else done('can not unshort');
            }
        }
    });
}

//unshort('http://tmqd.me/h.yvct8?cv=AAFaQPez&sm=91c969', (err, data) => {
//    console.log(err, data);
//});

module.exports = unshort;
