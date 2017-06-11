angular.module('d3', []).factory('d3Factory', [
    '$document',
    '$rootScope',
    '$window',
    '$q',
    function($document, $rootScope, $window, $q) {

      var scriptTag = $document[0].createElement('script');
      scriptTag.async = true;
      scriptTag.type = 'text/Javascript';
      scriptTag.src = '../../../vendor/d3/d3.js';
      
      var b = $document[0].body;
      b.appendChild(scriptTag);

      scriptTag.onload = function() {
        $rootScope.$apply(function() {d.resolve($window.d3);})
      };


      return $q(function(resolve, reject) {
        scriptTag.onload = function() {
          $rootScope.$apply();
          if ($window.d3)
            resolve($window.d3);
          else
          reject($window.d3);
        };
      });
    }
]);