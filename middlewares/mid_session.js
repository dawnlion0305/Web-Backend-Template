const session = require('koa-session');
const md5 = require('md5');
const {client} = require('./../libs/redis');
const EXPIRE_TIME = 60 * 60;

const {promisify} = require('util');
const hgetallAsync = promisify(client.hgetall).bind(client);
const store = {
    async get(key, maxAge){
        return hgetallAsync(key);
    },
    set(key, sess, maxAge){
        client.hmset(key, sess, (err, res) => {
            if (err) {
                console.log(`The redis and session error :${err} `);
                return;
            }
            client.expire(key, EXPIRE_TIME, (err, isSuccess) => {
                if(err || !isSuccess){
                    console.log(`set redis expire time fail: ${err}`);
                }
            });// 设置过期时间
        });
    },
    destroy(key){
        client.hdel(key);
    }
};

const CONFIG = {
    key: 'express:sess',
    maxAge: (1000 * 60 * 30),// 30 minute
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false,
    store,
}

const midSession = (app) => {
    app.keys = [md5('nursingSystemforAll.....rrr 123123123skji')];
    return session(CONFIG, app);
}

const strSession = () => {
    function render(key, sess) {
      if (typeof sess === 'object') {
        this.session[key] = JSON.stringify(sess);
      } else {
        this.session[key] = sess;
      }
    }
  
    return async (ctx, next) => {
      ctx.setSess = render.bind(ctx);
      await next();
    }
  }
  
  const parseSession = () => {
    function render (key) {
      const data = this.session[key];
      if (data === 'undefined' || data === undefined) { // undefined 为字符串， 两个！！之后取真
        return null;
      } else {
        return JSON.parse(data);
      }
    };
  
    return async (ctx, next) => {
      ctx.getSess = render.bind(ctx);
      await next();
    }
  }
  
module.exports = {
    midSession,
    strSession,
    parseSession
}