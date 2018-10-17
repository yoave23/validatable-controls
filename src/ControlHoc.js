import React, { Component } from 'react';

export function controlHoc(WrappedControl) {
    return class ControlHoc extends Component {
        constructor(props) {
            super(props);

            this.state = {
                blurred: '',
                errorMessage: ''
            };
            this.controlRef = React.createRef();

            // strip down props used internally (we'll call them later if needed)
            this.reservedProps = ['onChange', 'submitted', 'validationRules', 'onValidityChanged', 'innerRef', 'getErrorMessage', 'validate', 'reservedProps', 'getThinProps'];
        }

        componentDidMount() {
            this.validate(this.props.value || '');
        }

        componentWillUnmount() {
            this.props.onValidityChanged(this.props.name, true, '');
        }

        getErrorMessage = () => {
            if (this.state.blurred || this.props.submitted) {
                return this.state.errorMessage;
            }
            return '';
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
                this.props.onValidityChanged(this.controlRef.current, this.state.errorMessage);
            });
        }

        getThinProps = (props, reservedProps) => {
            //assign the thin props to the input
            let thinProps = {};
            for (const key in props) {
                if (props.hasOwnProperty(key)) {
                    const prop = props[key];
                    if (reservedProps.indexOf(key) === -1) {
                        thinProps[key] = prop;
                    }
                }
            }
            return thinProps;
        }

        render() {
            return (
                <WrappedControl
                    {...this.props}
                    getErrorMessage={this.getErrorMessage}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    ref={this.controlRef}
                    validate={this.validate}
                    reservedProps={this.reservedProps}
                    getThinProps={this.getThinProps} />
            )
        }
    }
}
