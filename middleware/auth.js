const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header
    if (!token) {
      return res.status(401).send('Unauthorized: No token provided');
    }

    try {
      const decoded = jwt.verify(token, '123');
      return res.status(200).send("OK")
    } catch (err) {
      return res.status(401).send('Unauthorized: Invalid token');
    }
}
module.exports = verifyToken