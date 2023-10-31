const { v4: uuid } = require('uuid');
const crypto = require('crypto');


const salt = uuid();
console.log("Generated Salt:", salt); 

const passwordToHash = `admin${salt}`;
const hashedPassword = crypto.createHash('sha256').update(passwordToHash).digest('hex');
console.log("Hashed Password:", hashedPassword);  
