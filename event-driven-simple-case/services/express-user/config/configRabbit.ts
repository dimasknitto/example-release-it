import amqlib, { Channel, Connection } from 'amqplib'
import { createOrUpdateUser, deleteUser } from '../services/user.services'
import config from '../env.config'

import { User } from '../entity/user.entity'
let connection: Connection, channel: Channel
const exchangeName = 'todoTopic'
const queueName = 'queueUser'

async function configRabbit() {
    try {
        connection = await amqlib.connect(config.AMQ_ADDRESS)
        channel = await connection.createChannel()
        await channel.assertExchange(exchangeName, 'topic', { durable: true });
        const { queue } = await channel.assertQueue(queueName, { durable: true });
        channel.prefetch(2)
        consumeUser(queue)
        console.log(`express-user now subscribe....`);
    } catch (error) {
        console.log(error);
    }
}


function consumeUser(queue: string) {
    channel.bindQueue(queue, exchangeName, 'user.*');
    channel.consume(queue, (message) => {
        if (message) {
            console.log(`Receive on Consume User: ${message.content.toString()}`)
            const status = message.properties.headers['status']
            if (status === 'delete') {
                const uuid = JSON.parse(message.content.toString()).uuid
                deleteUser(uuid)
                    .then(() => channel.ack(message))
                    .catch(() => {
                        channel.ack(message);
                        channel.sendToQueue(queueName, message.content, message.properties)
                    })
            } else {
                const Users = JSON.parse(message.content.toString()) as User
                createOrUpdateUser(Users)
                    .then(() => channel.ack(message))
                    .catch(() => {
                        channel.ack(message);
                        channel.sendToQueue(queueName, message.content, message.properties)
                    })
            }
        }
    })
}


export default configRabbit