module.exports = ['d3Factory', function(d3Factory) {
  return {
    scope: true,
    restrict: 'A',
    priority: 1,
    link: function($scope, $element, $attrs) {
      d3Factory.then(function(d3) { 
        $scope.shape.moniker = 'core.gear';
        /**
         * 
         * @param {*} d3 
         * @param {*} holder 
         * @param {*} pixelsPerMm 
         * @param {*} radiusInner 
         * @param {*} radiusOuter 
         * @param {*} toothHeight 
         * @param {*} innerAnnulus - внутреннее кольцо
         * @param {*} outerAnnulus - внешннее кольцо
         */
          function drawGearWheel(d3, holder, pixelsPerMm, teeth,
                   radiusInner, radiusOuter, toothHeight, innerAnnulus, outerAnnulus) {

            function drawGear(teeth, radiusInner, radiusOuter, toothHeight) {
              var rOuter = Math.abs(radiusOuter);
              var rInner = Math.abs(radiusInner);
              var rTooth = rOuter + toothHeight;
              var step = Math.PI / teeth;
              var i = -1;
              var a0 = -Math.PI / 2;
              var s = step / 3;
              var pathString = ['M0', rOuter * Math.sin(a0)];

              while (++i < teeth) {
                pathString.push('A', rOuter, ',', rOuter, ' 0 0 1 ',
                  rOuter *Math.cos(a0 += step), ',', rOuter * Math.sin(a0),
                  'L', rTooth * Math.cos(a0 += s), ',', rTooth * Math.sin(a0),
                  'A', rTooth, ',', rTooth, ' 0 0 1 ',
                  rTooth *Math.cos(a0 += s), ',', rTooth * Math.sin(a0),
                  'L', rOuter * Math.cos(a0 += s), ',', rOuter * Math.sin(a0)
                );
              }
              console.log('A', rOuter, ',', rOuter, ' 0 0 1 ',
                  rOuter *Math.cos(a0 += step), ',', rOuter * Math.sin(a0),
                  'L', rTooth * Math.cos(a0 += s), ',', rTooth * Math.sin(a0),
                  'A', rTooth, ',', rTooth, ' 0 0 1 ',
                  rTooth *Math.cos(a0 += s), ',', rTooth * Math.sin(a0),
                  'L', rOuter * Math.cos(a0 += s), ',', rOuter * Math.sin(a0));
              
              pathString.push(
                'M0', -rInner,
                'A', rInner, ',', ' 0 0 0 0,', rInner,
                'A', rInner, ',', ' 0 0 0 0,', -rInner,
                'Z'
              );

              console.log('M0', -rInner,
                'A', rInner, ',', ' 0 0 0 0,', rInner,
                'A', rInner, ',', ' 0 0 0 0,', -rInner,
                'Z');

              return pathString.join('');              
            }

            return holder.append('path')
              .attr('class', 'gear')
              .attr('d', drawGear( teeth,
              radiusInner * pixelsPerMm,
              radiusOuter * pixelsPerMm,
              toothHeight * pixelsPerMm ));
          }

          drawGearWheel(d3,
            $scope.shape.svg.d3Object,
            $scope.editor.features.pixelsPerMm,
            8, 5, 9, 2, {}, {});
      });
    }
  }
}];
