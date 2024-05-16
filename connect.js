const mongoose = require('mongoose')
const connect = async () => {
    mongoose.connect(process.env.URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log('connected')
    }).catch((error)=>{
        console.log('connection failed')
        console.log(error)
    })
}
module.exports = connect