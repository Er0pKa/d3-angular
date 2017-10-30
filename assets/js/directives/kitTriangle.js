module.exports = ['d3Factory', 'kitSystemShapeDrawerFactory', function(d3Factory, drawer) {
  return {
    scope: true,
    restrict: 'A',
    priority: 1,
    link: function($scope, $element, $attrs) {
      d3Factory.then(function (d3) {
        $scope.shape.moniker = 'core.screw';

        /*
        function drawTriangle(d3, holder, pixelsPerMm,
          holeRadius, hHoleCount, vHoleCount) {
            
            function drawTriangleWithHoles(holeRadius, hHoleCount, vHoleCount) {
              var borderRadius = 2 * holeRadius;
              var width = 2 * borderRadius * hHoleCount;
              var height = 2 * borderRadius * vHoleCount;
              var angle = Math.atan(width/height);              
              var pathString = [];
              // console.log(typeof(pathString));
              
              var pathString = ['M ', borderRadius *(1 + Math.cos(angle)), ', ',
                  borderRadius * (Math.sin(angle))];

              // console.log(angle, borderRadius, width, height, pixelsPerMm);

              pathString.push(

                //a xradius, yradius, x-axis-rotation large-arc-flag sweep-flag x y

                ' a', borderRadius, ',', borderRadius, ' 0 0 0,', 
                 (borderRadius * (1 + Math.cos(angle))), ', ',          //x coord
                 -(borderRadius * (Math.sin(angle))),               //y coord

                ' v', -height + 2 * borderRadius,
                ' a', borderRadius, ', ', borderRadius, ' 0 0 0,',
                -borderRadius, ', ', -borderRadius,
                ' h', -width + 2 * borderRadius,

                ' a', borderRadius, ',', borderRadius, ' 0 0 0,',
                -(borderRadius * Math.cos(angle)), ',',          //x coord
                (borderRadius * ( 1 + Math.sin(angle))), ' z'               //y coord 

              );
              // console.log(pathString.join(''));

              for (var i = 0; i < hHoleCount; i++) {  //vertical
                for (var j = i; j < vHoleCount; j++) {  //horizontal
                  pathString.push( 'M' + ( 5 * holeRadius - i * 2 * borderRadius ) + ', ' +
                    ( -holeRadius - j * 2 * borderRadius) +
                    ' a' + holeRadius + ', ' + holeRadius + ' 0 0 1 0 ' + ', ' + (2 * holeRadius) +
                    ' a' + holeRadius + ', ' + holeRadius + ' 0 0 1 0 ' + ', ' + -(2 * holeRadius) +
                    ' z ');
                }
              }
              // console.log(pathString);
              // console.log(typeof(pathString));
              // console.log(pathString.join(''));
              return pathString.join('');
            }
            
            return holder.append('path')
                    .attr('class', 'triangle')
                    .attr('d', drawTriangleWithHoles( holeRadius * pixelsPerMm, hHoleCount, vHoleCount));
          }
          */

          $scope.shape.svg.shapeObject = drawer.drawTriangle(d3, $scope.shape.svg.d3Object,
            $scope.editor.features.pixelsPerMm, 2.5, 4, 4);
      });
    }
  }
}];