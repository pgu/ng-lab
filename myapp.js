(function () {
  'use strict';

  angular.module('myapp', [])

    .directive('d1', function () {
      return {
        restrict: 'E',
        scope: {},
        template: '<div>d1 <d11></d11></div>',
        link: function ($scope) {
          console.log('d1:link', performance.now());
        },
        controller: function ($scope) {
          console.log('d1:controller', performance.now());
        }
      };
    })

    .directive('d11', function () {
      return {
        require: '^d1',
        restrict: 'E',
        scope: {},
        template: '<div>d11 <d111></d111></div>',
        link: function ($scope) {
          console.log('d11:link', performance.now());
        },
        controller: function ($scope) {
          console.log('d11:controller', performance.now());
        }
      };
    })

    .directive('d111', function () {
      return {
        require: '^d11',
        restrict: 'E',
        scope: {},
        template: '<div>d111</div>',
        link: function ($scope) {
          console.log('d111:link', performance.now());
        },
        controller: function ($scope) {
          console.log('d111:controller', performance.now());
        }
      };
    })

    .directive('d2', function () {
      return {
        restrict: 'E',
        scope: {},
        template: '<div>d2</div>',
        link: function ($scope) {
          console.log('d2:link', performance.now());
        },
        controller: function ($scope) {
          console.log('d2:controller', performance.now());
        }
      };
    })

  ;

})();
