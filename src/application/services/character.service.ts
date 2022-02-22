import { HttpService } from '@nestjs/axios';

import { Injectable } from '@nestjs/common';
import { info } from 'console';

@Injectable()
export class CharacterService {
  constructor(private readonly httpService: HttpService) {
    //
  }

  async getAll(page = 1, limit = 5, gender?: string): Promise<any> {
    const { data } = await this.httpService
      .get(`https://rickandmortyapi.com/api/character/?page=1`)
      .toPromise();

    const requestResults = data.results.filter( character => character.gender === gender )

    const total = requestResults.length;
    const pages = Math.ceil(total / limit);
    const initialPosition = (page - 1) * limit
    const finalPosition = page * limit

    const responseData = {
      ...data,
      info: {
        count: total,
        pages,
      },
      results: requestResults.slice(initialPosition, finalPosition)
    };

    return responseData;
  }


  async getMultiples(ids: number[]): Promise<any> {
    const { data } = await this.httpService
      .get(`https://rickandmortyapi.com/api/character/${ids.toString()}`)
      .toPromise();

    return data;
  }

  async getCharacterEpisodes(id: number): Promise<any> {
    const { data } = await this.httpService
      .get(`https://rickandmortyapi.com/api/character/${id}`)
      .toPromise();
    console.log(data)

    return data.episode;
  }
}
