import { AppDataSource } from "../config/configDatabase";
import { User } from "../entity/user.entity";
import bcrypt from 'bcryptjs'

const UserRepository = AppDataSource.getRepository(User)

async function createOrUpdateUser(user: User,) {
    const { name, gender, password, username, uuid } = user

    try {
        const userCreate = UserRepository.create({
            name,
            gender,
            password: bcrypt.hashSync(password, 8),
            username,
            uuid,
        })
        return await UserRepository.save(userCreate)
    } catch (error) {
        throw error
    }
}


async function deleteUser(uuid: string) {
    try {
        const user = await UserRepository.findOne({
            where: { uuid }
        })
        if (user) {
            return UserRepository.delete(uuid)
        } else {
            return true
        }
    } catch (error) {
         throw error
    }


}

export { createOrUpdateUser, deleteUser }