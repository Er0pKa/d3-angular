module.exports = ['d3Factory', 'kitSystemShapeDrawerFactory', function(d3Factory, drawer) {
  return {
    scope: true,
    restrict: 'A',
    priority: 1,
    link: function($scope, $element, $attrs) {
      d3Factory.then(function(d3) { 
        $scope.shape.moniker = 'core.gear';

        
        // /**
        //  * 
        //  * @param {*} d3 
        //  * @param {*} holder 
        //  * @param {*} pixelsPerMm 
        //  * @param {*} radiusInner 
        //  * @param {*} radiusOuter 
        //  * @param {*} toothHeight 
        //  * @param {*} innerAnnulus - внутреннее кольцо
        //  * @param {*} outerAnnulus - внешннее кольцо
        //  * @param {*} innerAnnulus.innerRadius - внутренний радуис внутреннего кольца
        //  * @param {*} innerAnnulus.outerRadius - внешний радуис внутреннего кольца
        //  * @param {*} outerAnnulus.innerRadius - внутренний радиус внешнего кольца
        //  * @param {*} outerAnnulus.outerRadius - внешний радуис внутреннего кольца
        //  */
        /*
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
                  rOuter * Math.cos(a0 += step), ',', rOuter * Math.sin(a0),
                  'L', rTooth * Math.cos(a0 += s), ',', rTooth * Math.sin(a0),
                  'A', rTooth, ',', rTooth, ' 0 0 1 ',
                  rTooth * Math.cos(a0 += s), ',', rTooth * Math.sin(a0),
                  'L', rOuter * Math.cos(a0 += s), ',', rOuter * Math.sin(a0)
                );
              }
           
              pathString.push(
                'M0', -rInner,
                'A', rInner, ',', rInner, ' 0 0 0 0,', rInner,
                'A', rInner, ',', rInner, ' 0 0 0 0,', -rInner,
                'Z'
              );

              return pathString.join('');              
            }

            var _outerAnnulus = d3.svg.arc()
              .innerRadius(outerAnnulus.innerRadius * pixelsPerMm)
              .outerRadius(outerAnnulus.outerRadius * pixelsPerMm)
              .startAngle(0)
              .endAngle(Math.PI * 2);
            
            var _innerAnnulus = d3.svg.arc()
              .innerRadius(innerAnnulus.innerRadius * pixelsPerMm)
              .outerRadius(innerAnnulus.outerRadius * pixelsPerMm)
              .startAngle(0)
              .endAngle(Math.PI * 2);

            holder.append('path')
              .attr('class', 'gear-outer-circle')
              .attr('d', _outerAnnulus);
              
            holder.append('path')
              .attr('class', 'gear-inner-circle')
              .attr('d', _innerAnnulus);


            return holder.append('path')
              .attr('class', 'gear')
              .attr('d', drawGear( teeth,
              radiusInner * pixelsPerMm,
              radiusOuter * pixelsPerMm,
              toothHeight * pixelsPerMm ));
          }
          */
          $scope.shape.svg.gear = drawer.drawGearWheel(d3,
            $scope.shape.svg.d3Object,
            $scope.editor.features.pixelsPerMm,
            8, 5, 9, 2, {
              innerRadius: 2.5,
              outerRadius: 5
            }, {
              innerRadius: 2.5,
              outerRadius: 8
            });

            var speed = 0.05;
            var start = Date.now();

            d3.timer(function(){
              $scope.shape.svg.gear.attr('transform',
              'rotate(' + (Date.now() - start) * speed + ')')
              
            })
            
      });
    }
  }
}];
