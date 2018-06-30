import { uiModules } from 'ui/modules';
const module = uiModules.get('kibana/kibana-html-plugin', ['kibana', 'ui.ace']);

module.controller('KbnHtmlEditController', ['$scope', function($scope) {
  $scope.aceLoaded = function(_editor){
    _editor.$blockScrolling = Infinity;
  };   
}]);

module.controller('KbnHtmlVisController', function ($scope, $sce) {
       //$scope.html = $sce.trustAsHtml('<!DOCTYPE html><html><body><div id="kibanadiv"> </div> <script src="http://localhost:8000/js/pluginlist.js" id="kibanascript"></script> </body></html>');
       
       $scope.$watch('renderComplete', function () {
  
  var html = $scope.vis.params.html;
  console.log($scope.vis);
 
    if (html){
    	//$scope.html = $sce.trustAsHtml('<!DOCTYPE html><html><body><div id="thatswhatshesaid"> </div><script>var HttpClient = function() {this.get = function(aUrl, aCallback) {var anHttpRequest = new XMLHttpRequest();anHttpRequest.onreadystatechange = function() { if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)aCallback(anHttpRequest.responseText);};anHttpRequest.open( "GET", aUrl, true );anHttpRequest.send( null );}};var client = new HttpClient();client.get(\'http://localhost:8000/pluginList\',function(response){console.log(response);document.getElementById("thatswhatshesaid").innerHTML = response;});</script></body></html>');
    //  $scope.html = $sce.trustAsHtml('<!DOCTYPE html><html><body><div id="thatswhatshesaid"> </div><script></script></body></html>');
    console.log(html);
    var a='<iframe src=';
    var b=' width="100%" height="100%"></iframe>';
    var c=html.match(/<p.*id=\"redirectURL\"[!>]*>(.*)<\/p>/gm);
    console.log(c);
    $scope.html = $sce.trustAsHtml('<!DOCTYPE html><html><body>'+a+c+b+'</body></html>');
       
     }

    $scope.renderComplete();
  });
});
