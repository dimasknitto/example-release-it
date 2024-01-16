import amqlib, { Channel, Connection, MessagePropertyHeaders } from 'amqplib'
import config from '../env.config'
let connection: Connection, channel: Channel
const exchangeName = 'todoTopic'

async function configRabbit() {
    try {
        connection = await amqlib.connect(config.AMQ_ADDRESS)
        channel = await connection.createChannel()
        await channel.assertExchange(exchangeName, 'topic', { durable: true });
        console.info('RabbitMQ Producer Conneted')
    } catch (error) {
        console.log(error);
    }
}

async function publishMessage(message: string, routing: string, headers?: MessagePropertyHeaders) {
    channel.publish(exchangeName, routing, Buffer.from(message), {
        headers,
        persistent: true
    })
}


export { configRabbit, publishMessage }