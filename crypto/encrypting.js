const crypto = require('crypto');
const fs = require('fs');

// Using a function generateKeyFiles
function generateKeyFiles() {
  const keyPair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
      cipher: 'aes-256-cbc',
      passphrase: 'pass',
    },
  });

  // Creating private key file
  fs.writeFileSync('private_key', keyPair.privateKey);
}

// Generate keys
generateKeyFiles();

// Creating a function to encrypt string
function encryptString(plaintext, privateKeyFile) {
  const privateKey = fs.readFileSync(privateKeyFile, 'utf8');

  // privateEncrypt() method with its parameters
  const encrypted = crypto.publicEncrypt(
    {
      key: privateKey,
      passphrase: 'pass',
    },
    Buffer.from(plaintext),
  );

  return encrypted.toString('hex');
}

// DO NOT MODIY BELOW //

// Defining a text to be encrypted
const plainText = 'hello';

// Defining encrypted text
const encrypted = encryptString(plainText, './private_key');

// Prints plain text
console.log('Plaintext:', plainText);

// Prints encrypted text
console.log('Encrypted: ', encrypted);

const prvkeyStr = fs.readFileSync('./private_key', {
  encoding: 'utf8',
  flag: 'r',
});
const prvkey = crypto.createPrivateKey({
  key: prvkeyStr,
  format: 'pem',
  passphrase: 'pass',
});

let plaintext = crypto.privateDecrypt(
  {
    key: prvkey,
  },
  Buffer.from(encrypted, 'hex'),
);
console.log('decrypted: ', plaintext.toString());
