module.exports = function(app, queries) {
    app.get('/', function(req, res) {
        res.send({'result': 'success'});
    });

    app.get('/all', function(req,res) {
        queries.viewAll()
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
                        'data': data[0].totavg
                    });
                }
            })
    })

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

    app.get('/between', function(req,res) {
        let yearfrom = req.body['yearfrom'];
        let monthfrom = req.body['monthfrom'];
        let datefrom = req.body['datefrom'];
        let hourfrom = req.body['hourfrom'];
        let yearto = req.body['yearto'];
        let monthto = req.body['monthto'];
        let dateto = req.body['dateto'];
        let hourto = req.body['hourto'];

        queries.viewBetween(yearfrom, monthfrom, datefrom, hourfrom, yearto, monthto, dateto, hourto)
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
                        'data': data[0].totavg
                    });
                }
            })
    });
}