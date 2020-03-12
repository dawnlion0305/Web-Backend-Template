const request = require('request-promise-native');
const {WX_APP_SECRET, WX_APP_KEY} = require('./../config.json');
module.exports = {
    async login(code){
        if (!code){
            console.log(`[wx login] null params`);
            return;
        }
        let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${WX_APP_KEY}&secret=${WX_APP_SECRET}&js_code=${code}&grant_type=authorization_code`;
        let result = await request(url);
        return result;
    }
}