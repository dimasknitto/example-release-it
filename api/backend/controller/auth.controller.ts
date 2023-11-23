import { Request, Response } from "express"
import { AppDataSource } from "../config/configDatabase"
import { User } from "../entity/user.entity"
import { responseData } from "../helpers/response"
import bcryptjs from 'bcryptjs'
import { createCredential } from "../middleware/auth.middleware"


const UserRepository = AppDataSource.getRepository(User)
async function login(req: Request, res: Response) {
    const { username, password } = req.body

    const user = await UserRepository.findOne({
        where: {username}
    })


    if (!user) return responseData('Not Found', 'user not found', res)


    if (user) {
        let passwordValid = bcryptjs.compareSync(password, user.password)
        if (!passwordValid) return responseData('Unauthorized', null, res)
        return createCredential(user, res)
    } else {
        return responseData('Unauthorized', null, res)
    }

}

async function authorization(req: Request, res: Response) {
    const {uuid} = req.params

    const user = await UserRepository.findOne({
        where: {uuid}
    })

    if (user) {
        return createCredential(user, res)
    }else{
        return responseData('Not Found', 'User Not Found', res)
    }
}

export { login, authorization }