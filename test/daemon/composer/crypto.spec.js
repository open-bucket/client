const MemoryStream = require('memorystream');
const { createCipher, createDecipher } = require('../../../app/daemon/composer/crypto');

describe('encrypt', () => {
  let stream;
  beforeEach(() => {
    stream = new MemoryStream([]);
  });

  it('should create encrypted data', (done) => {
    const encrypt = createCipher('Abcd1234');
    stream.pipe(encrypt);
    let data;
    stream.on('data', (chunk) => {
      data = chunk;
    });
    stream.on('end', () => {
      expect(data).not.toBeNull();
      done();
    });
    stream.end('The quick brown fox jumps over the lazy dog');
  }, 5000);

  it('should create decrypted data', (done) => {
    const encrypt = createCipher('Abcd1234');
    const decrypt = createDecipher('Abcd1234');
    const message = 'The quick brown fox jumps over the lazy dog';

    stream.pipe(encrypt).pipe(decrypt);
    let data;
    stream.on('data', (chunk) => {
      data = chunk.toString();
    });
    stream.on('end', () => {
      expect(data).toEqual(message);
      done();
    });
    stream.end(message);
  }, 5000);
});
