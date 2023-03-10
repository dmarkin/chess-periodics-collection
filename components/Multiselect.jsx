import * as React from 'react';
import {useTheme} from '@mui/material/styles';
import {Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select} from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const MultiSelect = ({list, value, required, name, id, label, labelId, onChange}) => {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: {value},
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        onChange(event);
    };

    return (
        <div>
            <FormControl sx={{minWidth: '100%'}}>
                <InputLabel id={labelId}>{label}</InputLabel>
                <Select
                    required={required}
                    name={name}
                    labelId={labelId}
                    id={`${name}-${id}`}
                    multiple
                    value={value}
                    onChange={handleChange}
                    input={<OutlinedInput id={`input-${name}-${id}`} label={label}/>}
                    renderValue={(selected) => (
                        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                            {selected.map((value) => (
                                <Chip key={value} label={value}/>
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {list.map((item) => (
                        <MenuItem
                            key={item.id}
                            value={item.id}
                            style={getStyles(name, personName, theme)}
                        >
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

MultiSelect.defaultProps = {
    list: [],
    value: []
};

export default MultiSelect;