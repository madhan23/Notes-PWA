import React from "react";
import "./Notes.css";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper, Grid } from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import UpdateOutlinedIcon from "@material-ui/icons/UpdateOutlined";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
}));

export default function Notes({
  items,
  onUpdate,
  onDelete,
  itemCompleteStatus,
}) {
  const classes = useStyles();

  return (
    <div>
      {items.map((data) => (
        <Paper id="noteSection" key={data.id} className={classes.root}>
          <Grid container spacing={1}>
            <Grid item xs={8} md={10}>
              <div className="notesContainerBlk">
                <Typography
                  style={{
                    textDecoration: data.status ? "line-through" : "none",
                    color :data.status ? "green" : "red"
                  }}  
                >
                  <span className="note_text">{data.item}</span>
                </Typography>
              </div>
            </Grid>
            <Grid item xs={4} md={2}>
              <div style={{ marginTop: "5px" }}>
                <Typography color="primary">
                  <Tooltip title="complete">
                    <UpdateOutlinedIcon
                      onClick={() => itemCompleteStatus(data)}
                    />
                  </Tooltip>
                  <Tooltip title="Delete">
                    <DeleteOutlinedIcon
                      style={{ marginLeft: "15px" }}
                      color="secondary"
                      onClick={() => onDelete(data.id)}
                    />
                  </Tooltip>
                  <Tooltip title="Update">
                    <AssignmentTurnedInOutlinedIcon
                      style={{ marginLeft: "15px" }}
                      onClick={() => onUpdate(data)}
                    />
                  </Tooltip>
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </div>
  );
}
