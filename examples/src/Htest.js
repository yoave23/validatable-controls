import React, { Component } from 'react';
import { hhPoc } from './HH';
class Htest extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                Hello from Htest
                <button onClick={() => this.props.test()}>TEST</button>
            </div>
        )
    }
}

export default hhPoc(Htest);
