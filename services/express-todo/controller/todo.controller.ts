import { Request, Response } from "express";
import { AppDataSource } from "../config/configDatabase";
import { Todo } from "../entity/todo.entity";
import { paginateVariabel } from "../helpers/paginate";
import { responseData } from "../helpers/response";


const TodoRepository = AppDataSource.getRepository(Todo)

async function getTodo(req: Request, res: Response) {
    const { limit, offset } = paginateVariabel(req)
    try {
        const todos = await TodoRepository.findAndCount({
            relations: {
                TodoDetail: true
            },
            select: {
                uuid: true,
                title: true,
                description: true,
                status: true,
                userUuid: true,
                TodoDetail: {
                    name: true,
                    username: true,
                }
            },
            skip: offset,
            take: limit,
        })

        return responseData('Success', {
            row: todos[0],
            total: todos[1],
            start: offset,
            totalPage: Math.ceil(todos[1] / limit)
        }, res)

    } catch (error) {
        return responseData('Bad Request', error, res)
    }
}

async function getOneTodo(req: Request, res: Response) {
    const uuid = req.params.uuid

    try {
        const todo = await TodoRepository.findOne({
            relations: {
                TodoDetail: true
            },
            select: {
                uuid: true,
                title: true,
                description: true,
                status: true,
                userUuid: true,
                TodoDetail: {
                    name: true,
                    username: true,
                }
            },
            where: { uuid }
        })
        if (todo) {
            return responseData('Success', todo, res)
        } else {
            return responseData('Not Found', null, res)
        }
    } catch (error) {
        return responseData('Bad Request', error, res)
    }
}

function createTodo(req: Request, res: Response) {
    const { title, description, status, userUuid, uuid } = req.body

    try {
        const todoCreate = TodoRepository.create({
            title,
            description,
            status,
            userUuid,
            uuid,
        })

        TodoRepository.save(todoCreate)
            .then((data) => {
                return responseData('Created', data, res)
            })
            .catch(err => {
                return responseData('Method not Allowed', err, res)
            })
    } catch (error) {
        return responseData('Bad Request', error, res)
    }
}

async function updateTodo(req: Request, res: Response) {
    const uuid = req.params.uuid
    const { title, description, status, userUuid } = req.body

    const todo = await TodoRepository.findOne({
        where: { uuid }
    })

    if (!todo) return responseData('Not Found', 'todo not found', res)

    TodoRepository.update({
        uuid
    }, {
        title: title ? title : todo.title,
        description: description ? description : todo.description,
        status: status ? status : todo.status,
        userUuid: userUuid ? userUuid : todo.userUuid
    })
        .then((data) => {
            return responseData('Accept', data, res)
        })
        .catch(err => {
            return responseData('Method not Allowed', err, res)
        })
}

async function deleteTodo(req: Request, res: Response) {
    const uuid = req.params.uuid

    const user = await TodoRepository.findOne({
        where: { uuid }
    })

    if (!user) return responseData('Not Found', 'user not found', res)


    TodoRepository.delete({ uuid })
        .then((data) => {
            return responseData('Accept', data, res)
        })
        .catch(err => {
            return responseData('Method not Allowed', err, res)
        })
}

export { getTodo, createTodo, getOneTodo, updateTodo, deleteTodo }