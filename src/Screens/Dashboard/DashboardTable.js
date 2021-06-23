import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import {  useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import TableHead from '@material-ui/core/TableHead';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import {action_GET_listofrequest_by_status,action_get_request_info} from '../../Services/Actions/Inventory_Actions'
import { useDispatch,useSelector } from 'react-redux';
import useStyles from './style'
import { Button, Container } from '@material-ui/core';
import { useHistory } from 'react-router';
import moment from 'moment'
const DashboardTable = () => {
    const dispatch=useDispatch()
    const user_info = useSelector((state) => state.DefaultReducers.user_info);
    const data = useSelector((state) => state.Inventory_Reducers.databydept);
    const status = useSelector((state) => state.Inventory_Reducers.status);
    const history=useHistory();

    const handleRowClick=useCallback((row)=>{
        let mounted=true

        const rowclick=()=>{
            if(mounted){
               dispatch(action_get_request_info(row))
               history.push('/GoodsRequest')
            }
        }
        mounted && rowclick()
        return()=>{mounted=false}
    },[dispatch])
    const handleNewItemClick=useCallback((row)=>{
        let mounted=true

        const buttonclick=()=>{
            if(mounted){
              dispatch(action_get_request_info(""))
                history.push('/GoodsRequest')
            }
        }
        mounted && buttonclick()
        return()=>{mounted=false}
    },[dispatch])
    useEffect(()=>{
        let mounted =true;
        const index =()=>{
            if(mounted){
            
                if(status!==""){
                    dispatch(action_GET_listofrequest_by_status(user_info?.deptcode,status))
                }else{
                    dispatch(action_GET_listofrequest_by_status(user_info?.deptcode,"For Approval"))
                }
                  
              
            }
        }
        mounted && index()
        return ()=>{mounted=false}
    },[ dispatch, status, user_info?.deptcode])

    const TablePaginationActions =(props) =>{
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
            <div className={classes.root}>
              <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
              >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
              </IconButton>
              <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              </IconButton>
              <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
              >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </IconButton>
              <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
              >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
              </IconButton>
            </div>
          );
        }
        
        TablePaginationActions.propTypes = {
          count: PropTypes.number.isRequired,
          onChangePage: PropTypes.func.isRequired,
          page: PropTypes.number.isRequired,
          rowsPerPage: PropTypes.number.isRequired,
        };
        const columns = [
            { id: 'reqno', label: 'Purchase Request No.', minWidth: 170,  align: 'left', },
            { id: 'deptname', label: 'Department', minWidth: 170,  align: 'left', },
            {
              id: 'reqdate',
              label: 'Request Date',
              minWidth: 170,
              align: 'left',
            },
            {
              id: 'apprbyname',
              label: 'Approved by',
              minWidth: 170,
              align: 'left',
            },
            {
              id: 'apprdate',
              label: 'Approve Date',
              minWidth: 170,
              align: 'left',
            },
            {
                id: 'STATUS',
                label: 'Status',
                minWidth: 170,
                align: 'left',
              },
          ];
        function createData( prno, deptname, reqdate, apprbyname,apprdate,STATUS) {
          return { prno, deptname, reqdate, apprbyname,apprdate,STATUS};
        }
        
        const rows = data?.data.map((row) =>
        createData(
          row.prno,
          row.deptname,
          row.reqdate,
          row.apprbyname,
          row.apprdate,
          row.STATUS
        )
      );   
        const [page, setPage] = React.useState(0);
        const [rowsPerPage, setRowsPerPage] = React.useState(5);
      
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
      
        const handleChangePage = (event, newPage) => {
          setPage(newPage);
        };
      
        const handleChangeRowsPerPage = (event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        };
        const classes = useStyles();
    return (

        <Paper className={classes.rootpaper}>
      <Table className={classes.table} >
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
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.prno} onClick={()=>handleRowClick(row)}>
              <TableCell style={{ width: "10%" }} align="left">
                {row.prno}
              </TableCell>
              <TableCell style={{ width: "20%" }} align="left">
                {row.deptname}
              </TableCell>
              <TableCell style={{ width: "20%" }} align="left">
                {moment(row.reqdate).format('ll')}
              </TableCell>
              <TableCell style={{ width: "10%" }} align="left">
                {row.apprbyname}
              </TableCell>
              <TableCell style={{ width: "20%" }} align="left">
              {row.apprdate?
                moment(row.apprdate).format('lll')
               
                :
                null
              }
              </TableCell>
              <TableCell style={{ width: "50%" }} align="left">
                {row.STATUS}
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
            
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Paper>  
    );
};

DashboardTable.propTypes = {
    
};

export default DashboardTable;