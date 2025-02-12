    import React, { useEffect, useContext } from 'react';
    import TextField from '@mui/material/TextField';
    import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
    import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
    import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
    import { AppContext } from '../context/context';

    const Calendar = () => {
    const { selectDate, setSelectDate } = useContext(AppContext);

    useEffect(() => {
        const today = new Date();
        const maxDate = new Date(today.getFullYear() + 10, today.getMonth(), 1); 
        maxDate.setMonth(maxDate.getMonth() + 1, 0); 

        setSelectDate(today); 
    }, [setSelectDate]);

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker
                sx={{
                    '.MuiPickersLayout-actionBar': {
                      display: 'none',
                    },
                  }}
                    variant='static'
                    orientation='desktop'
                    value={selectDate}
                    minDate={new Date()} 
                    maxDate={new Date(new Date().getFullYear() + 10, new Date().getMonth() + 11, 0)} 
                    onChange={(newValue) => setSelectDate(newValue)}
                    renderInput={(params) => {
                        <TextField {...params} />;
                    }}
                    renderDay={(day, _value, DayComponentProps) => {
                    }}
                />
            </LocalizationProvider>
        </div>
    );
    };

    export default Calendar;