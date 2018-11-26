var express = require("express");
var app = express();
const http = require('http');
var bodyParser = require('body-parser');
var fs = require("fs");

// support parsing of application/json type post data
app.use(bodyParser.json());

app.get("/", (req, res) => res.render("home.ejs"));


app.get("/search", function(localreq, localres){
    console.log("Searching for results")
    console.log(localreq._parsedUrl.query);
    var customfilters = "/filters?";
    customfilters += localreq._parsedUrl.query;
            var options = {
                hostname: '0.0.0.0',
                port:'123',
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
                    // thereturn = JSON.parse(thereturn);
                    console.log(thereturn);
                    
                });
                res.on('end', () => {
                    console.log('No more data in response.');
                });
            });
            
            req.on('error', (e) => {
                console.error(`problem with request: ${e.message}`);
            });
            
            write data to request body
            req.end();
            // var json = JSON.stringify(thereturn);
            fs.writeFile('./views/curgeo.json', json, 'utf8', (err) => {
                console.log(err);
            });
            console.log("File has been created");

          localres.render("result.ejs", {geojsonFeature: thereturn });  
});


            









app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is listening");
});

