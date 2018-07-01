var UI= '\
<div class="vis-editor-agg-header-title sidebar-item-title">\
    Github Visualization\
</div>\
<div class="euiSpacer euiSpacer--m"></div>\
<div class="sidebar-item vis-editor-agg-wrapper form-group vis-editor-agg ng-pristine ng-valid ng-valid-json-input ng-valid-required">\
  <div class="metrics vis-editor-agg-group">\
        <label for="myLink">Repo Owner Name</label>\
        <div>\
        <input type=\"text\" id=\"myLink\" value=\"\" class="form-control ng-pristine ng-valid ng-empty ng-touched">\
        </div>\
        <div class="euiSpacer euiSpacer--m"></div>\
        <label for="myLink">Repo Name</label>\
        <div>\
        <input type=\"text\" id=\"reponame\" value=\"\" class="form-control ng-pristine ng-valid ng-empty ng-touched">\
        </div>\
        <div class="euiSpacer euiSpacer--m"></div>\
        <label for="myLink">Repo Tag</label>\
        <div>\
        <input type=\"text\" id=\"repotag\" value=\"\" class="form-control ng-pristine ng-valid ng-empty ng-touched">\
        </div>\
        <div class="euiSpacer euiSpacer--m"></div>\
        <label for="myLink">FilePath</label>\
        <div>\
        <input type=\"text\" id=\"filepath\" value=\"\" class="form-control ng-pristine ng-valid ng-empty ng-touched">\
        </div>\
        <div class="euiSpacer euiSpacer--m"></div>\
        <label for="myLink">FileType</label>\
        <div>\
        <input type=\"text\" id=\"filetype\" value=\"\" class="form-control ng-pristine ng-valid ng-empty ng-touched">\
        </div>\
        <div class="euiSpacer euiSpacer--m"></div>\
  </div>\
    <button onclick=\"onClick()\" class="kuiButton kuiButton--secondary kuiButton--large">Submit</button>\
</div>';
      function onClick() {
        var owner = document.getElementById("myLink").value;
        var name = document.getElementById("reponame").value;
        var tag = document.getElementById("repotag").value;
        var path = document.getElementById("filepath").value;
        var type = document.getElementById("filetype").value;
        var redirecturl;
        redirecturl = serverurl + "/plugin?name=github&owner="+ owner + "&repo=" + name+ "&tag=" + tag+ "&filepath=" + path + "&filetype="+type; 
        document.getElementById("urltext").value = redirecturl;
      }
document.getElementById("kibanadiv").innerHTML = UI;
