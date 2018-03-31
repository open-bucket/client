const crypto = require('crypto');

// Nodejs support openssl algorithm
const CIPHER_ALGORITHM = 'aes256';

const encrypt = (password, inputStream) => {
  const cipher = crypto.createCipher(CIPHER_ALGORITHM, password);
  const encryptedStream = inputStream.pipe(cipher);
  return encryptedStream;
};

exports.encrypt = encrypt;
