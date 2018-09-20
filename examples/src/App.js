import React, { Component } from 'react';
import { Input, Select } from '../../src';
import { Autocomplete } from '../../src';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            validityStatus: {},
            submitted: false,
            testInput: 'test input'
        };

        this.autocompleteItems = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central Arfrican Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauro", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre & Miquelon", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts & Nevis", "St Lucia", "St Vincent", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks & Caicos", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];
        this.selectItems = ["javascript", "java", "c++", "c#", "python"];
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
    }

    onValidityChanged = (input, errorMessage) => {
        this.setState(prevState => ({
            validityStatus: {
                ...prevState.validityStatus, [input.name]: errorMessage
            }
        }));
    }

    isFormValid = () => {
        return Object.keys(this.state.validityStatus).filter(item => !!this.state.validityStatus[item]).length === 0;
    }

    // sample validation Rules
    required = (value) => !!value ? '' : 'this field is required';

    shouldBeEven = (value) => {
        if (!value || value.length % 2 === 0) {
            return ''
        }
        return 'value length is not even';
    }

    shouldBeLessThanTen = (value) => {
        if (!value || value.length < 10) {
            return ''
        }
        return 'value length should be less than ten';
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div className="example-container">
                <form onSubmit={this.onSubmit}>
                    <div className="control-group">
                        <label>Autocomplete</label>
                        <Autocomplete items={this.autocompleteItems}
                            id="testAutocomplete"
                            name="testAutocomplete"
                            submitted={this.state.submitted}
                            onValidityChanged={this.onValidityChanged}
                            validationRules={[this.required]} />
                    </div>
                    <div className="control-group">
                        <label>Input</label>
                        <Input submitted={this.state.submitted}
                            onValidityChanged={this.onValidityChanged}
                            validationRules={[this.shouldBeEven, this.shouldBeLessThanTen]}
                            name="testInput"
                            value={this.state.testInput}
                            onChange={this.onChange} />
                    </div>

                    <div className="control-group">
                        <label>Select</label>
                        <Select
                            submitted={this.state.submitted}
                            onValidityChanged={this.onValidityChanged}>
                            {this.selectItems.map(item => <option key={item}>{item}</option>)}
                        </Select>
                    </div>
                    <button onClick={this.onSubmit}>Submit</button>
                </form>
                Form is valid: {this.isFormValid() ? 'yes' : 'no'}
            </div>
        )
    }
}

export default App;