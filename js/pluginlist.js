var serverurl="http://localhost:8000"
/*var pluginlist = "";
    fs.readdirSync(pluginFolder).forEach(file => {
                pluginlist =  pluginlist + '<a id='+String(file)+' href="config">'+String(file)+'</a>';
                //console.log(file);
        });
*/
var pluginlist ='<a id=youtube href="config">youtube</a> '
$(document).on("click","a",function(e){ e.preventDefault();document.getElementById("kibanadiv").appendChild("http://localhost:8000/plugins/"+$(this).attr("id")+".js")});
document.getElementById("kibanadiv").innerHTML = pluginlist

