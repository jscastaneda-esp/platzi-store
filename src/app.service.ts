import { Inject, Injectable } from '@nestjs/common'
import { Db } from 'mongodb'

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[],
    @Inject('DB_CLIENT') private db: Db,
  ) {}

  getHello(): string {
    console.log(this.tasks)
    return `Hello World ${this.apiKey}!`
  }

  getTasks() {
    const tasksCollection = this.db.collection('tasks')
    return tasksCollection.find().toArray()
  }
}
