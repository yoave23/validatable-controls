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

var _AutocompleteItem = require('./AutocompleteItem');

var _AutocompleteItem2 = _interopRequireDefault(_AutocompleteItem);

var _utils = require('./utils');

require('./Autocomplete.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Autocomplete = function (_Component) {
    _inherits(Autocomplete, _Component);

    function Autocomplete(props) {
        _classCallCheck(this, Autocomplete);

        var _this = _possibleConstructorReturn(this, (Autocomplete.__proto__ || Object.getPrototypeOf(Autocomplete)).call(this, props));

        _this.closeList = function (element) {
            _this.setState({ matchingItems: [], currentFocus: -1 });
        };

        _this.onItemClick = function (value) {
            // create a dummy onChange param
            var e = {
                target: {
                    name: _this.props.name,
                    value: value
                }
            };
            _this.onChange(e);
            _this.closeList();
        };

        _this.getItems = function () {
            return _this.state.matchingItems.map(function (item, index) {
                return _react2.default.createElement(_AutocompleteItem2.default, {
                    value: item,
                    searchValue: _this.state.searchValue,
                    key: item,
                    onClick: _this.onItemClick,
                    index: index,
                    currentFocus: _this.state.currentFocus });
            });
        };

        _this.onChange = function (e) {
            var val = e.target.value;
            _this.setState({ searchValue: val });
            _this.closeList();

            _this.validate(e.target.value);
            if (_this.props.onChange) {
                _this.props.onChange(e);
            }

            if (!val) {
                return false;
            }

            var matchingItems = _this.props.items.filter(function (item) {
                return item.toLowerCase().indexOf(val.toLowerCase()) > -1;
            });
            _this.setState({ matchingItems: matchingItems });
        };

        _this.onKeyDown = function (e) {
            switch (e.keyCode) {
                case 40:
                    _this.setState({ currentFocus: _this.state.currentFocus + 1 });
                    break;
                case 38:
                    _this.setState({ currentFocus: _this.state.currentFocus - 1 });
                    break;
                case 13:
                    if (_this.state.currentFocus > -1) {
                        _this.onItemClick(_this.state.matchingItems[_this.state.currentFocus]);
                    }
                    break;
                default:
                    break;
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
                _this.props.onValidityChanged(_this.innerRef.current, _this.state.errorMessage);
            });
        };

        _this.getErrorMessage = function () {
            if (_this.state.blurred || _this.props.submitted) {
                return _this.state.errorMessage;
            }
            return '';
        };

        _this.state = {
            searchValue: '',
            matchingItems: [],
            currentFocus: -1,
            errorMessage: '',
            blurred: false
        };

        // if a ref as passed use it, else create a new one
        _this.innerRef = _this.props.innerRef || _react2.default.createRef();
        _this.reservedProps = ['onChange', 'submitted', 'validationRules', 'onValidityChanged', 'innerRef'];
        return _this;
    }

    _createClass(Autocomplete, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            document.addEventListener("click", this.closeList);
            this.validate(this.props.value || '');
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener("click", this.closeList, false);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'validatable autocomplete' },
                _react2.default.createElement('input', _extends({ type: 'text', ref: this.innerRef, onChange: this.onChange,
                    value: this.state.searchValue,
                    onKeyDown: this.onKeyDown
                }, (0, _utils.getStrippedProps)(this.props, this.reservedProps), { onBlur: this.onBlur })),
                _react2.default.createElement(
                    'div',
                    { id: this.props.id + "autocomplete-list", className: 'autocomplete-items' },
                    this.getItems()
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'error-msg' },
                    this.getErrorMessage()
                )
            );
        }
    }]);

    return Autocomplete;
}(_react.Component);

Autocomplete.propTypes = {
    items: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,
    id: _propTypes2.default.string.isRequired,
    submitted: _propTypes2.default.bool.isRequired,
    onValidityChanged: _propTypes2.default.func.isRequired
};

exports.default = _react2.default.forwardRef(function (props, ref) {
    return _react2.default.createElement(Autocomplete, _extends({ innerRef: ref }, props));
});