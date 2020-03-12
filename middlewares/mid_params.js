module.exports = (...arg) => {
    //参数中是参数名
    return async (ctx, next) => {
        let query = ctx.query;
        let data = ctx.body;

        for (let item of arg) {
            if (typeof item !== 'string') {
                console.log(`[params err] 参数必须为字符串`);
                return;
            }
            if(!query[item] && !data[item]){
                ctx.respon({
                    status:404,
                    msg:'缺少必要参数',
                    data:{}
                });
                return;
            }
        }
        await next();
    }
}