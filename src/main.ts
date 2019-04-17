import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createConnection } from 'typeorm';
import { TodoEntity } from './entity/Todo.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  await createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'test',
    database: 'todo',
    synchronize: true,
    supportBigNumbers: true,
    dateStrings: true,
    entities: [
      TodoEntity,
    ]
  });

  await app.listen(3000);
}
bootstrap();
