const mongoose = require('mongoose');
const {dbLink} = require('./../config.json');

const config = {
    useNewUrlParser:true,
    autoIndex:false,
    useUnifiedTopology: true,
};

if(process.env.NODE_ENV != 'production'){
    console.log(`MongoDB running at development`);
    mongoose.set('debug', true);
}

mongoose.connect(dbLink, config);

const db = mongoose.connection;
db.on('error', e => {console.log(`mongodb's error: ${e}`)});
db.on('open', () => {console.log(`mongodb is ruuning at ${dbLink}`);});
