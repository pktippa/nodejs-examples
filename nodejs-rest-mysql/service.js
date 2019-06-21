/**
 * New node file
 */
var database = require('./database');
var queryList = require('./queryList');
var mysql= require('mysql');
exports.getData = function(req, res, qObj) {
	database.executeQuery(qObj[req.route.path],req,res,database.createConnection(mysql));
};
