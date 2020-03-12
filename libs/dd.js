const request = require('request-promise-native');
const {DD_APP_SECRET, DD_APP_KEY} = require('./../config.json');
module.exports = {
    async login(code){
        if (!code){
            console.log(`[dd login] null params`);
            return;
        }
        let token_url = `https://oapi.dingtalk.com/gettoken?appkey=${DD_APP_KEY}&appsecret=${DD_APP_SECRET}`;
        let token_result = JSON.parse(await request(token_url));
        console.log(token_result);
        if (token_result.errcode) {
            console.log(`[dd login] fail to get access_token`);
            return;
        }

        let result_url = `https://oapi.dingtalk.com/user/getuserinfo?access_token=${token_result.access_token}&code=${code}`;
        let result = await request(result_url);
        console.log(result);
        return result;
    }
}