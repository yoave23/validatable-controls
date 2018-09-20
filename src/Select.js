import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStrippedProps } from './utils';

class Select extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errorMessage: '',
            blurred: false
        };

        this.selectRef = React.createRef();

        // strip down props used internally (we'll call them later if needed)
        this.reservedProps = ['onChange', 'submitted', 'validationRules', 'onValidityChanged'];
    }

    componentDidMount() {
        this.validate(this.props.value || '');
    }

    onChange = (e) => {
        this.validate(e.target.value);
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    }

    onBlur = (e) => {
        e.persist();
        if (this.props.onBlur) {
            this.props.onBlur(e);
        }

        this.setState({ blurred: true }, () => {
            this.validate(e.target.value);
        });
    }

    validate = (value) => {
        if (!this.props.validationRules) {
            return;
        }
        let tempMessage = '';
        this.props.validationRules.forEach(rule => {
            let message = rule(value);
            if (message) {
                tempMessage = message;
                return;
            }
        });

        this.setState({ errorMessage: tempMessage }, () => {
            this.props.onValidityChanged(this.selectRef.current, this.state.errorMessage);
        });
    }

    getErrorMessage = () => {
        if (this.state.blurred || this.props.submitted) {
            return this.state.errorMessage;
        }
        return '';

    }

    render() {
        return (
            <div className="validatable">
                {/* <input ref={this.inputRef} onChange={this.onChange} {...getStrippedProps(this.props, this.reservedProps)} onBlur={this.onBlur} /> */}
                <select ref={this.selectRef} onChange={this.onChange} {...getStrippedProps(this.props, this.reservedProps)} onBlur={this.onBlur}>
                    {this.props.children}
                </select>
                <div className="error-msg">
                    {this.getErrorMessage()}
                </div>
            </div>
        )
    }
}

Select.propTypes = {
    submitted: PropTypes.bool.isRequired,
    validationRules: PropTypes.array,
    onValidityChanged: PropTypes.func.isRequired
};

export { Select };