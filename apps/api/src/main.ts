import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import cookieParser from "cookie-parser";
import { Request } from "express";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors(
    (
      req: Request,
      callback: (error: null | Error, options: CorsOptions) => void,
    ) => {
      const origin = req.header("Origin");

      if (origin == process.env.FRONTEND_URL) {
        callback(null, {
          origin,
          credentials: true,
        });
      } else {
        callback(null, {
          origin: "*",
          credentials: false,
        });
      }
    },
  );

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
