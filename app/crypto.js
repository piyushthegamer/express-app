const crypto = require('crypto');

let encryptPassword = (input) => {
    return new Promise((resolve,reject)=>{
        crypto.pbkdf2(input, 'salt', 100000, 64, 'sha256', (err, derivedKey) => {
            if (err) reject(err);
            else resolve(derivedKey.toString('hex')); 
          });
    });
}

exports.encryptPassword=encryptPassword


