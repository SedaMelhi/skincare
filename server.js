const fs = require('fs');
const https = require('https');
const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync('./out/skincareagents.com_ecc/skincareagents.com.key'), // Путь к ключу
  cert: fs.readFileSync('./out/skincareagents.com_ecc/fullchain.cer'), // Путь к сертификату
};

app.prepare().then(() => {
  const server = express();

  // // Настройка прокси
  // server.use(
  //   '/api',
  //   createProxyMiddleware({
  //     target: 'https://b.skincareagents.com', // URL вашего API
  //     changeOrigin: true,
  //     pathRewrite: { '^/api': '' },
  //     secure: false, // Важно при использовании самоподписанных сертификатов
  //   }),
  // );

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  https.createServer(httpsOptions, server).listen(443, () => {
    console.log('> Ready on https://localhost:3000');
  });
});

//инфа для package.json
// "scripts": {
//   "dev": "node server.js",
//   "build": "next build",
//   "start": "NODE_ENV=production node server.js",
//   "lint": "next lint"
// },
// "scripts": {
//   "dev": "next dev",
//   "build": "next build",
//   "start": "next start",
//   "lint": "next lint"
// },
