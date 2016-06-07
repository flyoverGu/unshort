'use strict';
let app = require('koa')();
let bodyParser = require('koa-bodyparser');
let gzip = require('koa-gzip');
let router = require('koa-router')();
let unshort = require('./unshort');
let debug = require('debug')('app');
let error = require('debug')('error');

app.use(bodyParser());
app.use(gzip());

app.use(function*(next) {
    try {
        debug('-->>', this.req.url);
        yield next;
    } catch (e) {
        this.status = 500;
        this.message = JSON.stringify(e);
        error(e, this.message);
    }
});


router.get('/api/health', function*(next) {
    this.body = "web alive";
});

router.get('/api/unshort', function*(next) {
    let originUrl = this.query.originUrl;
    let url =
        yield new Promise((resolve, reject) => {
            unshort(originUrl, (err, url) => {
                if (err) reject(err);
                else resolve(url);
            });
        });
    this.body = {
        url
    }
});

app.use(router.routes());

app.listen(process.env.PORT || 8080, () => {
    console.log('start web app!');
});
