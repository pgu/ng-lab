angular.module('restlet.strings', [])
  .config(function () {
    'use strict';

    if (!String.prototype.format) {
      /**
       * Formats the given String with the provided values.
       * For instance : "{0} is dead, but {1} is alive! Long live {1}!".format("Java", "JavaScript")
       * Prints "Java is dead, but JavaScript is alive! Long live JavaScript!"
       *
       * @see http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format#answer-4673436
       * @returns {string}
       */
      String.prototype.format = function () {
        var args = Array.prototype.slice.call(arguments);
        if (_.isObject(_.first(args))) {
          return replaceNamedParameters(this, _.first(args));
        } else {
          return this.replace(/{(\d+)}/g, function (match, number) {
            return _.isUndefined(args[ number ]) ? match : args[ number ];
          });
        }
      };
    }

    if (!String.prototype.formatUri) {
      /**
       * Formats the given URI with the provided parameters.
       * For instance : '/{cellId}/version/{versionName}'.formatUri({
       *  cellId: 2,
       *  versionName: 'foo/bar'
       * })
       * Prints '/2/version/foo%2Fbar'

       * @param {Object} the named parameters to apply for formatting.
       * @returns {string}
       */
      String.prototype.formatUri = function (params) {
        return replaceNamedParameters(this, params, encodeURIComponent);
      };
    }

    if (!String.prototype.endsWith) {

      // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith#Polyfill
      String.prototype.endsWith = function (searchString, position) {
        var subjectString = this.toString();
        if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
          position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.indexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
      };
    }

    function replaceNamedParameters (string, params, transformer) {
      return string.replace(/{(\w+)}/g, function ($0, match) {
        if (_.isUndefined(params[ match ])) {
          throw new Error('The param {0} is undefined'.format(match));
        }
        return transformer ? transformer(params[ match ]) : params[ match ];
      });
    }
  });
