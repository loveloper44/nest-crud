import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';
import { TodoEntity } from 'src/entity/Todo.entity';

@Injectable()
export class TodoModel {

    async getAll(): Promise<TodoEntity[]> {
        const repository = getManager().getRepository(TodoEntity);
        return await repository.find({});

    }

    async get(id: string): Promise<TodoEntity> {
        const repository = getManager().getRepository(TodoEntity);
        return await repository.findOne(id);
    }

    async add(id: string, content: string) {
        const repository = getManager().getRepository(TodoEntity);

        const entity: TodoEntity = new TodoEntity();
        entity.id = id;
        entity.content = content;
        entity.createdAt = new Date();
        entity.updatedAt = new Date();
        entity.isDone = false;

        await repository.save(entity);

    }

    async update(entity: TodoEntity) {
        const repository = getManager().getRepository(TodoEntity);
        await repository.save(entity);
    }

    async delete(entity: TodoEntity) {
        const repository = getManager().getRepository(TodoEntity);
        await repository.delete(entity);
    }

}
