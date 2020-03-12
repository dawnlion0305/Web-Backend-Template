module.exports = () => {
    function render (json) {
        this.set("Content-Type","application/json");
        this.response.status = 200;
        this.body = JSON.stringify(json);
    }
    return async (ctx, next) => {
        ctx.respon = render.bind(ctx);
        await next();
    }
}