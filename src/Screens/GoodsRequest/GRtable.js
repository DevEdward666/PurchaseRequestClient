import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, FormControl, Icon, Paper, TextField } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Container from '@material-ui/core/Container';
import useStyles from "./style";
import { useTheme } from "@material-ui/core/styles";
import TableFooter from "@material-ui/core/TableFooter";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../../Plugin/Modal/CustomModal";

import {
  action_set_openmodal,
  action_set_qtyopenmodal,
  action_set_addnewitemopenmodal
} from "../../Services/Actions/Inventory_Actions";
import PrintIcon from "@material-ui/icons/Print";
import { set_sncakbar } from "../../Services/Actions/Defaults_Actions";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import TouchRipple from "@material-ui/core/ButtonBase/TouchRipple";
import CloseIcon from "@material-ui/icons/Close";
import {
  action_set_requesteddtls,
  action_set_requestedheader,
  action_set_search_stockdesc,
  action_generate_report,
  action_set_open_backdrop,
  action_set_addnewitem,
  action_set_addnewsupplieropenmodal,
} from "../../Services/Actions/Inventory_Actions";
import GRFooter from "./GRFooter";
import SuppliersTable from "./SuppliersTable";
import useKeypress from "../../Hooks/useKeyPress";
import SearchSupplier from "./SearchSupplier";
import SupplierDetails from "./SupplierDetails";
const GRtable = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const office = useSelector((state) => state.Inventory_Reducers.office);
  const selected = useSelector((state) => state.Inventory_Reducers.selected);
  const user_info = useSelector((state) => state.DefaultReducers.user_info);
  const singlerequestdetails = useSelector(
    (state) => state.Inventory_Reducers.singlerequestdetails
  );
  const requestinfo = useSelector(
    (state) => state.Inventory_Reducers.requestinfo
  );

  const [ActionsHide, setActionsHide] = useState("visible");
  const [arrayitem, setarrayitem] = useState([]);
  const [selectediteminfo, setselecteditem] = useState([]);
  const [listarrayitem, setlistarrayitem] = useState([]);
  const [saverchildarrayitem, setsaverchildarrayitem] = useState([]);

  const [addstockdesc, setaddstockdesc] = useState("");
  const [addaveragecost, setaddaveragecost] = useState("");
  const [addunit, setaddunit] = useState("");
  const [itemqty, setitemqty] = useState("");
  const [itemremarks, setitemremarks] = useState("");

  const [totalpr, settotalpr] = useState(0);
  const [hideactions, sethideactions] = useState(false);
  const [select, setSelected] = React.useState([]);
  const isOpen = useSelector((state) => state.Inventory_Reducers.isOpen);
  const QtyOpen = useSelector((state) => state.Inventory_Reducers.QtyOpen);
  const AddNewItemOpen = useSelector((state) => state.Inventory_Reducers.AddItemOpen);
  const AddNewItem = useSelector((state) => state.Inventory_Reducers.AddNewItem);
  const AddNewSupplier = useSelector((state) => state.Inventory_Reducers.AddNewSupplier);
  const AddItemForSupplier = useSelector((state) => state.Inventory_Reducers.AddItemForSupplier);
  const noninventory = useSelector(
    (state) => state.Inventory_Reducers.noninventory
  );
  const isSelected = (name) => select.indexOf(name) !== -1;

  const handleClose = useCallback(async () => {
    dispatch(action_set_openmodal(false));
  }, [dispatch]);

  const handleCloseAddItem = useCallback(async () => {
    dispatch(action_set_addnewitemopenmodal(false));
  }, [dispatch]);
  const handleCloseAddSupplier = useCallback(async () => {
    dispatch(action_set_addnewsupplieropenmodal(false));
  }, [dispatch]);

  useEffect(() => {
    let mounted = true;
    const checkifrequestshow = async () => {
      if (mounted) {
      
        if (
          singlerequestdetails?.loading &&
          requestinfo?.data?.prno !== undefined
        ) {
          dispatch(action_set_open_backdrop("Loading",true))
      
          setarrayitem([]);
          settotalpr(0);
          singlerequestdetails?.data?.map((item) => {
            sethideactions(true);
             settotalpr((prev)=>prev+(parseInt(item?.prqty)*parseFloat(item?.prprice).toFixed(2)))
            return setarrayitem((prev) => [
              ...prev,
              {
                stockcode: item?.stockcode,
                stockdesc: item?.stockdesc,
                prqty: item?.prqty,
                averagecost: item?.prprice,
                unitdesc: item?.unitdesc,
                itemremarks: item?.itemremarks,
              },
            ]);
          });
          dispatch(action_set_open_backdrop("Loading",false))
        } else {
          sethideactions(false);
          setitemremarks("")
        }
      }
    };
    mounted && checkifrequestshow();
    return () => {
      mounted = false;
    };
  }, [dispatch, requestinfo?.data?.prno, singlerequestdetails]);
  const handleAddNewItem =useCallback(async ()=>{
await dispatch(action_set_addnewitemopenmodal(true))
  },[dispatch])
  const handleAddQty = useCallback(async () => {
    if(itemqty<=0 || itemqty===""){
      dispatch(set_sncakbar(true,"Please Input Qty","warning"))
    }else{
      await dispatch(action_set_qtyopenmodal(false));
      let found = false;
      if (arrayitem.length <= 0) {
  
        await setarrayitem((prevArray) => [
          ...prevArray,
          {
            lineno: arrayitem.length + 1,
            linestatus: "O",
            deptcode: user_info?.deptcode,
            sectioncode: "",
            todept: office,
            tosection: "",
            stockcode: listarrayitem[0]?.stockcode,
            stockdesc: listarrayitem[0]?.stockdesc,
            averagecost: listarrayitem[0]?.averagecost,
            prqty: parseInt(itemqty),
            unitdesc: listarrayitem[0]?.unitdesc,
            itemremarks: itemremarks,
          },
        ]);
       
      } else {
        await arrayitem.map(async (item) => {
          if (item?.stockcode === listarrayitem[0]?.stockcode) {
            return (found = true);
          }
        });
        if (found) {
          dispatch(set_sncakbar(true, "Already Exist", "error"));
        } else {
          await setarrayitem((prevArray) => [
            ...prevArray,
            {
              lineno: arrayitem.length + 1,
              linestatus: "O",
              deptcode: user_info?.deptcode,
              sectioncode: "",
              todept: office,
              tosection: "",
              stockcode: listarrayitem[0]?.stockcode,
              stockdesc: listarrayitem[0]?.stockdesc,
              averagecost: listarrayitem[0]?.averagecost,
              prqty: parseInt(itemqty),
              unitdesc: listarrayitem[0]?.unitdesc,
              itemremarks: itemremarks,
            },
          ]);
        }
      }
      await setlistarrayitem([]);
    }
  
  }, [
    arrayitem,
    dispatch,
    itemqty,
    itemremarks,
    listarrayitem,
    office,
    user_info?.deptcode,
  ]);
  useEffect(() => {
    dispatch(action_set_requesteddtls(arrayitem));
  }, [arrayitem, dispatch]);

 
  const handleAddNewItemAdded = useCallback(
    async () => {
      let mounted = true;
if(itemqty<=0 || itemqty===""){
  dispatch(set_sncakbar(true,"Please Input Qty","warning"))
}else{
  dispatch(action_set_addnewitemopenmodal(false))
      dispatch(action_set_openmodal(false));
      if (mounted) {
        let found = false;
        if (arrayitem.length <= 0) {
          await setarrayitem((prevArray) => [
            ...prevArray,
            {
              lineno: arrayitem.length + 1,
              linestatus: "O",
              deptcode: user_info?.deptcode,
              sectioncode: "",
              todept: office,
              tosection: "",
              stockcode:"",
              stockdesc: addstockdesc,
              averagecost: parseFloat(addaveragecost),
              prqty: parseInt(itemqty),
              unitdesc: addunit,
              itemremarks: itemremarks,
            },
          ]);
         
        } else {
          await arrayitem.map(async (item) => {
            if (item?.stockdesc === AddNewItem?.stockdesc) {
              return (found = true);
            }
          });
          if (found) {
            dispatch(set_sncakbar(true, "Already Exist", "error"));
          } else {
            await setarrayitem((prevArray) => [
              ...prevArray,
              {
                lineno: arrayitem.length + 1,
                linestatus: "O",
                deptcode: user_info?.deptcode,
                sectioncode: "",
                todept: office,
                tosection: "",
                stockcode:"",
                stockdesc: addstockdesc,
                averagecost: parseFloat(addaveragecost),
                prqty: parseInt(itemqty),
                unitdesc: addunit,
                itemremarks: itemremarks,
              },
            ]);
          }
}
        
    
    }
  }
  },[AddNewItem, addaveragecost, addstockdesc, addunit, arrayitem, dispatch, itemqty, itemremarks, office, user_info?.deptcode]
  );

  console.log(arrayitem)
  const handleClickItem = useCallback(
    async (selecteitem) => {
      let newSelected = [];
      let mounted = true;

      if (mounted) {
        dispatch(action_set_qtyopenmodal(true));
        await setselecteditem([
          {
            stockcode: selecteitem?.stockcode,
            stockdesc: selecteitem?.stockdesc,
            averagecost: selecteitem?.averagecost,
            unitdesc: selecteitem?.unitdesc,
          }
        ])
        await setlistarrayitem((prevArray) => [
          ...prevArray,
          {
            stockcode: selecteitem?.stockcode,
            stockdesc: selecteitem?.stockdesc,
            averagecost: selecteitem?.averagecost,
            unitdesc: selecteitem?.unitdesc,
          },
        ]);
      }
      await dispatch(action_set_openmodal(false));
    },
    [dispatch]
  );
  const TablePaginationActions = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
      onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
      onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
      onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <div>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  };

  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

  const columns = [
    { id: "stockcode", label: "Code", minWidth: 170, align: "left" },
    { id: "sotckdesc", label: "Description", minWidth: 170, align: "left" },
    {
      id: "pack",
      label: "Pack",
      minWidth: 170,
      align: "left",
    },
    {
      id: "unit",
      label: "Unit",
      minWidth: 170,
      align: "left",
    },
    {
      id: "averagecost",
      label: "Average Cost",
      minWidth: 170,
      align: "left",
    },
  ];

  const createData = (stockcode, stockdesc, unitdesc, pakcdesc,averagecost) => {
    return { stockcode, stockdesc, unitdesc, pakcdesc,averagecost };
  };
  const rows = noninventory?.data?.map((row) =>
    createData(row.stockcode, row.stockdesc, row.unitdesc, row.pakcdesc,row.averagecost)
  );
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows?.length - page * rowsPerPage);
  const handleSearchItem = useCallback(
    (e) => {
      dispatch(action_set_search_stockdesc(e.target.value));
    },
    [dispatch]
  );
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useKeypress("Escape", () => {
    dispatch(action_set_qtyopenmodal(false));
    dispatch(action_set_openmodal(false));
  });
  const handleSetItemnQty = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setitemqty(e.target.value);
    }
  };
  const handleAverageCost = (e) => {
    const re = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setaddaveragecost(e.target.value);  
    }
  };
  return (
    <div>
       <CustomModal
        opens={AddItemForSupplier}
        UI={
          
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
            }}
          >    
            <Paper style={{ minWidth: "50%" }}>
            <Paper className={classes.paperclose}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <IconButton
              variant="contained"
              color="secondary"
              onClick={() => handleCloseAddSupplier()}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </Paper>
              <CardContent style={{ padding: 20 }}>
              
                <SupplierDetails/>
             
              </CardContent>
            </Paper>
          </div>
        }
      />
      <CustomModal
        opens={AddNewSupplier}
        UI={
          
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
            }}
          >    
            <Paper style={{ minWidth: "30%" }}>
            <Paper className={classes.paperclose}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <IconButton
              variant="contained"
              color="secondary"
              onClick={() => handleCloseAddSupplier()}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </Paper>
              <CardContent style={{ padding: 50 }}>
                <SearchSupplier/>
              </CardContent>
            </Paper>
          </div>
        }
      />
        <CustomModal
        opens={AddNewItemOpen}
        UI={
          
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
            }}
          >    
            <Paper style={{ minWidth: "30%" }}>
            <Paper className={classes.paperclose}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <IconButton
              variant="contained"
              color="secondary"
              onClick={() => handleCloseAddItem()}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </Paper>
              <CardContent style={{ padding: 50 }}>
              <Grid item xs={12} className={classes.GridStyle}>
                  <FormControl variant="filled" className={classes.formControl}>
                    <TextField
                      fullWidth={true}
                      id="outlined-required"
                      label="Stock Description"
                      defaultValue={addstockdesc}
                      value={addstockdesc}
                      variant="outlined"
                      onChange={(e)=>setaddstockdesc(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} className={classes.GridStyle}>
                  <FormControl variant="filled" className={classes.formControl}>
                    <TextField
                      fullWidth={true}
                      onChange={(e)=>handleAverageCost(e)}
                      id="outlined-required"
                      label="Average Cost"
                      defaultValue={addaveragecost}
                      value={addaveragecost}
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} className={classes.GridStyle}>
                  <FormControl variant="filled" className={classes.formControl}>
                    <TextField
                      fullWidth={true}
                      onChange={(e)=>setaddunit(e.target.value)}
                      id="outlined-required"
                      label="Unit"
                      defaultValue={addunit}
                      value={addunit}
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>




                <Grid item xs={12} className={classes.GridStyle}>
                  <FormControl variant="filled" className={classes.formControl}>
                    <TextField
                      fullWidth={true}
                      onChange={(e) => handleSetItemnQty(e)}
                      id="outlined-required"
                      label="Item Qty"
                      defaultValue={itemqty}
                      value={itemqty}
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} className={classes.GridStyle}>
                  <FormControl variant="filled" className={classes.formControl}>
                    <TextField
                      fullWidth={true}
                      onChange={(e) => setitemremarks(e.target.value)}
                      id="outlined-required"
                      label="Item Remarks"
                      defaultValue={itemremarks}
                      value={itemremarks}
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>
                <Button
                 className={classes.RoundedButton}
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddNewItemAdded()}
                >
                  Add Item
                </Button>
              </CardContent>
            </Paper>
          </div>
        }
      />
      <CustomModal
        opens={QtyOpen}
        UI={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
            }}
          >
            <Paper style={{ minWidth: "30%" }}>
              <CardContent style={{ padding: 50 }}>
              <Grid item xs={12} className={classes.GridStyle}>
                  <FormControl variant="filled" className={classes.formControl}>
                    <TextField
                      fullWidth={true}
                      aria-readonly={true}
                      id="outlined-required"
                      label="Stock Description"
                      defaultValue={selectediteminfo[0]?.stockdesc}
                      value={selectediteminfo[0]?.stockdesc}
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} className={classes.GridStyle}>
                  <FormControl variant="filled" className={classes.formControl}>
                    <TextField
                      fullWidth={true}
                      aria-readonly={true}
                      id="outlined-required"
                      label="Average Cost"
                      defaultValue={selectediteminfo[0]?.averagecost}
                      value={selectediteminfo[0]?.averagecost}
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} className={classes.GridStyle}>
                  <FormControl variant="filled" className={classes.formControl}>
                    <TextField
                      fullWidth={true}
                      aria-readonly={true}
                      id="outlined-required"
                      label="Unit"
                      defaultValue={selectediteminfo[0]?.unitdesc}
                      value={selectediteminfo[0]?.unitdesc}
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>




                <Grid item xs={12} className={classes.GridStyle}>
                  <FormControl variant="filled" className={classes.formControl}>
                    <TextField
                      fullWidth={true}
                      onChange={(e) => handleSetItemnQty(e)}
                      id="outlined-required"
                      label="Item Qty"
                      defaultValue={itemqty}
                      value={itemqty}
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} className={classes.GridStyle}>
                  <FormControl variant="filled" className={classes.formControl}>
                    <TextField
                      fullWidth={true}
                      onChange={(e) => setitemremarks(e.target.value)}
                      id="outlined-required"
                      label="Item Remarks"
                      defaultValue={itemremarks}
                      value={itemremarks}
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddQty()}
                >
                  Add Item
                </Button>
              </CardContent>
            </Paper>
          </div>
        }
      />
      <CustomModal
        opens={isOpen}
        UI={
          <div>
            <CardContent style={{ padding: 50 }}>
              <Paper className={classes.paperclose}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                  }}
                >
                  <IconButton
                    variant="contained"
                    color="secondary"
                    onClick={() => handleClose()}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              </Paper>
              <Paper className={classes.paperclose}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                       <Button
                        className={classes.RoundedButton}
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddNewItem()}
                >
                  Add New Item
                </Button>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                  }}
                >
                  <TextField
                    id="standard-basic"
                    label="Search"
                    onChange={(e) => handleSearchItem(e)}
                  />
                </div>
              </Paper>
              <TableContainer component={Paper}>
                <Table
                  className={classes.table}
                  aria-label="custom pagination table"
                >
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? rows?.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : rows
                    ).map((row, index) => (
                      <TableRow
                        key={index}
                        onClick={() => handleClickItem(row)}
                      >
                        <TableCell style={{ width: "10%" }} align="left">
                          {row?.stockcode}
                        </TableCell>
                        <TableCell style={{ width: "50%" }} align="left">
                          {row?.stockdesc}
                        </TableCell>
                        <TableCell style={{ width: "20%" }} align="left">
                          {row?.packdesc}
                        </TableCell>
                        <TableCell style={{ width: "50%" }} align="left">
                          {row?.unitdesc}
                        </TableCell>
                        <TableCell style={{ width: "50%" }} align="left">
                          {row?.averagecost}
                        </TableCell>
                      </TableRow>
                    ))}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[
                          5,
                          10,
                          25,
                          { label: "All", value: -1 },
                        ]}
                        colSpan={3}
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: { "aria-label": "rows per page" },
                          native: true,
                        }}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </CardContent>
          </div>
        }
      />

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
              <TableRow>
                <TableCell>Code</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Requested Qty</TableCell>
                <TableCell>Average Cost</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Remarks</TableCell>
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

              {arrayitem.map((row, index) => {
             
                return(
                <TableRow key={row.stockcode}>
                  <TableCell>{row.stockcode}</TableCell>
                  <TableCell>{row.stockdesc}</TableCell>
                  <TableCell>{row.unitdesc}</TableCell>
                  <TableCell>{row.prqty}</TableCell>
                  <TableCell>{row.averagecost}</TableCell>
                  <TableCell>{parseFloat(parseInt(row.prqty) * parseFloat(row.averagecost)).toFixed(2)}</TableCell>
                  <TableCell>{row.itemremarks}</TableCell>
                  {hideactions ? null : (
                    <TableCell>
                      <IconButton
                        aria-label="delete"
                        className={classes.margin}
                        onClick={() => {
                          const _itemState = arrayitem.filter(
                            (_item, _index) => _index !== index
                          );
                          const _itemState3 = saverchildarrayitem.filter(
                            (_item, _index) => _item.stockcode !== row.stockcode
                          );

                          setsaverchildarrayitem(_itemState3);

                          setarrayitem(_itemState);
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
        {hideactions ? <>  <Button
          variant="contained"
          color="primary"
          className={classes.rptbutton}
          endIcon={<PrintIcon />}
          onClick={() => {
            dispatch(action_set_open_backdrop("Downloading PDF File. . .",true));
            dispatch(action_generate_report(requestinfo?.data?.prno));
          }}
        >
          Print Report
        </Button> 
          <div style={{ display: "flex",marginTop:20 }}>
          <div style={{ marginLeft: "auto" }}>
            <TextField
              aria-readonly={true}
              id="outlined-required"
              label="Total"
              defaultValue={totalpr}
              value={totalpr}
              variant="outlined"
            />
          </div>
          </div>
          </>
        : (
          
      null
        
        )
}
      
      </CardContent>
      <SuppliersTable hideactions={hideactions}/>
      <GRFooter />
    </div>
  );
};

GRtable.propTypes = {};

export default GRtable;
