import { Button, Typography } from "@material-ui/core";
// import LoadingDialog from "../LoadingDialog/LoadingDialog";
import { Alert } from "@material-ui/lab";
import { Form, Formik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import FormikTextField from "../Components/Formik/FormikTextField";
import {
  action_GET_defaultlogo,
  action_GET_defaultname,
} from "../Services/Actions/Defaults_Actions";
import { action_Login_user } from "../Services/Actions/Login_Actions";
import { makeStyles } from "@material-ui/core/styles";
const authFormValues = {
  username: "",
  password: "",
};

const authFormSchema = yup.object({
  username: yup.string().required().label("Username"),
  password: yup.string().required().label("Password"),
});

function Login() {
  const [hospdefaults, sethospdefaults] = useState([]);
  const auth = window.localStorage.getItem("tokenizer");

  const dispatch = useDispatch();
  const name = useSelector((state) => state.DefaultReducers.name);
  const logo = useSelector((state) => state.DefaultReducers.logo);

  const [authLoading, setauthLoading] = useState(false);
  const [authFail, setauthFail] = useState("");

  const handleSubmit = useCallback(async (data, { resetForm }) => {
    window.localStorage.setItem("username", data.username);
    dispatch(action_Login_user(data.username, data.password));
  }, [dispatch]);
  useEffect(() => {
    dispatch(action_GET_defaultname());
    dispatch(action_GET_defaultlogo());
  }, [dispatch]);
  const useStyles = makeStyles((theme) => ({
  RoundedButton: { borderRadius: 50 }
}));
const classes = useStyles();
  return (
    
    <div style={{ gridArea: "login" }} className="login-container">
      <section className="header">
        <img className="brand-logo" alt="" src={logo} />
        <Typography variant="h5" className="brand-name">
          {/* {companyName ? companyName : ""} */}
          {name}
        </Typography>
      </section>

      <section className="body">
        {authFail && (
          <Alert severity="error" className="error">
            {authFail}
          </Alert>
        )}

        <Formik
          initialValues={authFormValues}
          validationSchema={authFormSchema}
          validateOnBlur={false}
          validateOnMount={false}
          validateOnChange={false}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          <Form className="form">
            <FormikTextField
              name="username"
              label="Username"
              type="text"
              placeholder="Enter your username here"
            />
            <FormikTextField
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password here"
            />

            <Button
              type="submit"
              disabled={authLoading}
              className={classes.RoundedButton}
              variant="contained"
              size="large"
              color="primary"
              fullWidth={true}
            >
              Log in
            </Button>
          </Form>
        </Formik>
      </section>
    </div>
  );
}
export default Login;
