import { JWT_VERSION_LENGTH } from "@/constants";
import UserRepository from "@/repositories/UserRepository";
import { generateRandomBytes } from "@/utils";
import PasswordService from "./PasswordService";

type TCreateUser = {
  email: string;
  username: string;
  password: string;
  imageURL: string;
};

type TGetOneUser = {
  id?: number;
  username?: string;
  email?: string;
};

export default class UserService {
  constructor(
    private userRepo = new UserRepository(),
    private pwdService = new PasswordService()
  ) {}

  async searchUsers(key: string) {
    const users = await this.userRepo.findMany(key);
    return users;
  }

  async updateUser(id: number, data: { username?: string; imageURL?: string }) {
    const updatedData = await this.userRepo.updateOne(id, data);
    return updatedData;
  }

  async checkEmailAndUsernameUniqueness(email: string, username: string) {
    const userWithSameEmail = await this.userRepo.findOne({ email });
    if (userWithSameEmail) {
      return {
        constraint: "email",
      };
    }
    const userWithSameUsername = await this.userRepo.findOne({ username });
    if (userWithSameUsername) {
      return {
        constraint: "username",
      };
    }
  }

  async getOneUser({ email, id, username }: TGetOneUser) {
    return this.userRepo.findOne({ id, email, username });
  }

  async addNewUser(data: TCreateUser) {
    const { email, username, password, imageURL } = data;
    const hashedPassword = await this.pwdService.hash(password);
    const newUser = await this.userRepo.createOne({
      username,
      email,
      password: hashedPassword,
      jwtVersion: generateRandomBytes(JWT_VERSION_LENGTH),
      imageURL,
    });
    return newUser;
  }

  setUserResponse(data: {
    id: number;
    username: string;
    email: string;
    password: string;
    imageURL: string | null;
    createdAt: Date;
    updatedAt: Date;
    jwtVersion: string;
  }) {
    return {
      id: data.id,
      username: data.username,
      email: data.email,
      imageURL: data.imageURL,
      createdAt: data.createdAt,
    };
  }
}
