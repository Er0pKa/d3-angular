module.exports = ['d3Factory', function(d3Factory) {
  return {
    scope: true,
    restrict: 'A',
    link: function($scope, $element, $attrs) {
      d3Factory.d3().then(function(d3) {
        $scope.editor = {
          behavior: {
            dragging: false
          },
            grid: {
              sizeXmm: 5,
              sizeYmm: 5
          },
          position: {
            x: 0,
            y: 0
          },
          pageProperties: {
            widthMm: 297,
            height: 210
          }
        }
      });
    }
  }
}];