/*
Starting with Android 9.0 (API level 28), cleartext support is disabled by default.
En el ejecutable compilado para Android se requiere que la comunicación se haga
a través de HTTPS, si no se produce el error ERR_CLEARTEXT_NOT_PERMITTED.
Para generar un certificado localmente:
  openssl genrsa -out privatekey.pem 1024 
  openssl req -new -key privatekey.pem -out certrequest.csr 
  openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem
*/

const fs = require('fs');
const https = require('https');
const url = require('url');
const { exec } = require('child_process');
const dirTree = require("directory-tree");

const privateKey  = fs.readFileSync('privatekey.pem', 'utf8');
const certificate = fs.readFileSync('certificate.pem', 'utf8');
const credentials = {key: privateKey, cert: certificate};

const express = require('express');
const app = express();

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/get_songs_list', function (req, res) {
  let tree = dirTree('/srv/midis', { extensions: /\.mid/ });
  res.send(JSON.stringify(tree));
});

app.get('/play', (req, res) => {
  exec('play_midi_file.py ' + '/srv/midis/' + req.query.song, (err, stdout, stderr) => {
    res.writeHead(200, {'Content-Type': 'text/json', 'Access-Control-Allow-Origin': '*'});
    res.end('{ "play": "' + req.query.song + '" }');
  });
})

app.get('/stop', (req, res) => {
  exec('pkill python3', (err, stdout, stderr) => {
    res.writeHead(200, {'Content-Type': 'text/json', 'Access-Control-Allow-Origin': '*'});
    res.end({"stop": "OK"});
  });
})

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(8080);
