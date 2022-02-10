const request = require('request')

const forecast = (latitude, longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d1509439ead6b4784159273b6003ea2f&query='+ latitude +','+longtitude+'&units=f'

    request({url, json : true}, (error, {body}) => {
        if(error){
            callback("Unable to connect, check your connection!", undefined)
        } else if (body.error){
            callback('Unable to find your location!')
        }else{
            // callback(undefined,{
            //     description : response.body.current.weather_descriptions[0],
            //     temper : response.body.current.temperature,
            //     feelslike : response.body.current.feelslike
            // })
            callback(undefined, body.current.weather_descriptions[0]+'. It is currently ' + body.current.temperature + ' degrees out. Therer is a '+ body.current.feelslike  +'% degrees out.')
        }
    })
}

module.exports =  forecast