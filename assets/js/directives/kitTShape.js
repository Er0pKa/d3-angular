module.exports = ['d3Factory', function(d3Factory) {
  return {
    scope: true,
    restrict: 'A',
    priority: 1,
    link: function($scope, $element, $attrs) {
      d3Factory.then(function(d3) { 
        $scope.shape.moniker = 'core.tshape';

        function drawTShape(d3, holder, pixelsPerMm, holeRadius, hHoleCount, vHoleCount) {

          function drawRectWithHoles(holeRadius, hHoleCount, vHoleCount) {
            var width = 10 * hHoleCount * pixelsPerMm;
            var height = 10 * vHoleCount * pixelsPerMm;
            var borderRadius = 2 * holeRadius;
            var pathString = '';
            var stepH = width / hHoleCount;
            var stepV = height / vHoleCount;
            var verticalPosition = 20 * pixelsPerMm;
            var verticalHoles = 3;
            var verticalLenght = (5 + verticalHoles * 10) * pixelsPerMm;

            // pathString += 'M0,0L100,100L200,0';
            positionHeight = verticalLenght + height - borderRadius;

            pathString += 'M' + borderRadius + ',' + positionHeight + // M18.897637128829956,37.79527425765991a
              'a' + borderRadius + ',' + borderRadius + ' 0 0 1 ' + -borderRadius + ',' + -borderRadius +
              'v' + -(height - 2 *borderRadius) +
              'a' + borderRadius + ',' + borderRadius + ' 0 0 1 ' + borderRadius + ',' + -borderRadius +
              'h' + ( -borderRadius + verticalPosition) +

              'v' + -(verticalLenght - 2 *borderRadius) +
              'a' + borderRadius + ',' + borderRadius + ' 0 0 1 ' + borderRadius + ',' + -borderRadius +
              'a' + borderRadius + ',' + borderRadius + ' 0 0 1 ' + borderRadius + ',' + borderRadius +
              'v' + (verticalLenght - 2 *borderRadius) +
              
              'h' + ( -borderRadius + verticalPosition) +
              'a' + borderRadius + ',' + borderRadius + ' 0 0 1 ' + borderRadius + ',' + borderRadius +

              'v' + (height - 2 * borderRadius) +
              'a' + borderRadius + ',' + borderRadius + ' 0 0 1 ' + -borderRadius + ',' + borderRadius +
              'z';

            for (var j = 0; j < vHoleCount; j++) {
              for (var i = 0; i < hHoleCount; i++) {
                pathString += 'M' + (i * stepH + stepH / 2) + ',' +
                  (verticalLenght - borderRadius + j * stepV + stepV / 2 - holeRadius) +
                  'a' + holeRadius + ',' + holeRadius + ' 0 0 1 0 ' + ',' + (2 * holeRadius) +
                  'a' + holeRadius + ',' + holeRadius + ' 0 0 1 0 ' + ',' + -(2 * holeRadius) +
                  'z';
              }
            }

            vHoleCount = (verticalLenght - 20) / stepH;

            for ( j = 0; j < vHoleCount; j++) {              
              pathString += 'M' + (verticalPosition + borderRadius) + ',' +
                (borderRadius / 2 + j * stepV) +
                'a' + holeRadius + ',' + holeRadius + ' 0 0 1 0 ' + ',' + (2 * holeRadius) +
                'a' + holeRadius + ',' + holeRadius + ' 0 0 1 0 ' + ',' + -(2 * holeRadius) +
                'z';
            }

            // console.log(pathString);
            return pathString;
          }

          holder.append('path')
            .attr('d', drawRectWithHoles( holeRadius * pixelsPerMm, hHoleCount, vHoleCount));
        }

        drawTShape(d3, $scope.shape.svg.d3Object, $scope.editor.features.pixelsPerMm, 2.5, 5, 1);
      });
    }
  }
}];
