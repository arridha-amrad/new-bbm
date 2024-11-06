import { Options } from "@node-rs/argon2";

export const options = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
} satisfies Options;
