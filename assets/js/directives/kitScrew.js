module.exports = ['d3Factory', function(d3Factory) {
  return {
    scope: true,
    restrict: 'A',
    priority: 1,
    link: function($scope, $element, $attrs) {
      d3Factory.then(function (d3) {
        $scope.shape.moniker = 'core.screw';
        console.log('working');
        function drawScrew(d3, holder, pixelsPerMm,
          outerHexSize, innerHexSize) {
            function hexagon (size) {
              var path = ['M0', -size];
              var i =-1;
              while (++i < 7) {
                var angle = Math.PI / 3 * i + Math.PI / 2;
                path.push('L', size * Math.cos(angle), ',',
              size * Math.sin(angle));
              }

              path.push('z');

              return path.join('');              
            }
            holder.append('path')
              .attr('class', 'screw outer-hex')
              .attr('d', hexagon(outerHexSize * pixelsPerMm));
            
            holder.append('path')
              .attr('class', 'screw inner-hex')
              .attr('d', hexagon(innerHexSize * pixelsPerMm));

            
          }
          $scope.shape.svg.shapeObject = drawScrew(d3, $scope.shape.svg.d3Object,
            $scope.editor.features.pixelsPerMm, 4, 2);
      });
    }
  }
}];