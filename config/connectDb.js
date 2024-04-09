const mongoose = require("mongoose");


const connectDb = async()=>{
try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log(`Server connected ${mongoose.connection.host}`)
} catch (error) {
    console.log(`${error}`)
}
}

module.exports= connectDb;
