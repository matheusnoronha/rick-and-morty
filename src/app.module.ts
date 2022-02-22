import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CharacterModule } from './infrastructure/ioc/character.module';

@Module({
  imports: [
    CharacterModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
