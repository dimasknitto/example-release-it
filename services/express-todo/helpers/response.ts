import { Response } from "express";

const MessageCode = {
    "Success": 200,
    "Created": 201,
    "Accept": 202,
    "No Content": 204,
    "Bad Request": 400,
    "Unauthorized": 401,
    "Payemnt Req": 402,
    "Forbidden": 403,
    "Not Found": 404,
    "Method not Allowed": 405,
    "Server Error": 500,
}

type status = 'Success' | 'Created' | 'Accept' | 'No Content' | 'Bad Request' | 'Unauthorized' | 'Payemnt Req' | 'Forbidden' | 'Not Found' | 'Method not Allowed' | 'Server Error'
    /**
     * Response API helper
     *
     * Note Http code status
     * - 200 : Success [‘GET’]
     * - 201 : Created [‘POST’, ‘PUT’, ‘PATCH’]
     * - 202 : Accept [‘POST’, ‘PUT’, ‘PATCH’]
     * - 204 : No Content
     * - 400 : Bad Request
     * - 401 : Unauthorized
     * - 402 : Payemnt Req
     * - 403 : Forbidden
     * - 404 : Not Found
     * - 405 : Method not Allowed
     * - 500 : Server Error
     */
const responseData = (status: status, data: any, res: Response) => {
    return res.status(MessageCode[status] || 200).send({
        message: status,
        time: Math.floor(new Date().getTime() / 1000),
        result: data
    })

}

export { responseData }