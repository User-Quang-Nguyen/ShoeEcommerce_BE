var express = require("express");
var config = require("config");
var bodyParse = require("body-parser");
var cors = require('cors');
var app = express();

app.use(cors());
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));
app.use(require(__dirname + "/apps/routes"));

var host = config.get("server.host");
var port = config.get("server.port");
app.listen(port, host, function () {
    console.log("Server is running on port", port);
})
