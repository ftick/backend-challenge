var fs = require('fs');

var router = function (app) {

    var DIR = __dirname.split('\\').slice(0, -1).join('\\');

    function readData(cb) {
        fs.readFile(DIR + '/data.txt', 'utf8', (err, data) => {
            if (!err) {
                cb(data.toString());
            } else {
                console.log(err);
            }
        });
    }

    app.get("/", (req, res) => {
        res.sendFile(DIR + '/index.html');
    });

    app.post("/api/update", (req, res) => {
        var text = JSON.stringify(req.body, null, '\t');
        if (text) {
            fs.writeFile(DIR + '/data.txt', text, (err) => {
                if (err) throw err;
            });
            res.status(200).send({ message: 'Update successful' });
            console.log("/data/update 200")
        } else {
            res.status(400).send({ message: 'Data is not valid JSON' });
            console.log("/data/update 400")
        }
    });

    app.get("/api/find/:key", (req, res) => {
        var key = req.params.key;
        readData((data) => {
            json = JSON.parse(data);
            value = json[key];
            if (value != undefined) {
                res.status(200).send(value);
                console.log("/data/find 200")
            } else {
                res.status(400).send({ message: key + ' is not a valid key' });
                console.log("/data/find 400")
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