import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { controlHoc } from './ControlHoc';
//import M from 'materialize-css';
// import M from '../node_modules/materialize-css/dist/js/materialize.min.js';
// import '../node_modules/materialize-css/dist/css/materialize.min.css';

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

    componentDidMount() {
        //M.AutoInit(this.innerRef.current);
        M.AutoInit(this.innerRef.current);
    }

    componentDidUpdate() {
        M.AutoInit(this.innerRef.current);
    }

    render() {
        const inputProps = { ...this.props.getThinProps(this.props, this.props.reservedProps) };
        if (!inputProps.id) {
            inputProps.id = inputProps.name;
        }

        console.log(inputProps);
        return (
            <React.Fragment>
                <input ref={this.innerRef} onChange={this.props.onChange}
                    {...inputProps} type="text" />
                <label htmlFor={inputProps.id}>{this.props.label}</label>
                <div className="error-msg">
                    {this.props.getErrorMessage()}
                </div>
            </React.Fragment>
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

/*
            // <div className="validatable-material">
            //     <input ref={this.innerRef}
            //         onChange={this.props.onChange}
            //         onBlur={this.props.onBlur}
            //         {...inputProps}
            //     />
            //     <span className="highlight" />
            //     <span className="bar" />
            //     <label className="floating-label">{this.props.label}</label>
            //     <div className="error-msg">
            //         {this.props.getErrorMessage()}
            //     </div>
            // </div>
*/