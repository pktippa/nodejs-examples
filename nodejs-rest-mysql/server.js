/**
 * New node file
 */
var express = require('express');
var mysql = require('mysql');
var service = require('./service');
var qlist = require('./queryList');

var result;
var qObj = {};

var app = express();

for (var key in qlist.services) {

	if (qlist.services.hasOwnProperty(key)) {
	  qObj[qlist.services[key].serviceurl] = qlist.services[key];
	  app.get(qlist.services[key].serviceurl,addToHeader, getData);
	}
}

function getData(req, res)
{
	service.getData(req, res, qObj);
}
function addToHeader(req, res, next) {
  console.log('addHeaders called');
  res.header('Access-Control-Allow-Origin', '*');
  next();
}
app.listen(process.env.PORT || 9999);