import { Queue } from "bullmq";

const REDIS_URL = process.env.REDIS_URL || "";

// Parse Redis URL for connection options
const redisConnection = {
  url: REDIS_URL,
};

// Create OTP Queue
export const otpQueue = new Queue("otp-queue", {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3, // Retry 3 times if failed
    backoff: {
      type: "exponential",
      delay: 2000, // Start with 2 seconds delay
    },
    removeOnComplete: true, // Clean up after success
    removeOnFail: false, // Keep failed jobs for debugging
  },
});

console.log("OTP Queue initialized");