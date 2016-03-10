(function () {
  'use strict';

  angular.module('myapp', [
      'restlet.strings'
    ])

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

    .directive('clientRange', function () {
      return {
        restrict: 'E',
        scope: {},
        template: [
          '<div>client range ',
          '<p></p>',
          '<my-range ng-model="item1.value" items="[50, 100, 250, 500, 1000]"></my-range>',
          '<p></p>',
          '<my-range ng-model="item2.value" items="[5, 10, 15, 20, 25]"></my-range>',
          '<p></p>',
          '<my-range ng-model="item3.value" items="[\'50 K\', \'100 K\', \'250 K\', \'500 K\', \'1,000 K\', \'5,000 K\']"></my-range>',
          '<p></p>',
          '<my-range ng-model="item4.value" items="[\'0.1 GB\', \'0.5 GB\', \'1 GB\', \'5 GB\']"></my-range>',
          '</div>'
        ].join(''),
        link: function ($scope) {
          $scope.item1 = {
            value: null
          };
          $scope.item2 = {
            value: null
          };
          $scope.item3 = {
            value: null
          };
          $scope.item4 = {
            value: null
          };
        },
        controller: function ($scope) {
        }
      };
    })

    .directive('myRange', function ($window) {
      return {
        restrict: 'E',
        scope: {
          ngModel: '=',
          items: '='
        },
        templateUrl: 'myRange.html',
        link: function ($scope, element) {

          var COLORS = {
            green: '#89B76C',
            gray: '#F2F2F2'
          };

          var rangeElement = angular.element(element[ 0 ].querySelector('input[type=range]'));
          var min = 0;
          var max = $scope.items.length - 1;

          $scope.range = {
            value: 0
          };

          rangeElement.attr('min', min);
          rangeElement.attr('max', max);
          rangeElement.attr('value', $scope.range.value);

          updateRangeSkin($scope.range.value, min, max);

          $scope.$watch('range.value', function (newValue, oldValue) {
            if (newValue !== oldValue) {
              updateRangeSkin(newValue, min, max);
            }
          });

          $scope.getSelectedStyle = getSelectedStyle;

          function updateRangeSkin (value, min, max) {
            var percent = (value - min) * 100 / (max - min);

            var values = { percent: percent };
            _.merge(values, COLORS);

            rangeElement.css('background-image', '-webkit-gradient(linear, left top, right top, color-stop({percent}%, {green}), color-stop({percent}%, {gray}))'
              .format(values));

            rangeElement.css('background-image', '-moz-linear-gradient(left center, {green} 0%, {green} {percent}%, {gray} {percent}%, {gray} 100%)'
              .format(values));
          }

          function getSelectedStyle (index) {
            return _.parseInt($scope.range.value) === index ? 'range-selected-item' : '';
          }

        },
        controller: function ($scope) {
        }
      };
    })

  ;

})();
