/** handorgel v1.0.0, @license MIT */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.handorgel = factory());
}(this, function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self);
  }
  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn(this, result);
    };
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var evEmitter = createCommonjsModule(function (module) {
  /**
   * EvEmitter v1.1.0
   * Lil' event emitter
   * MIT License
   */

  /* jshint unused: true, undef: true, strict: true */

  ( function( global, factory ) {
    // universal module definition
    /* jshint strict: false */ /* globals define, module, window */
    if ( module.exports ) {
      // CommonJS - Browserify, Webpack
      module.exports = factory();
    } else {
      // Browser globals
      global.EvEmitter = factory();
    }

  }( typeof window != 'undefined' ? window : commonjsGlobal, function() {

  function EvEmitter() {}

  var proto = EvEmitter.prototype;

  proto.on = function( eventName, listener ) {
    if ( !eventName || !listener ) {
      return;
    }
    // set events hash
    var events = this._events = this._events || {};
    // set listeners array
    var listeners = events[ eventName ] = events[ eventName ] || [];
    // only add once
    if ( listeners.indexOf( listener ) == -1 ) {
      listeners.push( listener );
    }

    return this;
  };

  proto.once = function( eventName, listener ) {
    if ( !eventName || !listener ) {
      return;
    }
    // add event
    this.on( eventName, listener );
    // set once flag
    // set onceEvents hash
    var onceEvents = this._onceEvents = this._onceEvents || {};
    // set onceListeners object
    var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
    // set flag
    onceListeners[ listener ] = true;

    return this;
  };

  proto.off = function( eventName, listener ) {
    var listeners = this._events && this._events[ eventName ];
    if ( !listeners || !listeners.length ) {
      return;
    }
    var index = listeners.indexOf( listener );
    if ( index != -1 ) {
      listeners.splice( index, 1 );
    }

    return this;
  };

  proto.emitEvent = function( eventName, args ) {
    var listeners = this._events && this._events[ eventName ];
    if ( !listeners || !listeners.length ) {
      return;
    }
    // copy over to avoid interference if .off() in listener
    listeners = listeners.slice(0);
    args = args || [];
    // once stuff
    var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

    for ( var i=0; i < listeners.length; i++ ) {
      var listener = listeners[i];
      var isOnce = onceListeners && onceListeners[ listener ];
      if ( isOnce ) {
        // remove listener
        // remove before trigger to prevent recursion
        this.off( eventName, listener );
        // unset once flag
        delete onceListeners[ listener ];
      }
      // trigger listener
      listener.apply( this, args );
    }

    return this;
  };

  proto.allOff = function() {
    delete this._events;
    delete this._onceEvents;
  };

  return EvEmitter;

  }));
  });

  var ID_COUNTER = {};
  var ARIA_ATTRIBUTES = {
    button: {
      'aria-controls': function ariaControls() {
        return this.id + '-content';
      },
      'aria-expanded': function ariaExpanded() {
        return this.expanded ? 'true' : 'false';
      },
      'aria-disabled': function ariaDisabled() {
        return this.disabled ? 'true' : 'false';
      }
    },
    content: {
      role: function role() {
        return 'region';
      },
      'aria-labelledby': function ariaLabelledby() {
        return this.id + '-header';
      },
      'aria-hidden': function ariaHidden() {
        return this.expanded ? 'false' : 'true';
      },
      tabindex: function tabindex() {
        return this.expanded ? 0 : -1;
      }
    }
  };
  var KEYS = {
    arrowDown: 40,
    arrowUp: 38,
    pageUp: 33,
    pageDown: 34,
    end: 35,
    home: 36
  };
  var HandorgelFold = /*#__PURE__*/function () {
    function HandorgelFold(handorgel, header, content) {
      _classCallCheck(this, HandorgelFold);
      if (header.handorgelFold) {
        return;
      }
      this.handorgel = handorgel;
      this.header = header;
      this.button = header.firstElementChild;
      this.content = content;
      this.header.handorgelFold = this;
      this.content.handorgelFold = this;
      if (!ID_COUNTER[this.handorgel.id]) {
        ID_COUNTER[this.handorgel.id] = 0;
      }
      this.id = "".concat(this.handorgel.id, "-fold").concat(++ID_COUNTER[this.handorgel.id]);
      this.header.setAttribute('id', this.id + '-header');
      this.content.setAttribute('id', this.id + '-content');
      this.focused = false;
      this.expanded = false;
      this.disabled = false;
      this._listeners = {};
      this._bindEvents();
      this._initAria();
      this._initialOpen();
      this._initialFocus();
    }
    _createClass(HandorgelFold, [{
      key: "open",
      value: function open() {
        var transition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        if (this.expanded) {
          return;
        }
        this.handorgel.emitEvent('fold:open', [this]);
        this.expanded = true;
        if (!this.handorgel.options.collapsible) {
          this.disable();
        }
        this._updateAria('button', 'aria-expanded');
        this.header.classList.add(this.handorgel.options.headerOpenClass);
        this.content.classList.add(this.handorgel.options.contentOpenClass);
        if (!transition) {
          this._opened();
        } else {
          var height = this.content.firstElementChild.offsetHeight;
          this.content.style.height = "".concat(height, "px");
        }
      }
    }, {
      key: "close",
      value: function close() {
        var _this = this;
        var transition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        if (!this.expanded) {
          return;
        }
        this.handorgel.emitEvent('fold:close', [this]);
        this.expanded = false;
        if (!this.handorgel.options.collapsible) {
          this.enable();
        }
        this._updateAria('button', 'aria-expanded');
        this.header.classList.remove(this.handorgel.options.headerOpenedClass);
        this.content.classList.remove(this.handorgel.options.contentOpenedClass);
        if (!transition) {
          this._closed();
        } else {
          // if we want to transition when closing we
          // have to set the current height and replace auto
          var height = this.content.firstElementChild.offsetHeight;
          this.content.style.height = "".concat(height, "px");
          window.requestAnimationFrame(function () {
            window.requestAnimationFrame(function () {
              _this.content.style.height = '0px';
            });
          });
        }
      }
    }, {
      key: "disable",
      value: function disable() {
        this.disabled = true;
        this._updateAria('button', 'aria-disabled');
        this.header.classList.add(this.handorgel.options.headerDisabledClass);
        this.content.classList.add(this.handorgel.options.contentDisabledClass);
      }
    }, {
      key: "enable",
      value: function enable() {
        this.disabled = false;
        this._updateAria('button', 'aria-disabled');
        this.header.classList.remove(this.handorgel.options.headerDisabledClass);
        this.content.classList.remove(this.handorgel.options.contentDisabledClass);
      }
    }, {
      key: "focus",
      value: function focus() {
        this.button.focus();
      }
    }, {
      key: "blur",
      value: function blur() {
        this.button.blur();
      }
    }, {
      key: "toggle",
      value: function toggle() {
        var transition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        if (this.expanded) {
          this.close(transition);
        } else {
          this.open(transition);
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this._unbindEvents();
        this._cleanAria();

        // clean classes
        this.header.classList.remove(this.handorgel.options.headerOpenClass);
        this.header.classList.remove(this.handorgel.options.headerOpenedClass);
        this.header.classList.remove(this.handorgel.options.headerFocusClass);
        this.content.classList.remove(this.handorgel.options.contentOpenClass);
        this.content.classList.remove(this.handorgel.options.contentOpenedClass);
        this.content.classList.remove(this.handorgel.options.contentFocusClass);

        // hide content
        this.content.style.height = '0px';

        // clean reference to this instance
        this.header.handorgelFold = null;
        this.content.handorgelFold = null;

        // remove ids
        this.header.removeAttribute('id');
        this.content.removeAttribute('id');

        // clean reference to handorgel instance
        this.handorgel = null;
      }
    }, {
      key: "_opened",
      value: function _opened() {
        this._updateAria('content', 'tabindex');
        this._updateAria('content', 'aria-hidden');
        this.content.style.height = 'auto';
        this.header.classList.add(this.handorgel.options.headerOpenedClass);
        this.content.classList.add(this.handorgel.options.contentOpenedClass);
        this.handorgel.emitEvent('fold:opened', [this]);
      }
    }, {
      key: "_closed",
      value: function _closed() {
        this._updateAria('content', 'tabindex');
        this._updateAria('content', 'aria-hidden');
        this.header.classList.remove(this.handorgel.options.headerOpenClass);
        this.content.classList.remove(this.handorgel.options.contentOpenClass);
        this.handorgel.emitEvent('fold:closed', [this]);
      }
    }, {
      key: "_initialOpen",
      value: function _initialOpen() {
        var _this2 = this;
        if (this.header.getAttribute(this.handorgel.options.initialOpenAttribute) !== null || this.content.getAttribute(this.handorgel.options.initialOpenAttribute) !== null) {
          if (this.handorgel.options.initialOpenTransition) {
            window.setTimeout(function () {
              _this2.open();
            }, this.handorgel.options.initialOpenTransitionDelay);
          } else {
            this.open(false);
          }
        }
      }
    }, {
      key: "_initialFocus",
      value: function _initialFocus() {
        if (this.button.getAttribute('autofocus') === null) {
          return;
        }

        // to ensure focus styles if autofocus was applied
        // before focus listener was added
        this._handleFocus();
      }
    }, {
      key: "_initAria",
      value: function _initAria() {
        this._updateAria('button');
        this._updateAria('content');
      }
    }, {
      key: "_cleanAria",
      value: function _cleanAria() {
        this._updateAria('button', null, true);
        this._updateAria('content', null, true);
      }
    }, {
      key: "_updateAria",
      value: function _updateAria(element) {
        var property = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var remove = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        if (!this.handorgel.options.ariaEnabled) {
          return;
        }
        if (property) {
          var newValue = ARIA_ATTRIBUTES[element][property].call(this);
          this[element].setAttribute(property, newValue);
        } else {
          for (var _property in ARIA_ATTRIBUTES[element]) {
            if (ARIA_ATTRIBUTES[element].hasOwnProperty(_property)) {
              if (remove) {
                this[element].removeAttribute(_property);
              } else {
                var _newValue = ARIA_ATTRIBUTES[element][_property].call(this);
                this[element].setAttribute(_property, _newValue);
              }
            }
          }
        }
      }
    }, {
      key: "_handleContentTransitionEnd",
      value: function _handleContentTransitionEnd(e) {
        if (e.target === e.currentTarget && e.propertyName === 'height') {
          if (this.expanded) {
            this._opened();
          } else {
            this._closed();
          }
        }
      }
    }, {
      key: "_handleFocus",
      value: function _handleFocus() {
        this.focused = true;
        this.header.classList.add(this.handorgel.options.headerFocusClass);
        this.content.classList.add(this.handorgel.options.contentFocusClass);
        this.handorgel.emitEvent('fold:focus', [this]);
      }
    }, {
      key: "_handleBlur",
      value: function _handleBlur() {
        this.focused = false;
        this.header.classList.remove(this.handorgel.options.headerFocusClass);
        this.content.classList.remove(this.handorgel.options.contentFocusClass);
        this.handorgel.emitEvent('fold:blur', [this]);
      }
    }, {
      key: "_handleButtonClick",
      value: function _handleButtonClick(e) {
        // ensure focus is on button (click is not seting focus on firefox mac)
        this.focus();
        if (this.disabled) {
          return;
        }
        this.toggle();
      }
    }, {
      key: "_handleButtonKeydown",
      value: function _handleButtonKeydown(e) {
        if (!this.handorgel.options.keyboardInteraction) {
          return;
        }
        var action = null;
        switch (e.which) {
          case KEYS.arrowDown:
            action = 'next';
            break;
          case KEYS.arrowUp:
            action = 'prev';
            break;
          case KEYS.home:
            action = 'first';
            break;
          case KEYS.end:
            action = 'last';
            break;
          case KEYS.pageDown:
            if (e.ctrlKey) {
              action = 'next';
            }
            break;
          case KEYS.pageUp:
            if (e.ctrlKey) {
              action = 'prev';
            }
            break;
        }
        if (action) {
          e.preventDefault();
          this.handorgel.focus(action);
        }
      }
    }, {
      key: "_handleContentKeydown",
      value: function _handleContentKeydown(e) {
        if (!this.handorgel.options.keyboardInteraction || !e.ctrlKey) {
          return;
        }
        var action = null;
        switch (e.which) {
          case KEYS.pageDown:
            action = 'next';
            break;
          case KEYS.pageUp:
            action = 'prev';
            break;
        }
        if (action) {
          e.preventDefault();
          this.handorgel.focus(action);
        }
      }
    }, {
      key: "_bindEvents",
      value: function _bindEvents() {
        this._listeners = {
          // button listeners
          bFocus: ['focus', this.button, this._handleFocus.bind(this)],
          bBlur: ['blur', this.button, this._handleBlur.bind(this)],
          bClick: ['click', this.button, this._handleButtonClick.bind(this)],
          bKeydown: ['keydown', this.button, this._handleButtonKeydown.bind(this)],
          // content listeners
          cKeydown: ['keydown', this.content, this._handleContentKeydown.bind(this)],
          cTransition: ['transitionend', this.content, this._handleContentTransitionEnd.bind(this)]
        };
        for (var key in this._listeners) {
          if (this._listeners.hasOwnProperty(key)) {
            var listener = this._listeners[key];
            listener[1].addEventListener(listener[0], listener[2]);
          }
        }
      }
    }, {
      key: "_unbindEvents",
      value: function _unbindEvents() {
        for (var key in this._listeners) {
          if (this._listeners.hasOwnProperty(key)) {
            var listener = this._listeners[key];
            listener[1].removeEventListener(listener[0], listener[2]);
          }
        }
      }
    }]);
    return HandorgelFold;
  }();

  var ID_COUNTER$1 = 0;
  var Handorgel = /*#__PURE__*/function (_EventEmitter) {
    _inherits(Handorgel, _EventEmitter);
    var _super = _createSuper(Handorgel);
    function Handorgel(element) {
      var _this;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      _classCallCheck(this, Handorgel);
      _this = _super.call(this);
      if (element.handorgel) {
        return _possibleConstructorReturn(_this);
      }
      _this.element = element;
      _this.element.handorgel = _assertThisInitialized(_this);
      _this.id = "handorgel".concat(++ID_COUNTER$1);
      _this.element.setAttribute('id', _this.id);
      _this.folds = [];
      _this.options = Object.assign({}, Handorgel.defaultOptions, options);
      _this._listeners = {};
      _this._bindEvents();
      _this._initAria();
      _this.update();
      return _this;
    }
    _createClass(Handorgel, [{
      key: "update",
      value: function update() {
        this.folds = [];
        var headerElements = typeof this.options.headerElements === 'string' ? this.element.querySelectorAll(this.options.headerElements) : this.options.headerElements;
        var contentElements = typeof this.options.contentElements === 'string' ? this.element.querySelectorAll(this.options.contentElements) : this.options.contentElements;
        for (var i = 0; i < headerElements.length; i = i + 1) {
          // get fold instance if there is already one
          var fold = headerElements[i].handorgelFold;

          // create new one when header and content exist
          if (!fold && headerElements[i] && contentElements[i]) {
            fold = new HandorgelFold(this, headerElements[i], contentElements[i]);
          }
          if (fold) {
            this.folds.push(fold);
          }
        }
      }
    }, {
      key: "focus",
      value: function focus(target) {
        var foldsLength = this.folds.length;
        var currentFocusedIndex = null;
        for (var i = 0; i < foldsLength && currentFocusedIndex === null; i++) {
          if (this.folds[i].focused) currentFocusedIndex = i;
        }
        if ((target === 'prev' || target === 'next') && currentFocusedIndex === null) {
          target = target === 'prev' ? 'last' : 'first';
        }
        if (target === 'prev' && currentFocusedIndex === 0) {
          if (!this.options.carouselFocus) return;
          target = 'last';
        }
        if (target === 'next' && currentFocusedIndex === foldsLength - 1) {
          if (!this.options.carouselFocus) return;
          target = 'first';
        }
        switch (target) {
          case 'prev':
            this.folds[--currentFocusedIndex].focus();
            break;
          case 'next':
            this.folds[++currentFocusedIndex].focus();
            break;
          case 'last':
            this.folds[foldsLength - 1].focus();
            break;
          case 'first':
          default:
            this.folds[0].focus();
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.emitEvent('destroy');
        this.element.removeAttribute('id');
        this.folds.forEach(function (fold) {
          fold.destroy();
        });
        this._unbindEvents();
        this._cleanAria();

        // clean reference to handorgel instance
        this.element.handorgel = null;
        this.emitEvent('destroyed');
      }
    }, {
      key: "_handleFoldOpen",
      value: function _handleFoldOpen(openFold) {
        if (this.options.multiSelectable) {
          return;
        }
        this.folds.forEach(function (fold) {
          if (openFold !== fold) {
            fold.close();
          }
        });
      }
    }, {
      key: "_initAria",
      value: function _initAria() {
        if (!this.options.ariaEnabled) {
          return;
        }
        if (this.options.multiSelectable) {
          this.element.setAttribute('aria-multiselectable', 'true');
        }
      }
    }, {
      key: "_cleanAria",
      value: function _cleanAria() {
        this.element.removeAttribute('aria-multiselectable');
      }
    }, {
      key: "_bindEvents",
      value: function _bindEvents() {
        this._listeners.foldOpen = this._handleFoldOpen.bind(this);
        this.on('fold:open', this._listeners.foldOpen);
      }
    }, {
      key: "_unbindEvents",
      value: function _unbindEvents() {
        this.off('fold:open', this._listeners.foldOpen);
      }
    }]);
    return Handorgel;
  }(evEmitter);
  Handorgel.defaultOptions = {
    keyboardInteraction: true,
    multiSelectable: true,
    ariaEnabled: true,
    collapsible: true,
    carouselFocus: true,
    initialOpenAttribute: 'data-open',
    initialOpenTransition: true,
    initialOpenTransitionDelay: 200,
    headerElements: '.handorgel__header',
    contentElements: '.handorgel__content',
    headerOpenClass: 'handorgel__header--open',
    contentOpenClass: 'handorgel__content--open',
    headerOpenedClass: 'handorgel__header--opened',
    contentOpenedClass: 'handorgel__content--opened',
    headerDisabledClass: 'handorgel__header--disabled',
    contentDisabledClass: 'handorgel__content--disabled',
    headerFocusClass: 'handorgel__header--focus',
    contentFocusClass: 'handorgel__content--focus'
  };

  return Handorgel;

}));
