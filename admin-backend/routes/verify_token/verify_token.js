//Author: Shivani
const JWT = require('jsonwebtoken')

module.exports =
  (req, res, next) => {
    if (!req.headers['authorization']) { return res.json({ status: 'failure', message: "No authorization header found." }) }
    const authHeader = req.headers['authorization']
    const bearerToken = authHeader.split(' ')
    const token = bearerToken[1]
    JWT.verify(token, process.env.TOKEN_SECRET, (err, data) => {
      if (err) {
        return res.json({ status: 'failure', message: "Token verification Failed." })
      }
      req.user = data
      next()
    })
  }