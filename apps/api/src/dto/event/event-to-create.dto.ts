import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsString } from "class-validator";

export enum Env {
  PROD = "prod",
  DEV = "dev",
}

export enum Level {
  ERROR = "error",
  WARNING = "warning",
}

export default class EventToCreate {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(Level)
  level: Level;

  @IsNotEmpty()
  @IsEnum(Env)
  env: Env;

  @IsNotEmpty()
  @IsString()
  stack: string;

  @IsNotEmpty()
  @IsString()
  file: string;

  @IsString()
  platform: string;

  @IsString()
  browser: string;

  @IsString()
  source: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  occurredAt: Date;
}
