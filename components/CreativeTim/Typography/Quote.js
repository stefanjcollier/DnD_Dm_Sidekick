import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components/CreativeTim
import { makeStyles } from "@material-ui/core/styles";
// core components/CreativeTim
import styles from "assets/CreativeTim/jss/nextjs-material-dashboard/components/CreativeTim/typographyStyle.js";

const useStyles = makeStyles(styles);

export default function Quote(props) {
  const classes = useStyles();
  const { text, author } = props;
  return (
    <blockquote className={classes.defaultFontStyle + " " + classes.quote}>
      <p className={classes.quoteText}>{text}</p>
      <small className={classes.quoteAuthor}>{author}</small>
    </blockquote>
  );
}

Quote.propTypes = {
  text: PropTypes.node,
  author: PropTypes.node,
};
