import { Inject, Injectable } from '@nestjs/common'
import { Client } from 'pg'

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[],
    @Inject('DATABASE') private dbClient: Client,
  ) {}

  getHello(): string {
    console.log(this.tasks)
    return `Hello World ${this.apiKey}!`
  }

  async getTasks() {
    const { rows } = await this.dbClient.query('SELECT * FROM tasks')
    return rows
  }

  async getTasksORM() {
    const { rows } = await this.dbClient.query('SELECT * FROM tasks')
    return rows
  }
}
