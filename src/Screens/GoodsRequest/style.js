import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "70%",
    position: "fixed",
    left: "60%",
    marginLeft: "-37.5%",
    minHeight: "20%",
    height: "100%",
    overflow: "auto",
  },
  paperclose: {
    flexGrow: 1,
    width: "100%",
    height: "100%",
    padding: 10,
  },
  papermainroot: {
    flexGrow: 1,
    width: "100%",
    padding: 40,
  },
  GridStyle: {
    padding: 5,
  },
  table: {
    width: "100%",
    minWidth: "100%",
    minHeight: "10%",
    height: "100%",
    overflow: "auto",
  },
  selectStyle: {
    flexGrow: 1,
    width: "100%",
  },

  mainpaper: {
    flexGrow: 1,
    width: "100%",
    height: "100%",
    overflow: "auto",
  },
  buttonstyle: {
    padding: 20,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  rptbutton: {
    margin: theme.spacing(1),
    borderRadius: 50
  },
  RoundedButton: { borderRadius: 50 }
}));

export default useStyles;
