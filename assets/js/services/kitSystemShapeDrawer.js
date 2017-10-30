module.exports = function () {
  return {
    drawGearWheel: function (d3, holder, pixelsPerMm, teeth, radiusInner, radiusOuter, toothHeight,
                              innerAnnulus, outerAnnulus) {
      function drawGear(teeth, radiusInner, radiusOuter, toothHeight) {
        var rOuter = Math.abs(radiusOuter);
        var rInner = Math.abs(radiusInner);
        var rTooth = rOuter + toothHeight;
        var step = Math.PI / teeth;
        var i = -1;
        var a0 = -Math.PI / 2;
        var s = step / 3;
        var pathString = ['M0', rOuter * Math.sin(a0)];

        console.log('drawGear');

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
    },

    drawRect: function(d3, holder, pixelsPerMm, holeRadius, hHoleCount, vHoleCount) {            
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

    },

    drawTriangle: function (d3, holder, pixelsPerMm,
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

          // console.log(vDirection, hDirection, angle, rotation, borderRadius, width, height, pixelsPerMm);
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


          // console.log(angle, borderRadius, width, height, pixelsPerMm);

          

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
    },

    drawTShape: function (d3, holder, pixelsPerMm, holeRadius, hHoleCount, vHoleCount) {
      
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
        var positionHeight = verticalLenght + height - borderRadius;

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
    },

    drawScrew: function (d3, holder, pixelsPerMm, outerHexSize, innerHexSize) {
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
    },

    getDrawingMethod: function (moniker) {
      switch (moniker) {
        case 'core.gear':
          return this.drawGearWheel;
          break;
        case 'core.rect':
          return this.drawRect;
          break;
        case 'core.triangle':
          return this.drawTriangle;
          break;
        case 'core.t-shape':
          return this.drawTShape;
          break;
        case 'core.screw':
          return this.drawScrew;
          break;
        default:
          return null;
      }
    }
  };
};