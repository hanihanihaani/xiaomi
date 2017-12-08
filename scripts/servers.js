const http = require('http');
const fs = require('fs');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
	
  res.statusCode = 200;
  
  // res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Type','text/html;charset=UTF-8');
  
  if(req.url !='/favicon.ico'){

        if(req.url.search('/checkData') == -1){
          console.log('not checkdate '+ req.url);
          if(req.url == '/'){
             pathUrl = 'index.html';
        }else{
             pathUrl = '../'+req.url;
        }
          fs.readFile(pathUrl,function(err,date){
            if(err){
              res.statusCode = 404;
              res.end();
            }else{
              res.statusCode = 200;
              res.end(date);
            }
        });
      }else{
          // console.log('checkDate' + req.url);
          var parms = url.parse(req.url,true).query;
          // console.log(parms);
          if(parms.username == 'jack'){   
            res.end('false');
          }else{
            res.end('true');
          }
      }
  }
  
  // res.end('Hello World\n');

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});