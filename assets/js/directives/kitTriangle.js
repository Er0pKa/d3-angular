module.exports = ['d3Factory', function(d3Factory) {
  return {
    scope: true,
    restrict: 'A',
    priority: 1,
    link: function($scope, $element, $attrs) {
      d3Factory.then(function (d3) {
        $scope.shape.moniker = 'core.screw';
        function drawTriangle(d3, holder, pixelsPerMm,
          holeRadius, hHoleCount, vHoleCount) {

            function drawTriangleWithHoles(holeRadius, hHoleCount, vHoleCount) {
              var borderRadius = 2 * holeRadius;
              var width = borderRadius * hHoleCount;
              var height = borderRadius * vHoleCount;
              var vDirection = Math.abs(height)/height;
              var hDirection = Math.abs(width)/width;
              var angle = Math.atan(width/height);
              var rotation = (vDirection == hDirection) ? 0 : 1;
              var pathString = ['M ', -borderRadius *(1 + Math.cos(angle)), ', ', borderRadius * (Math.sin(angle))];

              console.log(vDirection, hDirection, angle, rotation, borderRadius, width, height, pixelsPerMm);

              pathString.push(

                //a xradius, yradius, x-axis-rotation large-arc-flag sweep-flag x y

                ' a', borderRadius, ',', borderRadius, ' 0 0,', rotation,
                hDirection * -(borderRadius *(1 + Math.cos(angle))), ',',          //x coord
                vDirection * (borderRadius * (Math.sin(angle))),               //y coord

                ' v', height - 2 * borderRadius,
                ' a', borderRadius, ',', borderRadius, ' 0 0,', rotation,
                borderRadius * hDirection, ',', borderRadius * vDirection,
                ' h', (width - 2 * borderRadius),

                ' a', borderRadius, ',', borderRadius, ' 0 0,', rotation,
                hDirection * (borderRadius * Math.cos(angle)), ',',          //x coord
                vDirection * -(borderRadius * ( 1 + Math.sin(angle)))               //y coord
             
              );

              console.log(pathString.join(''));
              return pathString.join('');
            }
            
            return holder.append('path')
                    .attr('class', 'triangle')
                    .attr('d', drawTriangleWithHoles( holeRadius * pixelsPerMm, hHoleCount, vHoleCount));
          }
          $scope.shape.svg.shapeObject = drawTriangle(d3, $scope.shape.svg.d3Object,
            $scope.editor.features.pixelsPerMm, 2.5, -4, -4);
      });
    }
  }
}];