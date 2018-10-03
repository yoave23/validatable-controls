import React, { Component } from 'react';

export function hhPoc(Wrapped) {
    return class HH extends Component {
        constructor(props) {
            super(props);

            this.state = {};
        }

        test = () => {
            console.log('aaaaaaaaaaaaaaaaaa');
        }

        render() {
            return (
                <Wrapped {...this.props} test={this.test}/>
            )
        }
    }
}
