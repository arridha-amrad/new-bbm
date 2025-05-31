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
  ) {}

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
      id: userId.toString(),
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
