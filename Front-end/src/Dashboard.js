import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

function CustomAlert(message, type) {
    return (
      <Alert variant="outlined" severity={type}>
        {message}
      </Alert>
    );
  }

export default function Dashboard() {
  const classes = useStyles();
  const [file, setFile] = React.useState('');
  const [customAlert, setCustomAlert] = React.useState();

  const onChange = (event) => {
    event.preventDefault();
    setFile(event.target.files[0]);
    const data = new FormData();
    data.append('file', file);
    console.log("sending data")
    axios.post("http://localhost:8000/documents", {
      document : file,
      token : localStorage.getItem('Token'),
    })
      .then(res => { // then print response status
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    // if(file != '') {

    //     axios
    //     .post("/users/register", {
    //         file: file,
    //     })
    //     .then((response) => {
    //         if (response.data.code === 200) {
    //         console.log("result : ", response);
    //         localStorage.setItem("Token", response.data.token);
    //         setCustomAlert(CustomAlert("Successfully Uploaded", "success"));
    //         //props.history.push("/Dashboard");
    //         console.log("Uploaded Successful");
    //         } else {
    //         setCustomAlert(CustomAlert(response.data.data.message, "error"));
    //         console.log("result : ", response);
    //         console.log("ERROR: " + response.data.data.message);
    //         }
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //         setCustomAlert(
    //         CustomAlert(
    //             "We are facing some issue. Please wait for sometime.",
    //             "error"
    //         )
    //         );
    //     });
    // }
  };

  return (
    <div className={classes.root}>
      <input
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={onChange}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
      <p>Filename: {file.name}</p>
      <p>File type: {file.type}</p>
      <p>File size: {file.size} bytes</p>
      {file && <ImageThumb image={file} />}
    </div>
  );
}

const ImageThumb = ({ image }) => {
  return <img src={URL.createObjectURL(image)} alt={image.name} />;
};
