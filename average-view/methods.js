module.exports = function(app, queries) {
    app.get('/', function(req, res) {
        res.send({'result': 'success'});
    });

    app.get('/specific', function(req,res) {
        let year = req.body['year'];
        let month = req.body['month'];
        let date = req.body['date'];
        let hour = req.body['hour'];

        queries.viewByTimestamp(year, month, date, hour)
            .then(data => {
                if (data.length == 0) {
                    res.send({
                        'result': 'fail',
                        'error': 'no data exists'
                    });
                }
                else {
                    res.send({
                        'result': 'success',
                        'data': data[0].avgvalue.value
                    });
                }
            })
    });
}