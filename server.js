const fs = require('fs');
const https = require('https');
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
//для хостинга
const httpsOptions = {
  key: fs.readFileSync('cert/skincareagents.com.key'), // Путь к ключу
  cert: fs.readFileSync('cert/fullchain.cer'), // Путь к сертификату
};

// для локалки
// const httpsOptions = {
//   key: fs.readFileSync('./localhost.key'), // Путь к ключу
//   cert: fs.readFileSync('./localhost.crt'), // Путь к сертификату
// };

app.prepare().then(() => {
  const server = express();

  server.all('*', (req, res) => {
    return handle(req, res);
  });
  // //для хостинга
  https.createServer(httpsOptions, server).listen(443, () => {
    console.log('> Ready on https://localhost:3000');
  });
  // для локалки
  // https.createServer(httpsOptions, server).listen(3000, () => {
  //   console.log('> Ready on https://localhost:3000');
  // });
});
