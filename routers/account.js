const Router = require('koa-router');
const router = new Router({prefix:'/account'});
const midParams = require('./../middlewares/mid_params');
const wx = require('./../libs/wx');
const dd = require('./../libs/dd');
router.get('/login', midParams('code','type'),async (ctx) => {
    const code = ctx.query.code;
    const type = ctx.query.type;

    if(!code){
        return;
    }
    if (!type) return;
    else if (type == 'wx') {
        await wx.login(code);
    } else if (type == 'dd') {
        console.log('success');
        await dd.login(code);
    }
    
    ctx.json({});
});


module.exports = router;