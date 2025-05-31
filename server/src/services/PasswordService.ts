import { hash as hp, Options, verify as vr } from "@node-rs/argon2";

export default class PasswordService {
  private options = {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  } satisfies Options;

  async hash(plainPassword: string) {
    return hp(plainPassword, this.options);
  }

  async verify(hashedPassword: string, plainPassword: string) {
    return vr(hashedPassword, plainPassword, this.options);
  }
}
