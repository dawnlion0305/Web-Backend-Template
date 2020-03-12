//require('./libs/mongo');
const {HTTP_PORT} = require('./config.json');
const Koa = require('koa');
const app = new Koa();

const middleware = require('./middlewares');
const router = require('./routers');

middleware(app);
router(app);

app.listen(HTTP_PORT, () => {console.log(`It's running at port ${HTTP_PORT}`);});