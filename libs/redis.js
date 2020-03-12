const redis = require('redis');
const {redisPort, redisLink} = require('./../config.json');
const client = redis.createClient(redisPort, redisLink);
const {promisify} = require('util');
const getAsync = promisify(client.get).bind(client);
const hgetallAsync = promisify(client.hgetall).bind(client);

client.on('error', (e) => {console.log(`REDIS_ERROR:${e}`)});
client.on('ready', () => {console.log(`REDIS is connected`)});

module.exports = {
    client,
    async saveStr(key,value){ //存放字符串
        if (typeof value !== 'string') throw 'all pramas must be a string';
        client.set(key, value);
    },
    async getStr (key) { //获取字符串
        return await getAsync(key);
    },
    async saveObj(key, value) { //存放对象
        if (typeof value !== 'object') throw 'all pramas must be a object';
        client.hmset(key,value);
    },
    async getObj(key) { //获取对象
        return await hgetallAsync(key);
    },
}

