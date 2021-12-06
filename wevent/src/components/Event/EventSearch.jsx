
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { connect } from 'react-redux';
import {eventActions} from '../../actions';

const CATEGORIES = ["Food & Drink"];
const NEIGHBORHOODS = ["Flatblush"];

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
        !personName || personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

function EventSearch({ event,
                        changeNeighborhood,
                        changeCategory,
                        changeStart})
{
    const theme = useTheme();
    var neighborhoodOnChange = function(neighborhood)
    {
        changeNeighborhood(neighborhood);
    }

    var categoryOnChange = function(category)
    {
        changeCategory(category);
    }

    var startOnChange = function(newValue)
    {
        changeStart(Math.floor(newValue.getTime() / 1000));
    }

    return (
    <Container maxWidth="80vw">
    <Box
    component="form"
    sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
    >
        <FormControl fullWidth>
            <InputLabel id="neighborhood-input-label">Neighborhood</InputLabel>
                <Select
                    labelId="neighborhood-label"
                    id="neighborhood"
                    value={0}
                    label="neighborhood"
                    onChange={neighborhoodOnChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                >
                    {
                        NEIGHBORHOODS.map((value,index) => (
                            <MenuItem name={value} value={index} style={getStyles(value, event.searchEvent.neighborhood, theme)}>
                                {value}
                            </MenuItem>
                        ))
                    }

                </Select>
        </FormControl>
        <FormControl fullWidth>
            <InputLabel id="category-input-label">Category</InputLabel>
                <Select
                    labelId="category-label"
                    id="category"
                    value={0}
                    label="category"
                    onChange={categoryOnChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                >
                    {
                        CATEGORIES.map((value,index) => (
                            <MenuItem name={value} value={index} style={getStyles(value, event.searchEvent.category, theme)}>
                                {value}
                            </MenuItem>
                            ))
                    }
                
                </Select>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="start-label"
                value={new Date()}
                onChange={startOnChange}
                />
            </LocalizationProvider>
        
        </FormControl>
    </Box>
    </Container>
    )
}

function mapState(state) {
    return {event: state.event};
}
const actionCreators = {
    changeCategory: eventActions.changeCategory,
    changeStart: eventActions.changeStart,
    changeNeighborhood: eventActions.changeNeighborhood
};

const connectedRoomComponent = connect(mapState, actionCreators)(EventSearch);
export { connectedRoomComponent as EventSearch };