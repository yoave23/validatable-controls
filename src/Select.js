import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { controlHoc } from './ControlHoc';

class Select extends Component {
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
                <select ref={this.innerRef} onChange={this.props.onChange}
                    {...this.props.getThinProps(this.props, this.props.reservedProps)}
                    onBlur={this.props.onBlur}>
                    {this.props.children}
                </select>
                <div className="error-msg">
                    {this.props.getErrorMessage()}
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

//export { Select };
export default controlHoc(React.forwardRef((props, ref) => <Select innerRef={ref} {...props} />));
