var express = require("express");
var app = express();
const http = require('http');
var bodyParser = require('body-parser');

// support parsing of application/json type post data
app.use(bodyParser.json());

app.get("/", (req, res) => res.render("home.ejs"));


app.get("/search", function(localreq, localres){
    console.log("Searching for results")
    console.log(localreq._parsedUrl.query);
    var customfilters = "/filters?";
    customfilters += localreq._parsedUrl.query;
            var options = {
                hostname: '35.245.253.7',
                path: '/test',
                method: 'get',
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json'
                },
                timeout: 600000000

            };
            var thereturn;
            var req = http.request(options, (res) => {
                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    // console.log(`BODY: ${chunk}`);
                    thereturn = chunk;
                    console.log(thereturn);
                    
                });
                res.on('end', () => {
                    console.log('No more data in response.');
                });
            });
            
            req.on('error', (e) => {
                console.error(`problem with request: ${e.message}`);
            });
            
            // write data to request body
            req.end();

          localres.render("result.ejs", {file: thereturn});  
});


            









app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is listening");
});

