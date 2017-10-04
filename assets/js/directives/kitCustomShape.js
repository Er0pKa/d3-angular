module.exports = ['d3Factory', function(d3Factory) {
  return {
    scope: true,
    restrict: 'A',
    priority: 0,
    link: function($scope, $element, $attrs) {
      d3Factory.then(function(d3) {     
        //Drag
        $scope.shape = {
          dragBehavior: {
            dragOrigin: {
              x: 0,
              y: 0
            },
            snapFactor: 2
          },
          svg: {
            rootNode: $element[0],
            d3Object: d3.select($element[0])
          }
        };

        // $scope.shape.svg.d3Object.append('rect')   //test object for base tuning
        //   .attr('width', 10 * $scope.editor.features.pixelsPerMm)
        //   .attr('height', 10 * $scope.editor.features.pixelsPerMm);

          $scope.setDragOrigin = function(x, y) {
            $scope.shape.dragBehavior.dragOrigin.x = x;
            $scope.shape.dragBehavior.dragOrigin.y = y;
          }

          $scope.snapToGrid = function(coords, factor) {
            if (typeof factor === 'undefined')
              var snapFactor = $scope.shape.dragBehavior.snapFactor;
            else
              snapFactor = factor;
            
            var a = $scope.editor.grid.sizeXmm / snapFactor * $scope.editor.features.pixelsPerMm;
            var b = $scope.editor.grid.sizeYmm / snapFactor * $scope.editor.features.pixelsPerMm;

            return {
              x: Math.round(coords.x / a) * a,
              y: Math.round(coords.y / b) * b
            }
          };

          $scope.moveTo = function(x, y, shouldSnap) {
            $scope.setDragOrigin(x, y);
            var coords = {
              x: x,
              y: y
            };

            if (shouldSnap)
              coords = $scope.snapToGrid(coords, $scope.shape.dragBehavior.snapFactor);

            $scope.shape.svg.d3Object.attr('transform',
            'translate(' + coords.x + ',' + coords.y + ')');
          }

        var dragInitiated = false;

        $scope.shape.dragBehavior.dragObject = d3.behavior.drag()
          .origin(function() {
            return $scope.shape.dragBehavior.dragOrigin
          })
          .on('dragstart', function(){
            var e = d3.event.sourceEvent;

            e.stopPropagation();
            if (e.which === 1 || e instanceof TouchEvent) {
              dragInitiated = true;
              $scope.editor.behavior.dragging = true;
            }
          })
          .on('drag', function(){
            var coords = {
              x: d3.event.x,
              y: d3.event.y
            };
            if (dragInitiated) {
              $scope.moveTo(coords.x, coords.y, true);
            }
          })
          .on('dragend', function(){
            dragInitiated = false;
            $scope.editor.behavior.dragging = true;
          });

          $scope.shape.svg.d3Object.call( $scope.shape.dragBehavior.dragObject );

          var t = d3.transform($scope.shape.svg.d3Object.attr('transform'));
          var tSnapped = $scope.snapToGrid({
            x: t.translate[0],
            y: t.translate[1]            
          }, $scope.shape.dragBehavior.snapFactor);

          $scope.setDragOrigin(tSnapped.x, tSnapped.y);

          $scope.shape.svg.d3Object.attr('transform', 'translate(' +
            tSnapped.x + ',' + tSnapped.y + ')');

          $scope.bringToFront = function() {
            $scope.shape.svg.rootNode.parentNode.appendchild(
              $scope.shape.svg.rootNode);
          };
          
          $scope.doSingleRotation = function () {
            if (!$scope.shape.svg.d3Object.node().hasAttribute('data-kit-gear') &&
              !$scope.shape.svg.d3Object.node().hasAttribute('data-kit-screw')) {
                var path = $scope.shape.svg.d3Object.selectAll('path');
                var oldRotation = d3.transform(path.attr('transform'));
                var bBox = $scope.shape.svg.d3Object.node().getBBox();
                var centroid = [bBox.x + bBox.width / 2, bBox.y + bBox.height /2];

                path.attr('transform', 'rotate(' + (oldRotation.rotate + 90) + ',' + centroid[0] +
                  ',' + centroid[1] + ')');
              }
          };

          $scope.shape.svg.d3Object.on('mousedown', function () {
            var e = d3.event;

            if ( e.button === 0 && e.shiftKey ) {
              //[0, 1] * 9 -> [0, 9]
              d3.select(this).selectAll('path').style('fill', colors(Math.random() * 9 ));
            } else if ( e.altKey ){
              $element.remove();
              $element.destroy();
            } else if ( e.button === 1 ) {
              $scope.doSingleRotation();
            }
          });

          $scope.shape.svg.d3Object.on('dblclick', function () {
            d3.event.stopPropagation();
          })
      })
    }
  }
}];
