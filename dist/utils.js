"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var getStrippedProps = exports.getStrippedProps = function getStrippedProps(props, reservedProps) {
    //assign the stripped props to the input
    var strippedProps = {};
    for (var key in props) {
        if (props.hasOwnProperty(key)) {
            var prop = props[key];
            if (reservedProps.indexOf(key) === -1) {
                strippedProps[key] = prop;
            }
        }
    }
    return strippedProps;
};