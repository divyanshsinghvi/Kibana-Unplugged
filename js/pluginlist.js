var serverurl="http://localhost:8000"
/*var pluginlist = "";
    fs.readdirSync(pluginFolder).forEach(file => {
                pluginlist =  pluginlist + '<a id='+String(file)+' href="config">'+String(file)+'</a>';
                //console.log(file);
        });
*/
var pluginlist ='<button onclick="onPluginClick()" id=youtube>youtube</button>'
function onPluginClick(){
    document.getElementById("kibanascript").appendChild("http://localhost:8000/plugins/"+$(this).attr("id")+".js");
}
document.getElementById("kibanadiv").innerHTML = pluginlist

