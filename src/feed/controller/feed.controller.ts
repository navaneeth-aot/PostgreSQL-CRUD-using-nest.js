import { Controller,Post,Body,Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { studentData } from '../models/postinterfaces';
import { FeedService } from '../services/feed.service';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Delete, Param, Patch } from '@nestjs/common/decorators';

@Controller('feed')
export class FeedController {
  constructor(private feedServices: FeedService) {}

  @Post()
  create(
    @Body() post: studentData,
  ): Observable<studentData> | string | Record<string, any> {
    if (Object.keys(post).length !== 0 && post.constructor === Object) {
      return this.feedServices.createPost(post);
    }
    return new HttpException('Data not Valid', HttpStatus.BAD_REQUEST);
  }

  @Get()
  findAllPosts(): Observable<studentData[]> | any {
    return this.feedServices.findAllPosts();
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDto: any) {
    if (Object.keys(updateDto).length === 0 && updateDto.constructor === Object) {
        return new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    return this.feedServices.UpdateStudent(id, updateDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    if(id) {
      return this.feedServices.DeleteStudent(id);
    } else {
      return new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    
  }

}

