exports.services=[
{
servicename: "getSingleColumn",
serviceurl: "/getSingleColumn",
query: "SELECT column1 FROM table1 where ?",
data: function(req){
	return {column2:req.query["column2"]};
}},
{
servicename: "getAllColumnsByQuery",
serviceurl: "/getAllColumnsByQuery",
query: "SELECT * FROM table1 where column1=? and column2=?",
data: function(req){
	return [req.query["column1"],req.query["column2"]];
}},
{
servicename: "getAllColumns",
serviceurl: "/getAllColumns",
query: "SELECT * FROM table1",
data: function(req){
	return {};
}},
{
servicename: "insertNewRow",
serviceurl: "/insertNewRow",
query: "insert into table1 set ?",
data: function(req){
	return {column1:req.query["column1"],column2:req.query["column2"]};
}}]