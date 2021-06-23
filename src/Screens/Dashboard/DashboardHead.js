import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import useStyles from './style'
import { Paper, Typography,Grid, IconButton } from '@material-ui/core';
import pending from '../../Assets/Icon/pending.png'
import Approved from '../../Assets/Icon/Approved.png'
import Cancelled from '../../Assets/Icon/Cancelled.png'
import issued from '../../Assets/Icon/issued.png'
import {action_set_status} from '../../Services/Actions/Inventory_Actions'
import { useDispatch, useSelector } from 'react-redux';
import DashboardTable from './DashboardTable'
const DashboardHead = props => {
    const classes=useStyles();
    const dispatch=useDispatch()
    const getdashboardnumbers = useSelector((state) => state.Inventory_Reducers.getdashboardnumbers);
const handelSetStatus = useCallback((value)=>{
dispatch(action_set_status(value))

},[dispatch])
    return (
        <div className={classes.rootMain}>
        <div className={classes.root}>
        
            <Grid item xs={3} className={classes.mainGrid}>
            <IconButton onClick={()=>handelSetStatus("For Approval")}>
             <Paper elevation={3} className={classes.paperstyle}>
             <Grid container spacing={3}>
             <div  className={classes.paperimage}>
              <img src={pending} alt="For Approval icon" width="50%"/>
              </div>
             <Grid item xs={12}>
                <Typography  variant="h6"  className={classes.paperTypo}>For Approval</Typography> 
            </Grid>
             <Grid item xs={12}>

                <Typography  variant="h6"  className={classes.paperTypoNumber}>{getdashboardnumbers?.data[0]?.forapproval}</Typography> 
            </Grid>
            </Grid>     
             </Paper>
             </IconButton>
             </Grid>




             <Grid item xs={3} className={classes.mainGrid}>
             <IconButton onClick={()=>handelSetStatus("Approved")}>
             <Paper elevation={3} className={classes.paperstyle}>
             <Grid container spacing={3}>
             <div  className={classes.paperimage}>
              <img src={Approved} alt="Approved icon" width="50%"/>
              </div>
             <Grid item xs={12}>
                <Typography  variant="h6" className={classes.paperTypo}>Approved</Typography> 
            </Grid>
            <Grid item xs={12}>
                <Typography  variant="h6"  className={classes.paperTypoNumber}>{getdashboardnumbers?.data[0]?.approved}</Typography> 
            </Grid>
            </Grid>     
             </Paper>
             </IconButton>
             </Grid>



             <Grid item xs={3} className={classes.mainGrid}>
             <IconButton onClick={()=>handelSetStatus("Cancelled")}>
             <Paper elevation={3} className={classes.paperstyle}>
             <Grid container spacing={3}>
             <div  className={classes.paperimage}>
              <img src={Cancelled} alt="Cancelled icon" width="50%"/>
              </div>
             <Grid item xs={12}>
                <Typography  variant="h6" className={classes.paperTypo}>Cancelled</Typography> 
            </Grid>
            <Grid item xs={12}>
                <Typography  variant="h6"  className={classes.paperTypoNumber}>{getdashboardnumbers?.data[0]?.cancelled}</Typography> 
            </Grid>
            </Grid>     
             </Paper>
             </IconButton>
             </Grid>



   
        </div>
        <DashboardTable/>
        </div>
    );
};

DashboardHead.propTypes = {
    
};

export default DashboardHead;