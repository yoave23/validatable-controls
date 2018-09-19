import React from 'react';
import './AutocompleteItem.css';

const AutocompleteItem = (props) => {
    const getValue = () => {
        const value = props.value;
        const searchValue = props.searchValue;
        const index = props.value.toLowerCase().indexOf(props.searchValue.toLowerCase());

        const start = index > 0 ? <span key="1">{value.substr(0, index)}</span> : null;
        const bold = <b key="2">{value.substr(index, searchValue.length)}</b>;
        const end = <span key="3">{value.substr(index + searchValue.length)}</span>;

        return [start, bold, end];
    }

    const getClass = () => {
        return 'autocomplete-item ' + (props.index === props.currentFocus ? 'active' : '');
    }

    return (
        <div className={getClass()} onClick={() => props.onClick(props.value)}>
            {getValue()}
        </div>
    );
};

export default AutocompleteItem;