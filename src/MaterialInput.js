import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { controlHoc } from './ControlHoc';
import './MaterialInput.css';

class MaterialInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
            blurred: false
        };

        // if a ref was passed use it, else create a new one
        this.innerRef = this.props.innerRef || React.createRef();
    }

    render() {
        const inputProps = { ...this.props.getThinProps(this.props, this.props.reservedProps) };
        const inputHasValue = (this.innerRef.current && this.innerRef.current.value) || '';
        inputProps['className'] = (inputProps.className || '') + inputHasValue ? "hasValue" : "";

        return (
            <div className="validatable-material">
                <input ref={this.innerRef}
                    onChange={this.props.onChange}
                    onBlur={this.props.onBlur}
                    {...inputProps}
                />
                <span className="highlight" />
                <span className="bar" />
                <label className="floating-label">{this.props.label}</label>
                <div className="error-msg">
                    {this.props.getErrorMessage()}
                </div>
            </div>
        )
    }
}

MaterialInput.propTypes = {
    label: PropTypes.string.isRequired,
    submitted: PropTypes.bool.isRequired,
    validationRules: PropTypes.array,
    onValidityChanged: PropTypes.func.isRequired
};

export default controlHoc(React.forwardRef((props, ref) => <MaterialInput innerRef={ref} {...props} />));