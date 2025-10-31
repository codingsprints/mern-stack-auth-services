import crypto from 'crypto';
import fs from 'fs';

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048, // key strength
  publicKeyEncoding: {
    type: 'pkcs1',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs1',
    format: 'pem',
  },
});

console.log('Private Key:', privateKey);
console.log('Public Key:', publicKey);

// Save keys in certs folder
fs.writeFileSync('certs/private.pem', privateKey);
fs.writeFileSync('certs/public.pem', publicKey);

console.log('✅ RSA Key pair generated successfully.');
