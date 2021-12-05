
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { connect } from 'react-redux';
import {eventActions} from '../../actions';

const CATEGORIES = ["Food & Drink"];
const NEIGHBORHOODS = ["Flatblush"];


function EventSearch({ changeNeighborhood,
                        changeCategory,
                        changeStart})
{
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
        changeStart(newValue.getTime() / 1000);
    }



    function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
    }
      

    var props = [
        {
            inputValue: "Neighborhood",
            inputLabel : 'neighborhood-input-label',
            
            selects: [
                {
                    labelId : 'neighborhood-label',
                    id: 'neighborhood',
                    onChange: neighborhoodOnChange,
                    value: "Flatblush",values: NEIGHBORHOODS
                }
            ]
            
        },
        {
            inputValue: "Category",
            inputLabel : 'category-input-label',
            selects: [
                {
                    labelId : 'category-label',
                    id: 'category',
                    onChange: categoryOnChange,
                    value: "Food & Drink",
                    values: CATEGORIES
                }
            ]
        },
        {
            inputValue: "Start",
            inputLabel : 'start-input-label',
            onChange: startOnChange,
            value : new Date()
            // selects: [
            //     {
            //         labelId : 'start-hour-label',
            //         id: 'start-hour',
            //         onChange: startHourOnChange,
            //         value: "0",
            //         values: range(1, 12)
            //     },
            //     {
            //         labelId : 'start-minute-label',
            //         id: 'start-minute',
            //         onChange: startMinuteOnChange,
            //         value: "0",
            //         values: range(0, 59)
            //     },
            //     {
            //         labelId : 'start-APM-label',
            //         id: 'start-APM',
            //         onChange: startAPMOnChange,
            //         value: "AM",
            //         values: ["AM", "PM"]
            //     }
            // ]

        }
    ];

    return (
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
                    value="Flatblush"
                    label="neighborhood"
                    onChange={neighborhoodOnChange}
                >
                    {
                        NEIGHBORHOODS.map(value => {
                            <MenuItem value={value}>{value}</MenuItem>
                        })
                    }
                
                </Select>
            <InputLabel id="category-input-label">Category</InputLabel>
                <Select
                    labelId="category-label"
                    id="category"
                    value="Food & Drink"
                    label="category"
                    onChange={categoryOnChange}
                >
                    {
                        CATEGORIES.map(value => {
                            <MenuItem value={value}>{value}</MenuItem>
                        })
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
        {/* {
            props.map(prop => {
                
                
                prop.inputValue === "start" ? 
                (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label={prop.inputLabel}
                        value={prop.value}
                        onChange={prop.onChange}
                      />
                    </LocalizationProvider>
                  )
                : (<InputLabel id={prop.inputLabel}>{prop.inputValue}</InputLabel>
                    <Select
                            labelId={select.labelId}
                            id={select.id}
                            value={select.value}
                            label={select.value}
                            onChange={onChange}
                        >
                            {
                                select.values.map(value => {
                                    <MenuItem value={value}>{value}</MenuItem>
                                })
                            }
                        
                        </Select>
                    )
                
            })
            
        } */}
        </FormControl>
        
    </Box>
    )
}

function mapState(state) {
    return {};
}
const actionCreators = {
    changeCategory: eventActions.changeCategory,
    changeStart: eventActions.changeStart,
    changeNeighborhood: eventActions.changeNeighborhood
};

const connectedRoomComponent = connect(mapState, actionCreators)(EventSearch);
export { connectedRoomComponent as EventSearch };