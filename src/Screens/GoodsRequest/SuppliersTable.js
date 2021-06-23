import React,{useCallback, useEffect} from 'react'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Button, FormControl, Icon, Paper, TextField } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import useStyles from './style';
import { useSelect } from 'react-select-search';
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import {action_set_addselectedsuppliers,action_GET_selectedsuppliers,
  action_set_itemforsupplieropenmodal} from '../../Services/Actions/Inventory_Actions';
import { useSelector,useDispatch } from 'react-redux';
import { useState } from 'react';
 const SuppliersTable =({hideactions})=> {
    const classes = useStyles();
    const dispatch=useDispatch()
    const selectedsuppliers = useSelector(state => state.Inventory_Reducers.selectedsuppliers);
    const requestinfo = useSelector(
      (state) => state.Inventory_Reducers.requestinfo
    );
    const [ActionsHide, setActionsHide] = useState("visible");

    useEffect(() => {
      let mounted=true
      const getsuppliers=async ()=>{
            if(requestinfo?.data?.prno !== undefined){
                dispatch(action_GET_selectedsuppliers(requestinfo?.data?.prno))
            }
      }
      mounted && getsuppliers()
      return () => {
        mounted=false
      }
    }, [dispatch, requestinfo?.data?.prno])

    const handleClickItem = useCallback(()=>{
        // dispatch(action_set_itemforsupplieropenmodal(true))
    },[dispatch])
    return (
        <div>
             <CardContent style={{ padding: 50 }}>
        <Grid
          container
          direction="row"
          spacing={3}
          justify="space-evenly"
          alignItems="baseline"
        ></Grid>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="spanning table">
            <TableHead>
              <TableRow >
                <TableCell>Supplier Code</TableCell>
                <TableCell>Supplier Name</TableCell>
                {hideactions ? null : (
                  <TableCell style={{ visibility: { ActionsHide } }}>
                    Actions
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* item.itemcode, item.itemdesc, item.unitdesc, item.totalqty,
                  item.itemqty, item.requestedqty, item.unitprice, "",
                  item.specs */}

              {selectedsuppliers?.data.map((row, index) => {
             
                return(
                <TableRow key={row.value} onClick={() => handleClickItem(row)}>
                  <TableCell>{row.value}</TableCell>
                  <TableCell>{row.label}</TableCell>
                  {hideactions ? null : (
                    <TableCell>
                      <IconButton
                        aria-label="delete"
                        className={classes.margin}
                        onClick={() => {
                          const _itemState = selectedsuppliers?.data.filter(
                            (_item, _index) => _index !== index
                          );
                          const _itemState3 = selectedsuppliers.data.filter(
                            (_item, _index) => _item.value !== row.value
                          );

                          dispatch(action_set_addselectedsuppliers(_itemState3))

                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              )
             
                      }
              )}
            </TableBody>
          </Table>
        </TableContainer>
        </CardContent>
        </div>
    )
}
export default SuppliersTable
