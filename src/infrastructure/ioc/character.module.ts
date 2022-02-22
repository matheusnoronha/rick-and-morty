import { Module } from '@nestjs/common';
import { CharacterController } from '@/presentation/controllers/character.controller';
import { HttpModule } from '@nestjs/axios';
import { CharacterService } from '../../application/services/character.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [CharacterController],
  providers: [CharacterService],
  exports: [CharacterService],
})
export class CharacterModule {}
