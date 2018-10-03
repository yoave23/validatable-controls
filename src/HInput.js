import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStrippedProps } from './utils';
import { controlHoc } from './ControlHoc';

class HInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
            blurred: false
        };

        // if a ref as passed use it, else create a new one
        this.innerRef = this.props.innerRef || React.createRef();

        // strip down props used internally (we'll call them later if needed)
        this.reservedProps = ['onChange', 'submitted', 'validationRules', 'onValidityChanged', 'innerRef', 'wrapperContext'];
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
            this.props.onValidityChanged(this.innerRef.current, this.state.errorMessage);
        });
    }

    getErrorMessage = () => {
        if (this.state.blurred || this.props.submitted) {
            return this.state.errorMessage;
        }
        return '';
    }

    render() {
        console.log(this);
        return (
            <div className="validatable">
                <input ref={this.innerRef} onChange={this.onChange} {...getStrippedProps(this.props, this.reservedProps)} onBlur={this.onBlur} />
                <div className="error-msg">
                    {this.getErrorMessage()}
                </div>
            </div>
        )
    }
}

HInput.propTypes = {
    submitted: PropTypes.bool.isRequired,
    validationRules: PropTypes.array,
    onValidityChanged: PropTypes.func.isRequired
};

//export default controlHoc(React.forwardRef((props, ref) => <HInput innerRef={ref} {...props} />));
export default controlHoc(HInput);