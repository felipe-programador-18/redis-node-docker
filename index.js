const express = require("express");
const redis = require("redis");

const ManageCreate = redis.createClient;
const client = ManageCreate();

const api = express();

client.get('visits', async (err, visits) => {
  if (err) {
    console.error("Error retrieving visits:", err);
    return;
  }

  // If 'visits' key doesn't exist, set it to 0
  if (visits === null) {
    visits = 0;
    await client.set('visits', visits);
  }

  api.get('/', async (req, res) => {
    // Increment visits and set it again
    visits = parseInt(visits) + 1;
    await client.set('visits', visits);

    res.send(`The number of visits here is ${visits}`);
  });

  api.listen(4001, () => {
    console.log('Server is running on port 4001');
  });
});

// Handle Redis connection errors
client.on('error', (err) => {
  console.error(`Redis error: ${err}`);
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
  await client.quit();
  process.exit();
});