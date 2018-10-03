import React, { Component } from 'react';
const WrapperContext = React.createContext('some test');

export function controlHoc(WrappedControl) {
    return class ControlHoc extends Component {
        constructor(props) {
            super(props);

            this.state = { blurred: '' };
        }

        // getErrorMessage = () => {
        //     if (this.state.blurred || this.props.submitted) {
        //         return this.state.errorMessage;
        //     }
        //     return '';
        // }

        render() {
            //console.log(this.props);
            const { test } = this.state;
            const wrapperContext = 'wrapperContext';
            return (
                <WrapperContext.Consumer>
                    {wrapperContext => <WrappedControl {...this.props} test={test} wrapperContext={wrapperContext} />}
                </WrapperContext.Consumer>
            )
        }
    }
}
