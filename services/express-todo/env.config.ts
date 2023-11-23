import 'dotenv/config'

export default {
    HOST_LOCAL_IP: process.env.HOST_LOCAL_IP ?? '',
    AMQ_ADDRESS: process.env.AMQ_ADDRESS ?? '',
}