module.exports = async (ctx, next) => {
    const query = ctx.query;
    const postData = ctx.body.data || "{}";
    const method = ctx.method;
    const path = ctx.path;

    let data = JSON.parse(postData);
    ctx.body = data;

    console.log(`[${method}][path:${path}] query: ${JSON.stringify(query)}, body: ${data}`);
    await next();
}