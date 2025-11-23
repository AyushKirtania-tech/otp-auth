import Redis from "ioredis";

const REDIS_URL = process.env.REDIS_URL || "";

export const redis = new Redis(REDIS_URL);

// Status check: Log connection status

redis.on("connect", () => {
  console.log("Redis connected!!!");
});

redis.on("error", (err) => {
  console.log("Redis error: ", err);
});


