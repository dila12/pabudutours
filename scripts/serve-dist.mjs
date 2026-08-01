/**
 * Serve production build for Lighthouse.
 * HTTPS (self-signed) so Best Practices HTTPS checks can pass locally.
 *
 * Usage: npm run serve:dist
 * Then open https://localhost:3000 (accept the cert warning once).
 */
import { spawnSync, spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist', 'Travelwebsite', 'browser');
const certDir = path.join(root, '.local-certs');
const cert = path.join(certDir, 'cert.pem');
const key = path.join(certDir, 'key.pem');

if (!fs.existsSync(dist)) {
  console.error('Missing dist. Run: npm run build');
  process.exit(1);
}

fs.mkdirSync(certDir, { recursive: true });

if (!fs.existsSync(cert) || !fs.existsSync(key)) {
  console.log('Generating local self-signed certificate…');
  const result = spawnSync(
    'openssl',
    [
      'req', '-x509', '-newkey', 'rsa:2048',
      '-keyout', key, '-out', cert,
      '-days', '825', '-nodes',
      '-subj', '/CN=localhost',
      '-addext', 'subjectAltName=DNS:localhost,IP:127.0.0.1,IP:192.168.1.101',
    ],
    { stdio: 'inherit' },
  );
  if (result.status !== 0) {
    console.error('openssl failed. Install OpenSSL or audit https://www.pabudutours.com instead.');
    process.exit(1);
  }
}

const child = spawn(
  'npx',
  ['serve', dist, '-l', '3000', '--ssl-cert', cert, '--ssl-key', key],
  { stdio: 'inherit', shell: true, cwd: root },
);

child.on('exit', (code) => process.exit(code ?? 0));
