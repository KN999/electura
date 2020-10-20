import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import "./Login.css";

function CustomAlert(message, type) {
  return (
    <Alert variant="outlined" severity={type}>
      {message}
    </Alert>
  );
}

export default function Login(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Typography
          component="div"
          style={{ backgroundColor: "#fafafa", height: "100vh" }}
        >
          <StateTextFields history={props.history}/>
        </Typography>
      </Container>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function StateTextFields(props) {
  const classes = useStyles();
  const [email, setEmail] = React.useState("sandeep@gmail.com");
  const [password, setPassword] = React.useState("fdjkds");
  const [customAlert, setCustomAlert] = React.useState();

  const onSubmit = () => {
    axios
      .post("/users/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.code === 200) {
          console.log("result : ", response);
          localStorage.setItem("Token", response.data.token);
          setCustomAlert(CustomAlert("Successfully Logged in", "success"));
          props.history.push("/Dashboard");
          console.log("Register Successful");
        } else {
          setCustomAlert(CustomAlert(response.data.data.message, "error"));
          console.log("result : ", response);
          console.log("ERROR: " + response.data.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        setCustomAlert(
          CustomAlert(
            "We are facing some issue. Please wait for sometime.",
            "error"
          )
        );
      });
  };

  return (
    <div className="hor-center">
      {customAlert}
      <h2 className="hor-center Login-head">Login</h2>
      <form
        className={classes.root}
        onSubmit={onSubmit}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="email"
            label="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            id="password"
            label="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            variant="outlined"
          />
        </div>
        <Button onClick={onSubmit} variant="outlined" color="primary">
          Login
        </Button>
      </form>
      <div className="form-tail">
            <div className="container">
                Don't have a account? <a href="/Register">Register</a>    
            </div>
        </div>
    </div>
  );
}
