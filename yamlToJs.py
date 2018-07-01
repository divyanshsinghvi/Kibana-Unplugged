import sys
import os
import zipfile
import requests
import yaml


# file=sys.argv[1]
# z = zipfile.ZipFile(file, 'r')
# z.extractall(path=os.path.dirname(file))
# z.close()

# url="http://localhost:8000/upload"

# fileobj = open(sys.argv[1], 'rb')
# print(sys.argv[1])
# files = {'file': fileobj}
# print(fileobj)
# try:
    # r = requests.post(url, files=files)
    # print(r.text)
# finally:
    # fileobj.close()


filename = sys.argv[1]

with open(filename) as stream:
   py_dict = yaml.load(stream)
   title = py_dict['title'];
   plugin = py_dict['plugin'];
   form = py_dict['form'];
   UI = '<div class="vis-editor-agg-header-title sidebar-item-title">'+title+'</div>'

   spacer = '<div class="euiSpacer euiSpacer--m"></div>';
   UI=UI+spacer;
   commonFront='<div class="sidebar-item vis-editor-agg-wrapper form-group vis-editor-agg ng-pristine ng-valid ng-valid-json-input ng-valid-required"><div class="metrics vis-editor-agg-group">'
   UI = UI + commonFront;
   commonBack = '</div>'
   commonClass = ' class="form-control ng-pristine ng-valid ng-empty ng-touched" ';
   for formElem in form:
      type = formElem['type'];
      value = formElem['value'];
      if type == 'divider':
         tmp = '<span class="vis-editor-agg-header-title">'+value+'</span>'
         tmp = tmp+spacer;
         tmp = commonBack + commonBack + tmp + commonFront;
         UI = UI + tmp;
         continue;
      label = formElem['label'];
      if type == 'input':
         tmp = '<label for="'+formElem['name']+'">'+label+'</label>'
         tmp = tmp+'<div><input type="text" id="'+formElem['name']+'"  value="'+value+'" '+commonClass+' ></div>';
         tmp = tmp + spacer;
         UI = UI + tmp;
         # print(tmp);
      if type == 'textarea':
         tmp = '<label for="'+formElem['name']+'">'+label+'</label>';
         tmp = tmp + '<div><textarea id="'+formElem['name']+'" rows="10" cols="30" '+commonClass+'></textarea><br></div>';
         tmp = tmp + spacer;
         UI = UI + tmp;
         # print(tmp)
   UI = UI + commonBack;
   # add button
   UI = UI + '<button onclick=\"onClick()\" class="kuiButton kuiButton--secondary kuiButton--large">Submit</button>';
   UI = UI + commonBack;
   js ='var UI = \''+UI+'\';\n';
   js += 'function onClick() {\n';
   js += 'var redirecturl;\n';
   lst=[]
   tmpLst=[]
   for formElem in form:
      if formElem['type'] == 'divider':
         lst.append(tmpLst);
         tmpLst=[]
         continue;
      tmpLst.append(formElem['name']);
      js += 'var '+formElem['name']+' = document.getElementById("'+formElem['name']+'").value;\n';
   lst.append(tmpLst);
   commonRedirect = 'redirecturl = serverurl+"/plugin?name='+plugin+'"';
   for ii in range(len(lst)):
      lstElem = lst[ii];
      ifCond = '';
      tmpRedirect = commonRedirect;
      for i in range(len(lstElem)):
         if i > 0:
            ifCond += ' && ';
         elem = lstElem[i];
         ifCond += elem+'!=\'\''
         tmpRedirect += '+"&'+elem+'="+'+elem;
      tmpRedirect+=';';
      if ii == 0:
         js += 'if('+ifCond+') {\n';
         js += tmpRedirect + '\n} ';
      elif ii == len(lst)-1:
         js += 'else {\n';
         js += tmpRedirect + '\n} ';
      else:
         js += 'else if ('+ifCond+') {\n';
         js += tmpRedirect + '\n} ';
   js += 'document.getElementById("urltext").value = redirecturl;';
   js += '}\n';
   js += 'document.getElementById("kibanadiv").innerHTML = UI;'
   print(js);



