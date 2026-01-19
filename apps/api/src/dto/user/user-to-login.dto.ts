import { IsNotEmpty, IsString } from "class-validator";

export default class UserToLogin {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
