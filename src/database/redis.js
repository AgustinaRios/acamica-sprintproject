const redis = require("redis");
let redisClient;

  try {
    redisClient = redis.createClient({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      db: 0
    }); 

    redisClient.on("error", function (error) {
      console.error(error);
    });
    console.log('Redis Connected');
  } catch (error) {
    console.error("Error de acceso a Redis" + error);
  }

  module.exports = redisClient;