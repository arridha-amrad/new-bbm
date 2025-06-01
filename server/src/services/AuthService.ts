import RefreshTokenRepository from "@/repositories/RefreshTokenRepository";
import { v4 } from "uuid";
import TokenService from "./TokenService";
import ActiveTokenRepository from "@/repositories/ActiveTokenRepository";
import { setExpiryDate } from "@/utils";

type TGenAuthToken = {
  userId: number;
  jwtVersion: string;
  oldToken?: string;
  deviceId?: string;
};

export default class AuthService {
  constructor(
    private refTokenRepo = new RefreshTokenRepository(),
    private tokenService = new TokenService(),
    private activeTokenRepo = new ActiveTokenRepository()
  ) { }

  async clearAuthSession(refreshToken: string) {
    const hashedCrt = await this.tokenService.hashRandomBytes(refreshToken);
    await this.refTokenRepo.deleteOne(hashedCrt);
  }

  async hasTokenBlackListed(jti: string) {
    const result = await this.activeTokenRepo.findOne({ jti });
    return !result;
  }

  async blackListToken(deviceId: string) {
    await this.activeTokenRepo.deleteMany(deviceId);
  }

  async getRefreshToken(rawToken: string) {
    const hashedToken = await this.tokenService.hashRandomBytes(rawToken);
    const storedToken = await this.refTokenRepo.findOne({
      token: hashedToken,
    });
    return storedToken;
  }

  async generateAuthToken(data: TGenAuthToken) {
    const { jwtVersion, userId, oldToken, deviceId: currDeviceId } = data;
    if (oldToken) {
      await this.refTokenRepo.deleteOne(oldToken);
    }

    let deviceId: string;
    if (currDeviceId) {
      deviceId = currDeviceId;
      await this.activeTokenRepo.deleteMany(deviceId);
    } else {
      deviceId = v4();
    }

    const jti = v4();

    const accessToken = await this.tokenService.createJwt({
      id: userId,
      jwtVersion,
      jti,
    });

    await this.activeTokenRepo.createOne({
      deviceId,
      expiresAt: setExpiryDate(16, "minutes"),
      jti,
      user: { connect: { id: userId } },
    });

    const { hashedToken, rawToken } = await this.tokenService.createPairToken();

    await this.refTokenRepo.createOne({
      deviceId,
      expiresAt: setExpiryDate(7, "days"),
      token: hashedToken,
      user: { connect: { id: userId } },
    });

    return {
      hashedRefreshToken: hashedToken,
      rawRefreshToken: rawToken,
      accessToken,
    };
  }
}
