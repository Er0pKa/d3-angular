module.exports = ['d3Factory', 'kitSystemShapeDrawerFactory', function(d3Factory, drawer) {
  function(d3Factory, drawer, $http) {
    //DDO - Directive Definition Object
    return {
      scope: true,
      restrict: 'A',
      priority: 1,
      link: function($scope, $element, $attrs) {
        d3Factory.then(function(d3) { 
          $scope.shape.moniker = 'core.rect';
          // $http.get('/api/data').then(function (response) {
          //   var list = response.data;
          //   var data = list[$scope.shape.moniker][$attrs.id];

          //   $scope.shape.svg.shapeObject = drawer.drawRect.apply(this, d3.merge(
          //     [
          //       [d3, $scope.shape.svg.d3Object, $scope.editor.features.pixelsPerMm],
          //       data
          //     ]
          //   ));
          // });

          drawer.drawRect(d3, $scope.shape.svg.d3Object, $scope.editor.features.pixelsPerMm, 2.5, 5, 1);
        });
      }
    }
  }
];