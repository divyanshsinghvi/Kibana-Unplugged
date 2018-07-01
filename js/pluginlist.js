// var serverurl="http://localhost:8000"
/*var pluginlist = "";
    fs.readdirSync(pluginFolder).forEach(file => {
                pluginlist =  pluginlist + '<a id='+String(file)+' href="config">'+String(file)+'</a>';
                //console.log(file);
        });
*/
var UI = '\
<div class="vis-editor-agg-header-title sidebar-item-title">\
    Visualization Selector\
  </div>\
  <div class="euiSpacer euiSpacer--m"></div>\
<div class="sidebar-item vis-editor-agg-wrapper form-group vis-editor-agg ng-pristine ng-valid ng-valid-json-input ng-valid-required">\
  <div class="metrics vis-editor-agg-group">\
      <label for="myLink">Plugin Name</label>\
      <div>\
      <input type=\"text\" id=\"myLink\" value=\"\" class="form-control ng-pristine ng-valid ng-empty ng-touched"><br>\
      </div>\
  </div>\
  <button onclick=\"onClick()\" class="kuiButton kuiButton--secondary kuiButton--large">Submit</button>\
</div>';


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


