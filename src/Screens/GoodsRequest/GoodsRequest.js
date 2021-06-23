import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Grid, Paper } from "@material-ui/core";
import GRheader from "./GRheader";
import GRtable from "./GRtable";
import useStyles from "./style";
import {
  action_GET_listofdepartment,
  action_GET_noninventoryitem,
  action_GET_getsinglerequestheader,
  action_GET_getsinglerequestdetails,
  action_set_open_backdrop,
  action_GET_listofsections
} from "../../Services/Actions/Inventory_Actions";
import Inventorytable from "./Inventorytable";
import { useDispatch, useSelector } from "react-redux";
import SimpleSnackbar from "../../Plugin/SimpleSnackbar";
import { set_sncakbar } from "../../Services/Actions/Defaults_Actions";
import SimpleBackDrop from "../../Plugin/SimpleBackDrop";

const GoodsRequest = () => {
  const snackbar = useSelector((state) => state.DefaultReducers.snackbar);
  const isOpen = useSelector((state) => state.Inventory_Reducers.isOpen);
  const singlerequestdetails = useSelector(
    (state) => state.Inventory_Reducers.singlerequestdetails
  );
  const openbackdrop = useSelector(
    (state) => state.Inventory_Reducers.openbackdrop
  );
  const base64topdf = useSelector(
    (state) => state.Inventory_Reducers.base64topdf
  );
  const searchitem = useSelector(
    (state) => state.Inventory_Reducers.searchitem
  );
  const activeinventory = useSelector(
    (state) => state.Inventory_Reducers.activeinventory
  );
  const requestinfo = useSelector(
    (state) => state.Inventory_Reducers.requestinfo
  );
  const user_info = useSelector((state) => state.DefaultReducers.user_info);
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    let mounted = true;
    const index = () => {
      if (mounted) {
        dispatch(action_GET_listofdepartment());
        dispatch(action_GET_listofsections(user_info?.deptcode));
      }
    };
    mounted && index();
    return () => {
      mounted = false;
    };
  }, [dispatch, isOpen, user_info?.deptcode]);
  useEffect(() => {
    let mounted = true;
    const index = () => {
      if (mounted) {
        dispatch(
          action_GET_noninventoryitem(
            activeinventory?.active,
            searchitem?.stockdesc
          )
        );
      }
    };
    mounted && index();
    return () => {
      mounted = false;
    };
  }, [activeinventory?.active, dispatch, searchitem?.stockdesc]);
  useEffect(() => {
    let mounted = true;
    const index = () => {
      if (mounted) {
        if (base64topdf?.base64topdf !== "") {
          dispatch(action_set_open_backdrop("",false));
        }
      }
    };
    mounted && index();
    return () => {
      mounted = false;
    };
  }, [base64topdf?.base64topdf, dispatch]);

  const handleClose = useCallback(() => {
    dispatch(set_sncakbar(false, "", ""));
  }, [dispatch]);
  useEffect(() => {
    let mounted = true;
    const checkifrequestshow = async () => {
      if (mounted) {
        if (requestinfo.loading && requestinfo?.data.prno !== undefined) {
          
        dispatch(action_set_open_backdrop("Loading",true))
          dispatch(action_GET_getsinglerequestheader(requestinfo?.data?.prno));
          dispatch(action_GET_getsinglerequestdetails(requestinfo?.data?.prno));
          dispatch(action_set_open_backdrop("Loading",false))
        }
      }
    };
    mounted && checkifrequestshow();
    return () => {
      mounted = false;
    };
  }, [dispatch, requestinfo]);
  useEffect(() => {
    let mounted = true;
    const checkifrequestshow = async () => {
      if (mounted) {
        if(requestinfo?.data.prno !== undefined){
        dispatch(action_set_open_backdrop("Loading",true))
        if (singlerequestdetails?.loading) {
     
          dispatch(action_GET_getsinglerequestheader(requestinfo?.data?.prno));
          dispatch(action_GET_getsinglerequestdetails(requestinfo?.data?.prno));
          setTimeout(() => {
            dispatch(action_set_open_backdrop("Loading",false))
          }, 5000);
       
        }
      }
    }
    };
    mounted && checkifrequestshow();
    return () => {
      mounted = false;
    };
  }, [dispatch, requestinfo?.data.prno, singlerequestdetails?.loading]);
  return (
    <Container fixed>
      <SimpleBackDrop message={openbackdrop?.message} open={openbackdrop?.openbackdrop} />
      <SimpleSnackbar
        vertical="bottom"
        horizontal="left"
        open={snackbar.open}
        close={false}
        handleClose={() => handleClose()}
        message={snackbar.message}
        typeofmessage={snackbar.type}
      />

      <div className={classes.root}>
        <Paper className={classes.mainpaper}>
          <GRheader />
          <GRtable />
        </Paper>
      </div>
    </Container>
  );
};

GoodsRequest.propTypes = {};

export default GoodsRequest;
