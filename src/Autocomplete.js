import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutocompleteItem from './AutocompleteItem';
import { getStrippedProps } from './utils';
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
        this.autoCompleteRef = React.createRef();
        this.reservedProps = ['onChange', 'submitted', 'validationRules', 'onValidityChanged'];
    }

    componentDidMount() {
        document.addEventListener("click", this.closeList);
        this.validate(this.props.value || '');
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
        this.setState({ searchValue: val });
        this.closeList();

        this.validate(e.target.value);
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
            this.props.onValidityChanged(this.autoCompleteRef.current, this.state.errorMessage);
        });
    }

    getErrorMessage = () => {
        if (this.state.blurred || this.props.submitted) {
            return this.state.errorMessage;
        }
        return '';
    }

    render() {
        return (
            <div className="validatable autocomplete">
                <input type="text" ref={this.autoCompleteRef} onChange={this.onChange}
                    value={this.state.searchValue}
                    onKeyDown={this.onKeyDown}
                    {...getStrippedProps(this.props, this.reservedProps)} onBlur={this.onBlur} />
                <div id={this.props.id + "autocomplete-list"} className="autocomplete-items">
                    {this.getItems()}
                </div>
                <div className="error-msg">
                    {this.getErrorMessage()}
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

export { Autocomplete };
