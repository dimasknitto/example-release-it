import amqlib, { Channel, Connection } from 'amqplib'
import { User } from '../entity/user.entity'
import { Todo } from '../entity/todo.entity'
import { createOrUpdateUser, deleteUser } from '../services/user.services'
import { createOrUpdateTodo, deleteTodo } from '../services/todo.services'
import config from '../env.config'
let connection: Connection, channel: Channel
const exchangeName = 'todoTopic'
const queueNameTodo = 'queueTodo'
const queueNameTodoUser = 'queueTodoUser'


async function configRabbit() {
    try {
        connection = await amqlib.connect(config.AMQ_ADDRESS)
        channel = await connection.createChannel()
        await channel.assertExchange(exchangeName, 'topic', { durable: true });
        await channel.assertQueue(queueNameTodo, { durable: true });
        await channel.assertQueue(queueNameTodoUser, { durable: true });
        channel.prefetch(2)
        consumeTodo()
        consumeUser()
        console.log(`express-todo now subscribe....`);
    } catch (error) {
        console.log(error);
    }
}


function consumeTodo() {
    channel.bindQueue(queueNameTodo, exchangeName, 'todo.*');
    channel.consume(queueNameTodo, (message) => {
        if (message) {
            const status = message.properties.headers['status']
            if (status === 'delete') {
                const uuid = JSON.parse(message.content.toString()).uuid
                deleteTodo(uuid)
                    .then(() => channel.ack(message))
                    .catch(() => {
                        channel.ack(message);
                        channel.sendToQueue(queueNameTodoUser, message.content, message.properties)
                    })
            } else {
                const Todos = JSON.parse(message.content.toString()) as Todo
                createOrUpdateTodo(Todos)
                    .then(() => channel.ack(message))
                    .catch(() => {
                        channel.ack(message);
                        channel.sendToQueue(queueNameTodoUser, message.content, message.properties)
                    })
            }
        }
    })
}

function consumeUser() {
    channel.bindQueue(queueNameTodoUser, exchangeName, 'user.*');
    channel.consume(queueNameTodoUser, (message) => {
        if (message) {
            const status = message.properties.headers['status']
            if (status === 'delete') {
                const uuid = JSON.parse(message.content.toString()).uuid
                deleteUser(uuid)
                    .then(() => channel.ack(message))
                    .catch(() => {
                        channel.ack(message);
                        channel.sendToQueue(queueNameTodoUser, message.content, message.properties)
                    })
            } else {
                const Users = JSON.parse(message.content.toString()) as User
                createOrUpdateUser(Users)
                    .then(() => channel.ack(message))
                    .catch(() => {
                        channel.ack(message);
                        channel.sendToQueue(queueNameTodoUser, message.content, message.properties)
                    })
            }
        }
    })
}
export default configRabbit