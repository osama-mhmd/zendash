import { IsNotEmpty, IsString, MinLength } from "class-validator";

export default class UserToCreate {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
