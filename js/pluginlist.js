var serverurl="http://localhost:8000"
/*var pluginlist = "";
    fs.readdirSync(pluginFolder).forEach(file => {
                pluginlist =  pluginlist + '<a id='+String(file)+' href="config">'+String(file)+'</a>';
                //console.log(file);
        });
*/
var UI = "\
<div id=\"divId\"><p>\
      Plugin Name: <input type=\"text\" id=\"myLink\" value=\"\"><br>\
      <button onclick=\"onClick()\">Submit</button>\
  </p>\
</div>";
var serverurl = "http://localhost:8000";
function onClick() {
  var name = document.getElementById("myLink").value;
  var redirecturl = serverurl+"/plugins/"+name+"/config.js";
  var s=document.createElement("script");
  s.type = "text/javascript";
  s.innerHTML=null;
  s.id = "widget";
  s.src = redirecturl;
  document.getElementById("kibanascript").appendChild(s);
}

document.getElementById("kibanadiv").innerHTML = UI;

// var pluginlist ='<a id=youtube href="config">youtube</a> '
// $(document).on("click","a",function(e){ e.preventDefault();document.getElementById("kibanadiv").appendChild("http://localhost:8000/plugins/"+$(this).attr("id")+".js")});
// document.getElementById("kibanadiv").innerHTML = pluginlist

