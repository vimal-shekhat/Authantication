const mongoose = require("mongoose");


module.exports = ()=>{
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true , useUnifiedTopology: true }).then(()=>{
    console.log('database connected successfully..!')
    // mongoose.set('debug',true)
}).catch((error)=>{
    console.log('database connection fail..!',error)
})
}
