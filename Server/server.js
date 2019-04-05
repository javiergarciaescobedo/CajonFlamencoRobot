const http = require('http');
const url = require('url');
const { exec } = require('child_process');
const dirTree = require("directory-tree");

const server = http.createServer((request, response) => {
  if(request.url === '/get_songs_list') {
    let tree = dirTree("songs");
    response.writeHead(200, {'Content-Type': 'text/json', 'Access-Control-Allow-Origin': '*'});
    response.write(JSON.stringify(tree));
    response.end();
  } else {
    var q = url.parse(request.url, true).query;
    var song = q.song;
    exec('timidity songs/' + song, (err, stdout, stderr) => {
      response.writeHead(200, {'Content-Type': 'text/json', 'Access-Control-Allow-Origin': '*'});
      response.end('play ' + song);
    });
  }
});

server.listen(8080);