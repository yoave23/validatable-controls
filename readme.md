# validatable-controls
A set of react components that can be easily validated according to custom rules.

each control in this library validates itself when:
- the component is mounted (`componentDidMount`)
- when the component's value change
- on blur

error messages will only display after a blur or if the parent form was submitted.

## usage
### general
the containing component needs to implement some logic in order to make the most out of the controls:
- pass a `submitted` prop to the control
- implement an `onValidityChanged` function to store the validity status of all the controls and pass it as a prop to the control

```
import { Input } from 'validatable-controls';
class App extends Component {
    state = {
        validityStatus: {},
        submitted: false
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        if (!this.isFormValid()) {
            return;
        }
        // your submit logic...
    }

    // iterate over the object that contains the validity status
    isFormValid = () => {
        return Object.keys(this.state.validityStatus).filter(item => !!this.state.validityStatus[item]).length === 0;
    }

    // get notified by the components if their validity status has changed
    onValidityChanged = (input, errorMessage) => {
        const validityStatus = { ...this.state.validityStatus };
        validityStatus[input.name] = errorMessage;
        this.setState({ validityStatus });
    }

    // sample validation Rules
    required = (value) => !!value ? '' : 'this field is required';

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <Input submitted={this.state.submitted}
                        onValidityChanged={this.onValidityChanged}
                        validationRules={[this.required]}
                        name="testInput"
                        value={this.state.testInput}
                        onChange={this.onChange} />
                    <button onClick={this.onSubmit}>Submit</button>
                </form>

                Form is valid: {this.isFormValid() ? 'yes' : 'no'}
            </div>
        )
    }
}
```
### validation rules
validation rules are functions passed as `props` in an array.
the validation function is invoked on `componentDidMount`, `onBlur` and `onChange` and is invoked with control's value as a parameter.
the validation function should return an error text if the validation did not pass or an empty string if it did.
example:
```
shouldBeLessThanTen = (value) => {
    if (!value || value.length < 10) {
        return ''
    }
    return 'value length should be less than ten';
}
```
this will be passed to the control like this:
```
<Input submitted={this.state.submitted}
    onValidityChanged={this.onValidityChanged}
    // right here ▼
    validationRules={[this.shouldBeLessThanTen]}
    name="testInput"
    value={this.state.testInput}
    onChange={this.onChange} 
    ref={this.inputRef}/>
```
