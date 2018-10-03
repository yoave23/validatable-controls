import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { controlHoc } from './ControlHoc';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
            blurred: false
        };

        // if a ref as passed use it, else create a new one
        this.innerRef = this.props.innerRef || React.createRef();
    }

    render() {
        return (
            <div className="validatable">
                <input ref={this.innerRef} onChange={this.props.onChange}
                    {...this.props.getThinProps(this.props, this.props.reservedProps)}
                    onBlur={this.props.onBlur} />
                <div className="error-msg">
                    {this.props.getErrorMessage()}
                </div>
            </div>
        )
    }
}

Input.propTypes = {
    submitted: PropTypes.bool.isRequired,
    validationRules: PropTypes.array,
    onValidityChanged: PropTypes.func.isRequired
};

export default controlHoc(React.forwardRef((props, ref) => <Input innerRef={ref} {...props} />));
