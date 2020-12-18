const { Pool } = require('pg');


const dbconn = require('./secret/dbconnection.json');

module.exports = function() {
    pool = new Pool(dbconn);

    this.viewAll = function() {
        return pool
            .connect()
            .then(function(client) {
                return client.query('SELECT * FROM CenterList')
                    .then(function(res) {
                        client.release();
                        return res.rows;
                    });
            });
    };

    
    this.viewByProvince = function(province) {
        return pool
            .connect()
            .then(function(client) {
                return client.query('SELECT * FROM CenterList WHERE Province=$1', [province])
                    .then(function(res) {
                        client.release();
                        return res.rows;
                    });
            });
    };
}