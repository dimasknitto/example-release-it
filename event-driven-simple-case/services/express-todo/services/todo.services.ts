import { AppDataSource } from "../config/configDatabase";
import { Todo } from "../entity/todo.entity";


const TodoRepository = AppDataSource.getRepository(Todo)


function createOrUpdateTodo(todo: Todo) {
    const { title, description, status, userUuid, uuid } = todo
    try {
        const todoCreate = TodoRepository.create({
            title,
            description,
            status,
            userUuid,
            uuid,
        })

        return TodoRepository.save(todoCreate)
    } catch (error) {
        throw error
    }
}

async function deleteTodo(uuid: string) {
    try {
        const todo = await TodoRepository.findOne({
            where: { uuid }
        })
        if (todo) {
            return TodoRepository.delete(uuid)
        } else {
            return true
        }
    } catch (error) {
         throw error
    }


}

export { createOrUpdateTodo, deleteTodo }