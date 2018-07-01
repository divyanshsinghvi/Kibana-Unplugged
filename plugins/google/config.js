var UI = '\
<div class="vis-editor-agg-header-title sidebar-item-title">\
    Google Drive Visualization\
  </div>\
<div class="euiSpacer euiSpacer--m"></div>\
<div class="sidebar-item vis-editor-agg-wrapper form-group vis-editor-agg ng-pristine ng-valid ng-valid-json-input ng-valid-required">\
  <div class="metrics vis-editor-agg-group">\
        <label for="myLink">Google Drive Link</label>\
        <div>\
        <input type=\"text\" id=\"myLink\" value=\"\" class="form-control ng-pristine ng-valid ng-empty ng-touched">\
        </div>\
        <div class="euiSpacer euiSpacer--m"></div>\
  </div>\
</div>\
        <span class="vis-editor-agg-header-title">\
          OR\
        </span>\
<div class="euiSpacer euiSpacer--m"></div>\
<div class="sidebar-item vis-editor-agg-wrapper form-group vis-editor-agg ng-pristine ng-valid ng-valid-json-input ng-valid-required">\
  <div class="metrics vis-editor-agg-group">\
        <div class="euiSpacer euiSpacer--m"></div>\
        <label for="index">Index Name</label>\
        <div>\
        <input type=\"text\" id=\"index\" value=\"\" class="form-control ng-pristine ng-valid ng-empty ng-touched">\
        </div>\
        <div class="euiSpacer euiSpacer--m"></div>\
        <label for="dsl">Elastic DSL</label>\
        <div>\
        <textarea id=\"dsl\" rows=\"10\" cols=\"30\" class="form-control ng-pristine ng-valid ng-empty ng-touched"> </textarea><br>\
        </div>\
        <div class="euiSpacer euiSpacer--m"></div>\
        <label for="index">Field</label>\
        <div>\
        <input type=\"text\" id=\"field\" value=\"\" class="form-control ng-pristine ng-valid ng-empty ng-touched">\
        </div>\
        <div class="euiSpacer euiSpacer--m"></div>\
  </div>\
        <button onclick=\"onClick()\" class="kuiButton kuiButton--secondary kuiButton--large">Submit</button>\
</div>';
function onClick() {
  var url = document.getElementById("myLink").value;
  var index = document.getElementById("index").value;
  var query = document.getElementById("dsl").value;
  var field = document.getElementById("field").value;
  var redirecturl;
  if(url!='') {
    redirecturl = serverurl+"/plugin?name=google&url="+url;
  } else {
    redirecturl = serverurl+"/plugin?name=google&index="+index+"&query="+query+"&field="+field;
  }
  document.getElementById("urltext").value = redirecturl;
}

document.getElementById("kibanadiv").innerHTML = UI;
