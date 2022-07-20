import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { CardActions } from "@material-ui/core";

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
    transitionProperty: "transform",
    transitionDelay: "1.55s",
    "&:hover, &:focus": {
      transform: "scale(1.1)",
    },
  },
  root: {
    width: "300px",
    height: "400px",
    float: "left",
    margin: "10px"
  },
  media: {
    height: "200px",
    width: "100%"
  },
  actions: {
    margin: "auto",
    align: "center"
  }
});

export default function ProductCard(props) {
  const classes = useStyles();

  return (
    <Link to="" className={classes.link}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={props.imageUrl}
          title={props.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          R$ {props.price}
        </CardActions>
      </Card>
    </Link>
  );
}
