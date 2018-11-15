var fs = require('fs');

var appRouter = function (app) {

    function read(file, cb) {
        fs.readFile(file, 'utf8', function(err, data) {
            if (!err) {
                cb(data.toString())
            } else {
                console.log(err)
            }
        });
    }

    app.get("/", function (req, res) {
        res.status(200).send({ message: 'Welcome to my backend REST API' });
    });

    app.get("/data", function (req, res) {
        read(__dirname + '/data.txt', function(data) {
            res.status(200).send(JSON.parse(data));
        });
    });

    app.post("/data/update", function(req, res) {
        
    });

    app.get("/data/:key", function(req, res) {
        var key = req.params.key;
        read(__dirname + '/data.txt', function(data) {
            json = JSON.parse(data);
            value = json[key];
            if (value != false) {
                res.status(200).send(value);
            } else {
                res.status(400).send({ message: 'key not found' });
            }
        });
    });
}

module.exports = appRouter;