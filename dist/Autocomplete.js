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

var _ControlHoc = require('./ControlHoc');

require('./Autocomplete.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//import { areObjectsEqual } from './utils';


var Autocomplete = function (_Component) {
    _inherits(Autocomplete, _Component);

    function Autocomplete(props) {
        _classCallCheck(this, Autocomplete);

        var _this = _possibleConstructorReturn(this, (Autocomplete.__proto__ || Object.getPrototypeOf(Autocomplete)).call(this, props));

        _this.areArraysEqual = function (arr1, arr2) {
            if (arr1.length !== arr2.length) {
                return false;
            }
            var equal = true;
            for (var index = 0; index < arr1.length; index++) {
                var element1 = arr1[index];
                if (arr2[index] !== element1) {
                    equal = false;
                    return false;
                }
            }
            return equal;
        };

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
            if (val.trim() === _this.state.searchValue.trim()) {
                return;
            }
            _this.setState({ searchValue: val });
            _this.closeList();

            _this.props.validate(e.target.value);
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

        _this.state = {
            searchValue: '',
            matchingItems: [],
            currentFocus: -1,
            errorMessage: '',
            blurred: false
        };

        // if a ref as passed use it, else create a new one
        _this.innerRef = _this.props.innerRef || _react2.default.createRef();
        return _this;
    }

    _createClass(Autocomplete, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            var shouldUpdate = false;
            if (this.state.searchValue !== nextState.searchValue || this.props.value !== nextProps.value || !this.areArraysEqual(this.state.matchingItems, nextState.matchingItems) || this.state.currentFocus !== nextState.currentFocus) {
                shouldUpdate = true;
            }
            return shouldUpdate;
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            //console.log('%c UPDATED', 'background: #444; color: #bada55');
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            document.addEventListener("click", this.closeList);
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
                _react2.default.createElement('input', _extends({ type: 'text',
                    ref: this.innerRef,
                    onChange: this.onChange,
                    value: this.state.searchValue,
                    onKeyDown: this.onKeyDown,
                    onBlur: this.props.onBlur
                }, this.props.getThinProps(this.props, this.props.reservedProps))),
                _react2.default.createElement(
                    'div',
                    { id: this.props.id + "autocomplete-list", className: 'autocomplete-items' },
                    this.getItems()
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'error-msg' },
                    this.props.getErrorMessage()
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

exports.default = (0, _ControlHoc.controlHoc)(_react2.default.forwardRef(function (props, ref) {
    return _react2.default.createElement(Autocomplete, _extends({ innerRef: ref }, props));
}));