"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CoverClab = function () {
	function CoverClab() {
		_classCallCheck(this, CoverClab);
	}

	_createClass(CoverClab, [{
		key: "beforeRegister",
		value: function beforeRegister() {
			this.is = "cover-clab";
			this.properties = {
				beta: {
					type: Boolean,
					value: false
				},
				version: {
					type: String,
					value: '0.0.0'
				}
			};
		}
	}, {
		key: "_computeYear",
		value: function _computeYear() {
			var date = new Date();
			return date.getFullYear();
		}
	}]);

	return CoverClab;
}();

Polymer(CoverClab);