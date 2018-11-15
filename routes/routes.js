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

    app.get("/data", (req, res) => {
        readData((data) => {
            res.status(200).send(JSON.parse(data));
        });
    });

    app.post("/data/update", (req, res) => {
        if(!req.body) return res.status(400).send({ message: 'Data is not valid JSON' });
        var text = JSON.stringify(req.body, null, '\t');
        if (text) {
            fs.writeFile(DIR + '/data.txt', text, (err) => {
                if (err) throw err;
                else return res.status(200).send({ message: 'Update successful'});
            });
        }
    });

    app.get("/data/:key", (req, res) => {
        var key = req.params.key;
        readData((data) => {
            json = JSON.parse(data);
            value = json[key];
            if (value != undefined) {
                res.status(200).send(value);
            } else {
                res.status(400).send({ message: key + ' is not a valid key' });
            }
        });
    });
}

module.exports = router;