const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const server = require('http').Server(app);
const config = require('nodejs-config') (path.resolve("../"));
const fileUpload = require('express-fileupload');
const port = config.get('server').port;
const host = config.get('server').host;
const pluginFolder = path.resolve('../plugins');
const unzip = require('unzip');

//Defining Express server

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("../"));
app.use('/',express.static("../views"));
app.engine('.html', require('ejs').__express);
app.set('views',  path.resolve("../html"));
app.set('view engine', 'html');
app.use(fileUpload());

//Routes

app.get('/', function(req, res) {
	var data = "meta-academy";
	if(req.query.data) {
		data = req.query.data;
	}
	res.render('index', {
		port: port,
		data: data,
		host: JSON.stringify({"host": host}),
		shiny: shiny
	});
});

app.post('/upload', function(req, res) {
	if (!req.files)
		return res.status(400).send('No files were uploaded.');
	let pluginFile = req.files.file
	var pluginname = req.files.file.name
	pluginFile.mv(pluginFolder, function(err) {
		if(err) {
			return res.status(500).send(err);
		}
		res.status(200);
	});
	fs.createReadStream(pluginFolder + '/' + pluginname).pipe(unzip.Extract({ path: pluginFolder }));
	fs.unlink(pluginFolder + '/' + pluginname, function(err) {
		res.status(200);
		if(err) {
			console.log("Could not delete");
		}
	});
});

server.listen(port, function() {
  console.log('Server listening on http://' + host +':' + port);
});