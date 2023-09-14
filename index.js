
const express= require("express")
const api = express()
//const redis = require("redis")

import { createClient } from "redis"



//const  client = createClient({host:'redis-server',port:6379})
// client.connect()


async function run() {
    const client = createClient();
  
    await client.connect();
  
    console.log(client.isOpen); // this is true
  
    await client.disconnect();
  }
  
  run();


  client.set('visits', 0)




//const client = createClient({host:'redis-server',port:6379});  
//client.
//connect()
//.then(() => {
//  console.log("connect here testing here now") 
//})


//client.set('visits', 0)

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
