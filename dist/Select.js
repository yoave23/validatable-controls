'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ControlHoc = require('./ControlHoc');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Select = function (_Component) {
    _inherits(Select, _Component);

    function Select(props) {
        _classCallCheck(this, Select);

        var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

        _this.state = {
            errorMessage: '',
            blurred: false
        };

        // if a ref as passed use it, else create a new one
        _this.innerRef = _this.props.innerRef || _react2.default.createRef();
        return _this;
    }

    _createClass(Select, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'validatable' },
                _react2.default.createElement(
                    'select',
                    _extends({ ref: this.innerRef, onChange: this.props.onChange
                    }, this.props.getThinProps(this.props, this.props.reservedProps), {
                        onBlur: this.props.onBlur }),
                    this.props.children
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'error-msg' },
                    this.props.getErrorMessage()
                )
            );
        }
    }]);

    return Select;
}(_react.Component);

Select.propTypes = {
    submitted: _propTypes2.default.bool.isRequired,
    validationRules: _propTypes2.default.array,
    onValidityChanged: _propTypes2.default.func.isRequired
};

//export { Select };
exports.default = (0, _ControlHoc.controlHoc)(_react2.default.forwardRef(function (props, ref) {
    return _react2.default.createElement(Select, _extends({ innerRef: ref }, props));
}));