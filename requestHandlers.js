var exec = require("child_process").exec;
var queryString = require("querystring");
var fs = require("fs");
var formidable = require("formidable");

function start(response) {
	console.log("Request handler 'start' was called");

	var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data"'+
    'method = "post">' +
    '<input type="file" name="upload">'+
    '<input type="submit" value="Upload file"/>'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type" : "text/html"});
	response.write(body);
	response.end();
 }

//图片上传
function upload(response, request) {
	console.log("Request handler 'upload' was called");

	var form = new formidable.IncomingForm();
	console.log("about to parse");
	form.parse(request, function(error, fileds, files) {
		console.log("parsing done");
		fs.renameSync(files.upload.path, "./tmp/test.png");
		response.writeHead(200, {"Content-Type" : "text/html"});
		response.write("<img src='/show'>");
		response.end();
	});
}

//显示图片
function show(response) {

	fs.readFile("./tmp/test.png", "binary", function(error, file) {
		if (error) {
			response.writeHead(500, {"Content-Type" : "text/plain"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type" : "image/png"});
			response.write(file, "binary");
			response.end();
		}
	});
}

exports.start = start;
exports.upload = upload;
exports.show = show;
