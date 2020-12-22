const { Pool } = require('pg');


const dbconn = require('./secret/dbconnection.json');

module.exports = function() {
    pool = new Pool(dbconn);

    this.viewByTimestamp = function(year, month, date, hour) {
        return pool
            .connect()
            .then(function(client) {
                return client.query("SELECT AvgValue FROM AverageScore WHERE AvgYear=$1 AND AvgMonth=$2 AND AvgDate=$3 AND AvgHour=$4", [year, month, date, hour])
                    .then(function(res) {
                        client.release();
                        return res.rows;
                    });
            });
    };

    this.viewAll = function() {
        return pool
            .connect()
            .then(function(client) {
                return client.query("select sum((((avgvalue#>>'{value}')::int)*((avgvalue#>>'{count}'))::int))/sum((avgvalue#>>'{count}')::int) as totavg from averagescore")
                    .then(function(res) {
                        client.release();
                        return res.rows;
                    });
            });
    };

    this.viewBetween = function(yearfrom, monthfrom, datefrom, hourfrom, yearto, monthto, dateto, hourto) {
        return pool
            .connect()
            .then(function(client) {
                return client.query(`select sum((((avgvalue#>>'{value}')::int)*((avgvalue#>>'{count}'))::int))/sum((avgvalue#>>'{count}')::int) as totavg from averagescore
                                    where (AvgYear*1000000+AvgMonth*10000+AvgDate*100+AvgHour)>=($1*1000000+$2*10000+$3*100+$4)
                                    AND (AvgYear*1000000+AvgMonth*10000+AvgDate*100+AvgHour)<=($5*1000000+$6*10000+$7*100+$8)`,
                                    [yearfrom, monthfrom, datefrom, hourfrom, yearto, monthto, dateto, hourto])
                    .then(function(res) {
                        client.release();
                        return res.rows;
                    });
            });
    };
}

