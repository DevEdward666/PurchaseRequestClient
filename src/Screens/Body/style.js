import {  makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      justifyContent: "center",
      height:"100%",
      overflow: "auto"
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    buttonstyle:{
      display:"flex",
      padding:20,
    },
    table: {
      width:"100%",
      minWidth: "100%",
      height:"100%",
      overflow:"auto",
     overflowY:"scroll"
    },
    rootcard:{
      backgroundColor: theme.palette.background.paper,
      height:"100%",
      
    padding:10,
      width: "70%",
      position: "fixed",
      left: "60%",
      marginLeft: "-37.5%",
      minHeight:"20%",
      overflow: "auto",
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "true",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      
    },
    formFilterControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      width:"100%"
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    RoundedButton: { borderRadius: 50 }
  }));

  export default useStyles