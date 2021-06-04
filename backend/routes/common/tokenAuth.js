const JWT = require('jsonwebtoken')

module.exports = {
    verifyToken: (req,res,next) =>{
        if(!req.headers['authorization']) return next(res.status(401))
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]
        JWT.verify(token,process.env.TOKEN_SECRET,(err,data) =>{
            if (err) {
                return next(err)
            }
            req.user = data 
            next()
        })
    }
}