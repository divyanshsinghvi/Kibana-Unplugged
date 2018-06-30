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
const unzip = require('unzip');
var elasticsearch = require('elasticsearch');
const cors = require('cors')

var client = new elasticsearch.Client({
	host: config.get('server').es_cred_url,
	log: 'trace'
  });

const pluginFolder = path.resolve('../plugins');
//Defining Express server

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("../"));
app.use('/',express.static("../views"));
app.engine('.html', require('ejs').__express);
app.set('views',  path.resolve("../plugins"));
app.set('view engine', 'html');
app.use(fileUpload());
app.use(cors());

//Elasticsearch

client.ping({
	// ping usually has a 3000ms timeout
	requestTimeout: 1000
  }, function (error) {
	if (error) {
	  console.trace('elasticsearch cluster is down!');
	} else {
	  console.log('All is well');
	}
  });

//Routes

app.post('/upload', function(req, res) {
	if (!req.files)
		return res.status(400).send('No files were uploaded.');
	let pluginFile = req.files.file
	var pluginname = req.files.file.name
	pluginFile.mv(pluginFolder + '/' + pluginname, function(err) {
		if(err) {
			return res.status(500).send(err);
		}
	});
	fs.createReadStream(pluginFolder + '/' + pluginname).pipe(unzip.Extract({ path: pluginFolder }));
	fs.unlink(pluginFolder + '/' + pluginname, function(err) {
		return res.status(200).send('Success');
		if(err) {
			console.log("Could not delete");
		}
	});
});


app.get('/config', function(req, res) {
	if(!req.query.name) {
		return res.status(400).send('No plugin name provided');
	}
	let pluginName = req.query.name;

	res.render(pluginName + '/config', {
		"url": JSON.stringify({"url": host + ":" + port})
	});
});

app.get('/plugin', function(req, res) {
	if(!req.query.name) {
		return res.status(400).send('No plugin name provided');
	}
	let pluginName = req.query.name;
	var es_loader = require("../plugins/" + pluginName + "/es_driver.js");
	let callback = plugin_renderer.bind(null, pluginName, res);
	plugin_data = es_loader.run(client, req.query, callback);
});

function plugin_renderer(pluginName, res, plugin_data) {
	console.log(plugin_data);
	res.render(pluginName + '/plugin', {
		"params": JSON.stringify(plugin_data)
	});
}

app.get('/pluginList',function(req,res){
var css = '<head><meta name="viewport" content="width=device-width, initial-scale=1"><style>.dropbtn {background-color: #4CAF50;        color: white;        padding: 16px;        font-size: 16px;        border: none;        cursor: pointer;    }.dropbtn:hover, .dropbtn:focus {    background-color: #3e8e41;}#myInput {    border-box: box-sizing;    background-image: url("searchicon.png");    background-position: 14px 12px;    background-repeat: no-repeat;    font-size: 16px;    padding: 14px 20px 12px 45px;    border: none;    border-bottom: 1px solid #ddd;}#myInput:focus {outline: 3px solid #ddd;}.dropdown {    position: relative;    display: inline-block;}.dropdown-content { display: none;    position: absolute;    background-color: #f6f6f6;    min-width: 230px;    overflow: auto;    border: 1px solid #ddd;    z-index: 1;}.dropdown-content a {    color: black;    padding: 12px 16px;    text-decoration: none;    display: block;}.dropdown a:hover {background-color: #ddd;}.show {display: block;}</style></head>';
//var script = '<script>function myFunction() {document.getElementById("myDropdown").classList.toggle("show");}function filterFunction() {    var input, filter, ul, li, a, i;    input = document.getElementById("myInput");    filter = input.value.toUpperCase();    div = document.getElementById("myDropdown");   a = div.getElementsByTagName("a");   for (i = 0; i < a.length; i++) {       if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {a[i].style.display = "";                    } else {        a[i].style.display = "none";                            } }}</script></body></html> '
//var html = '<body><h2>Search/Filter Dropdown</h2><p>Click on the button to open the dropdown menu, and use the input field to<div class="dropdown"><button onclick="myFunction()" class="dropbtn">Dropdown</button><div id="myDropdown" class="dropdown-content"><input type="text" placeholder="Search.." id="myInput" onkeyup="filterFunction()">'
var something = "</div></div>"
var pluginlist = "";
    fs.readdirSync(pluginFolder).forEach(file => {
            pluginlist =  pluginlist + '<a id='+String(file)+' href="config">'+String(file)+'</a>';
            console.log(file);
    });
var config = '<div id="div1"></div><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script><script>$(document).on("click","a",function(e){ e.preventDefault();$.ajax({type:"GET",url:"http://localhost:8000/config?name="+$(this).attr("id"), success:function(result){$("#div1").html(result)}})});</script>' 
    res.send(css  + pluginlist+ something + config);
});

server.listen(port, function() {
  console.log('Server listening on http://' + host +':' + port);
});
