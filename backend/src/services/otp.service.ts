import { redis } from "../config/redis";
import { generateOtp } from "../utils/generateOtp";

const OTP_EXPIRY = 300; // 5 minutes

// Function to generate and store the otp in redis...
export async function sendOtp(phone: string) {
  const otp = generateOtp();

  // Save OTP to Redis
  await redis.set(`otp:${phone}`, otp, "EX", OTP_EXPIRY);

  // TODO: Publish to queue -> worker will send SMS
  // await queue.publish("SEND_OTP", { phone, otp });

  return { phone, otp };
}

// Function to verify the otp from redis..
export async function verifyOtp(phone: string, enteredOtp: string) {
  const storedOtp = await redis.get(`otp:${phone}`);

  if (!storedOtp) return { success: false, message: "OTP expired" };

  if (storedOtp !== enteredOtp)
    return { success: false, message: "Invalid OTP" };

  // OTP is valid -> delete OTP key
  await redis.del(`otp:${phone}`);

  return { success: true, message: "OTP verified" };
}
