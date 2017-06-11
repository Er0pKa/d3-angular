module.exports = ['d3Factory', function(d3Factory) {
  return {
    scope: true,
    restrict: 'A',
    priority: 1,
    link: function($scope, $element, $attrs) {
      d3Factory.then(function(d3) { 
        $scope.shape.moniker = 'core.rect';

        function drawRect(d3, holder, pixelsPerMm, holeRadius, hHoleCount, vHoleCount) {

          function drawRectWithHoles(holeRadius, hHoleCount, vHoleCount) {
            var width = 10 * hHoleCount * pixelsPerMm;
            var height = 10 * vHoleCount * pixelsPerMm;
            var borderRadius = 2 * holeRadius;
            var pathString = '';
            var stepH = width / hHoleCount;
            var stepV = height / vHoleCount;


            // pathString += 'M0,0L100,100L200,0';
            pathString += 'M' + borderRadius + ',' + height +
              'a' + borderRadius + ',' + borderRadius + ' 0 0 1 ' + -borderRadius + ',' + -borderRadius +
              'v' + -(height - 2 *borderRadius) +
              'a' + borderRadius + ',' + borderRadius + ' 0 0 1 ' + borderRadius + ',' + -borderRadius +
              'h' + (width - 2 * borderRadius) +
              'a' + borderRadius + ',' + borderRadius + ' 0 0 1 ' + borderRadius + ',' + borderRadius +
              'v' + (height - 2 * borderRadius) +
              'a' + borderRadius + ',' + borderRadius + ' 0 0 1 ' + -borderRadius + ',' + borderRadius +
              'z';

            for (var j = 0; j < vHoleCount; j++) {
              for (var i = 0; i < hHoleCount; i++) {
                pathString += 'M' + (i * stepH + stepH / 2) + ',' +
                  (j * stepV + stepV / 2 - holeRadius) +
                  'a' + holeRadius + ',' + holeRadius + ' 0 0 1 0 ' + ',' + (2 * holeRadius) +
                  'a' + holeRadius + ',' + holeRadius + ' 0 0 1 0 ' + ',' + -(2 * holeRadius) +
                  'z';
              }
            }

            return pathString;
          }

          holder.append('path')
            .attr('d', drawRectWithHoles( holeRadius * pixelsPerMm, hHoleCount, vHoleCount));

        }
       
        drawRect(d3, $scope.shape.svg.d3Object, $scope.editor.features.pixelsPerMm, 2.5, 5, 1);

      });
    }
  }
}];
