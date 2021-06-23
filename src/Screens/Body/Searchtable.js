import 'date-fns';
import React,{useCallback, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,

} from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import useStyles from './style'
import {action_set_search,action_GET_listofrequestsearched} from '../../Services/Actions/Inventory_Actions'
import { Button } from '@material-ui/core';
import { useDispatch,useSelector } from 'react-redux';
import useKeypress from '../../Hooks/useKeyPress';
const Searchtable = () => {
    const user_info = useSelector((state) => state.DefaultReducers.user_info);
    const [selectedDate, setSelectedDate] = useState('');
    const [status, setstatus] = useState('');
    const classes=useStyles()
    const dispatch=useDispatch()
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

  

    const handleChange = (event) => {
        setstatus(event.target.value);
    };
    const handleFilter = useCallback(() => {
       dispatch(action_set_search(status,selectedDate,false))
       dispatch(action_GET_listofrequestsearched(user_info?.deptcode,status,selectedDate))
    },[dispatch, selectedDate, status, user_info?.deptcode]);
    useKeypress('Escape', () => {
        dispatch(action_set_search("","",false))
      
      });
    return (
      
        <div> 
       
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <FormControl className={classes.formFilterControl}>
        <Select
          value={status}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="" disabled>
            Status
          </MenuItem>
          <MenuItem value="For Approval">For Approval</MenuItem>
          <MenuItem value="Approved">Approved</MenuItem>
          <MenuItem value="Cancelled">Cancelled</MenuItem>
          <MenuItem value="Issued">Issued</MenuItem>
        </Select>
        <FormHelperText>Status</FormHelperText>
      </FormControl>
          <Grid container justify="space-around">
          
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
    
        </Grid>
        </MuiPickersUtilsProvider>
        <Button fullWidth={true} className={classes.RoundedButton}  variant="contained" color="secondary" onClick={()=>handleFilter()}>
            Filter
        </Button>   
        </div>
    );
};

Searchtable.propTypes = {
    
};

export default Searchtable;