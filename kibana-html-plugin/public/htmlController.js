import { uiModules } from 'ui/modules';
const module = uiModules.get('kibana/kibana-html-plugin', ['kibana', 'ui.ace']);

module.controller('KbnHtmlEditController', ['$scope', function($scope) {
  $scope.aceLoaded = function(_editor){
    _editor.$blockScrolling = Infinity;
  };   
}]);

module.controller('KbnHtmlVisController', function ($scope, $sce) {
       $scope.html = $sce.trustAsHtml('<!DOCTYPE html><html><body><div id="kibanadiv"> </div> <script src="http://localhost:8000/js/pluginlist.js" id="kibanascript"></script> </body></html>');
       
       $scope.$watch('renderComplete', function () {
  
  var html = $scope.vis.params.html;
    if ($scope.updateStatus.params ){
    	//$scope.html = $sce.trustAsHtml('<!DOCTYPE html><html><body><div id="thatswhatshesaid"> </div><script>var HttpClient = function() {this.get = function(aUrl, aCallback) {var anHttpRequest = new XMLHttpRequest();anHttpRequest.onreadystatechange = function() { if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)aCallback(anHttpRequest.responseText);};anHttpRequest.open( "GET", aUrl, true );anHttpRequest.send( null );}};var client = new HttpClient();client.get(\'http://localhost:8000/pluginList\',function(response){console.log(response);document.getElementById("thatswhatshesaid").innerHTML = response;});</script></body></html>');
     $scope.html = $sce.trustAsHtml('<!DOCTYPE html><html><body><div id="thatswhatshesaid"> </div><script></script></body></html>');
     }

    $scope.renderComplete();
  });
});
