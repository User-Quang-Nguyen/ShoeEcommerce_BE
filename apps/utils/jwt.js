const jwt = require('jsonwebtoken');

function generateToken(id, name, role) {
    const payload = {
        id: id,
        name: name,
        role: role
    };
    const options = {
        expiresIn: '200h'
    };
    return jwt.sign(payload, 'dev');
}

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, 'dev', (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
}

function getUserId(token){
    verifyToken(token)
        .then(result => {
            return result.id;
        })
        .catch(err => {
            return new Error("Xác thực thất bại");
        })
}

module.exports = {
    generateToken,
    verifyToken,
    getUserId,
};
