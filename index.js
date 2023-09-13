
const express= require("express")
const api = express()
const redis = require("redis")


// remind i have to always define my port to connect together with docker
const client = redis.createClient({
   host:'redis-server',
   port:6379
})

await client.connect()

client.set('visits', 0)

api.get('/', (req, res) => {    
    // put together something new with redis
    client.get('visits', (err,visits) =>{
        res.send("the numbers of visits here is ", visits)  
        client.set('clients', parseInt(client+1))
    })

})


api.listen(4001, () => {
   console.log('connect here now 8081')
})
