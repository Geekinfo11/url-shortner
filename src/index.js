const path = require('path')

// const mongoose = require('mongoose')

const express = require('express')

const app = express()

const port = process.env.PORT || 3000

// setup the path for the public directory
const publicDirectory = path.join(__dirname, '../public')
app.use(express.static(publicDirectory))

// database
require('./db/mongoose')

// create a url model
const Url = require('./db/models/url')

// setup our view engine to the handlebars engine (hbs)
app.set('view engine', 'hbs')

// setup path for our views folder
const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath)

// convert incoming data from users to Json
app.use(express.json())

// api call to the url shortner service
const shortLinkRequest = require('./short-link-api')

app.use(express.urlencoded({extended: true}));

// routes
app.post('/shortenUrl', async (req, res)=>{
    
    // force the user to assign a value only to fullUrl field 
    const fields = Object.keys(req.body)
    const allowedFields = ['fullUrl']

    const isValid = fields.every((field)=>{
        return allowedFields.includes(field)
    })

    if(!isValid){
        return res.status(400).send()
    }

    shortLinkRequest(req.body.fullUrl, (error, response)=>{
        if(error){
            Url.find({}).then((urls)=>{
                return res.render('index',{error,urls})
            })
        }
        else{
            createUrl(response)
        }
    })
    
    const createUrl = async (shortLink)=>{
        try{
            const url = new Url({fullUrl:req.body.fullUrl, shortUrl:shortLink});
            await url.save()
            return res.redirect('/')
        }
        catch(e){
            res.status(400).send(e)
        }
    }

});

app.get('/', async (req, res)=>{
    const urls = await Url.find({})
    if(urls){
        res.render('index', {urls})
    }
})

app.post('/increment-clicks', async (req, res)=>{

    try{
        const url = await Url.findById({_id:req.body.id})
        url.click = url.click + 1
        await url.save()

        return res.redirect('/')
    }catch(e){
        return res.status(400).send()
    }
})

app.listen(port, ()=>{
    console.log('server is up on port '+port)
})
