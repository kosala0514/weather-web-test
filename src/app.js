const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()
//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,"../templates/partials")

//setup handlbars engine and views locatoin
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to server
app.use(express.static(publicDirectoryPath))



// app.get('', (req, res) => {
//     // res.send('Hello express!')

//     //Send HTML
//     res.send('<h1>Weather</h1>')
// })


// app.get('/help',(req, res) =>{
//     // res.send('Help Page')

//     //send JSON - object
//     // res.send({
//     //     name : "Kosala",
//     //     age : 25
//     // })

//     //send array objects
//     res.send([{
//         name : "Kosala"},{
//         name : "Charuni"
//     }])
// })

// app.get('/about',(req, res) =>{
//     res.send('<h1>About</h1>')
// })

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about',(req,res) => {
    res.render(
        'about',
        {
            title : 'About Me',
            name : "Andrew Mead"
        }
    )
})

app.get('/help', (req, res) => {
    res.render(
        'help',
        {
            msg : "Help me to solve ....",
            title : "Help",
            name : "Kosala"
        }
    )
})

app.get('/weather',(req, res) =>{
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}) =>{
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude,(error, forecastData) =>{
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     forecast : "It is rainy day",
    //     location : "Rathnapura",
    //     address: req.query.address,
    // })
}) 

// app.get('/products',(req, res) =>{
//     if (!req.query.search) {
//         res.send({
//             error: "You must provide search term."
//         }) 
//     }
//     console.log(req.query.seaarch);
//     res.send({
//         products:[]
//     })
// })

app.get('/help/*',(req, res) =>{
    // res.send("Help article not found")
    res.render('404',{
        title: '404',
        name : 'Kosala',
        errorMessage : 'Help article not fond...'
    })
})
// app.com
// app.com/home etc...

// why is last - uda thiyana ewat galapenne nathi ewa thibboth wenna ona ned thama methanin kiyanne
app.get('*', (req, res) => {
    // res.send("My 404 page")
    res.render('404', {
        title : '404',
        name : "Andrew mead",
        errorMessage : "Page not fount"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})