const mongoose = require('mongoose');

const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.DB_LINK, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
        await console.log('Conexion con Mongo DB Atlas exitosa');
        
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectMongo