const request = require('request')

require('dotenv').config()

const apiKey = process.env.SHORTLINK_API_KEY

const shortLinkRequest = (fullUrl, callback)=>{
    request('https://cutt.ly/api/api.php?key='+apiKey+'&short='+fullUrl,{json:true}, (error, response)=>{

        if(error){
            return callback('Unable to connect to the urlshortner service', undefined)
        }

        if(response.body.url.status == 2){
            return callback('invalid url provided', undefined)
        }

        callback(undefined, response.body.url.shortLink)

    })
}
 
module.exports = shortLinkRequest