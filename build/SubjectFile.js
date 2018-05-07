'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs');
var lastID = 0;

var SubjectFile = function () {
    function SubjectFile(filePath, objSectionMarker, renderCallback) {
        _classCallCheck(this, SubjectFile);

        this.id = lastID + 1;

        lastID = this.id;

        //check validity?
        this.filePath = filePath;

        this.uiselector = objSectionMarker + this.id;

        this.hashes = {};

        this.renderCallback = renderCallback;
    }

    _createClass(SubjectFile, [{
        key: 'renderType',
        value: function renderType() {

            this.renderCallback(this);
        }
    }, {
        key: 'renderHash',
        value: function renderHash(type) {

            this.renderCallback(this, type);
        }
    }, {
        key: 'addHash',
        value: function addHash(results, type) {

            this.hashes[type] = this.hashes[type] || {};

            this.hashes[type].hash = results;

            this.hashes[type].uiselector = '#' + this.uiselector + ' .file--' + type;

            this.renderHash(type);
        }
    }, {
        key: 'compareHashTo',
        value: function compareHashTo(inputHash, objectId) {

            return;
        }
    }]);

    return SubjectFile;
}();

module.exports = SubjectFile;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TdWJqZWN0RmlsZS5qcyJdLCJuYW1lcyI6WyJmcyIsInJlcXVpcmUiLCJsYXN0SUQiLCJTdWJqZWN0RmlsZSIsImZpbGVQYXRoIiwib2JqU2VjdGlvbk1hcmtlciIsInJlbmRlckNhbGxiYWNrIiwiaWQiLCJ1aXNlbGVjdG9yIiwiaGFzaGVzIiwidHlwZSIsInJlc3VsdHMiLCJoYXNoIiwicmVuZGVySGFzaCIsImlucHV0SGFzaCIsIm9iamVjdElkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUVBLElBQU1BLEtBQUtDLFFBQVEsSUFBUixDQUFYO0FBQ0EsSUFBSUMsU0FBUyxDQUFiOztJQUVNQyxXO0FBRUYseUJBQWFDLFFBQWIsRUFBdUJDLGdCQUF2QixFQUF5Q0MsY0FBekMsRUFBeUQ7QUFBQTs7QUFFckQsYUFBS0MsRUFBTCxHQUFVTCxTQUFTLENBQW5COztBQUVBQSxpQkFBUyxLQUFLSyxFQUFkOztBQUVBO0FBQ0EsYUFBS0gsUUFBTCxHQUFnQkEsUUFBaEI7O0FBRUEsYUFBS0ksVUFBTCxHQUFrQkgsbUJBQW1CLEtBQUtFLEVBQTFDOztBQUVBLGFBQUtFLE1BQUwsR0FBYyxFQUFkOztBQUVBLGFBQUtILGNBQUwsR0FBc0JBLGNBQXRCO0FBQ0g7Ozs7cUNBRVc7O0FBRVIsaUJBQUtBLGNBQUwsQ0FBcUIsSUFBckI7QUFDSDs7O21DQUVXSSxJLEVBQU07O0FBRWQsaUJBQUtKLGNBQUwsQ0FBcUIsSUFBckIsRUFBMkJJLElBQTNCO0FBQ0g7OztnQ0FFUUMsTyxFQUFTRCxJLEVBQU07O0FBRXBCLGlCQUFLRCxNQUFMLENBQWFDLElBQWIsSUFBc0IsS0FBS0QsTUFBTCxDQUFhQyxJQUFiLEtBQXVCLEVBQTdDOztBQUVBLGlCQUFLRCxNQUFMLENBQWFDLElBQWIsRUFBb0JFLElBQXBCLEdBQTJCRCxPQUEzQjs7QUFFQSxpQkFBS0YsTUFBTCxDQUFjQyxJQUFkLEVBQXFCRixVQUFyQixHQUFrQyxNQUFNLEtBQUtBLFVBQVgsR0FBd0IsVUFBeEIsR0FBcUNFLElBQXZFOztBQUVBLGlCQUFLRyxVQUFMLENBQWlCSCxJQUFqQjtBQUNIOzs7c0NBRWNJLFMsRUFBV0MsUSxFQUFVOztBQUVoQztBQUNIOzs7Ozs7QUFHTEMsT0FBT0MsT0FBUCxHQUFpQmQsV0FBakIiLCJmaWxlIjoiU3ViamVjdEZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbnZhciBsYXN0SUQgPSAwO1xuXG5jbGFzcyBTdWJqZWN0RmlsZXtcblxuICAgIGNvbnN0cnVjdG9yKCBmaWxlUGF0aCwgb2JqU2VjdGlvbk1hcmtlciwgcmVuZGVyQ2FsbGJhY2sgKXtcblxuICAgICAgICB0aGlzLmlkID0gbGFzdElEICsgMTtcblxuICAgICAgICBsYXN0SUQgPSB0aGlzLmlkO1xuXG4gICAgICAgIC8vY2hlY2sgdmFsaWRpdHk/XG4gICAgICAgIHRoaXMuZmlsZVBhdGggPSBmaWxlUGF0aDtcblxuICAgICAgICB0aGlzLnVpc2VsZWN0b3IgPSBvYmpTZWN0aW9uTWFya2VyICsgdGhpcy5pZDtcblxuICAgICAgICB0aGlzLmhhc2hlcyA9IHt9O1xuXG4gICAgICAgIHRoaXMucmVuZGVyQ2FsbGJhY2sgPSByZW5kZXJDYWxsYmFjaztcbiAgICB9XG5cbiAgICByZW5kZXJUeXBlKCl7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJDYWxsYmFjayggdGhpcyApO1xuICAgIH1cblxuICAgIHJlbmRlckhhc2goIHR5cGUgKXtcblxuICAgICAgICB0aGlzLnJlbmRlckNhbGxiYWNrKCB0aGlzLCB0eXBlICk7XG4gICAgfVxuXG4gICAgYWRkSGFzaCggcmVzdWx0cywgdHlwZSApe1xuXG4gICAgICAgIHRoaXMuaGFzaGVzWyB0eXBlIF0gPSB0aGlzLmhhc2hlc1sgdHlwZSBdIHx8IHt9O1xuXG4gICAgICAgIHRoaXMuaGFzaGVzWyB0eXBlIF0uaGFzaCA9IHJlc3VsdHM7XG5cbiAgICAgICAgdGhpcy5oYXNoZXMgWyB0eXBlIF0udWlzZWxlY3RvciA9ICcjJyArIHRoaXMudWlzZWxlY3RvciArICcgLmZpbGUtLScgKyB0eXBlO1xuXG4gICAgICAgIHRoaXMucmVuZGVySGFzaCggdHlwZSApO1xuICAgIH1cblxuICAgIGNvbXBhcmVIYXNoVG8oIGlucHV0SGFzaCwgb2JqZWN0SWQgKXtcblxuICAgICAgICByZXR1cm4gO1xuICAgIH0gICAgXG59XG5cbm1vZHVsZS5leHBvcnRzID0gU3ViamVjdEZpbGU7XG4iXX0=