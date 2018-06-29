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

const pluginFolder = path.resolve('../plugins');
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
	pluginFile.mv(pluginFolder + '/' + pluginname, function(err) {
		if(err) {
			return res.status(500).send(err);
		}
	});
	fs.createReadStream(pluginFolder + '/' + pluginname).pipe(unzip.Extract({ path: pluginFolder }));
	fs.unlink(pluginFolder + '/' + pluginname, function(err) {
		res.status(200).send('Success');
		if(err) {
			console.log("Could not delete");
		}
	});
});

app.get('/plugins',function(req,res){
var css = '<head><meta name="viewport" content="width=device-width, initial-scale=1"><style>.dropbtn {background-color: #4CAF50;        color: white;        padding: 16px;        font-size: 16px;        border: none;        cursor: pointer;    }.dropbtn:hover, .dropbtn:focus {    background-color: #3e8e41;}#myInput {    border-box: box-sizing;    background-image: url("searchicon.png");    background-position: 14px 12px;    background-repeat: no-repeat;    font-size: 16px;    padding: 14px 20px 12px 45px;    border: none;    border-bottom: 1px solid #ddd;}#myInput:focus {outline: 3px solid #ddd;}.dropdown {    position: relative;    display: inline-block;}.dropdown-content { display: none;    position: absolute;    background-color: #f6f6f6;    min-width: 230px;    overflow: auto;    border: 1px solid #ddd;    z-index: 1;}.dropdown-content a {    color: black;    padding: 12px 16px;    text-decoration: none;    display: block;}.dropdown a:hover {background-color: #ddd;}.show {display: block;}</style></head>';
var script = '<script>/* When the user clicks on the button,* toggle between hiding and showing the dropdown content */function myFunction() {document.getElementById("myDropdown").classList.toggle("show");}function filterFunction() {    var input, filter, ul, li, a, i;    input = document.getElementById("myInput");    filter = input.value.toUpperCase();    div = document.getElementById("myDropdown");   a = div.getElementsByTagName("a");   for (i = 0; i < a.length; i++) {       if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {a[i].style.display = "";                    } else {        a[i].style.display = "none";                            } }}</script></body></html> '
var html = '<body><h2>Search/Filter Dropdown</h2><p>Click on the button to open the dropdown menu, and use the input field to<div class="dropdown"><button onclick="myFunction()" class="dropbtn">Dropdown</button><div id="myDropdown" class="dropdown-content"><input type="text" placeholder="Search.." id="myInput" onkeyup="filterFunction()">'
var something = "</div></div>"
var pluginlist = "";
    fs.readdirSync(pluginFolder).forEach(file => {
            pluginlist =  pluginlist + '<a href="#'+String(file)+'">'+String(file)+'</a>';
            console.log(file);
    });
    res.send(css + html + pluginlist+ something + script);
});

server.listen(port, function() {
  console.log('Server listening on http://' + host +':' + port);
});
