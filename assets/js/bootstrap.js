require('../../vendor/angular/angular');
require('./modules/d3');
require('./modules/directives');
require('./modules/services');

angular.module('kitApp', ['d3', 'kitApp.directives', 'kitApp.services']);
