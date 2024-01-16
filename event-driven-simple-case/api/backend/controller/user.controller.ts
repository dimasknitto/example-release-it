import { Request, Response } from "express";
import { AppDataSource } from "../config/configDatabase";
import { User } from "../entity/user.entity";
import { responseData } from "../helpers/response";
import { paginateVariabel } from "../helpers/paginate";
import bcrypt from 'bcryptjs'
import { publishMessage } from "../config/configRabbit";

const UserRepository = AppDataSource.getRepository(User)

async function getUser(req: Request, res: Response) {
    const { limit, offset } = paginateVariabel(req)
    try {
        const users = await UserRepository.findAndCount({
            select: {
                uuid: true,
                name: true,
                username: true,
                gender: true,
                userTodo: true
            },
            skip: offset,
            take: limit,
        })

        return responseData('Success', {
            row: users[0],
            total: users[1],
            start: offset,
            totalPage: Math.ceil(users[1] / limit)
        }, res)

    } catch (error) {
        return responseData('Bad Request', error, res)
    }
}

async function getOneUser(req: Request, res: Response) {
    const uuid = req.params.uuid

    try {
        const users = await UserRepository.findOne({
            select: {
                uuid: true,
                name: true,
                username: true,
                gender: true,
                userTodo: true
            },
            where: { uuid }
        })
        if (users) {
            return responseData('Success', users, res)
        } else {
            return responseData('Not Found', null, res)
        }
    } catch (error) {
        return responseData('Bad Request', error, res)
    }
}

async function createUser(req: Request, res: Response) {
    const { name, gender, password, username } = req.body

    try {
        const userCreate = UserRepository.create({
            name,
            gender,
            password: bcrypt.hashSync(password, 8),
            username,
        })

        UserRepository.save(userCreate)
            .then((data) => {
                publishMessage(JSON.stringify(data), 'user.created')
                return responseData('Created', { uuid: data.uuid }, res)
            })
            .catch(err => {
                return responseData('Method not Allowed', err, res)
            })
    } catch (error) {
        return responseData('Bad Request', error, res)
    }
}

async function updateUser(req: Request, res: Response) {
    const uuid = req.params.uuid
    const { name, gender, password, username } = req.body

    const user = await UserRepository.findOne({
        where: { uuid }
    })

    if (!user) return responseData('Not Found', 'user not found', res)

    UserRepository.update({
        uuid
    }, {
        name: name ? name : user.name,
        gender: gender ? gender : user.gender,
        password: password ? bcrypt.hashSync(password, 8) : user.password,
        username: username ? username : user.username,
    })
        .then((data) => {
            publishMessage(JSON.stringify({
                uuid,
                name: name ? name : user.name,
                gender: gender ? gender : user.gender,
                password: password ? bcrypt.hashSync(password, 8) : user.password,
                username: username ? username : user.username,
            }), 'user.update')
            return responseData('Accept', data, res)
        })
        .catch(err => {
            return responseData('Method not Allowed', err, res)
        })
}

async function deleteUser(req: Request, res: Response) {
    const uuid = req.params.uuid

    const user = await UserRepository.findOne({
        where: { uuid }
    })

    if (!user) return responseData('Not Found', 'user not found', res)


    UserRepository.delete({ uuid })
        .then((data) => {
            publishMessage(JSON.stringify({ uuid }), 'user.deleted', {
                status: 'delete'
            })
            return responseData('Accept', data, res)
        })
        .catch(err => {
            return responseData('Method not Allowed', err, res)
        })
}

export { getUser, getOneUser, createUser, updateUser, deleteUser }