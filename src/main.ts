import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');
require('dotenv').config();

const port = process.env.PORT || 3002;
const sessionKey = process.env.SESSION_KEY;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cookieSession({
      name: 'cl-ds-session',
      keys: [sessionKey],
      httpOnly: false,
    }),
  );
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://cl-ds.up.railway.app',
      'https://rozliczenia.vercel.app',
    ],
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(port);
}
bootstrap();
