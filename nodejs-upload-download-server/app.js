var express = require('express');
var connect = require('connect');
var fs = require('fs');
var util = require('util');
var app = express();
var port = 8888;
//var archiver = require('archiver');

app.use(connect.multipart());
app.use(connect.bodyParser());
app.use(connect.methodOverride());

var buttonHTML = "";
var headerHTML = "";
var footerHTML = "";

fs.readFile(__dirname +'/uploadButton.html', function (err, data) {
  if (err) {
    throw err; 
  }
  buttonHTML = buttonHTML + data;
});
fs.readFile(__dirname +'/header.html', function (err, data) {
  if (err) {
    throw err; 
  }
  headerHTML = headerHTML + data;
});
fs.readFile(__dirname +'/footer.html', function (err, data) {
  if (err) {
    throw err; 
  }
  footerHTML = footerHTML + data;
});

var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});


app.get('/', function(request, response)
{
	var path = request.url + 'view/';
	console.log(request.url);
	response.writeHead(301,
	{Location: path}
	);
	response.end();
});


//TODO: replace with var name instead of *
app.get('/view/*', function(request, response)
{ 
	var location = unescape(request.url.replace("/view/", "")) + "/";
	if(location == "/")
		location = "";
	//console.log("``````````````" + location);
	var fileList = fs.readdirSync(__dirname + '\\uploads\\' + location);
	var html = "";
	html = html + headerHTML.replace('replaceWithTitle', 'Path: ' + location);
	html = html + "<h4>Path : " + location + "</h4>";
	var prefix = "<a href=\"";
	var postfix = "\">";
	
	if(location != "")
	{
		var upLink = location.substring(0, location.substring(0, location.length-1).lastIndexOf("/"));
		html = html + "<a href = \"/view/" + upLink + "\"> Up </a> <br/>";
	}
	html = html + '<table>';
	if(fileList.length != 0)
		html = html + "<tr><th>Delete</th><th>Name</th><th>Size</th><th>Modified</th></tr>";
	else
		html = html + "<h4>Empty</h4>";
	for(var i = 0; i < fileList.length; ++i)
	{
		var fullPath = __dirname + "\\uploads\\" + location + fileList[i];
		html += '<tr>';
		html += "<td><a onclick='return confirm(\"Are you sure?\")' class = 'delete' href=\"/delete/" + location + fileList[i] + "\"></a></td>";
		html += '<td>';
		var stats = fs.statSync(fullPath);
		var isFile = stats.isFile();
		var size = humanFileSize(stats.size, 1024);
		var modified = stats.mtime.toDateString();
		//console.log(util.inspect(stats));
		//console.log(size);
		//console.log(fileList[i]);
		if(isFile)
		{
			html = html + "<span class = \"file\">";
		}
		else
		{
			html = html + "<span class = \"folder\">";
		}
		html = html + prefix;
		if(isFile)
		{
			html = html + "/download/" + location  + fileList[i];
		}
		else
		{
			html = html + "/view/" + location + fileList[i];
		}
		html = html + postfix;
		html = html + fileList[i];
		html = html + "</a>";
		html = html + "</span>";
		html += '</td>';
		if(!isFile)
			size = '-';
		html += '<td>' + size + '</td>';
		html += '<td>' + modified + '</td>';
		html = html + "</tr>\n";
		//console.log("~~~~~~~~~~~~~~~~~~~~" +  "/download/" + location  + fileList[i]);
	}
	html = html + '</table>';
	html = html + buttonHTML.replace(/replacePathUpload/g, location);
	html = html + footerHTML;
	response.send(html);
});


function humanFileSize(bytes, si) {
    var thresh = si ? 1000 : 1024;
    if(bytes < thresh) return bytes + ' B';
    var units = si ? ['kB','MB','GB','TB','PB','EB','ZB','YB'] : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while(bytes >= thresh);
    return bytes.toFixed(1)+' '+units[u];
};


//TODO: replace with var name instead of *
app.get('/download/*', function(request, response)
{ 
	var location = unescape(request.url.replace("/download/", ""));
	console.log("Got request for file: " + location);
	console.log("Sending file to user: " + location);
	response.sendfile(__dirname + "\\uploads\\" + location);
});


//TODO: replace with var name instead of *
app.post('/upload/*', function(request, response)
{ 
	var location = unescape(request.url.replace("/upload/", ""));
	var newPath = __dirname + "\\uploads\\" + location + request.files.uploadFile.originalFilename;
	console.log("Uploading file to location: " + newPath);
	fs.readFile(request.files.uploadFile.path, function (err, data) {
	  fs.writeFile(newPath, data, function (err) {
		  var path = request.url.replace('/upload/', '/view/');
		  if(path != '/view/') path = path.substring(0, path.length - 1);
		  response.writeHead(301, {Location: path});
		  response.end();
	  });
	});
});


//TODO: if not file, it is considering folder. Other types except
//file or folder are possible, not being handled
app.get('/delete/*', function(request, response)
{ 
	var location = unescape(request.url.replace("/delete/", ""));
	var newPath = __dirname + "\\uploads\\" + location;
	console.log("Deleting : " + newPath);
	if(fs.existsSync(newPath))
	{
		if(fs.statSync(newPath).isFile())
			fs.unlinkSync(newPath);
		else
			deleteFolderRecursive(newPath);
//		response.send("Deleted.");
	}
	else
	{
//		response.send('Path does not exist.')
	}
	
	var path = request.url.replace('/delete/', '/view/');
	path = path.substring(0, path.lastIndexOf("/") + 1);
	//path = path.substring(0, path.length - 1);
	if(path != '/view/') path = path.substring(0, path.length - 1);
	response.writeHead(301, {Location: path});
	response.end();

});

deleteFolderRecursive = function(path) {
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};


app.post('/createFolder/*', function(request, response)
{
	var location = unescape(request.url.replace("/createFolder/", "")) + "/";
	var newPath = __dirname + "\\uploads\\" + location + request.body.folderName;
	console.log(request.body.folderName);
	if(fs.existsSync(newPath))
	{
		//response.send("Directory exists already.");
	}
	else
	{
		fs.mkdirSync(newPath);
		//response.send('Directory created.')
	}
	var path = request.url.replace('/createFolder/', '/view/');
	path = path.substring(0, path.lastIndexOf("/") + 1);
	//path = path.substring(0, path.length - 1);
	if(path != '/view/') path = path.substring(0, path.length - 1);
	response.writeHead(301, {Location: path});
	response.end();
});


app.get('/images/:img', function(request, response)
{
	response.sendfile(__dirname + '\\images\\' + request.params.img);
});


