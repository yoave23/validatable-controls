export const getStrippedProps = (props, reservedProps) => {
    //assign the stripped props to the input
    let strippedProps = {};
    for (const key in props) {
        if (props.hasOwnProperty(key)) {
            const prop = props[key];
            if (reservedProps.indexOf(key) === -1) {
                strippedProps[key] = prop;
            }
        }
    }
    return strippedProps;
}