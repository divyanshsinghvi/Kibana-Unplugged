const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const server = require('http').Server(app);
const config = require('nodejs-config') (path.resolve("../"));

const port = config.get('server').port;
const host = config.get('server').host;

//Defining Express server

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("../"));
app.use('/',express.static("../views"));
app.engine('.html', require('ejs').__express);
app.set('views',  path.resolve("../html"));
app.set('view engine', 'html');

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

app.get('/neo4j', function(req, res) {
	res.send({"Nodes": nodesprocessed, "Edges": edgesprocessed});
});

server.listen(port, function() {
  console.log('Server listening on http://' + host +':' + port);
});