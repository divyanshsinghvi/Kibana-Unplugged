var UI = '\
<div class="vis-editor-agg-header-title sidebar-item-title">\
    Layered Graphs Visualization\
  </div>\
<div class="euiSpacer euiSpacer--m"></div>\
<div class="euiSpacer euiSpacer--m"></div>\
<div class="sidebar-item vis-editor-agg-wrapper form-group vis-editor-agg ng-pristine ng-valid ng-valid-json-input ng-valid-required">\
  <div class="metrics vis-editor-agg-group">\
        <div class="euiSpacer euiSpacer--m"></div>\
        <label for="index">Index Name</label>\
        <div>\
        <input type=\"text\" id=\"index\" value=\"\" class="form-control ng-pristine ng-valid ng-empty ng-touched">\
        </div>\
        <div class="euiSpacer euiSpacer--m"></div>\
        <label for="record-id">Record ID</label>\
        <div>\
        <input type=\"text\" id=\"record-id\" value=\"\" class="form-control ng-pristine ng-valid ng-empty ng-touched">\
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
  var index = document.getElementById("index").value;
  var query = document.getElementById("record-id").value;
  var field = document.getElementById("field").value;
  var redirecturl;
  redirecturl = serverurl+"/plugin?name=layered-graphs&index="+index+"&query="+query+"&field="+field;
  document.getElementById("urltext").value = redirecturl;
}

document.getElementById("kibanadiv").innerHTML = UI;
