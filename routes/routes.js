var fs = require('fs');

var router = function (app) {

    var DIR = __dirname.split('\\').slice(0, -1).join('\\');

    function read(cb) {
        fs.readFile(DIR + '/data.txt', 'utf8', function(err, data) {
            if (!err) {
                cb(data.toString());
            } else {
                console.log(err);
            }
        });
    }

    app.get("/", function (req, res) {
        res.status(200).send({ message: 'Welcome to my backend REST API' });
    });

    app.get("/data", function (req, res) {
        read(function(data) {
            res.status(200).send(JSON.parse(data));
        });
    });

    app.post("/data/update", function(req, res) {
        var text = JSON.stringify(req.body, null, '\t');
        if (text)
        fs.writeFile(DIR + '/data.txt', text, function(err, data){
            if (err) console.log(err);
        });
    });

    app.get("/data/:key", function(req, res) {
        var key = req.params.key;
        read(function(data) {
            json = JSON.parse(data);
            value = json[key];
            if (value != undefined) {
                res.status(200).send(value);
            } else {
                res.status(400).send({ message: 'key not found' });
            }
        });
    });
}

module.exports = router;