#!/usr/bin/env node

const { existsSync, writeFileSync } = require('fs')
const { execSync } = require('child_process')

const write = (file, content) => {
  if (!existsSync(file)) writeFileSync(file, content + '\n')
}

console.log('✨  Setting up project …')

write('./package.json', `{
  "private": true,
  "name": "blitzbank-dashboard-install",
  "version": "1.0.0",
  "description": "Full node dashboard",
  "scripts": {
    "start": "blitzbank"
  },
  "license": "UNLICENCED",
  "dependencies": {
    "@blitzbank/dashboard": "latest"
  }
}`)

write('./.env', `# please provide the credentials.
# note: lines with default values are commented out.

# these can be found or need to be set in your bitcoin.conf file.
# see the rpcauth key of the config.
BITCOIND_RPC_USER=
BITCOIND_RPC_PASSWORD=

# BITCOIND_RPC_PROTOCOL=http
# BITCOIND_RPC_HOST=127.0.0.1
# BITCOIND_RPC_PORT=8332

# LND_RPC_HOST=localhost
# LND_RPC_PORT=10009

# the base64 encoded string of the tls.cert file.
# retrieve this by running this command and providing the path to LND's tls.cert:
# $ base64 /root/.lnd/tls.cert
LND_CERT_BASE64=

# the base64 encoded string of the macaroon file.
# retrieve this by running this command and providing the path to LND's admin.macaroon:
# $ base64 /root/.lnd/admin.macaroon
LND_MACAROON_BASE64=

# the credentials for the dashboard and API requests
AUTH_USERNAME=
AUTH_PASSWORD=

# the paths to your SSL certificate and key
SSL_CERT_PATH=
SSL_KEY_PATH=

# change this if you already have another app running on port 4000
# SERVER_PORT=4000
`)

console.log('📦  Installing dependencies …')

execSync('npm install')

console.log('✅  Done!\n\n')
console.log('📝  Edit the .env file that has been created.\n\n')
console.log('🚀  After that you can start the app by running the command: "blitzbank"')
