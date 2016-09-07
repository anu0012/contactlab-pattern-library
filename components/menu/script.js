'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MenuClabCust = function () {
	function MenuClabCust() {
		_classCallCheck(this, MenuClabCust);
	}

	_createClass(MenuClabCust, [{
		key: 'beforeRegister',
		value: function beforeRegister() {
			this.is = 'menu-clab-cust';
			this.properties = {
				title: {
					type: String,
					value: 'Title'
				},
				titleIcon: {
					type: String,
					value: 'fa-hand-peace-o'
				},
				menu: {
					type: Array,
					value: []
				},
				link: {
					type: String,
					value: '/'
				},
				draft: {
					type: String,
					value: null
				},
				firstChild: {
					type: Boolean,
					value: false
				},
				submenu: Object,
				currentHash: String,

				_mainNav: {
					type: Boolean,
					value: false
				}
			};

			this.observers = ['_updateCurrent(menu, currentHash)'];
		}
	}, {
		key: 'attached',
		value: function attached() {
			this._iosMenu();
		}

		/*----------
  EVENT HANDLERS
  ----------*/

	}, {
		key: '_toggleMenu',
		value: function _toggleMenu(evt) {
			/* switch(evt.target.localName){
   	case 'i':
   		var open=evt.target.parentNode.classList.contains('open-menu');
   		break;
   	case 'div':
   		var open=evt.target.classList.contains('open-menu');
   		break;
   }*/
			/*if(open){
   	this.set('_mainNav',true);
   } else {
   	this.set('_mainNav',false);
   }*/
			this._mainNav ? this.set('_mainNav', false) : this.set('_mainNav', true);
		}
	}, {
		key: '_linkClicked',
		value: function _linkClicked(evt) {
			var _this = this;

			var target = evt.target;
			//while(target.localName!='a'){ target=target.parentNode; }
			this.fire('a-click', { href: target.getAttribute('href') });

			// Wait change of window.location after click on link
			// aftet that toggle the main nav if mobile
			setTimeout(function () {
				if (window.innerWidth < 960) _this.set('_mainNav', false);
			}, 150);
		}

		/*----------
  METHODS
  ----------*/

	}, {
		key: '_iosMenu',
		value: function _iosMenu() {
			var _this2 = this;

			document.querySelector('body').addEventListener('click', function (evt) {
				switch (evt.target.nodeName) {
					case 'INPUT':
					case 'BUTTON':
					case 'TEXTAREA':
					case 'LABEL':
					case 'SELECT':
						return true;
						break;
					default:
						_this2.querySelector('.logo a').focus();
						break;
				}
			});
		}

		/*----------
  OBSERVERS
  ----------*/

	}, {
		key: '_updateCurrent',
		value: function _updateCurrent(menu, currentHash) {
			if (menu != undefined && menu.length > 0 && currentHash != undefined) {
				var current = menu.filter(function (item) {
					return item.url.split('/')[1] == currentHash.split('/')[1];
				});

				if (current.length > 0) {
					var menuItem = current[0];
					this.set('submenu', menuItem.submenu || undefined);
					this.fire('menuchange', {
						label: menuItem.label,
						links: menuItem.submenu || []
					});
				} else {
					this.fire('hashnotfound');
				}
			}
		}

		/*----------
  COMPUTE
  ----------*/

	}, {
		key: '_visibleMenu',
		value: function _visibleMenu(menu) {
			if (menu != undefined) {
				var _ret = function () {
					var arr = [];
					menu.map(function (obj) {
						if (obj.visible || obj.visible == undefined) arr.push(obj);
					});
					return {
						v: arr
					};
				}();

				if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
			}
		}
	}, {
		key: 'getIndex',
		value: function getIndex(item) {
			var i = -1;
			this.menu.map(function (voce, n) {
				if (voce.label === item.label) i = n;
			});
			return i;
		}
	}, {
		key: '_computeUrl',
		value: function _computeUrl(item) {
			var url = void 0;
			if (this.firstChild && item.submenu) {
				if (item.submenu[0].submenu) // 3 levels
					url = item.submenu[0].submenu[0].url;else // 2 levels
					url = item.submenu[0].url;
			} else {
				url = item.url;
			}
			return url;
		}
	}, {
		key: '_computeActive',
		value: function _computeActive(hash, url) {
			var arr = [];
			if (hash.search(url) > -1) arr.push('active');
			return arr.join(' ');
		}
	}, {
		key: '_computeTitleIcon',
		value: function _computeTitleIcon(icon) {
			return ['clab-icon', icon].join(' ');
		}
	}, {
		key: '_compMainNav',
		value: function _compMainNav(str, show) {
			var arr = [str];
			if (show) arr.push('show');
			return arr.join(' ');
		}
	}]);

	return MenuClabCust;
}();

Polymer(MenuClabCust);