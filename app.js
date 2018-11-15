var app = require("express")();
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

routes(app);

io.on('connection', function(socket){
    console.log("a user connected");
});

http.listen(3000, function () {
    console.log("Server running at http://localhost:3000");
});