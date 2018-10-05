import React, { Component } from 'react';

export function formHoc(WrappedForm) {
    return class FormHoc extends Component {
        constructor(props) {
            super(props);
        }

        render() {
            return (
                <WrappedForm {...this.props} />
            );
        }
    }
}
