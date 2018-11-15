var fs = require('fs');

var appRouter = function (app) {

    app.get("/", function (req, res) {
        res.status(200).send({ message: 'Welcome to my backend REST API' });
    });

    app.get("/data", function (req, res) {

        var x = ({});

        function read(file, cb) {
            fs.readFile(file, 'utf8', function(err, data) {
                if (!err) {
                    cb(data.toString())
                } else {
                    console.log(err)
                }
            });
        }

        read(__dirname + '/data.txt', function(data) {
            x = JSON.parse(data)
            res.status(200).send(x)
        });
    });
}

module.exports = appRouter;