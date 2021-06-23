import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

import {
  Button,
  CardContent,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import {
  action_set_office,
  action_set_openmodal,
} from "../../Services/Actions/Inventory_Actions";
import useStyles from "./style";
import {
  set_global_sncakbar,
  action_INSERT_notications,
} from "../../Services/Actions/Defaults_Actions";
import {
  action_set_notification,
  action_set_requestedheade,
  action_set_requestedfooter,
  action_GET_InsertNewRequest,
  action_close_success_modal,
  action_SET_updaterequestApproved,
  action_SET_updaterequestCancelled,
  action_set_addnewsupplieropenmodal,
  action_GET_InsertNewRequestWithoutSupplier,
  action_GET_InsertSupplier
} from "../../Services/Actions/Inventory_Actions";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../../Plugin/Modal/CustomModal";
import logo from "../../Assets/Icon/success.png";
import { useHistory } from "react-router";
import moment from "moment";
import useKeypress from "../../Hooks/useKeyPress";
const GRheader = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const department = useSelector(
    (state) => state.Inventory_Reducers.department
  );
  const sections = useSelector(
    (state) => state.Inventory_Reducers.sectionlist
  );
  const requesteddtls = useSelector(
    (state) => state.Inventory_Reducers.requesteddtls
  );
  const requestsuccess = useSelector(
    (state) => state.Inventory_Reducers.requestsuccess
  );
  const singlerequestheader = useSelector(
    (state) => state.Inventory_Reducers.singlerequestheader
  );
  const requestinfo = useSelector(
    (state) => state.Inventory_Reducers.requestinfo
  );
  const user_info = useSelector((state) => state.DefaultReducers.user_info);
  const reqremarks = useSelector(
    (state) => state.Inventory_Reducers.requestfooter
  );
  const selectedsuppliers = useSelector(state => state.Inventory_Reducers.selectedsuppliers)
  const permissions = useSelector((state) => state.DefaultReducers.permissions);
  const [office, setoffice] = useState("");
  const [reqno, setreqno] = useState("");
  const [reqstatus, setreqstatus] = useState("");
  const [customodalmessage, setcustomodalmessage] = useState("");
  const [reqby, setreqby] = useState("");
  const [reqdate, setreqdate] = useState("");
  const [isDisabled, setisDisabled] = useState(true);
  const [successopen, setsuccessopen] = useState(false);
  const [hideactions, sethideactions] = useState(false);
  const [hideallactions, sethideallactions] = useState(false);
  const [deptSelectDisabled, setdeptSelectDisabled] = useState(false);
  const [canapprove, setcanapprove] = useState(false);
  const [cancancel, setcancancel] = useState(false);

  useEffect(() => {
    let mounted = true;
    const checkifrequestshow = async () => {
      if (mounted) {
        if (
          requestinfo?.data.STATUS === "Approved" ||
          requestinfo?.data.STATUS === "Cancelled"
        ) {
          sethideallactions(true);

          setreqno(singlerequestheader?.data[0]?.prno);
          setoffice(singlerequestheader?.data[0]?.deptcode);
          setreqby(singlerequestheader?.data[0]?.reqby);
          setreqdate(singlerequestheader?.data[0]?.reqdate);
          setreqstatus(singlerequestheader?.data[0]?.reqstatus);
          dispatch(
            action_set_requestedfooter(singlerequestheader?.data[0]?.reqremarks)
          );
        } else if (
          singlerequestheader?.loading &&
          requestinfo?.data?.prno !== undefined
        ) {
          sethideactions(true);
          setdeptSelectDisabled(true);
          setreqno(singlerequestheader?.data[0]?.prno);
          setoffice(singlerequestheader?.data[0]?.deptcode);
          setreqby(singlerequestheader?.data.reqby);
          setreqdate(singlerequestheader?.data[0]?.reqdate);
          setreqstatus(singlerequestheader?.data[0]?.reqstatus);
          dispatch(
            action_set_requestedfooter(singlerequestheader?.data[0]?.reqremarks)
          );
          if (permissions?.approve && permissions?.cancel) {
            setcanapprove(true);
            setcancancel(true);
          } else if (permissions?.approve) {
            setcanapprove(true);
            setcancancel(false);
          } else if (permissions?.cancel) {
            setcanapprove(false);
            setcancancel(true);
          } else {
            setcanapprove(false);
            setcancancel(false);
          }
        } else {
          sethideallactions(false);
          sethideactions(false);
        }
      }
    };
    mounted && checkifrequestshow();
    return () => {
      mounted = false;
    };
  }, [
    dispatch,
    permissions?.approve,
    permissions?.cancel,
    reqstatus,
    requestinfo,
    singlerequestheader,
    singlerequestheader?.data[0]?.prno,
    singlerequestheader?.loading,
  ]);
  const handleChange = useCallback(
    async (event) => {
      let mounted = true;
      if (mounted) {
        let date = new Date();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let year = date.getFullYear();
        let fullday = "";
        if (day <= 9 && month <= 9) {
          fullday = year + "-0" + month + "-0" + day;
        } else if (day <= 9) {
          fullday = year + "-" + month + "-0" + day;
        } else if (month <= 9) {
          fullday = year + "-0" + month + "-" + day;
        }

        await setoffice(event.target.value);
        dispatch(action_set_office(event.target.value));
        await setreqby(user_info?.empname);
        await setreqstatus("For Approval");
        await setreqdate(fullday);
        await setisDisabled(false);
      }

      return () => {
        mounted = false;
      };
    },
    [dispatch, user_info?.empname]
  );
  const handleNewItemClick = useCallback(() => {
    let mounted = true;
    if (mounted) {
      dispatch(action_set_openmodal(true));
    }

    return () => {
      mounted = false;
    };
  }, [dispatch]);
  const handleNewSupplierClick = useCallback(() => {
    let mounted = true;
    if (mounted) {
      dispatch(action_set_addnewsupplieropenmodal(true));
    }

    return () => {
      mounted = false;
    };
  }, [dispatch]);
  const handleAddSupplierClick = useCallback(() => {
    let mounted = true;
    if (mounted) {
      dispatch(action_set_addnewsupplieropenmodal(true));
    }

    return () => {
      mounted = false;
    };
  }, [dispatch]);
  const handleSubmitRequest = useCallback(async () => {
    let mounted = true;
    if (mounted) {
      if (requesteddtls !== []){
        if(selectedsuppliers?.data.length >0 ){
          await dispatch(
           action_GET_InsertNewRequest(office, reqby, reqremarks, requesteddtls,selectedsuppliers.data)
         );
         console.log("im here")
       }else{
         await dispatch(
           action_GET_InsertNewRequestWithoutSupplier(office, reqby, reqremarks, requesteddtls)
         );
         
       }
      }

       
    }

    return () => {
      mounted = false;
    };
  }, [dispatch, office, reqby, reqremarks, requesteddtls, selectedsuppliers]);
  const handleAddSupplierSubmit = useCallback(async () => {
    let mounted = true;
    if (mounted) {
        if(singlerequestheader?.data[0].prno !==[] ){
          await dispatch(
            action_GET_InsertSupplier(singlerequestheader?.data[0].prno ,selectedsuppliers.data)
         );
           }
      

       
    }

    return () => {
      mounted = false;
    };
  }, [dispatch, selectedsuppliers.data, singlerequestheader?.data]);
console.log(selectedsuppliers?.data)
  useEffect(() => {
    let mounted = true;
    const successgetter = async () => {
      if (mounted) {
        if (requestsuccess?.loading) setsuccessopen(true);
        setcustomodalmessage(requestsuccess?.message);
        dispatch(
          action_set_notification(
            true,
            requestsuccess?.message,
            "info",
            "System",
            office
          )
        );
        if (requestsuccess?.message !== "")
          dispatch(
            action_INSERT_notications(
              "New Purchase Item Request",
              requestsuccess?.message,
              "info",
              office,
              "System Admin"
            )
          );
      }
    };
    mounted && successgetter();
    return () => {
      mounted = false;
    };
  }, [dispatch, requestsuccess?.loading, requestsuccess?.message]);

  const handleApproveRequest = useCallback(() => {
    let mounted = true;
    if (mounted) {
      dispatch(
        action_SET_updaterequestApproved(
          reqno,
          user_info?.username,
          user_info?.empname
        )
      );
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, reqno, user_info?.empname, user_info?.username]);
  const handleCancelRequest = useCallback(() => {
    let mounted = true;
    if (mounted) {
      dispatch(
        action_SET_updaterequestCancelled(
          reqno,
          user_info?.username,
          user_info?.empname
        )
      );
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, reqno, user_info?.empname, user_info?.username]);

  const handleContinue = useCallback(async () => {
    let mounted = true;
    if (mounted) {
      dispatch(set_global_sncakbar(false, "", ""));

      setsuccessopen(false);
      dispatch(action_close_success_modal());

      history.push("/Maintable");
    }
    return () => {
      mounted = false;
    };
  }, [dispatch]);

  useKeypress("Escape", () => {
    setsuccessopen(false);
    history.push("/Maintable");
  });
  return (
    <>
      <CustomModal
        opens={successopen}
        UI={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
            }}
          >
            <Paper style={{ minWidth: "20%" }}>
              <CardContent style={{ padding: 50 }}>
                <Grid item xs={12} className={classes.GridStyle}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img src={logo} alt="success icon" width="20%" />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    component="h4"
                    style={{ textAlign: "center" }}
                  >
                    {customodalmessage}
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 50,
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleContinue()}
                    >
                      Continue
                    </Button>
                  </div>
                </Grid>
              </CardContent>
            </Paper>
          </div>
        }
      />
      <Paper className={classes.buttonstyle}>
        <div style={{ display: "flex" }}>
          {hideallactions ? null : hideactions ? (
            <>
                 <div style={{ marginRight: "auto" }}>
            <Button
              className={classes.RoundedButton}
            variant="contained"
            color="primary"
            onClick={() => handleAddSupplierClick()}
          >
            Add Supplier
          </Button>
          <Button
           className={classes.RoundedButton}
              variant="contained"
              color="primary"
              onClick={() => handleAddSupplierSubmit()}
            >
              Submit
            </Button>
          </div>
            <div style={{ marginLeft: "auto" }}>
              {canapprove ? (
                <Button
                className={classes.RoundedButton}
                  style={{ marginRight: 20 }}
                  variant="contained"
                  color="primary"
                  onClick={() => handleApproveRequest()}
                >
                  Approve
                </Button>
              ) : null}
              {cancancel ? (
                <Button
                className={classes.RoundedButton}
                  variant="contained"
                  color="secondary"
                  onClick={() => handleCancelRequest()}
                >
                  Cancel
                </Button>
              ) : null}
            </div>
            </>
          ) : (
            <>
               <div style={{ marginRight: "auto" }}>
              <Button
               className={classes.RoundedButton}
                style={{ marginRight: "auto" }}
                disabled={isDisabled}
                variant="contained"
                color="primary"
                onClick={() => handleNewItemClick()}
              >
                Add Item
              </Button>
              <Button
               className={classes.RoundedButton}
                disabled={isDisabled}
                variant="contained"
                color="primary"
                onClick={() => handleNewSupplierClick()}
              >
                Add Supplier
              </Button>
              </div>
              <Button
               className={classes.RoundedButton}
                style={{ marginLeft: "auto" }}
                disabled={isDisabled}
                variant="contained"
                color="primary"
                onClick={() => handleSubmitRequest()}
              >
                Submit
              </Button>
            </>
          )}
        </div>
      </Paper>
      <Paper className={classes.papermainroot}>
        <Grid container spacing={3}>
          <Grid item xs={4} className={classes.GridStyle}>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel id="demo-simple-select-filled-label">
                Office
              </InputLabel>
              <Select
                className={classes.selectStyle}
                fullWidth={true}
                value={office}
                onChange={handleChange}
                disabled={deptSelectDisabled}
              >
                {department?.data.map((item) => (
                  <MenuItem value={item.deptcode}>{item.deptname}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4} className={classes.GridStyle}>
            <FormControl variant="filled" className={classes.formControl}>
              <TextField
                fullWidth={true}
                disabled
                id="outlined-required"
                label="Request No."
                defaultValue={reqno}
                value={reqno}
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item xs={4} className={classes.GridStyle}>
            <FormControl variant="filled" className={classes.formControl}>
              <TextField
                fullWidth={true}
                disabled
                id="outlined-required"
                label="Request Status"
                defaultValue={reqstatus}
                value={reqstatus}
                variant="outlined"
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={4} className={classes.GridStyle}>
            <FormControl variant="filled" className={classes.formControl}>
              <TextField
                fullWidth={true}
                disabled
                id="outlined-required"
                label="Requested By"
                defaultValue={reqby}
                value={reqby}
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item xs={4} className={classes.GridStyle}>
            <FormControl variant="filled" className={classes.formControl}>
              <TextField
                fullWidth={true}
                disabled
                id="outlined-required"
                label="Request Date"
                defaultValue={reqdate}
                value={moment(reqdate).format("ll")}
                variant="outlined"
              />
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

GRheader.propTypes = {};

export default GRheader;
