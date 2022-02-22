import { CharacterService } from '@/application/services/character.service';
import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('character')
@ApiBearerAuth()
@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {
    //
  }

  @ApiResponse({
    description: 'Return users by filter and paginates it, and its total count',
    status: HttpStatus.OK,
  })
  @Get()
  async getAll(
    @Res() response: Response,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('gender') gender?: string,
  ): Promise<Response> {
    try {
      const result = await this.characterService.getAll(page, limit, gender);
      return response.status(HttpStatus.OK).json({ ...result });
    } catch (e) {
      return response.status(HttpStatus.BAD_REQUEST).send(e);
    }
  }

  @ApiResponse({
    description: 'Return users by filter and paginates it, and its total count',
    status: HttpStatus.OK,
  })
  @Get('multiple/:ids')
  async getMultipleCharacters(
    @Res() response: Response,
    @Param('ids') ids: number[],
  ): Promise<Response> {
    try {
      const result = await this.characterService.getMultiples(ids);
      return response.status(HttpStatus.OK).json({ ...result });
    } catch (e) {
      return response.status(HttpStatus.BAD_REQUEST).send(e);
    }
  }

  @ApiResponse({
    description: 'Return users by filter and paginates it, and its total count',
    status: HttpStatus.OK,
  })
  @Get(':id/episodes')
  async getCharacterEpisode(
    @Res() response: Response,
    @Param('id') id: number
  ): Promise<Response> {
    try {
      const result = await this.characterService.getCharacterEpisodes(id);
      return response.status(HttpStatus.OK).json({ episodes: result });
    } catch (e) {
      return response.status(HttpStatus.BAD_REQUEST).send(e);
    }
  }
}
