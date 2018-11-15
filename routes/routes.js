const io = require('socket.io-client');
const DIR_PATH = __dirname.split('\\').slice(0, -1).join('\\') + '\\';

var fs = require('fs');

var router = function (app) {

    function readDataFile(cb) {
        fs.readFile(DIR_PATH + 'data.txt', 'utf8', (err, data) => {
            if (!err) {
                cb(data.toString());
            } else {
                console.log(err);
            }
        });
    }

    app.get("/", (req, res) => {
        res.sendFile(DIR_PATH + 'index.html');
    });

    app.post("/api/update", (req, res) => {
        var text = JSON.stringify(req.body, null, '  ');
        if (text) {
            fs.writeFile(DIR_PATH + 'data.txt', text, (err) => {
                if (err) throw err;
            });
            res.status(200).send({ message: 'Update successful' });
            var socket = io.connect('http://localhost:3000');
            socket.emit('good update', text);
            console.log("/data/update 200");
        } else {
            res.status(400).send({ message: 'Data is not valid JSON' });
            console.log("/data/update 400");
        }
    });

    app.get("/api/find/:key", (req, res) => {
        var key = req.params.key;
        readDataFile((jsonText) => {
            jsonObj = JSON.parse(jsonText);
            value = jsonObj[key];
            if (value == undefined) {
                // value being undefined means it is not in the JSON object
                res.status(400).send({ message: key + ' is not a valid key' });
                console.log("/data/find 400");
            } else {
                res.status(200).send(value);
                console.log("/data/find 200");
            }
        });
    });

    app.get('/api/find/', (req, res) => {
        res.status(400).send({ message: 'Usage: /api/find/{key}' });
    })

    app.get('/api/find', (req, res) => {
        res.status(400).send({ message: 'Usage: /api/find/{key}' });
    })
}

module.exports = router;