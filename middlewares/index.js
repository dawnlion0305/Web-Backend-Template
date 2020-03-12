const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const {midSession,parseSession,strSession} = require('./mid_session'); 
const midJson = require('./mid_response');
const midRequest = require('./mid_request');
module.exports = (app) => {
    app.use(cors());//跨域
    app.use(async (ctx, next) => { //http错误处理中间件
        try {
          ctx.error = (code, message) => {
            if (typeof code === 'string') {
              message = code;
              code = 500;
            }
            ctx.throw(code || 500, message || '服务器错误');
          };
          await next();
        } catch (e) { 
          //throw ErroMsg 直接抛出一个错误，在这里可以捕获e
          //ctx.error(code, msg) http错误，可以是404或者是其他
          console.log(e);
          let status = e.status || 500;
          let message = status === 500 ? '服务器错误' : e.message;
          ctx.response.body = {
            status,
            msg:message,
            data:{}
          };
        }
      });
      
      app.use(bodyParser());
      app.use(midJson());
      app.use(midSession(app));
      app.use(parseSession());
      app.use(strSession());
      app.use(midRequest);
}