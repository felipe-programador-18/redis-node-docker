
const express= require("express")
const api = express()
const redis = require("redis")
const client = redis.createClient()

// const port= 3000

client.set('visits', 0)

api.get('/', (req, res) => {    
    // put together something new with redis
    client.get('visits', (err,visits) =>{
        res.send("the numbers of visits here is ", visits) 
        
        client.set('clients', parseInt(client+1))
    })

})


api.listen(8081, () => {
   console.log(`connected here now ${8081}`)
})
