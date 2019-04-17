import * as uuid from 'uuid';
import { Controller, Get, Post, Body, Put, Delete, NotFoundException, Param } from '@nestjs/common';
import { TodoModel } from 'src/model/Todo.model';
import { TodoEntity } from 'src/entity/Todo.entity';

@Controller('todos')
export class TodoController {

    constructor(private todoModel: TodoModel) { }

    @Get()
    async selectAll() {
        const entities: TodoEntity[] = await this.todoModel.getAll();

        return {
            message: 'selectedAll',
            result: entities.map(entity => {
                return {
                    id: entity.id,
                    content: entity.content,
                    isDone: entity.isDone,
                    createdAt: entity.createdAt,
                    updatedAt: entity.updatedAt,
                };
            }),
        };
    }

    @Get(':id')
    async select(@Param('id') id: string) {
        const entity: TodoEntity = await this.todoModel.get(id);

        if (!entity) {
            throw new NotFoundException('Todo is not found');
        }

        return {
            message: 'selected',
            result: {
                id: entity.id,
                content: entity.content,
                isDone: entity.isDone,
                createdAt: entity.createdAt,
                updatedAt: entity.updatedAt,
            },
        };
    }

    @Post()
    async create(@Body('content') content: string) {
        const id = uuid.v1();

        await this.todoModel.add(id, content);

        const entity: TodoEntity = await this.todoModel.get(id);

        return {
            message: 'created',
            result: {
                id: entity.id,
                content: entity.content,
                isDone: entity.isDone,
                createdAt: entity.createdAt,
                updatedAt: entity.updatedAt,
            },
        };
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body('content') content: string,
        @Body('isDone') isDone: string,
    ) {

        const entity: TodoEntity = await this.todoModel.get(id);

        if (!entity) {
            throw new NotFoundException('Todo is not found');
        }

        entity.content = content;
        entity.isDone = isDone === 'true' ? true : false;

        await this.todoModel.update(entity);

        return {
            message: 'updated',
            result: {
                id: entity.id,
                content: entity.content,
                isDone: entity.isDone,
                createdAt: entity.createdAt,
                updatedAt: entity.updatedAt,
            },
        };
    }

    @Delete(':id')
    async delete(
        @Param('id') id: string,
    ) {

        const entity: TodoEntity = await this.todoModel.get(id);

        if (!entity) {
            throw new NotFoundException('Todo is not found');
        }

        await this.todoModel.delete(entity);

        return {
            message: 'deleted',
        };
    }

}
