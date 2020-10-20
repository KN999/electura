import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import "./Register.css";

function CustomAlert(message, type) {
  return (
    <Alert variant="outlined" severity={type}>
      {message}
    </Alert>
  );
}

export default function Register(props) {
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
  const [username, setUsername] = React.useState("flkdsj");
  const [password, setPassword] = React.useState("fdjkds");
  const [customAlert, setCustomAlert] = React.useState();

  const onSubmit = () => {
    if (username !== "") {
      axios
        .post("/users/register", {
          email: email,
          username: username,
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
    } else {
      setCustomAlert(CustomAlert("You missed something.", "error"));
    }
  };

  return (
    <div className="hor-center">
      {customAlert}
      <h2 className="hor-center Register-head">Register</h2>
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
            id="username"
            label="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
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
          Register
        </Button>
      </form>
      <div className="form-tail">
            <div className="container">
                already have a account? <a href="/Login">Login</a>    
            </div>
        </div>
    </div>
  );
}
