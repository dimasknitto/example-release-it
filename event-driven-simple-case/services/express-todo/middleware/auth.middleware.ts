import { NextFunction, Request, Response } from "express";
import { User } from "../entity/user.entity";
import jwt from "jsonwebtoken"
import { responseData } from "../helpers/response";
import { AppDataSource } from "../config/configDatabase";
const UserRepository = AppDataSource.getRepository(User)


function createCredential(user: User, res: Response) {
    const { uuid, name, username } = user
    try {
        let token = jwt.sign({ uuid, name, username }, process.env.SECRET_KEY || 'knitto', { expiresIn: '7d' })
        return responseData('Accept', { user, token }, res)
    } catch (error) {
        return responseData('Forbidden', null, res)
    }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    let tokenHeader = req.headers["authorization"];

    let token: any = tokenHeader?.split(" ");
    if (token === undefined) return responseData('Bad Request', "Error token null", res)

    if (token?.length < 2) return responseData('Bad Request', "Error token length", res)
    if (token[0] !== "Bearer")
        return responseData('Bad Request', "Error Token Format", res)
    if (!token[1])
        return responseData('Bad Request', "Error Token Format Body", res)


    jwt.verify(token[1], process.env.SECRET_KEY || 'knitto', async (err: any, decoded: any) => {
        if (err) return responseData('Unauthorized', 'Token Expired', res)
        req.params.authId = decoded.uuid

        const user = await UserRepository.findOne({
            where: {
                uuid: decoded.uuid,
            }
        })

        if (user) {
            console.log({
                username: user.username,
                name: user.name,
                path: req.path,
                query: req.query,
                data: req.body,
            });
            return next()
        } else {
            return responseData('Not Found', 'User not found', res)
        }
    });

}



export { createCredential, verifyToken }