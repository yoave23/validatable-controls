'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./AutocompleteItem.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AutocompleteItem = function AutocompleteItem(props) {
    var getValue = function getValue() {
        var value = props.value;
        var searchValue = props.searchValue;
        var index = props.value.toLowerCase().indexOf(props.searchValue.toLowerCase());

        var start = index > 0 ? _react2.default.createElement(
            'span',
            { key: '1' },
            value.substr(0, index)
        ) : null;
        var bold = _react2.default.createElement(
            'b',
            { key: '2' },
            value.substr(index, searchValue.length)
        );
        var end = _react2.default.createElement(
            'span',
            { key: '3' },
            value.substr(index + searchValue.length)
        );

        return [start, bold, end];
    };

    var getClass = function getClass() {
        return 'autocomplete-item ' + (props.index === props.currentFocus ? 'active' : '');
    };

    return _react2.default.createElement(
        'div',
        { className: getClass(), onClick: function onClick() {
                return props.onClick(props.value);
            } },
        getValue()
    );
};

exports.default = AutocompleteItem;