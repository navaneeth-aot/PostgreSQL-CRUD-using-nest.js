import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { studentEntity } from '../models/post.entity';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { studentData } from '../models/postinterfaces';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(studentEntity)
    private readonly studentRepository: Repository<studentEntity>,
  ) {}

  createPost(feedPost: studentData) : Observable<studentData> | string | Record<string, any>  {
    return from(
      this.studentRepository
        .save(feedPost)
        .then((res) => res )
        .catch((err) => {
           return  new HttpException('DataBase Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }),
    );
  }

  findAllPosts(): Observable<studentData[]> | any {
    return from(
        this.studentRepository
        .find()
        .then((res) => res )
        .catch((err) => {
            return  new HttpException('Data Not Found', HttpStatus.FAILED_DEPENDENCY);
        })
        );
  }

  async UpdateStudent(id: number, Data : studentData) {
    const stud = await this.studentRepository.findOne({where: { Id: id }})
    if(stud) {
        await this.studentRepository.update(id,Data);
        const updated = await this.studentRepository.findOne({where: { Id: id }})
        return updated
    }
    return new HttpException('Data not Found', HttpStatus.EXPECTATION_FAILED);
  }

  async DeleteStudent(id : number) {
    const stud = await this.studentRepository.findOne({where: { Id: id }})
    if(stud) {
        await this.studentRepository.remove(stud);
        return stud;
    }
    return new HttpException('Data not Found', HttpStatus.EXPECTATION_FAILED);
  } 
  
}
