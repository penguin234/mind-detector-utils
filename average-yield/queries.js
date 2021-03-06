const { Pool } = require('pg');


const dbconn = require('./secret/dbconnection.json');

module.exports = function() {
    pool = new Pool(dbconn);


    this.addOne = function(year, month, date, hour, value, callback) {
        pool.connect((err, client, done) => {
            const shouldAbort = (err) => {
                if (err) {
                    console.error('Error in trans ', err.stack);
                    client.query('ROLLBACK', err => {
                        if (err) {
                            console.error('Error rolling back client', err.stack);
                        }
                        done();
                    });

                    callback(err.stack, null);
                }
                return !!err;
            };

            client.query('BEGIN', (err) => {
                if (shouldAbort(err)) return;

                client.query('SELECT AvgValue FROM AverageScore WHERE AvgYear=$1 AND AvgMonth=$2 AND AvgDate=$3 AND AvgHour=$4', [year, month, date, hour], (err, res) => {
                    if (shouldAbort(err)) return;

                    if (res.rows.length == 0) {
                        data = {'count': 1, 'value': value};

                        client.query('INSERT INTO AverageScore(AvgYear, AvgMonth, AvgDate, AvgHour, AvgValue) VALUES($1, $2, $3, $4, $5) RETURNING *', [year, month, date, hour, data], (err, res2) => {
                            if (shouldAbort(err)) return;
                            
                            client.query('COMMIT', err => {
                                if (err) {
                                    console.error('Error committing trans', err.stack);
                                    callback(err.stack, null);
                                }
    
                                done();
                                client.release();
                                callback(null, res2.rows[0]);
                            });
                        });
                    }
                    else {
                        data = res.rows[0].avgvalue;
                        //data.count = parseInt(data.count);
                        //data.value = parseFloat(data.value);
                        data.value = data.value * data.count + value;
                        data.count++;
                        data.value /= data.count;

                        client.query('UPDATE AverageScore SET AvgValue=$5 WHERE AvgYear=$1 AND AvgMonth=$2 AND AvgDate=$3 AND AvgHour=$4 RETURNING *', [year, month, date, hour, data], (err, res2) => {
                            if (shouldAbort(err)) return;
    
                            client.query('COMMIT', err => {
                                if (err) {
                                    console.error('Error committing trans', err.stack);
                                    callback(err.stack, null);
                                }
    
                                done();
                                callback(null, res2.rows[0]);
                            });
                        });
                    }
                });
            });
        });
    };
}