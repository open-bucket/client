const crypto = require('crypto');

// Nodejs support openssl algorithm
const CIPHER_ALGORITHM = 'aes256'; // aes256 is aes256-cbc

const createCipher = (password) => {
  const cipher = crypto.createCipher(CIPHER_ALGORITHM, password);
  return cipher;
};

exports.createCipher = createCipher;

const createDecipher = (password) => {
  const cipher = crypto.createDecipher(CIPHER_ALGORITHM, password);
  return cipher;
};

exports.createDecipher = createDecipher;
