const mongoose = require('mongoose')
const validator = require('validator')

const Url = mongoose.model('urls',
 {
    fullUrl:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error('url provided is invalid');
            }
        }
    },
    shortUrl:{
        type:String,
        required:true
    },
    click:{
        type:Number,
        default:0
    }
})

module.exports = Url