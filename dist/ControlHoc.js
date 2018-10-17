'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.controlHoc = controlHoc;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function controlHoc(WrappedControl) {
    var _class, _temp, _initialiseProps;

    var ControlHoc = (_temp = _class = function (_Component) {
        _inherits(ControlHoc, _Component);

        function ControlHoc(props) {
            _classCallCheck(this, ControlHoc);

            var _this = _possibleConstructorReturn(this, (ControlHoc.__proto__ || Object.getPrototypeOf(ControlHoc)).call(this, props));

            _initialiseProps.call(_this);

            _this.state = {
                blurred: '',
                errorMessage: ''
            };
            _this.controlRef = _react2.default.createRef();

            // strip down props used internally (we'll call them later if needed)
            _this.reservedProps = ['forwardedRef', 'onChange', 'submitted', 'validationRules', 'onValidityChanged', 'innerRef', 'getErrorMessage', 'validate', 'reservedProps', 'getThinProps', 'customValidations'];
            return _this;
        }

        _createClass(ControlHoc, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                this.validate(this.props.value || '');
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                this.props.onValidityChanged(this.props.name, true, '');
            }
        }, {
            key: 'render',
            value: function render() {
                var forwardedRef = this.props.forwardedRef;

                return _react2.default.createElement(WrappedControl, _extends({}, this.props, {
                    getErrorMessage: this.getErrorMessage,
                    onChange: this.onChange,
                    onBlur: this.onBlur,
                    ref: forwardedRef,
                    validate: this.validate,
                    reservedProps: this.reservedProps,
                    getThinProps: this.getThinProps }));
            }
        }]);

        return ControlHoc;
    }(_react.Component), _initialiseProps = function _initialiseProps() {
        var _this2 = this;

        this.getErrorMessage = function () {
            if (_this2.state.blurred || _this2.props.submitted) {
                return _this2.state.errorMessage;
            }
            return '';
        };

        this.onChange = function (e) {
            _this2.validate(e.target.value);
            if (_this2.props.onChange) {
                _this2.props.onChange(e);
            }
        };

        this.onBlur = function (e) {
            e.persist();
            if (_this2.props.onBlur) {
                _this2.props.onBlur(e);
            }

            _this2.setState({ blurred: true }, function () {
                _this2.validate(e.target.value);
            });
        };

        this.validate = function (value) {
            if (!_this2.props.validationRules) {
                return;
            }
            var tempMessage = '';
            _this2.props.validationRules.forEach(function (rule) {
                var message = rule(value);
                if (message) {
                    tempMessage = message;
                    return;
                }
            });
            _this2.setState({ errorMessage: tempMessage }, function () {
                _this2.props.onValidityChanged(_this2.props.name, _this2.state.errorMessage);
            });
        };

        this.getThinProps = function (props, reservedProps) {
            //assign the thin props to the input
            var thinProps = {};
            for (var key in props) {
                if (props.hasOwnProperty(key)) {
                    var prop = props[key];
                    if (reservedProps.indexOf(key) === -1) {
                        thinProps[key] = prop;
                    }
                }
            }
            return thinProps;
        };
    }, _temp);

    return _react2.default.forwardRef(function (props, ref) {
        return _react2.default.createElement(ControlHoc, _extends({}, props, { forwardedRef: ref }));
    });
}