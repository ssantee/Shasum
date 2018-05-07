'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var crypto = require('crypto');
var fs = require('fs');

var validHashes = ['md5', 'sha256', 'sha512'];

var Hasher = function () {
    function Hasher(hashType) {
        _classCallCheck(this, Hasher);

        if (this.checkValidHash(hashType)) {

            this.hashType = hashType;

            this.hash = crypto.createHash(hashType);
        } else {

            throw new Error('Invalid hash type passed to Hasher constructor', 'Hasher.js');
        }
    }

    _createClass(Hasher, [{
        key: 'checkValidHash',
        value: function checkValidHash(input) {

            if (validHashes.indexOf(input) !== -1) {

                return true;
            }

            return false;
        }
    }, {
        key: 'doHash',
        value: function doHash(file) {
            var _this = this;

            var input = fs.createReadStream(file.filePath);
            var rhash;

            input.on('readable', function () {

                var data = input.read();

                if (data) {

                    _this.hash.update(data);
                } else {

                    rhash = _this.hash.digest('hex');

                    file.addHash(rhash, _this.hashType);
                }
            });

            input.on('error', function (err) {

                throw new Error(err);
            });
        }
    }]);

    return Hasher;
}();

module.exports = Hasher;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9IYXNoZXIuanMiXSwibmFtZXMiOlsiY3J5cHRvIiwicmVxdWlyZSIsImZzIiwidmFsaWRIYXNoZXMiLCJIYXNoZXIiLCJoYXNoVHlwZSIsImNoZWNrVmFsaWRIYXNoIiwiaGFzaCIsImNyZWF0ZUhhc2giLCJFcnJvciIsImlucHV0IiwiaW5kZXhPZiIsImZpbGUiLCJjcmVhdGVSZWFkU3RyZWFtIiwiZmlsZVBhdGgiLCJyaGFzaCIsIm9uIiwiZGF0YSIsInJlYWQiLCJ1cGRhdGUiLCJkaWdlc3QiLCJhZGRIYXNoIiwiZXJyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUVBLElBQU1BLFNBQVNDLFFBQVEsUUFBUixDQUFmO0FBQ0EsSUFBTUMsS0FBS0QsUUFBUSxJQUFSLENBQVg7O0FBRUEsSUFBTUUsY0FBYyxDQUNoQixLQURnQixFQUVoQixRQUZnQixFQUdoQixRQUhnQixDQUFwQjs7SUFNTUMsTTtBQUNGLG9CQUFhQyxRQUFiLEVBQXVCO0FBQUE7O0FBRW5CLFlBQUksS0FBS0MsY0FBTCxDQUFxQkQsUUFBckIsQ0FBSixFQUFxQzs7QUFFakMsaUJBQUtBLFFBQUwsR0FBZ0JBLFFBQWhCOztBQUVBLGlCQUFLRSxJQUFMLEdBQVlQLE9BQU9RLFVBQVAsQ0FBbUJILFFBQW5CLENBQVo7QUFDSCxTQUxELE1BTUk7O0FBRUEsa0JBQU0sSUFBSUksS0FBSixDQUFXLGdEQUFYLEVBQTZELFdBQTdELENBQU47QUFDSDtBQUNKOzs7O3VDQUVlQyxLLEVBQU87O0FBRW5CLGdCQUFJUCxZQUFZUSxPQUFaLENBQXFCRCxLQUFyQixNQUFpQyxDQUFDLENBQXRDLEVBQXlDOztBQUVyQyx1QkFBTyxJQUFQO0FBQ0g7O0FBRUQsbUJBQU8sS0FBUDtBQUNIOzs7K0JBRU9FLEksRUFBTTtBQUFBOztBQUVWLGdCQUFNRixRQUFRUixHQUFHVyxnQkFBSCxDQUFxQkQsS0FBS0UsUUFBMUIsQ0FBZDtBQUNBLGdCQUFJQyxLQUFKOztBQUVBTCxrQkFBTU0sRUFBTixDQUFTLFVBQVQsRUFBcUIsWUFBTzs7QUFFeEIsb0JBQU1DLE9BQU9QLE1BQU1RLElBQU4sRUFBYjs7QUFFQSxvQkFBSUQsSUFBSixFQUFTOztBQUVMLDBCQUFLVixJQUFMLENBQVVZLE1BQVYsQ0FBaUJGLElBQWpCO0FBQ0gsaUJBSEQsTUFJSzs7QUFFREYsNEJBQVEsTUFBS1IsSUFBTCxDQUFVYSxNQUFWLENBQWlCLEtBQWpCLENBQVI7O0FBRUFSLHlCQUFLUyxPQUFMLENBQWNOLEtBQWQsRUFBcUIsTUFBS1YsUUFBMUI7QUFDSDtBQUNKLGFBZEQ7O0FBZ0JBSyxrQkFBTU0sRUFBTixDQUFVLE9BQVYsRUFBbUIsVUFBRU0sR0FBRixFQUFXOztBQUUxQixzQkFBTSxJQUFJYixLQUFKLENBQVdhLEdBQVgsQ0FBTjtBQUNILGFBSEQ7QUFJSDs7Ozs7O0FBR0xDLE9BQU9DLE9BQVAsR0FBaUJwQixNQUFqQiIsImZpbGUiOiJIYXNoZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGNyeXB0byA9IHJlcXVpcmUoJ2NyeXB0bycpO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuXG5jb25zdCB2YWxpZEhhc2hlcyA9IFtcbiAgICAnbWQ1JyxcbiAgICAnc2hhMjU2JyxcbiAgICAnc2hhNTEyJ1xuXTtcblxuY2xhc3MgSGFzaGVye1xuICAgIGNvbnN0cnVjdG9yKCBoYXNoVHlwZSApe1xuXG4gICAgICAgIGlmKCB0aGlzLmNoZWNrVmFsaWRIYXNoKCBoYXNoVHlwZSApICl7XG5cbiAgICAgICAgICAgIHRoaXMuaGFzaFR5cGUgPSBoYXNoVHlwZTtcblxuICAgICAgICAgICAgdGhpcy5oYXNoID0gY3J5cHRvLmNyZWF0ZUhhc2goIGhhc2hUeXBlICk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcblxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCAnSW52YWxpZCBoYXNoIHR5cGUgcGFzc2VkIHRvIEhhc2hlciBjb25zdHJ1Y3RvcicsICdIYXNoZXIuanMnICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja1ZhbGlkSGFzaCggaW5wdXQgKXtcblxuICAgICAgICBpZiggdmFsaWRIYXNoZXMuaW5kZXhPZiggaW5wdXQgKSAhPT0gLTEgKXtcblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZG9IYXNoKCBmaWxlICl7XG5cbiAgICAgICAgY29uc3QgaW5wdXQgPSBmcy5jcmVhdGVSZWFkU3RyZWFtKCBmaWxlLmZpbGVQYXRoICk7XG4gICAgICAgIHZhciByaGFzaDtcbiAgICAgICAgXG4gICAgICAgIGlucHV0Lm9uKCdyZWFkYWJsZScsICggKSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBpbnB1dC5yZWFkKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChkYXRhKXtcblxuICAgICAgICAgICAgICAgIHRoaXMuaGFzaC51cGRhdGUoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHJoYXNoID0gdGhpcy5oYXNoLmRpZ2VzdCgnaGV4Jyk7XG5cbiAgICAgICAgICAgICAgICBmaWxlLmFkZEhhc2goIHJoYXNoLCB0aGlzLmhhc2hUeXBlICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlucHV0Lm9uKCAnZXJyb3InLCAoIGVyciApID0+IHtcblxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCBlcnIgKTtcbiAgICAgICAgfSApO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBIYXNoZXI7XG4iXX0=