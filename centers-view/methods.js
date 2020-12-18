module.exports = function(app, queries) {
    app.get('/', function(req, res) {
        res.send({'result': 'success'});
    });

    app.get('/all', function(req, res) {
        queries.viewAll()
            .then(data => {
                res.send({
                    'result': 'success',
                    'data': data
                });
            });
    });

    app.get('/province', function(req, res) {
        let province = req.body['province'];

        queries.viewByProvince(province)
            .then(data => {
                res.send({
                    'result': 'success',
                    'data': data
                });
            });
    });
}