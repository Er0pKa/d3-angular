// module.exports = function centerButton() {
//   // d3.select('svg-container')
//   //   .attr()
//   console.log($scope.editor);
// };

module.exports = ['d3Factory', function (d3Factory) {
  return {
    scope: true,
    restrict: 'A',
    link: function centerButton($scope, $element, $attrs) {
      d3Factory.d3().then(function(d3) {
        console.log($scope.$parent.editor);
        // console.log(d3.select('.svg-container'));
      });
    }
  }
}];