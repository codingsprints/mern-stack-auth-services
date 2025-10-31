import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import rsaPemToJwk from 'rsa-pem-to-jwk';
import { createHash } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const privateKey = fs.readFileSync(
  path.resolve(__dirname, '../certs/private.pem'),
  'utf-8',
);

const jwk = rsaPemToJwk(privateKey, { use: 'sig', alg: 'RS256' }, 'public');

// Add Key ID (kid)
jwk.kid = createHash('sha256').update(privateKey).digest('hex').slice(0, 10);

// Final JWKS structure
const jwks = { keys: [jwk] };

// Write it to .well-known/jwks.json
const outputPath = path.resolve(__dirname, '../public/.well-known/jwks.json');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(jwks, null, 2));
console.log('JWKS:', JSON.stringify(jwks, null, 2));
