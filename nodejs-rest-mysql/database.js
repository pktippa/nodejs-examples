exports.createConnection=function createConnection(mysql){
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'root123',
		port : '3306',
		database : 'sampledb'
	});
	connection.connect();
	return connection;
};
exports.executeQuery=function executeQuery(qObj,req,res,conn){
	conn.query( qObj.query,qObj.data(req), function(err, rows){
		if(err)	{
			throw err;
		}else{
			res.jsonp(rows);
		}
	});
	conn.end();
};