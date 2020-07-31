import React, { useState, useEffect } from "react";
import { db, firebase } from "./config";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container, TextField, Button } from "@material-ui/core";
import Notes from "./Notes";
import Header from "./Header";
const App = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      margin: theme.spacing(1),
    },
  }));
  const classes = useStyles();
  const [text, setText] = useState("");
  const [error, setError] = useState(true);
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    //Fetch recorclerades from Notes collection
    db.collection("notes")
      .orderBy("timeStamp", "desc")
      .onSnapshot((Snapshot) => {
        setNotes(
          Snapshot.docs.map((doc) => ({
            id: doc.id,
            item: doc.data().text,
            status: doc.data().status,
          }))
        );
      });
  }, [text]);

  //updating record notes status
  const handleItemCompletence = ({ id, status }) => {
    db.collection("notes").doc(id).set({ status: !status }, { merge: true });
  };

  //updating record into firestore
  const handleUpdate = ({ id, item }) => {
    let text = window.prompt("enter a update value", item);
    //update records also u can add new properties to assign value like age:23
    // optional merge property is mandatory otherwise it will override.....! record
    db.collection("notes").doc(id).set({ text }, { merge: true });
  };

  const onChangeHandle = (e) => {
    setError(false);
    const text = e.target.value;
    if (text.trim()) {
      setText(text);
    } else setError(true);
  };
// Removing record from firestore
  const handleDelete = (id) => {
    db.collection("notes").doc(id).delete();
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    // save the document into firestore
    db.collection("notes")
      .add({
        text,
        status: false,
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(setText(""));
    setError(true);
  };
  return (
    <React.Fragment>
      <Header />
      <Container style={{ marginTop: "20px" }}>
        <Notes
          items={notes}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          itemCompleteStatus={handleItemCompletence}
        />
        <div style={{ marginTop: "20px" }}>
          <Grid container spacing={1}>
            <Grid item xs={9} md={11}>
              <TextField
                value={text}
                style={{ width: "100%" }}
                id="outlined-basic"
                onChange={onChangeHandle}
                label="Enter your Daily Task"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={3} md={1}>
              <Button
                style={{ height: "95%", width: "100%" }}
                variant="contained"
                size="large"
                color="primary"
                onClick={onSubmitHandler}
                className={classes.margin}
                disabled={error ? true : false}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default App;
