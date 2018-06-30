var serverurl="http://localhost:8000"
var pluginlist = "";
    fs.readdirSync(pluginFolder).forEach(file => {
                pluginlist =  pluginlist + '<a id='+String(file)+' href="config">'+String(file)+'</a>';
                //console.log(file);
        });
document.getElementById("#kibanadiv").innerHTML = pluginlist

