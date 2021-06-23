import React, { useCallback, useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SelectSearch, { fuzzySearch } from 'react-select-search';
import Select from 'react-select';
import { makeStyles } from "@material-ui/core/styles";
import {action_GET_suppliers,action_GET_InsertSupplier,action_set_addselectedsuppliers,action_set_addnewsupplieropenmodal} from '../../Services/Actions/Inventory_Actions'
import { Button } from '@material-ui/core';
import useStyles from './style';
 const SearchSupplier =() => {
     const suppliers = useSelector(state => state.Inventory_Reducers.suppliers)
     const singlerequestheader = useSelector(
        (state) => state.Inventory_Reducers.singlerequestheader
      );
    const dispatch=useDispatch();
    const [options,setoptions]=useState([]);
    const [selectedsupplier,setselectedsupplier]=useState("");
    useEffect(() => {
        let mounted=true;
        if (mounted){
            dispatch(action_GET_suppliers())
        }
        return () => {
            mounted=false
        }
    }, [dispatch])
const supllierlist=suppliers?.data.map((item)=>({
    value:item.scode,
    label:item.sname,
}))
const handleSelectedSupplier = useCallback(
    (selected) => {
        setselectedsupplier(selected)
 
    },
    [],
)
const handleSubmitSelectedSupplier = useCallback(() =>{
    
    dispatch(action_set_addnewsupplieropenmodal(false));
 
        
dispatch(action_set_addselectedsuppliers(selectedsupplier))
    
},[dispatch, selectedsupplier]) 

const classes = useStyles();
    return (
        <div>
     <Select
          style={{ height: 300 }}
          isMulti
          placeholder="Select Supplier"
          isSearchable={true}
          onChange={handleSelectedSupplier}
          name="Supplier"
     
          options={supllierlist}
        />
         <div style={{marginTop:100}}>
                  <Button
                     className={classes.RoundedButton}
                  variant="contained"
                  color="primary"
                  onClick={() => handleSubmitSelectedSupplier()}
                >
                  Add Suppliers
                </Button>
                </div>
        </div>
    )
}
export default SearchSupplier;