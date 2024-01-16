import { Request } from "express"

const paginateVariabel = (req: Request) => {
    const query = req.query
    let queryOffset = query.page
    let queryLimit = query.limit

    let limit = 10
    if (queryLimit !== undefined) {
        limit = parseInt(queryLimit.toString())
    }

    let offset = 0
    if (queryOffset !== undefined) {
        offset = parseInt(queryOffset.toString())
        offset = (offset - 1) * limit
    }

    return { offset, limit }
}

export { paginateVariabel }
