const mongoose = require('mongoose')

const connection = async () => {
    try{
        await mongoose.connect(process.env.MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
    }catch(err){
        console.log('Connection Failed',err);
    }
}

module.exports = connection