'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Input = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Input = function (_Component) {
    _inherits(Input, _Component);

    function Input(props) {
        _classCallCheck(this, Input);

        var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

        _this.onChange = function (e) {
            _this.validate(e.target.value);
            if (_this.props.onChange) {
                _this.props.onChange(e);
            }
        };

        _this.onBlur = function (e) {
            e.persist();
            if (_this.props.onBlur) {
                _this.props.onBlur(e);
            }

            _this.setState({ blurred: true }, function () {
                _this.validate(e.target.value);
            });
        };

        _this.validate = function (value) {
            if (!_this.props.validationRules) {
                return;
            }
            var tempMessage = '';
            _this.props.validationRules.forEach(function (rule) {
                var message = rule(value);
                if (message) {
                    tempMessage = message;
                    return;
                }
            });

            _this.setState({ errorMessage: tempMessage }, function () {
                _this.props.onValidityChanged(_this.inputRef.current, _this.state.errorMessage);
            });
        };

        _this.getErrorMessage = function () {
            if (_this.state.blurred || _this.props.submitted) {
                return _this.state.errorMessage;
            }
            return '';
        };

        _this.state = {
            errorMessage: '',
            blurred: false
        };

        _this.inputRef = _react2.default.createRef();

        // strip down props used internally (we'll call them later if needed)
        _this.reservedProps = ['onChange', 'submitted', 'validationRules', 'onValidityChanged'];
        return _this;
    }

    _createClass(Input, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.validate(this.props.value || '');
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'validatable' },
                _react2.default.createElement('input', _extends({ ref: this.inputRef, onChange: this.onChange }, (0, _utils.getStrippedProps)(this.props, this.reservedProps), { onBlur: this.onBlur })),
                _react2.default.createElement(
                    'div',
                    { className: 'error-msg' },
                    this.getErrorMessage()
                )
            );
        }
    }]);

    return Input;
}(_react.Component);

Input.propTypes = {
    submitted: _propTypes2.default.bool.isRequired,
    validationRules: _propTypes2.default.array,
    onValidityChanged: _propTypes2.default.func.isRequired
};

exports.Input = Input;