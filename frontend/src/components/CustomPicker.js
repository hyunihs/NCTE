import DropDownPicker from 'react-native-dropdown-picker';
import { theme } from '../theme';

const CustomPicker = ({ open, setOpen, value, setValue, items, setItems, placeholder }) => {
    return (
        <DropDownPicker
            open = {open}
            value = {value}
            items = {items}
            setOpen = {setOpen}
            setValue = {setValue}
            setItems = {setItems}
            containerStyle = {{
                width: 200,
            }}
            placeholder = {placeholder}
            dropDownDirection = "BOTTOM"
            style = {{
                marginBottom: open ? 100 : 10
            }}
            listItemContainerStyle = {{
                height: 30,
            }}
        />
    );
}

export default CustomPicker;