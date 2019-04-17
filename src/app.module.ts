import { Module } from "@nestjs/common";
import { TodoController } from "./controller/Todo.controller";
import { TodoModel } from "./model/Todo.model";

@Module({
    controllers: [
        TodoController,
    ],
    providers: [
        TodoModel
    ]
})
export class AppModule {

}