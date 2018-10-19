import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutocompleteItem from './AutocompleteItem';
import { controlHoc } from './ControlHoc';
//import { areObjectsEqual } from './utils';
import './Autocomplete.css';

class Autocomplete extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: '',
            matchingItems: [],
            currentFocus: -1,
            errorMessage: '',
            blurred: false
        };

        // if a ref as passed use it, else create a new one
        this.innerRef = this.props.innerRef || React.createRef();
    }

    shouldComponentUpdate(nextProps, nextState) {
        let shouldUpdate = false;
        if (this.state.searchValue !== nextState.searchValue ||
            this.props.value !== nextProps.value ||
            !this.areArraysEqual(this.state.matchingItems, nextState.matchingItems) ||
            this.state.currentFocus !== nextState.currentFocus) {
            shouldUpdate = true;
        }
        return shouldUpdate;
    }

    areArraysEqual = (arr1, arr2) => {
        if (arr1.length !== arr2.length) {
            return false;
        }
        let equal = true;
        for (let index = 0; index < arr1.length; index++) {
            const element1 = arr1[index];
            if (arr2[index] !== element1) {
                equal = false;
                return false;
            }
        }
        return equal;
    }

    componentDidUpdate() {
        //console.log('%c UPDATED', 'background: #444; color: #bada55');
    }

    componentDidMount() {
        document.addEventListener("click", this.closeList);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.closeList, false);
    }

    closeList = (element) => {
        this.setState({ matchingItems: [], currentFocus: -1 });
    }

    onItemClick = (value) => {
        // create a dummy onChange param
        const e = {
            target: {
                name: this.props.name,
                value: value
            }
        }
        this.onChange(e);
        this.closeList();
    }

    getItems = () => {
        return this.state.matchingItems.map((item, index) => <AutocompleteItem
            value={item}
            searchValue={this.state.searchValue}
            key={item}
            onClick={this.onItemClick}
            index={index}
            currentFocus={this.state.currentFocus} />);
    }

    onChange = (e) => {
        let val = e.target.value;
        if (val.trim() === this.state.searchValue.trim()) {
            return;
        }
        this.setState({ searchValue: val });
        this.closeList();

        this.props.validate(e.target.value);
        if (this.props.onChange) {
            this.props.onChange(e);
        }

        if (!val) {
            return false;
        }

        let matchingItems = this.props.items.filter(item => item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        this.setState({ matchingItems });
    }

    onKeyDown = (e) => {
        switch (e.keyCode) {
            case 40:
                this.setState({ currentFocus: this.state.currentFocus + 1 });
                break;
            case 38:
                this.setState({ currentFocus: this.state.currentFocus - 1 });
                break;
            case 13:
                if (this.state.currentFocus > -1) {
                    this.onItemClick(this.state.matchingItems[this.state.currentFocus]);
                }
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div className="validatable autocomplete">
                <input type="text"
                    ref={this.innerRef}
                    onChange={this.onChange}
                    value={this.state.searchValue}
                    onKeyDown={this.onKeyDown}
                    onBlur={this.props.onBlur}
                    {...this.props.getThinProps(this.props, this.props.reservedProps)} />
                <div id={this.props.id + "autocomplete-list"} className="autocomplete-items">
                    {this.getItems()}
                </div>
                <div className="error-msg">
                    {this.props.getErrorMessage()}
                </div>
            </div>
        )
    }
}

Autocomplete.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    id: PropTypes.string.isRequired,
    submitted: PropTypes.bool.isRequired,
    onValidityChanged: PropTypes.func.isRequired
};

export default controlHoc(React.forwardRef((props, ref) => <Autocomplete innerRef={ref} {...props} />));