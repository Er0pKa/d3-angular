angular.module('d3', []).factory('d3Factory', [
    '$document',
    '$rootScope',
    '$window',
    '$q',
    function($document, $rootScope, $window, $q) {
      var d = $q.defer();

      var scriptTag = $document[0].createElement('script');
      scriptTag.async = true;
      scriptTag.type = 'text/Javascript';
      scriptTag.src = '../../../vendor/d3/d3.js';

      scriptTag.onload = function() {
        $rootScope.$apply(function() {d.resolve($window.d3);})
      };

      var b = $document[0].body;
      b.appendChild(scriptTag);

      return {
        d3: function() {
          return d.promise;
        }
      }
    }
]);