module.exports = function(app, queries) {
    app.get('/', function(req, res) {
        res.send({'result': 'success'});
    });

    app.post('/addone', function(req,res) {
        let year = req.body['year'];
        let month = req.body['month'];
        let date = req.body['date'];
        let hour = req.body['hour'];
        let value = req.body['value'];
        value = parseFloat(value);

        queries.addOne(year, month, date, hour, value, (err, data) => {
            if (err) {
                res.send({
                    'result': 'fail'
                });
            }
            else {
                res.send({
                    'result': 'success',
                    'data': data
                });
            }
        });
    });
}