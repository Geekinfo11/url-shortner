const request = require('request')


const shortLinkRequest = (fullUrl, callback)=>{
    request('https://cutt.ly/api/api.php?key=595f7d7bba406f6013607a13379cc7231b8c2&short='+fullUrl,{json:true}, (error, response)=>{

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