const fs = require('fs');
const path = require('path');
const files = fs.readdirSync(path.resolve('./routers'));

module.exports = (app) => {
    files.forEach((item, index) => {
        if (item === 'index.js') return;
        const route = require(`./${item}`);
        app.use(route.routes());
    });
}