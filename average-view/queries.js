const { Pool } = require('pg');


const dbconn = require('./secret/dbconnection.json');

module.exports = function() {
    pool = new Pool(dbconn);

    this.viewByTimestamp = function(year, month, date, hour) {
        return pool
            .connect()
            .then(function(client) {
                return client.query('SELECT AvgValue FROM AverageScore WHERE AvgYear=$1 AND AvgMonth=$2 AND AvgDate=$3 AND AvgHour=$4', [year, month, date, hour])
                    .then(function(res) {
                        client.release();
                        return res.rows;
                    });
            });
    };
}