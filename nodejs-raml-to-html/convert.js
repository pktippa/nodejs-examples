var raml2html = require('raml2html');
var fs =require('fs');
var source = './example.raml';
var sourcePath ='./';
var destinationPath = 'F://Temp//files//';// For current directory use ./
var ramlExtension='.raml';
var htmlExtension='.html';
fs.readdir(sourcePath, function(err, files) {
	files.filter(function(file) { 
		return (file.substr(-5) == ramlExtension); // comparing file us fileName.raml or not.
	}).forEach(function(file) {
		raml2html.parse(file, onSuccess, onError);
		function onSuccess(result){
			var fileName=file.substring(0,file.length-ramlExtension.length); // cropping extension .raml and getting file name from it.
			fs.writeFile(destinationPath+fileName+htmlExtension, result, 'utf-8', function(err) { // writing html content to fileName.html
				if(err) {
					console.log(err);
				} else {
					console.log("The "+fileName+" was saved!");
				}});
		}
		function onError(err){
			console.log(err);
		}
	});
});


