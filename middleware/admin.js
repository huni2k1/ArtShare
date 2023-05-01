const jwt = require('jsonwebtoken');
const User = require('../models/user')

function verifyAdmin(req, res) {
    const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header
    if (!token) {
        return res.status(401).send('Unauthorized: No token provided');
    }
    try {
        const { id } = jwt.verify(token, '123');
        User.findById(id, (err, user) => {
            
            if (err) {
                console.error(err);
            } else {
                if (user && user.admin) {
                    return res.status(200).send('Authorized')
                }
                else{
                    return res.status(401).send('Unauthorized: Invalid token');
                }
            }
        });
    } catch (err) {
        console.log(err)
        return res.status(401).send('Unauthorized: Invalid token');
    }
}
module.exports = verifyAdmin